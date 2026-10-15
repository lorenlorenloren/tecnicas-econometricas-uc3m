const BASE='./';
const mainSections=[
 {id:'temario',title:'Temario y apuntes',categories:['Programa y organización','Introducción','Series y ARMA inicial','ARMA e inferencia','Predicción y evaluación','Regresión con autocorrelación','Modelos dinámicos','Raíces unitarias','Cointegración y regresión espuria','Bibliografía complementaria']},
 {id:'practicas',title:'Prácticas y ejercicios',categories:['Entrega 0','Series y ARMA inicial','ARMA e inferencia','Predicción y evaluación','Regresión con autocorrelación','Modelos dinámicos']},
 {id:'examenes',title:'Exámenes',categories:['Exámenes resueltos']},
 {id:'proyecto',title:'Proyecto empírico',categories:['Proyecto empírico','Datos de ejemplo']},
 {id:'herramientas',title:'Herramientas y recursos',categories:['Herramientas y fuentes','Otros recursos','Noticias y avisos']}
];
const normal=s=>(s||'').toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let resources=[],query='',category='',format='';
const $=id=>document.getElementById(id);
function groupFor(cat){for(const group of mainSections)if(group.categories.includes(cat))return group.title;return 'Otros materiales'}
function isPractice(r){return r.category==='Entrega 0'||/pr[aá]ctica|problem\s*set|problemset|ejercicio|exercise/i.test([r.title,r.filename].join(' '))}
function card(r){return '<article class="resource-card"><span class="format-badge">'+safe(r.format)+'</span><div class="resource-info"><h3>'+safe(r.title)+'</h3><p>'+safe(r.filename||r.url)+'</p><div class="resource-tags"><span>'+safe(r.category)+'</span><span>'+safe(r.topic)+'</span>'+(r.duplicate?'<span>Aparición repetida</span>':'')+'</div></div><a class="resource-open" href="'+safe(r.url)+'" target="_blank" rel="noopener noreferrer" aria-label="Abrir '+safe(r.title)+' en una pestaña nueva">Abrir recurso <span aria-hidden="true">↗</span></a></article>'}
function sectionItems(group){return resources.filter(r=>group.categories.includes(r.category)&&(group.id==='practicas'?isPractice(r):group.id==='temario'?!isPractice(r):true))}
function sectionMarkup(group){const items=sectionItems(group);const cats=[...new Set(items.map(r=>r.category))];return '<section class="section-wrap course-section" id="'+group.id+'"><div class="section-heading"><div><p class="eyebrow">Bloque del curso</p><h2>'+safe(group.title)+'</h2></div><a class="text-link" href="#recursos">Ver catálogo y filtros <span aria-hidden="true">→</span></a></div>'+cats.map(c=>'<div class="course-category"><h3>'+safe(c)+'</h3><div class="resource-list">'+items.filter(r=>r.category===c).map(card).join('')+'</div></div>').join('')+'</section>'}
function render(){
 const filtered=resources.filter(r=>{const searchable=normal([r.title,r.label,r.filename,r.description,r.category,r.topic,r.format,r.url].join(' '));return (!query||searchable.includes(normal(query)))&&(!category||r.category===category)&&(!format||r.format===format)});
 $('resource-list').innerHTML=filtered.map(card).join('');
 $('result-count').textContent='Mostrando '+filtered.length+' de '+resources.length+' apariciones';
 $('empty-state').hidden=filtered.length>0;
 $('resource-list').hidden=filtered.length===0;
 $('active-filters').innerHTML=[category,format].filter(Boolean).map(x=>'<span>'+safe(x)+'</span>').join('');
}
function init(){
 fetch(BASE+'data/resources.json').then(r=>r.json()).then(data=>{
 resources=data;
 const cats=[...new Set(resources.map(r=>r.category))],formats=[...new Set(resources.map(r=>r.format))].sort();
 for(const c of cats){const o=document.createElement('option');o.value=c;o.textContent=c;$('category').append(o)}
 for(const f of formats){const o=document.createElement('option');o.value=f;o.textContent=f;$('format').append(o)}
 const counts={};for(const r of resources)counts[r.category]=(counts[r.category]||0)+1;
 const stats=[['152','enlaces originales'],[String(new Set(resources.map(r=>r.url)).size),'destinos únicos'],[String(resources.filter(r=>r.format==='PDF').length),'documentos PDF'],[String(counts['Exámenes resueltos']||0),'soluciones de exámenes']];
 $('stats').innerHTML=stats.map(x=>'<div class="stat"><strong>'+x[0]+'</strong><span>'+x[1]+'</span></div>').join('');
 $('group-cards').innerHTML=mainSections.map(g=>{const n=sectionItems(g).length;return '<a class="group-card" href="#'+g.id+'" data-categories="'+safe(g.categories.join('|'))+'"><h3>'+safe(g.title)+'</h3><p>'+safe(g.categories.slice(0,3).join(' · '))+(g.categories.length>3?' · …':'')+'</p><span class="group-meta">'+n+' recursos <span aria-hidden="true">→</span></span></a>'}).join('');
 $('course-sections').innerHTML=mainSections.map(sectionMarkup).join('');
 $('original-content').textContent='';fetch(BASE+'contenido-original.txt').then(r=>r.text()).then(t=>$('original-content').textContent=t);
 render();
 }).catch(()=>{$('result-count').textContent='No se pudo cargar el catálogo. Vuelve a cargar la página.'});
}
$('search').addEventListener('input',e=>{query=e.target.value;render()});
$('category').addEventListener('change',e=>{category=e.target.value;render()});
$('format').addEventListener('change',e=>{format=e.target.value;render()});
function clear(){query='';category='';format='';$('search').value='';$('category').value='';$('format').value='';render()}
$('clear-filters').addEventListener('click',clear);$('empty-clear').addEventListener('click',clear);
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();$('search').focus()}});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('.main-nav a').forEach(n=>n.classList.remove('active'));a.classList.add('active')}));
init();
