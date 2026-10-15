import { cpSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
execFileSync(process.execPath,['scripts/audit.mjs'],{stdio:'inherit'});
rmSync('dist',{recursive:true,force:true});
mkdirSync('dist',{recursive:true});
for(const f of ['index.html','styles.css','app.js','favicon.svg','contenido-original.txt'])copyFileSync('site/'+f,'dist/'+f);
cpSync('src/data','dist/data',{recursive:true});
copyFileSync('enlaces.csv','dist/enlaces.csv');
console.log('Sitio estático compilado en dist/.');
