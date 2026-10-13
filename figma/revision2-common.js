// Shared builders for the v0.1 Figma reconciliation. Inject STATE and TOKENS first.
const created=[],mutated=[],removed=[];
await figma.loadFontAsync({family:'Noto Sans KR',style:'Regular'});
await figma.loadFontAsync({family:'Noto Sans KR',style:'Medium'});
await figma.loadFontAsync({family:'Noto Sans KR',style:'Bold'});
const V={};for(const [theme,map]of Object.entries(STATE.variables)){V[theme]={};for(const [name,id]of Object.entries(map))V[theme][name]=await figma.variables.getVariableByIdAsync(id);}
const rgb=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
function paint(theme,key){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',V[theme][key]);}
function solid(h){return [{type:'SOLID',color:rgb(h)}];}
function bindRadius(n,key='radius/card'){for(const p of ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'])n.setBoundVariable(p,V.geometry[key]);}
function remember(n){created.push(n.id);return n;}
function clear(n){for(const child of [...n.children]){removed.push(child.id);child.remove();}mutated.push(n.id);}
function layout(parent,name,width,theme='blue-light',direction='VERTICAL',fill='surface',padding=24,gap=16){const f=remember(figma.createAutoLayout(direction));f.name=name;f.resize(width,100);f.layoutSizingHorizontal='FIXED';f.layoutSizingVertical='HUG';f.paddingLeft=f.paddingRight=f.paddingTop=f.paddingBottom=padding;f.itemSpacing=gap;f.fills=fill?[paint(theme,fill)]:[];bindRadius(f);parent.appendChild(f);return f;}
function text(parent,value,width,theme='blue-light',role='Body',color='text',bold=false){const n=remember(figma.createText());n.name=value.slice(0,70);n.fontName={family:'Noto Sans KR',style:bold?'Bold':'Regular'};n.characters=value;n.textStyleId=STATE.styles[role];if(bold)n.fontName={family:'Noto Sans KR',style:'Bold'};n.textAutoResize='HEIGHT';n.resize(width,20);n.layoutSizingHorizontal='FIXED';n.fills=[paint(theme,color)];parent.appendChild(n);return n;}
function row(parent,name,width,theme='blue-light',gap=16,padding=0,fill=null){return layout(parent,name,width,theme,'HORIZONTAL',fill,padding,gap);}
function rule(parent,width,theme='blue-light'){const n=remember(figma.createRectangle());n.name='Divider';n.resize(width,1);n.fills=[paint(theme,'line')];parent.appendChild(n);return n;}
function labelProp(c,n,name='Label'){const key=c.addComponentProperty(name,'TEXT',n.characters);n.componentPropertyReferences={characters:key};return key;}
function expose(c,n,name='Label'){const owner=c.parent?.type==='COMPONENT_SET'?c.parent:c;const existing=Object.entries(owner.componentPropertyDefinitions).find(([k,v])=>v.type==='TEXT'&&k.split('#')[0]===name);const key=existing?existing[0]:owner.addComponentProperty(name,'TEXT',n.characters);n.componentPropertyReferences={characters:key};return key;}
function resetComponent(c,theme,w,h,vertical=false){clear(c);c.resize(w,h);c.layoutMode=vertical?'VERTICAL':'HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';c.primaryAxisAlignItems='MIN';c.counterAxisAlignItems='MIN';c.paddingLeft=c.paddingRight=16;c.paddingTop=c.paddingBottom=12;c.itemSpacing=12;c.fills=[paint(theme,'surface')];c.strokes=[paint(theme,'line')];bindRadius(c,'radius/md');}
async function setOf(family,theme){return await figma.getNodeByIdAsync(STATE.components[family+'/'+theme]);}
async function instance(parent,family,theme='blue-light',match=null,width=null){const set=await setOf(family,theme);const c=match?set.children.find(n=>Object.entries(match).every(([k,v])=>n.name.split(', ').includes(k+'='+v))):set.children[0];if(!c)throw Error('Variant not found: '+family+' '+JSON.stringify(match));const n=remember(c.createInstance());parent.appendChild(n);if(width)n.resize(width,n.height);return n;}
function overrideLabel(inst,value,name='Label'){const entries=Object.entries(inst.componentProperties);const found=entries.find(([key,p])=>p.type==='TEXT'&&key.split('#')[0]===name);if(found)inst.setProperties({[found[0]]:value});else{const t=inst.findAllWithCriteria({types:['TEXT']})[0];if(t){t.characters=value;mutated.push(t.id);}}}
function board(parent,name,width,theme='blue-light'){const f=layout(parent,name,width,theme,'VERTICAL','bg',32,24);return f;}
function title(parent,kicker,heading,description,width=1136,theme='blue-light'){text(parent,kicker,width,theme,'Caption','accent',true);text(parent,heading,width,theme,'Heading');if(description)text(parent,description,width,theme,'Body','muted');}
function pill(parent,s,theme='blue-light',fg='accent',bg='tint'){const f=layout(parent,'Badge '+s,170,theme,'HORIZONTAL',bg,8,0);f.resize(170,32);f.layoutSizingVertical='FIXED';f.primaryAxisAlignItems='CENTER';f.counterAxisAlignItems='CENTER';bindRadius(f,'radius/pill');text(f,s,150,theme,'Caption',fg,true);return f;}
function section(parent,name,width,theme='blue-light'){const f=layout(parent,name,width,theme,'VERTICAL','surface',24,18);text(f,name,width-48,theme,'Title');return f;}
function auditText(root){const bad=[];for(const n of root.findAllWithCriteria({types:['TEXT']})){if(n.width<1||n.height<1)bad.push({id:n.id,reason:'zero-size'});if(n.parent&&n.parent.type!=='PAGE'&&n.x+n.width>n.parent.width+2)bad.push({id:n.id,reason:'horizontal-overflow',name:n.name});}return bad;}
