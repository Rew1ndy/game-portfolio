pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Указываем ваш репозиторий и ветку
                git branch: 'Rew1ndy-patch-1', url: 'https://github.com/Rew1ndy/game-portfolio.git'
            }
        }

        stage('HTML Validation') {
            steps {
                script {
                    try {
                        // Используем bat вместо sh, исправляем путь к файлу
                        bat '''
                        curl -L -o vnu.jar https://github.com/validator/validator/releases/download/23.6.24/vnu.jar
                        java -jar vnu.jar --exit-zero-always index.html
                        '''
                    } catch (Exception e) {
                        echo "HTML Validation failed: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('Link Checker') {
            steps {
                script {
                    try {
                        // Устанавливаем html-proofer (Ruby)
                        bat 'gem install html-proofer'
                        bat 'htmlproofer . --allow-hash-href --check-html --report-invalid-tags'
                    } catch (Exception e) {
                        echo "Link Checker failed: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('Performance Test') {
            steps {
                script {
                    try {
                        // Устанавливаем Lighthouse (Node.js)
                        bat 'npm install -g lighthouse'
                        bat 'lighthouse http://alexmegua.github.io/game-portfolio/ --output=json --output-path=lighthouse-report.json'
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
            // Исправляем путь к JUnit-отчетам (если есть)
            junit 'test-results/*.xml'
            archiveArtifacts artifacts: 'lighthouse-report.json', allowEmptyArchive: true
        }
    }
}
