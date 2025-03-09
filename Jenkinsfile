pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'Rew1ndy-patch-1', url: 'https://github.com/Rew1ndy/game-portfolio.git'
            }
        }

        /* 1. Проверка доступности сайта через curl */
        stage('Check Site Availability') {
            steps {
                bat 'curl -o nul --fail http://alexmegua.github.io/game-portfolio/'
            }
        }

        /* 2. Проверка тега <title> через PowerShell без IE */
        stage('Check Title Tag') {
            steps {
                script {
                    try {
                        bat '''
                        powershell -Command "Invoke-WebRequest -Uri 'http://alexmegua.github.io/game-portfolio/' -UseBasicParsing | Select-String -Pattern '<title>.*</title>'"
                        '''
                    } catch (Exception e) {
                        echo "Title tag check failed: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        /* 3. Проверка HTTP-статуса через curl */
        stage('Check HTTP Status') {
            steps {
                script {
                    try {
                        bat '''
                        curl -s -o nul -w "%%{http_code}" http://alexmegua.github.io/game-portfolio/ | findstr 200
                        '''
                    } catch (Exception e) {
                        echo "HTTP status check failed: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        /* 4. Проверка наличия index.html */
        stage('Check index.html') {
            steps {
                bat 'if not exist public\\index.html (echo "File not found" & exit 1)'
            }
        }

        /* 5. Тест производительности через Lighthouse (исправленный запуск) */
        stage('Performance Test') {
            steps {
                script {
                    try {
                        bat '''
                        npm install -g lighthouse
                        npx lighthouse http://alexmegua.github.io/game-portfolio/ --output=json --output-path=lighthouse-report.json
                        '''
                    } catch (Exception e) {
                        echo "Performance Test failed: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
    }

    post {
        always {
            junit 'report.xml' // Для html-proofer (если будет использоваться)
            archiveArtifacts artifacts: 'lighthouse-report.json', allowEmptyArchive: true
            cleanWs() // Очистка workspace
        }
    }
}
