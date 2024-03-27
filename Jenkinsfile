pipeline {
    agent any

    environment {
        SSH_KEY = credentials('demoserver')
    }

    stages {
        stage('Environment') {
            steps {
                echo "Deploy User: ${env.DEPLOY_USER}"
                echo "Deploy Server: ${env.DEPLOY_SERVER}"
                echo "Deploy Path: ${env.DEPLOY_PATH}"
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            tools {
                nodejs "node"
            }
            steps {
                // Build the project
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    // Copy the build artifacts to the deployment server
                    sshagent(credentials: ['demoserver']) {
                        sh "scp -rp dist* package* ${env.DEPLOY_USER}@${env.DEPLOY_SERVER}:${env.DEPLOY_PATH}" // Updated path to build artifacts
                    }
                }
            }
        }
    }
}
