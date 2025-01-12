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
    environment {
        linterResult = 'SUCCESS'
        testResult = 'SUCCESS'
        updateReadmeResult = 'SUCCESS'
        deployToVercelResult = 'SUCCESS'
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
                    sh "node jenkinsScripts/updateReadme.js '${buildResult}'"
                }
            }
        }
        stage('Push_Changes') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'github_token', variable: 'GIT_TOKEN')]) {
                        echo "Pushing changes to the repository..."
                        sh "node jenkinsScripts/pushChanges.js '${params.Executor}' '${params.Motivo}' '${GIT_TOKEN}'"
                    }
                }
            }
        }
        stage('Deploy_to_Vercel') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                script {
                    withCredentials([string(credentialsId: 'vercel_token', variable: 'VERCEL_TOKEN')]) {
                        sh 'npm install -g vercel'
                        sh 'node jenkinsScripts/deployToVercel.js'
                    }
                }
            }
            post {
                success {
                    script {
                        deployToVercelResult = 'SUCCESS'
                    }
                }
                failure {
                    script {
                        deployToVercelResult = 'FAILURE'
                    }
                }
            }
        }
        stage('Notificacion') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'telegram_token', variable: 'TELEGRAM_TOKEN')]) {
                        def message = """
                        Se ha ejecutado la pipeline de Jenkins con los siguientes resultados:
                        - Linter stage: ${linterResult}
                        - Test stage: ${testResult}
                        - Update Readme stage: ${updateReadmeResult}
                        - Deploy to Vercel stage: ${deployToVercelResult}
                        """
                        sh """
                        curl -s -X POST https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage -d chat_id=${params.ChatID} -d text="${message}"
                        """
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
