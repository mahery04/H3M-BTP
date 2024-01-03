pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub_id')
        DOCKER_IMAGE_NAME = 'faniry123/frontend'
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}"
        OLD_DOCKER_IMAGE_TAG = "${DOCKER_IMAGE_NAME}:${BUILD_NUMBER - 1}"
    }

    stages {
       
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Installation des dépendances pour le front-end
                    sh 'cd frontend && npm install'

                    // Installation des dépendances pour le back-end
                   // sh 'cd back-end && npm install'
                }
            }
        }

        stage('Run Front-end Tests') {
            steps {
                script {
                    sh 'cd frontend && npm start'
                }
            }
        }

        
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Construction de l'image Docker
                    docker.build("${DOCKER_IMAGE_TAG}", '.')
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    // Connexion à Docker Hub en utilisant les identifiants
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_id', usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                        sh "echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Pousser l'image Docker vers Docker Hub
                    sh "docker push ${DOCKER_IMAGE_TAG}"
                }
            }
        }

        stage('Remove Old Docker Image') {
            steps {
                script {
                    // Supprimer l'ancienne image Docker
                    docker.image("${OLD_DOCKER_IMAGE_TAG}").remove()
                }
            }
        }
    }

    post {
        always {
            // Déconnexion de Docker Hub après la fin de la pipeline
            sh 'docker logout'
        }
    }
}
