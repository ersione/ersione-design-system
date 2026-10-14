import { build } from 'esbuild';
await build({entryPoints:['examples/react/index.tsx'],bundle:true,format:'esm',outfile:'examples/react/app.js',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'}});
console.log('Built React component playground.');
