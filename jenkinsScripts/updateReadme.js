import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);
const readmePath = join(currentDirname, '..', 'README.md');

const failureBadge = '![Tests](https://img.shields.io/badge/test-failure-red)';
const successBadge = '![Tests](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)';
const testResult = process.argv[2];
const marker = 'RESULTADO DE LOS ÚLTIMOS TESTS:';

const initialContent = `# Jenkins Tests
${marker}
`;

if (!existsSync(readmePath)) {
    writeFileSync(readmePath, initialContent, 'utf-8');
}

let readmeContent = readFileSync(readmePath, 'utf-8');

if (!readmeContent.includes(marker)) {
    readmeContent = `${readmeContent}\n\n${marker}`;
    writeFileSync(readmePath, readmeContent, 'utf-8');
}

const markerIndex = readmeContent.indexOf(marker);
const beforeMarker = readmeContent.substring(0, markerIndex + marker.length);
const afterMarker = `\n\n${testResult === 'failure' ? failureBadge : successBadge}`;
readmeContent = beforeMarker + afterMarker;

writeFileSync(readmePath, readmeContent, 'utf-8');
