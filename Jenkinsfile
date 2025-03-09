pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'Rew1ndy-patch-1', url: 'https://github.com/Rew1ndy/game-portfolio.git'
            }
        }

        /* 1. Проверка доступности сайта */
        stage('Check Site Availability') {
            steps {
                script {
                    try {
                        bat '''
                        curl -o nul http://alexmegua.github.io/game-portfolio/
                        '''
                    } catch (Exception e) {
                        echo "Site unavailable: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        /* 2. Проверка наличия ключевых элементов (через PowerShell) */
        stage('Check Critical Elements') {
            steps {
                script {
                    try {
                        bat '''
                        powershell -Command "Invoke-WebRequest -Uri 'http://alexmegua.github.io/game-portfolio/' | Select-String -Pattern '<title>.*</title>'"
                        '''
                    } catch (Exception e) {
                        echo "Critical elements missing: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        /* 3. Проверка статуса HTTP-ответа */
        stage('Check HTTP Status') {
            steps {
                script {
                    try {
                        bat '''
                        powershell -Command "(Invoke-WebRequest -Uri 'http://alexmegua.github.io/game-portfolio/').StatusCode -eq 200"
                        '''
                    } catch (Exception e) {
                        echo "HTTP status check failed: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        /* 4. Проверка наличия index.html в репозитории */
        stage('Check index.html Exists') {
            steps {
                script {
                    try {
                        bat '''
                        if not exist public\\index.html (
                            echo "index.html not found!"
                            exit 1
                        )
                        '''
                    } catch (Exception e) {
                        echo "File check failed: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        /* 5. Проверка версии Node.js (если требуется для проекта) */
        stage('Check Node.js Version') {
            steps {
                script {
                    try {
                        bat '''
                        node --version
                        '''
                    } catch (Exception e) {
                        echo "Node.js not found: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Очистка workspace после сборки
        }
    }
}
