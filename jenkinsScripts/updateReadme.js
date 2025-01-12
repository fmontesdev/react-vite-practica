// updateReadme.js
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta al archivo README.md
const readmePath = join(__dirname, '..', 'README.md');

// Badges
const failureBadge = '![Tests](https://img.shields.io/badge/test-failure-red)';
const successBadge = '![Tests](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)';

// Resultado de los tests (recibido como argumento)
const testResult = process.argv[2]; // 'failure' o 'success'

// Lee el archivo README.md
let readmeContent = readFileSync(readmePath, 'utf-8');

// Busca el marcador donde se insertará el badge
const marker = 'RESULTADO DE LOS ÚLTIMOS TESTS:';
const markerIndex = readmeContent.indexOf(marker);

if (markerIndex !== -1) {
    // Reemplaza el contenido después del marcador con el badge correspondiente
    const beforeMarker = readmeContent.substring(0, markerIndex + marker.length);
    const afterMarker = `\n\n${testResult === 'failure' ? failureBadge : successBadge}`;
    readmeContent = beforeMarker + afterMarker;

    // Escribe los cambios en el archivo README.md
    writeFileSync(readmePath, readmeContent, 'utf-8');
    console.log('README.md actualizado correctamente.');
} else {
    console.error('No se encontró el marcador en README.md.');
    process.exit(1);
}
