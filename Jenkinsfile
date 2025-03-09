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
                        curl -L -o vnu.jar https://github.com/validator/validator/releases/download/24.7.16/vnu.jar
                        if exist vnu.jar (
                            java -jar vnu.jar --exit-zero-always public/index.html
                        ) else (
                            echo "vnu.jar not found! Check download link."
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
                        bat '''
                        curl -L -o curl.zip https://curl.se/windows/dl-8.8.0_2/curl-8.8.0_2-win64-mingw.zip
                        tar -xf curl.zip -C C:\\tools\\curl
                        set PATH=C:\\tools\\curl;%PATH%
                        gem install html-proofer
                        htmlproofer public --allow-hash-href --check-html --report-invalid-tags --test-report report.xml
                        '''
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
            junit 'report.xml'
            archiveArtifacts artifacts: 'lighthouse-report.json', allowEmptyArchive: true
        }
    }
}
