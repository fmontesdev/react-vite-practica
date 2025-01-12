import { execSync } from 'child_process';

const executor = process.argv[2]; // Nombre del ejecutor (PARAM_EXECUTOR)
const motivo = process.argv[3]; // Motivo de la ejecución (PARAM_MOTIVO)
const gitToken = process.env.GIT_TOKEN; // Token proporcionado por Jenkins
const commitMessage = `Pipeline ejecutada por ${executor}. Motivo: ${motivo}`;

try {
    // Configura el usuario de Git
    execSync('git config user.name "fmontesdev"');
    execSync('git config user.email "f.montesdoria@gmail.com"');

    // Añade los cambios y haz commit
    execSync('git add README.md');
    execSync(`git commit -m "${commitMessage}"`);

    // Haz push de los cambios al repositorio remoto
    execSync(`git push https://token:${gitToken}@github.com/fmontesdev/react-vite-practica.git HEAD:ci_jenkins`);
    console.log('Changes pushed successfully.');
} catch (error) {
    console.error('Error en el push:', error);
    process.exit(1);
}
