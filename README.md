# Técnicas Econométricas UC3M · 2026–2027

Portal estático no oficial de consulta para la asignatura de Jesús Gonzalo. Los documentos permanecen en sus servidores de origen; la web conserva los 152 enlaces y todas sus apariciones contextuales.

## Desarrollo local

Requiere Node.js 20 o superior. No hay dependencias externas de npm.

Ejecuta npm run audit y npm run build.

Sirve el directorio dist/ con un servidor estático local para probar la página.

## Actualizar materiales

1. Añade cada nueva aparición a src/data/resources.json con id, title, label, url absoluta de origen, category, format, topic, description, source, position, context, filename, anchor (href tal como aparece en origen) y duplicate.
2. Mantén enlaces.csv en sincronía con el JSON y usa IDs únicos. No descargues documentos de UC3M: enlaza la ubicación original.
3. Ejecuta npm run audit y npm run build; envía los cambios a main. GitHub Actions publica automáticamente dist/ en Pages.

La navegación por bloques está en site/app.js; los estilos y la estructura están en site/styles.css y site/index.html. La transcripción original está en site/contenido-original.txt.

## Fuentes

- Página docente original: https://economia.uc3m.es/jgonzalo/teaching/TecnicasEconometricas.html
- tecnicas.txt y el Excel de inventario facilitados para esta migración
- enlaces.csv, inventario generado desde el HTML
