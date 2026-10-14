import { expect, test } from '@playwright/test';
import fs from 'node:fs';
const version=JSON.parse(fs.readFileSync(new URL('../../package.json',import.meta.url),'utf8')).version;

test('public build exposes live navigation, highlights and palette across four themes', async ({page}) => {
  test.setTimeout(60000);
  const errors: string[]=[];page.on('pageerror', error=>errors.push(error.message));
  await page.goto('/dist/');
  await expect(page).toHaveTitle(`Ersione Design System v${version}`);
  const demo=page.locator('#shared-components');
  const nav=demo.getByRole('navigation',{name:'공통 메뉴 시연'});
  await nav.getByRole('link',{name:'활동',exact:true}).click();
  await expect(nav.locator('[aria-current=page]')).toHaveText('활동');
  await expect(demo.locator('#navdemo-current')).toHaveText('활동');
  for(const size of ['SM','MD','LG']) {
    await demo.getByRole('button',{name:size,exact:true}).click();
    await expect(nav).toHaveClass(new RegExp(`eds-navigation--${size.toLowerCase()}`));
  }
  await demo.getByRole('button',{name:'오렌지',exact:true}).click();
  await expect(demo.locator('[data-highlight-preview]').first()).toHaveClass(/eds-data--orange/);
  await demo.getByRole('button',{name:'퍼플',exact:true}).click();
  await expect(demo.locator('[data-highlight-preview]').first()).toHaveClass(/eds-data--purple/);
  // The original showcase theme control retains its keyboard/pointer demo adapter.
  for(const brand of ['블루 테마','오렌지 테마']) {
    await page.getByRole('combobox',{name:'키컬러 테마'}).click();
    await page.getByRole('option',{name:new RegExp('^'+brand)}).click();
    for(const dark of [false,true]) {
      const toggle=page.locator('#theme');
      if((await toggle.getAttribute('aria-pressed'))!==String(dark)) await toggle.click();
      await expect(demo).toHaveAttribute('data-dark',String(dark));
      await expect(demo).toHaveAttribute('data-brand',brand==='블루 테마'?'blue':'orange');
      await expect(demo.locator('[data-palette-token="palette-orange"]')).toHaveText(dark?'#ffb38a':'#c2410c');
      for(const width of [1280,390,320]) {
        await page.setViewportSize({width,height:900});
        expect(await demo.evaluate(node=>node.scrollWidth<=node.clientWidth)).toBe(true);
        expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      }
    }
  }
  expect(errors).toEqual([]);
});

test('published React playground and palette assets resolve from dist', async ({page,request}) => {
  for(const path of ['/dist/examples/react/app.js','/dist/styles.css','/dist/tokens/tokens.css','/dist/docs/palette.html','/dist/docs/usage.html']) {
    expect((await request.get(path)).status()).toBe(200);
  }
  await page.goto('/dist/');
  await page.getByRole('link',{name:'React 컴포넌트 직접 보기'}).click();
  await expect(page).toHaveURL(/\/dist\/examples\/react\/#shared-data$/);
  await expect(page.getByRole('heading',{name:'공통 메뉴 · 하이라이트 · 차트'})).toBeVisible();
  const nav=page.getByRole('navigation',{name:'공통 메뉴 예시'});
  await nav.getByRole('link',{name:'월별 추이'}).click();
  await expect(nav.locator('[aria-current=page]')).toHaveText('월별 추이');
  await page.goto('/dist/docs/palette.html');
  await expect(page.getByRole('heading',{name:'여섯 가지 색 · 기본색 / tint / subtle'})).toBeVisible();
  await expect(page.locator('[data-token="palette-gray"]')).toHaveText('#475569');
  await expect(page.locator('[data-token="chart-series-3"]')).toHaveText('#c2410c');
});
