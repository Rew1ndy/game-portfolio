pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/alexmegua/game-portfolio.git'
            }
        }

        stage('HTML Validation') {
            steps {
                sh '''
                wget https://github.com/validator/validator/releases/download/23.6.24/vnu.jar
                java -jar vnu.jar --exit-zero-always ./index.html
                '''
            }
        }

        stage('Link Checker') {
            steps {
                sh 'gem install html-proofer'
                sh 'htmlproofer ./ --allow-hash-href --check-html --report-invalid-tags'
            }
        }

        stage('Performance Test') {
            steps {
                sh 'npm install -g lighthouse'
                sh 'lighthouse http://alexmegua.github.io/game-portfolio/ --output=json --output-path=./lighthouse-report.json'
            }
        }
    }

    post {
        always {
            junit 'test-results/*.xml'
            archiveArtifacts artifacts: 'lighthouse-report.json', allowEmptyArchive: true
        }
    }
}
