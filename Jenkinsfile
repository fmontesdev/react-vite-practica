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
                    sh 'npx eslint . --ext .js,.jsx --ignore-path .eslintignore || exit 1'
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
                    def buildResult = currentBuild.currentResult == 'FAILURE' ? 'failure' : 'success'
                    echo "Test Result Status: ${buildResult}"
                    sh 'node jenkinsScripts/updateReadme.js ${buildResult}'
                }
            }
        }
        stage('Push_Changes') {
            steps {
                withCredentials([string(credentialsId: 'github_token', variable: 'GIT_TOKEN')]) {
                    script {
                        echo "Pushing changes to the repository..."
                        sh "node jenkinsScripts/pushChanges.js '${params.Executor}' '${params.Motivo}'"
                    }
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
