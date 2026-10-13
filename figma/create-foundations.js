/**
 * createVariableCollection
 *
 * Creates a new Figma variable collection with the specified name and modes.
 * If `modeNames` has more than one entry, the first mode is renamed from
 * Figma's default "Mode 1" to the first name, and additional modes are added.
 *
 * @param {string} name - The display name of the collection (e.g. "Color", "Spacing").
 * @param {string[]} modeNames - Ordered list of mode names (e.g. ["Light", "Dark"] or ["Value"]).
 * @returns {Promise<{
 *   collection: VariableCollection,
 *   modeIds: Record<string, string>
 * }>}
 *   `modeIds` maps each mode name to its modeId string.
 */
async function createVariableCollection(name, modeNames) {
  if (!modeNames || modeNames.length === 0) {
    throw new Error('createVariableCollection: modeNames must have at least one entry.')
  }

  // Create the collection — Figma always creates it with one mode named "Mode 1".
  const collection = figma.variables.createVariableCollection(name)

  // modeIds accumulator
  const modeIds = {}

  // Rename the default first mode
  const defaultMode = collection.modes[0]
  collection.renameMode(defaultMode.modeId, modeNames[0])
  modeIds[modeNames[0]] = defaultMode.modeId

  // Add additional modes
  for (let i = 1; i < modeNames.length; i++) {
    const newModeId = collection.addMode(modeNames[i])
    modeIds[modeNames[i]] = newModeId
  }

  return { collection, modeIds }
}

const TOKENS={"version": "0.1.0", "brand": {"blue": "#3b82f6", "orange": "#ff6900", "symbol-bg": "#111111"}, "themes": {"blue-light": {"bg": "#f6f8fc", "surface": "#ffffff", "text": "#182235", "muted": "#526178", "line": "#e1e7f0", "control-border": "#94a3b8", "control-check": "#ffffff", "disabled-bg": "#edf1f6", "disabled-fg": "#718096", "status-success-bg": "#e5f4ec", "status-success-fg": "#166044", "status-warning-bg": "#fff3d3", "status-warning-fg": "#765000", "status-error-bg": "#ffebed", "status-error-fg": "#ab2637", "status-neutral-bg": "#eaf0f8", "status-neutral-fg": "#344b70", "data-salary": "#146b65", "data-salary-tint": "#e6f4f0", "data-people": "#2b609f", "data-people-tint": "#eaf2ff", "data-flow": "#94600e", "data-flow-tint": "#fff3dc", "accent": "#2563eb", "tint": "#edf3ff"}, "orange-light": {"bg": "#f6f8fc", "surface": "#ffffff", "text": "#182235", "muted": "#526178", "line": "#e1e7f0", "control-border": "#94a3b8", "control-check": "#ffffff", "disabled-bg": "#edf1f6", "disabled-fg": "#718096", "status-success-bg": "#e5f4ec", "status-success-fg": "#166044", "status-warning-bg": "#fff3d3", "status-warning-fg": "#765000", "status-error-bg": "#ffebed", "status-error-fg": "#ab2637", "status-neutral-bg": "#eaf0f8", "status-neutral-fg": "#344b70", "data-salary": "#146b65", "data-salary-tint": "#e6f4f0", "data-people": "#2b609f", "data-people-tint": "#eaf2ff", "data-flow": "#94600e", "data-flow-tint": "#fff3dc", "accent": "#b84300", "tint": "#fff0e5"}, "blue-dark": {"bg": "#101620", "surface": "#192231", "text": "#edf2fa", "muted": "#acb9cd", "line": "#344258", "control-border": "#8292aa", "control-check": "#101c32", "disabled-bg": "#253142", "disabled-fg": "#9aa9bd", "status-success-bg": "#223f34", "status-success-fg": "#b6efd0", "status-warning-bg": "#44381c", "status-warning-fg": "#f6d98c", "status-error-bg": "#482b34", "status-error-fg": "#ffbac6", "status-neutral-bg": "#30425c", "status-neutral-fg": "#d8e5fa", "data-salary": "#8bdfd0", "data-salary-tint": "#203c39", "data-people": "#a4c9ff", "data-people-tint": "#253950", "data-flow": "#f0cb81", "data-flow-tint": "#403725", "accent": "#93b4ff", "tint": "#243858"}, "orange-dark": {"bg": "#101620", "surface": "#192231", "text": "#edf2fa", "muted": "#acb9cd", "line": "#344258", "control-border": "#8292aa", "control-check": "#101c32", "disabled-bg": "#253142", "disabled-fg": "#9aa9bd", "status-success-bg": "#223f34", "status-success-fg": "#b6efd0", "status-warning-bg": "#44381c", "status-warning-fg": "#f6d98c", "status-error-bg": "#482b34", "status-error-fg": "#ffbac6", "status-neutral-bg": "#30425c", "status-neutral-fg": "#d8e5fa", "data-salary": "#8bdfd0", "data-salary-tint": "#203c39", "data-people": "#a4c9ff", "data-people-tint": "#253950", "data-flow": "#f0cb81", "data-flow-tint": "#403725", "accent": "#ffb580", "tint": "#483025"}}, "space": {"0": 0, "1": 4, "2": 8, "3": 12, "4": 16, "5": 20, "6": 24, "8": 32, "10": 40, "12": 48}, "radius": {"sm": 8, "md": 10, "lg": 12, "card": 16, "dialog": 20, "pill": 999}, "control": {"sm": 32, "md": 40, "lg": 48, "check": 20, "switch-width": 44, "switch-height": 26}, "type": {"family": "Noto Sans KR", "caption": 12, "label": 13, "body": 14, "reading": 16, "title": 20, "heading": 32, "display": 40, "weight-regular": 400, "weight-medium": 500, "weight-semibold": 600, "weight-bold": 700}, "elevation": {"card-light": "0 7px 24px #23334b0b", "card-dark": "0 7px 24px #00000026", "menu-light": "0 12px 36px #0d20332b", "menu-dark": "0 14px 38px #00000077"}};

const ids=[];const hex=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
function text(parent,value,size=14,color='#182235',bold=false){const n=figma.createText();n.fontName={family:'Noto Sans KR',style:bold?'Bold':'Regular'};n.characters=value;n.fontSize=size;n.fills=[{type:'SOLID',color:hex(color)}];parent.appendChild(n);ids.push(n.id);return n}
function frame(parent,name,w,bg='#ffffff'){const n=figma.createAutoLayout('VERTICAL');n.name=name;n.resize(w,100);n.layoutSizingHorizontal='FIXED';n.paddingTop=24;n.paddingBottom=24;n.paddingLeft=24;n.paddingRight=24;n.itemSpacing=16;n.fills=[{type:'SOLID',color:hex(bg)}];n.cornerRadius=16;parent.appendChild(n);ids.push(n.id);return n}
await figma.loadFontAsync({family:'Noto Sans KR',style:'Regular'});await figma.loadFontAsync({family:'Noto Sans KR',style:'Bold'});

const page=await figma.getNodeByIdAsync('0:1');await figma.setCurrentPageAsync(page);page.name='01 Foundations';
const existing=await figma.variables.getLocalVariableCollectionsAsync();if(existing.some(c=>c.name==='Ersione Primitives'))return {alreadyBuilt:true,pages:figma.root.children.map(p=>({id:p.id,name:p.name}))};
const primitives=await createVariableCollection('Ersione Primitives',['Value']);const vars={},prims={};
for(const value of new Set([...Object.values(TOKENS.brand),...Object.values(TOKENS.themes).flatMap(o=>Object.values(o))])){const v=figma.variables.createVariable('color/'+value.slice(1),primitives.collection,'COLOR');v.setValueForMode(primitives.modeIds.Value,{...hex(value),a:1});v.scopes=[];v.setVariableCodeSyntax('WEB','var(--primitive-'+value.slice(1)+')');prims[value]=v.id;}
const collections={primitives:primitives.collection.id};
for(const [theme,values] of Object.entries(TOKENS.themes)){const c=await createVariableCollection('Ersione '+theme,['Value']);collections[theme]=c.collection.id;vars[theme]={};for(const [name,value]of Object.entries(values)){const v=figma.variables.createVariable(name,c.collection,'COLOR');v.setValueForMode(c.modeIds.Value,{type:'VARIABLE_ALIAS',id:prims[value]});v.scopes=name==='line'||name==='control-border'?['STROKE_COLOR']:name.includes('bg')||name.includes('tint')||name==='surface'?['FRAME_FILL','SHAPE_FILL']:['TEXT_FILL','FRAME_FILL','SHAPE_FILL'];v.setVariableCodeSyntax('WEB','var(--'+name+')');vars[theme][name]=v.id;}}
const geometry=await createVariableCollection('Ersione Geometry',['Value']);collections.geometry=geometry.collection.id;vars.geometry={};for(const [group,values]of Object.entries({space:TOKENS.space,radius:TOKENS.radius,control:TOKENS.control})){for(const [name,value]of Object.entries(values)){const key=group+'/'+name;const v=figma.variables.createVariable(key,geometry.collection,'FLOAT');v.setValueForMode(geometry.modeIds.Value,value);v.scopes=group==='radius'?['CORNER_RADIUS']:group==='space'?['GAP']:['WIDTH_HEIGHT'];v.setVariableCodeSyntax('WEB','var(--'+group+'-'+name+')');vars.geometry[key]=v.id;}}
const styles={};for(const [role,size]of Object.entries({Caption:12,Label:13,Body:14,Reading:16,Title:20,Heading:32,Display:40})){const st=figma.createTextStyle();st.name='Ersione/'+role;st.fontName={family:'Noto Sans KR',style:role==='Heading'||role==='Display'||role==='Title'?'Bold':'Regular'};st.fontSize=size;st.lineHeight={unit:'PERCENT',value:role==='Reading'?185:150};styles[role]=st.id;}
for(const dark of [false,true]){const effect=figma.createEffectStyle();effect.name='Ersione/Card/'+(dark?'Dark':'Light');effect.effects=[{type:'DROP_SHADOW',color:{r:0.13,g:0.2,b:0.29,a:dark?.15:.043},offset:{x:0,y:7},radius:24,spread:0,visible:true,blendMode:'NORMAL'}];styles['Shadow'+(dark?'Dark':'Light')]=effect.id;}
const cover=frame(page,'Ersione v0.1 / Foundations',1360);cover.x=100;cover.y=100;text(cover,'Ersione Design System',40,'#182235',true);text(cover,'v0.1 · Clear & Soft · Noto Sans KR',20);text(cover,'Blue / Orange × Light / Dark · 기존 심볼 유지 · 토큰 JSON이 원본',14);text(cover,'브랜드 / 상태 / 데이터 색상을 분리합니다. 카드·통합 패널·표·본문을 상황에 맞게 사용합니다.',14);
for(const [theme,values]of Object.entries(TOKENS.themes)){const strip=frame(cover,theme,1312,values.bg);text(strip,theme,20,values.text,true);const row=figma.createAutoLayout('HORIZONTAL');row.itemSpacing=16;row.fills=[];strip.appendChild(row);ids.push(row.id);for(const key of ['accent','text','surface','data-salary','data-people','data-flow']){const tile=frame(row,key,190,values.surface);const sw=figma.createRectangle();sw.resize(142,44);sw.cornerRadius=8;sw.fills=[{type:'SOLID',color:hex(values[key])}];tile.appendChild(sw);ids.push(sw.id);text(tile,key,12,values.muted);text(tile,values[key],14,values.text,true);}}
const symbol=figma.createNodeFromSvg("<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"20\" fill=\"#111111\"/><polyline points=\"22,35 42,50 22,65\" fill=\"none\" stroke=\"#3b82f6\" stroke-width=\"12\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M 52,30 V 70 H 75\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"12\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"86\" cy=\"68\" r=\"6\" fill=\"#ff6900\"/></svg>");cover.appendChild(symbol);symbol.resize(64,64);ids.push(symbol.id);
const components=figma.createPage();components.name='02 Components';const apps=figma.createPage();apps.name='03 Applications';
return {pages:{foundations:page.id,components:components.id,applications:apps.id},variables:vars,collections,styles,createdNodeIds:ids,primitiveCount:Object.keys(prims).length,semanticCount:Object.values(vars).reduce((n,o)=>n+Object.keys(o).length,0),coverId:cover.id};
