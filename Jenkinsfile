pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'Rew1ndy-patch-1', url: 'https://github.com/Rew1ndy/game-portfolio.git'
            }
        }

        stage('HTML Validation') {
            steps {
                script {
                    try {
                        bat '''
                        curl -L -o vnu.jar https://github.com/validator/validator/releases/download/23.6.24/vnu.jar
                        if exist vnu.jar (
                            java -jar vnu.jar --exit-zero-always index.html
                        ) else (
                            echo "vnu.jar not found!"
                            exit 1
                        )
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
                        bat 'gem install html-proofer'
                        bat 'htmlproofer . --allow-hash-href --check-html --report-invalid-tags --test-report report.xml'
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
                        bat 'npm install -g lighthouse'
                        bat 'where lighthouse'
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
            junit 'report.xml'
            archiveArtifacts artifacts: 'lighthouse-report.json', allowEmptyArchive: true
        }
    }
}
