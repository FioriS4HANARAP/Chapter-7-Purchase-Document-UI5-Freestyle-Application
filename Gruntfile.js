module.exports = function (grunt) {
	"use strict";

	grunt.loadNpmTasks("@sap/grunt-sapui5-bestpractice-build");
	grunt.registerTask("buildProject", [
		"clean",
		"lint",
		"build"
	]);

	grunt.loadNpmTasks("grunt-karma");
	grunt.config.merge({
		karma: {
			options: {
				basePath: "./dist/",
				frameworks: ["qunit", "openui5"],
				openui5: {
					path: "https://sapui5.hana.ondemand.com/1.54.4/resources/sap-ui-core.js" // eslint-disable-line
				},
				client: {
					openui5: {
						config: {
							theme: "sap_belize",
							language: "EN",
							resourceroots: {
								"fiori.create.pruchase.documents.PurchaseDocumentsFreestyle": "/base",
								"test": "/base/test"
							}
						},
						tests: [
							"test/unit/allTests",
							"test/integration/AllJourneys"
						]
					}
				},

				files: [{
					pattern: "**",
					included: false,
					served: true,
					watched: true
				}],
				browsers: ["Chrome"],
				reporters: ["progress", "junit", "coverage"],
				junitReporter: {
					outputDir: "../testResult",
					outputFile: "result.xml",
					useBrowserName: false
				},
				preprocessors: {
					"/!(test|localService|coverage)/!(*dbg*).js": ["coverage"]
				},
				coverageReporter: {
					type: "html",
					dir: "../coverage/",
					subdir: ".",
					includeAllSources: true
				},
				captureTimeout: 60000,
				browserNoActivityTimeout: 60000,
				browserDisconnectTolerance: 3,
				browserDisconnectTimeout: 60000,
				logLevel: "DEBUG"
			},
			// Continuous Integration (CI) settings
			ci: {
				browsers: ["ChromeHeadlessNoSandbox"],
				customLaunchers: {
					ChromeHeadlessNoSandbox: {
						base: "ChromeHeadless",
						flags: ["--no-sandbox"]
					}
				},
				singleRun: true
			}
		}
	});
	grunt.registerTask("testProject", [
		"karma:ci"
	]);

	grunt.registerTask("deployProject", function () {
		grunt.log.write("Upload to ABAP System");
	});

};