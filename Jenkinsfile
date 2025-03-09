pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'Rew1ndy-patch-1', url: 'https://github.com/Rew1ndy/game-portfolio.git'
            }
        }

        stage('Check Site Availability') {
            steps {
                bat 'curl -o nul --fail http://alexmegua.github.io/game-portfolio/'
            }
        }

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

        stage('Check HTTP Status') {
            steps {
                script {
                    try {
                        bat '''
                        echo Checking HTTP status...
                        curl -s -o nul -w "%%{http_code}" -L http://alexmegua.github.io/game-portfolio/ | findstr /c:"200"
                        '''
                    } catch (Exception e) {
                        echo "HTTP status check failed: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('Check index.html') {
            steps {
                script {
                    bat 'dir /s /b'
                    bat 'if not exist public\\index.html (echo "File not found" & exit 1)'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    try {
                        bat '''
                        npm install
                        npm test
                        '''
                    } catch (Exception e) {
                        echo "Tests failed: ${e}"
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
                        npm cache clean --force
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
            script {
                bat 'dir /s /b > files.txt'
                archiveArtifacts 'files.txt'
                bat 'if exist report.xml (echo "Report found!") else (echo "Report not found!")'
            }
            junit allowEmptyResults: true, testResults: '**/report.xml'
            archiveArtifacts artifacts: '**/lighthouse-report.json', allowEmptyArchive: true
            cleanWs()
        }
    }
}
