pipeline {
    agent any
    parameters {
        string(name: 'Executor', defaultValue: '', description: 'Nombre de la persona que ejecuta la pipeline')
        string(name: 'Motivo', defaultValue: '', description: 'Motivo para ejecutar la pipeline')
        string(name: 'ChatID', defaultValue: '', description: 'Chat ID de Telegram para notificaciones')
    }
    tools {
    nodejs 'NodeJS_18'
    }
    stages {
        stage('Peticion de datos') {
            steps {
                script {
                    echo "Executor: ${params.Executor}"
                    echo "Motivo: ${params.Motivo}"
                    echo "Chat ID: ${params.ChatID}"
                }
            }
        }
        stage('Linter') {
            steps {
                script {
                    echo "Running linter..."
                    sh 'npm install'
                    sh 'npx eslint . --ext .js,.jsx || exit 1'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    echo "Running tests..."
                    sh 'npm test'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    echo "Building the project..."
                    sh 'npm run build'
                }
            }
        }
        stage('Update_Readme') {
            steps {
                script {
                    echo "Updating README.md..."
                    // Llama al script y pasa el resultado del Stage "Test"
                    sh 'node jenkinsScripts/updateReadme.js ${currentBuild.currentResult == "FAILURE" ? "failure" : "success"}'
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Pipeline executed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
