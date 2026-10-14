import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const packageInfo=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const tokens=JSON.parse(fs.readFileSync(path.join(root,'tokens/tokens.json'),'utf8'));
const declaration=(entries)=>Object.entries(entries).map(([k,v])=>`  --${k}: ${v};`).join('\n');
let css='/* Generated from tokens/tokens.json. Do not edit by hand. */\n';
for(const [name,values] of Object.entries(tokens.themes)){
 const [brand,mode]=name.split('-');
 css+=`.app[data-brand="${brand}"][data-dark="${mode==='dark'}"],\n.eds-theme[data-brand="${brand}"][data-dark="${mode==='dark'}"] {\n${declaration(values)}\n}\n`;
}
css+=':root {\n'+declaration(Object.fromEntries(Object.entries(tokens.space).map(([k,v])=>['space-'+k,v+'px'])))+'\n';
css+=declaration(Object.fromEntries(Object.entries(tokens.radius).map(([k,v])=>['radius-'+k,v+'px'])))+'\n}\n';
fs.writeFileSync(path.join(root,'tokens/tokens.css'),css);
fs.mkdirSync(path.join(root,'dist'),{recursive:true});
fs.writeFileSync(path.join(root,'dist/index.html'),fs.readFileSync(path.join(root,'showcase/index.html'),'utf8').replaceAll('__PACKAGE_VERSION__',packageInfo.version));
fs.copyFileSync(path.join(root,'tokens/tokens.css'),path.join(root,'dist/tokens.css'));
for(const dir of ['assets','tokens'])fs.cpSync(path.join(root,dir),path.join(root,'dist',dir),{recursive:true});
fs.mkdirSync(path.join(root,'dist/docs'),{recursive:true});
const text=fs.readFileSync(path.join(root,'docs/USAGE.md'),'utf8');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
fs.writeFileSync(path.join(root,'dist/docs/usage.html'),`<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ersione v${packageInfo.version} 사용 규칙</title><style>body{font-family:system-ui,sans-serif;max-width:900px;margin:40px auto;padding:0 24px;line-height:1.9;color:#182235}pre{white-space:pre-wrap;font:inherit}a{color:#2563eb}</style><a href="../index.html">← 쇼케이스</a><pre>${escape(text)}</pre></html>`);
console.log('Built four token themes and static showcase.');

fs.copyFileSync(path.join(root,'styles.css'),path.join(root,'dist/styles.css'));
fs.copyFileSync(path.join(root,'docs/palette.html'),path.join(root,'dist/docs/palette.html'));
