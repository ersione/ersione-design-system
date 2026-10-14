import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => { await page.goto('/examples/react/'); });

test('tabs use roving focus, skip disabled items and support Home/End', async ({ page }) => {
  const overview=page.getByRole('tab',{name:'개요',exact:true});
  await overview.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab',{name:'활동',exact:true})).toBeFocused();
  await expect(page.getByRole('tabpanel')).toHaveText('최근 업데이트 기록입니다.');
  await page.keyboard.press('End');
  await expect(page.getByRole('tab',{name:'설정',exact:true})).toBeFocused();
  await page.keyboard.press('Home');
  await expect(overview).toBeFocused();
  await expect(page.getByRole('tab',{name:'비활성',exact:true})).toBeDisabled();
  await expect(page.getByRole('tab',{selected:true})).toHaveCount(1);
});

test('dialog contains focus, closes with Escape and restores trigger focus', async ({ page }) => {
  const trigger=page.getByRole('button',{name:'모달 열기',exact:true});
  await trigger.click();
  const dialog=page.getByRole('dialog',{name:'변경 사항을 확인하세요'});
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('textbox',{name:'프로젝트 이름'})).toBeFocused();
  for(let i=0;i<7;i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(()=>document.activeElement?.closest('dialog')!==null)).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('button',{name:'저장',exact:true}).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('status')).toContainText('변경 사항을 저장했어요.');
});

test('toast is polite and dismissible; loading and pagination enforce boundaries', async ({ page }) => {
  await page.getByRole('button',{name:'토스트 알림',exact:true}).click();
  await expect(page.getByRole('status')).toHaveAttribute('aria-live','polite');
  await page.getByRole('button',{name:'알림 닫기',exact:true}).click();
  await expect(page.getByRole('status')).toBeEmpty();
  const submit=page.getByRole('button',{name:'제출 상태 확인',exact:true});
  await submit.click();
  await expect(page.getByRole('button',{name:'제출 중',exact:true})).toBeDisabled();
  await expect(page.getByRole('button',{name:'제출 중',exact:true})).toHaveAttribute('aria-busy','true');
  const pagination=page.getByRole('navigation',{name:'페이지 이동'});
  await expect(pagination.getByRole('button',{name:'이전'})).toBeDisabled();
  await pagination.getByRole('button',{name:'다음'}).click();
  await expect(pagination).toContainText('2 / 3 페이지');
  await pagination.getByRole('button',{name:'다음'}).click();
  await expect(pagination.getByRole('button',{name:'다음'})).toBeDisabled();
});

test('native controls retain keyboard, validation and expansion behavior', async ({ page }) => {
  const checkbox=page.getByRole('checkbox',{name:'이메일 알림 받기'});
  await expect(checkbox).toBeChecked();
  await checkbox.uncheck();
  await expect(checkbox).not.toBeChecked();
  await page.getByRole('radio',{name:'공개',exact:true}).check();
  await expect(page.getByRole('radio',{name:'나만 보기',exact:true})).not.toBeChecked();
  const toggle=page.getByRole('switch',{name:'자동 업데이트',exact:true});
  await toggle.focus(); await page.keyboard.press('Space');
  await expect(toggle).not.toBeChecked();
  await expect(page.getByRole('switch',{name:'비활성 스위치'})).toBeDisabled();
  await expect(page.getByRole('textbox',{name:'이메일 (필수)'})).toHaveAttribute('aria-describedby','email-error');
  await page.getByText('서비스별로 확장할 수 있나요?',{exact:true}).click();
  await expect(page.getByText('도메인 로직은 서비스에 두고 공통 스타일을 가져옵니다.')).toBeVisible();
});

for(const width of [1280,390,320]) {
  test(`four themes fit the ${width}px viewport and preserve data roles`,async({page})=>{
    await page.setViewportSize({width,height:900});
    const errors:string[]=[]; page.on('pageerror',error=>errors.push(error.message));
    for(const brand of ['blue','orange']) for(const dark of [false,true]) {
      await page.getByRole('combobox',{name:'브랜드 테마'}).selectOption(brand);
      await page.getByRole('switch',{name:'다크 모드',exact:true}).setChecked(dark);
      await expect(page.locator('body')).toHaveAttribute('data-brand',brand);
      await expect(page.locator('body')).toHaveAttribute('data-dark',String(dark));
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      const metrics=page.locator('.eds-metric__value');
      expect(await metrics.evaluateAll(nodes=>nodes.every(n=>n.scrollWidth<=n.clientWidth))).toBe(true);
      await page.screenshot({path:`test-results/components-${brand}-${dark?'dark':'light'}-${width}.png`,fullPage:true});
    }
    expect(errors).toEqual([]);
  });
}

test('select picker shares all four themes and keeps native pointer/keyboard selection', async ({ page }) => {
  const select=page.getByRole('combobox',{name:'지역',exact:true});
  await expect(select).toHaveCSS('appearance','base-select');
  await select.click();
  await page.getByRole('option',{name:'부산',exact:true}).click();
  await expect(select).toHaveValue('busan');
  await select.press('Space');
  await page.keyboard.press('Home');
  await page.keyboard.press('Enter');
  await expect(select).toHaveValue('');
  await select.press('Space');
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await expect(select).toHaveValue('busan');
  for(const brand of ['blue','orange']) for(const dark of [false,true]) {
    await page.getByRole('combobox',{name:'브랜드 테마'}).selectOption(brand);
    await page.getByRole('switch',{name:'다크 모드',exact:true}).setChecked(dark);
    await select.click();
    await expect(page.getByRole('option',{name:'서울',exact:true})).toBeVisible();
    const colors=await select.evaluate(node=>({picker:getComputedStyle(node,'::picker(select)').backgroundColor,control:getComputedStyle(node).backgroundColor}));
    expect(colors.picker).toBe(colors.control);
    await page.screenshot({path:`test-results/select-${brand}-${dark?'dark':'light'}.png`});
    await page.keyboard.press('Escape');
    expect(await select.evaluate(node=>node.matches(':open'))).toBe(false);
    await expect(select).toBeFocused();
  }
});


test('navigation and canvas theme adapter share all four themes', async ({page}) => {
  const nav=page.getByRole('navigation',{name:'공통 메뉴 예시'});
  await expect(nav.locator('[aria-current="page"]')).toHaveText('개요');
  await nav.getByRole('link',{name:'월별 추이'}).focus();
  await expect(nav.getByRole('link',{name:'월별 추이'})).toBeFocused();
  for(const brand of ['blue','orange']) for(const dark of [false,true]) {
    await page.getByRole('combobox',{name:'브랜드 테마'}).selectOption(brand);
    await page.getByRole('switch',{name:'다크 모드',exact:true}).setChecked(dark);
    const expected=await page.locator('body').evaluate(node=>getComputedStyle(node).getPropertyValue('--palette-blue').trim());
    await expect(page.locator('[data-chart-theme]')).toHaveAttribute('data-chart-theme',expected);
    await expect(page.getByText(expected,{exact:true})).toHaveCount(0);
    const colors=await page.locator('[data-chart-series]').evaluateAll(nodes=>nodes.map(n=>getComputedStyle(n).color));
    expect(new Set(colors).size).toBe(5);
    const highlight=page.locator('.eds-highlight.eds-data--blue').first();
    const valueColor=await highlight.evaluate(node=>getComputedStyle(node).color);
    expect(valueColor).toBe(colors[0]);
  }
});


test('visual palette documents live tokens and adapts to small screens', async ({page}) => {
  await page.goto('/docs/palette.html');
  for(const width of [1280,390,320]) {
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.getByRole('switch').check();
  await expect(page.locator('body')).toHaveAttribute('data-dark','true');
  await expect(page.locator('[data-token="chart-series-1"]')).toHaveText('#a4c9ff');
  await page.getByRole('combobox',{name:'브랜드'}).selectOption('orange');
  await expect(page.locator('body')).toHaveAttribute('data-brand','orange');
});


test('chart theme observer ignores layout-only style changes and cleans up', async ({page}) => {
  const example=page.locator('[data-theme-observer]');
  await expect(example).toHaveAttribute('data-theme-updates','1');
  await example.evaluate(node => { node.style.width='100%'; node.style.height='auto'; });
  await page.getByRole('switch',{name:'다크 모드',exact:true}).check();
  await expect(example).toHaveAttribute('data-theme-updates','2');
  await expect(page.locator('[data-chart-theme]')).toHaveAttribute('data-chart-theme','#a4c9ff');
});
