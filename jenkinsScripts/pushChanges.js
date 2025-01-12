import { execSync } from 'child_process';
import process from 'process';

const executor = process.argv[2]; // Nombre del ejecutor (PARAM_EXECUTOR)
const motivo = process.argv[3]; // Motivo de la ejecución (PARAM_MOTIVO)
const gitToken = process.env.GIT_TOKEN; // Token proporcionado por Jenkins

// Mensaje del commit
const commitMessage = `Pipeline ejecutada por ${executor}. Motivo: ${motivo}`;

// URL del repositorio con token
const repoUrl = `https://token:${gitToken}@github.com/owner/repo.git`;

try {
    // Asegurarse de estar en la rama `ci_jenkins`
    execSync('git checkout ci_jenkins', { stdio: 'inherit' });

    // Configurar el usuario y correo de Git
    execSync('git config user.name "Jenkins Bot"', { stdio: 'inherit' });
    execSync('git config user.email "jenkins@pipeline.com"', { stdio: 'inherit' });

    // Agregar el archivo README.md al commit
    execSync('git add README.md', { stdio: 'inherit' });

    // Crear el commit con el mensaje proporcionado
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

    // Hacer push de los cambios al repositorio remoto
    execSync(`git push ${repoUrl}`, { stdio: 'inherit' });

    console.log('Cambios realizados y subidos correctamente.');
} catch (error) {
    console.error('Error al realizar los cambios:', error.message);
    process.exit(1);
}
