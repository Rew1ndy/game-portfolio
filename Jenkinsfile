pipeline {
    agent any
    options {
        failFast false
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/alexmegua/game-portfolio.git'
            }
        }

        stage('HTML Validation') {
            steps {
                sh '''
                wget https://github.com/validator/validator/releases/download/23.6.24/vnu.jar || true
                java -jar vnu.jar --exit-zero-always ./index.html || true
                '''
            }
        }

        stage('Link Checker') {
            steps {
                sh 'gem install html-proofer || true'
                sh 'htmlproofer ./ --allow-hash-href --check-html --report-invalid-tags || true'
            }
        }

        stage('Performance Test') {
            steps {
                sh 'npm install -g lighthouse || true'
                sh 'lighthouse http://alexmegua.github.io/game-portfolio/ --output=json --output-path=./lighthouse-report.json || true'
            }
        }
    }

    post {
        always {
            junit 'test-results/*.xml' // Собирает результаты тестов
            archiveArtifacts artifacts: 'lighthouse-report.json', allowEmptyArchive: true
        }
    }
}
