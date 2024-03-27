pipeline {
    agent any

    stages {
        stage('Environment Setup') {
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
            steps {
                // Build the project
                sh 'npm ci --production' // Install only production dependencies
                sh 'npm run build'
                sh 'npm run rebuild:save:prod'
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                script {
                    // Copy the build artifacts to the deployment server
                    sshagent(credentials: ['demoserver']) {
                        sh "scp -rp prod-server ${env.DEPLOY_USER}@${env.DEPLOY_SERVER}:${env.DEPLOY_PATH}"
                    }
                }
            }
        }

        stage('Start Production Server') {
            steps {
                script {
                    // SSH into the production server and start the server using PM2
                    sshagent(credentials: ['demoserver']) {
                        sh "ssh ${env.DEPLOY_USER}@${env.DEPLOY_SERVER} 'cd ${env.DEPLOY_PATH}/prod-server && pm2 start npm --name \"app\" -- start'"
                    }
                }
            }
        }
    }
}
