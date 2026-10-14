import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const tokens=JSON.parse(fs.readFileSync(path.join(root,'tokens/tokens.json'),'utf8'));
const lum=hex=>{const rgb=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722};
const contrast=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
for(const [name,t] of Object.entries(tokens.themes)){
 for(const [a,b] of [['text','surface'],['muted','surface'],['accent','surface'],['status-success-fg','status-success-bg'],['status-warning-fg','status-warning-bg'],['status-error-fg','status-error-bg'],['data-salary','surface'],['data-people','surface'],['data-flow','surface'],['chart-series-4','surface'],['chart-series-5','surface'],['data-primary','surface'],['data-primary','data-primary-tint'],['data-joiners','surface'],['data-departures','surface'],['chart-tooltip-fg','chart-tooltip-bg'],['control-check','accent']]){
  const ratio=contrast(t[a],t[b]);if(ratio<4.5)throw Error(`${name}: ${a}/${b} contrast ${ratio.toFixed(2)}`);
 }
}
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
for(const [,code] of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(code);
for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
 if(/^(https?:|data:|#)/.test(url))continue;
 if(!fs.existsSync(path.join(root,'dist',url)))throw Error('Missing local asset: '+url);
}
if(/company-lens\.html|125,843|6,737|370248/.test(html))throw Error('Service prototype data leaked into public showcase');
console.log('PASS: 4 theme text/state/data/action contrast pairs, inline JS syntax, local assets, showcase scope.');
