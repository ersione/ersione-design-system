// NOT EXECUTED. Starter MCP limit blocked final repair and QA.
// Run on one page per call, supplying PAGE_ID from state.pages.
// Review rendered output before marking the revision ready.
const page=await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);
const mutatedNodeIds=[];
for(const n of page.findAllWithCriteria({types:['TEXT']})){
 let parent=n.parent, inherited=false;
 while(parent&&parent.type!=='PAGE'){if(parent.type==='INSTANCE'){inherited=true;break;}parent=parent.parent;}
 if(inherited)continue; // Repair masters, not every derived instance.
 const fonts=n.fontName===figma.mixed?n.getRangeAllFontNames(0,n.characters.length):[n.fontName];
 for(const font of fonts)await figma.loadFontAsync(font);
 n.textAutoResize='NONE';
 n.textAutoResize='HEIGHT';
 if(n.parent&&'layoutMode' in n.parent&&n.parent.layoutMode!=='NONE')n.layoutSizingVertical='HUG';
 const value=n.characters;n.characters=value;
 mutatedNodeIds.push(n.id);
}
return {mutatedNodeIds,remainingReview:'Screenshot typography, long copy, dialog, table, result rows and all four detail themes. Reflow board positions after height changes.'};
