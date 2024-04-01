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
        stage('Deploy to EC2') {
            steps {
                script {
                    // Copy the source code to the deployment server
                    sshagent(credentials: ['demoserver']) {
                        sh "scp -rp * ${env.DEPLOY_USER}@${env.DEPLOY_SERVER}:${env.DEPLOY_PATH}"
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // SSH into the deployment server and run npm install and npm run build
                    sshagent(credentials: ['demoserver']) {
                        sh "ssh ${env.DEPLOY_USER}@${env.DEPLOY_SERVER} 'cd ${env.DEPLOY_PATH} && npm ci && npm run build'"
                    }
                }
            }
        }

        stage('Start Server') {
            steps {
                script {
                    // SSH into the deployment server and start the server with npm run dev
                    sshagent(credentials: ['demoserver']) {
                    sh "ssh ${env.DEPLOY_USER}@${env.DEPLOY_SERVER} 'cd ${env.DEPLOY_PATH} && pm2 delete fullham || true && pm2 start \"npm\" -- run dev -- --host'"
                    }
                }
            }
        }
        
    }
}
