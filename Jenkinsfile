pipeline {
    agent {  dockerfile true }
    environment {
        BUILD_ZIP_FILE_NAME  = "PurchaseDocumentFreestyleUI5App-0.${env.BUILD_NUMBER}.zip"
    }
    stages {
        stage('build') {
            steps {
                sh 'npm install'
                sh 'npm run-script build'
            }
        }
        stage('test'){
        	steps {
        		sh 'npm run-script test'
        	}
        }
        stage('deploy'){
        	steps{
        		// Package the dist folder as a zip file
        		sh "cd dist && zip -r  ../${BUILD_ZIP_FILE_NAME} * && cd .."
        		// Upload the zip file to JFrog Artifactory
	        	script{
	                def server = Artifactory.server 'ART'
					def uploadSpec = """{
					  "files": [
					    {
					      "pattern": "${BUILD_ZIP_FILE_NAME}",
					      "target": "UI5/"
					    }
					 ]
					}"""
					def uploadBuildInfo = server.upload(uploadSpec)
	                server.publishBuildInfo uploadBuildInfo
	            }
        	}
        }
    }
    post {
        success {
            junit 'testResult/result.xml'
            archiveArtifacts artifacts: BUILD_ZIP_FILE_NAME, fingerprint: true
            publishHTML target: [
              allowMissing: false,
              alwaysLinkToLastBuild: false,
              keepAll: true,
              reportDir: 'coverage',
              reportFiles: 'index.html',
              reportName: 'Coverage Report'
            ]
        }
    }
}