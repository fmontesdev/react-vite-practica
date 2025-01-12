// updateReadme.js
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readmePath = join(__dirname, '..', 'README.md');

const failureBadge = '![Tests](https://img.shields.io/badge/test-failure-red)';
const successBadge = '![Tests](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)';
const testResult = process.argv[2];
const marker = 'RESULTADO DE LOS ÚLTIMOS TESTS:';

// Contenido inicial si el archivo no existe
const initialContent = `# Jenkins Tests
${marker}
`;

// Crear README.md si no existe
if (!existsSync(readmePath)) {
    writeFileSync(readmePath, initialContent, 'utf-8');
    console.log('README.md creado con el contenido inicial.');
}

let readmeContent = readFileSync(readmePath, 'utf-8');

// Agregar marcador si no existe
if (!readmeContent.includes(marker)) {
    readmeContent = `${readmeContent}\n\n${marker}`;
    writeFileSync(readmePath, readmeContent, 'utf-8');
    console.log('Marcador agregado a README.md');
}

const markerIndex = readmeContent.indexOf(marker);
const beforeMarker = readmeContent.substring(0, markerIndex + marker.length);
const afterMarker = `\n\n${testResult === 'failure' ? failureBadge : successBadge}`;
readmeContent = beforeMarker + afterMarker;

writeFileSync(readmePath, readmeContent, 'utf-8');
console.log('README.md actualizado correctamente.');
