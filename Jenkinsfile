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

                stage('start Application') {
            stage('start Application') {
    steps {
        script {
            // SSH into the deployment server and run start.sh script
            sshagent(credentials: ['demoserver']) {
                sh "ssh ${env.DEPLOY_USER}@${env.DEPLOY_SERVER} 'cd ${env.DEPLOY_PATH} && bash -s' < start.sh"
            }
        }
    }
}

        }
        
    }
}
