# Auditoría de migración de contenidos

Fecha de consulta: 15 de octubre de 2026. Fuentes: HTML de https://economia.uc3m.es/jgonzalo/teaching/TecnicasEconometricas.html, archivo adjunto tecnicas.txt e inventario Excel contrastado por URL.

## Integridad

- Apariciones de enlaces en el HTML: **152**.
- Apariciones trasladadas a src/data/resources.json y enlaces.csv: **152 (100 %)**.
- Destinos únicos: **149**; tres URLs aparecen dos veces cada una, preservadas como apariciones distintas.
- Coincidencia del Excel con el HTML por URL: **152 de 152 filas**, sin destinos faltantes en ninguno.
- Hrefs relativos: resueltos contra la página original. Los 152 destinos son URLs absolutas.
- PDFs, presentaciones, software, bases de datos y enlaces externos: permanecen en su ubicación original; no se copiaron documentos docentes a GitHub.
- El texto extraído se conserva en site/contenido-original.txt y en la sección desplegable de la web. Cada enlace también está en el catálogo buscable.

## Contenido conservado

Se mantienen los 17 bloques del inventario: noticias y avisos; organización; proyecto; herramientas y fuentes; datos de ejemplo; recursos complementarios; introducción; entrega 0; series y ARMA; inferencia; predicción; autocorrelación; modelos dinámicos; raíces unitarias; cointegración; bibliografía y 26 soluciones históricas de exámenes. Los avisos de evaluación, asistencia, requisitos, fechas y controles se encuentran en la transcripción original. Los marcadores xxx se conservan literalmente.

## Verificación HTTP (HEAD, 149 destinos únicos)

- **135** respondieron 200.
- **7** respondieron 403 (el servidor bloqueó la comprobación automática): IMF Data, EViews (3 URLs), Coursera, BrainyQuote y Macrotrends.
- **5** respondieron 404: ShillerYearlyData.wf1, SpuriousRegressionGranger.prg, simulation.prg, ExamJanuary2018Solutions.pdf y el curso antiguo de edX. Se conservan todos los destinos originales.
- **2** no pudieron verificarse: math.uah.edu agotó el tiempo de espera y Eurostat falló por certificado TLS del comprobador.

El detalle por URL está en link-check.csv. Un 403 o un error TLS/timeout no demuestra que el recurso esté caído; los 404 son respuestas observadas y podrían corresponder a recursos retirados.

## Duplicados e incidencias

- Hay 3 URLs repetidas (6 apariciones), conservadas con IDs y posiciones distintas.
- El HTML adjunto incluye estilos y nodos de extensiones del navegador. La extracción del texto excluyó scripts y estilos; los enlaces se cotejaron con la página descargada y el Excel.
- Parte del texto fuente ya contiene caracteres de reemplazo y errores ortográficos. Los avisos se preservan sin reescritura.
- La auditoría de representación no implica que todos los servidores externos sigan operativos. La verificación HTTP se registrará después de la comprobación.

## Reproducción

npm run audit valida cantidades, IDs, destinos absolutos, resolución de hrefs y transcripción. npm run build ejecuta la auditoría y genera dist/.
