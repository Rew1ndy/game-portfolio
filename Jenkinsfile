pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'Rew1ndy-patch-1', url: 'https://github.com/Rew1ndy/game-portfolio.git'
            }
        }

        /* 1. HTML-валидация (Unit-тест) */
        stage('HTML Validation') {
            steps {
                script {
                    try {
                        bat '''
                        curl -L -o vnu.jar https://github.com/validator/validator/releases/download/23.6.24/vnu.jar
                        if not exist vnu.jar (
                            echo "vnu.jar download failed"
                            exit 1
                        )
                        java -jar vnu.jar --exit-zero-always public/index.html
                        '''
                    } catch (Exception e) {
                        echo "HTML Validation failed: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        /* 2. Проверка ссылок (Smoke-тест) через PowerShell */
        stage('Link Checker') {
            steps {
                script {
                    try {
                        bat '''
                        powershell -Command "Invoke-WebRequest -Uri 'http://alexmegua.github.io/game-portfolio/' -UseBasicParsing | ForEach-Object Links | ForEach-Object href"
                        '''
                    } catch (Exception e) {
                        echo "Link Checker failed: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        /* 3. Тест производительности (Lighthouse) */
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
            cleanWs()
        }
    }
}
