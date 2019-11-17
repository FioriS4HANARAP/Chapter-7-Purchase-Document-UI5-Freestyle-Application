sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";

	return {

		_initAnnotationMockServer: function (sAnnotationURL) {
			var oAnnotationMockServer = new MockServer({
				rootUri: "/sap/opu/odata/IWFND/CATALOGSERVICE;v=2/Annotations(TechnicalName='Z_UI_PURCHASEDOCUMENT_V2_VAN',Version='0001')/$value/"
			});

			oAnnotationMockServer.setRequests([{
				method: "GET",
				path: new RegExp(".*"),
				response: function (oXhr) {
					var oLocalAnnotations = jQuery.sap.sjax({
						url: sAnnotationURL,
						datatype: "XML"
					}).data;
					oXhr.respondXML(200, {}, jQuery.sap.serializeXML(oLocalAnnotations));
					return true;
				}
			}]);

			oAnnotationMockServer.start();

			jQuery.sap.log.info("Mock Server for UI Annotations started");
		},

		_initODataServiceMockServer: function (sMetadataURL, sMockDataURL) {
			var oMockServer = new MockServer({
				rootUri: "/sap/opu/odata/sap/Z_UI_PURCHASEDOCUMENT_V2/"
			});

			oMockServer.simulate(sMetadataURL, {
				sMockdataBaseUrl: sMockDataURL,
				bGenerateMissingMockData: true
			});

			oMockServer.attachAfter("GET", function (oEvent) {
				var oMockServerSrc = oEvent.getSource();
				var aEntities = oMockServerSrc.getEntitySetData("PurchaseDocument");
				aEntities.forEach(function (oEntity) {
					if (!oEntity.hasOwnProperty("OverallPrice")) {
						oEntity.OverallPrice = 0;
					}
					if (!oEntity.hasOwnProperty("OverallPriceCriticality")) {
						oEntity.OverallPriceCriticality = 0; // None 
					}
					if (!oEntity.hasOwnProperty("IsApprovalRequired")) {
						oEntity.IsApprovalRequired = false;
					}
					if (!oEntity.hasOwnProperty("Currency")) {
						oEntity.Currency = "USD";
					}
					if (!oEntity.hasOwnProperty("Status")) {
						oEntity.Status = "1"; // Created
					}
					if (!oEntity.hasOwnProperty("crea_date_time")) {
						oEntity.crea_date_time = "/Date(" + new Date().getTime() + "+0000)/";
					}
					if (!oEntity.hasOwnProperty("crea_uname")) {
						oEntity.crea_uname = "John Doe";
					}
					if (!oEntity.hasOwnProperty("lchg_date_time")) {
						oEntity.lchg_date_time = "/Date(" + new Date().getTime() + "+0000)/";
					}
					if (!oEntity.hasOwnProperty("lchg_uname")) {
						oEntity.lchg_uname = "John Doe";
					}
					if (!oEntity.hasOwnProperty("Description")) {
						oEntity.Description = "Test Purchase Document";
					}
					if (!oEntity.hasOwnProperty("Priority")) {
						oEntity.Priority = "3"; // Low
					}
					if (!oEntity.hasOwnProperty("PurchasingOrganization")) {
						oEntity.PurchasingOrganization = "ORG1";
					}
					if (!oEntity.hasOwnProperty("PurchaseDocumentImageURL")) {
						oEntity.PurchaseDocumentImageURL = "../images/car.jpg";
					}
				});
				oMockServerSrc.setEntitySetData("PurchaseDocument", aEntities);

			}, "PurchaseDocument");

			oMockServer.start();

			jQuery.sap.log.info("Mock Server for OData Service started");
		},

		init: function () {
			jQuery.sap.log.setLevel(jQuery.sap.log.Level.ALL);

			MockServer.config({
				autoRespond: true,
				autoRespondAfter: 1000
			});

			var sAppNamespace = "fiori.create.pruchase.documents.PurchaseDocumentsFreestyle";
			var sMockDataURL = jQuery.sap.getModulePath(sAppNamespace + ".localService.mockdata");
			var sMetadataURL = jQuery.sap.getModulePath(sAppNamespace + ".localService", "/metadata.xml");
			var sAnnotationURL = jQuery.sap.getModulePath(sAppNamespace + ".localService", "/Z_UI_PURCHASEDOCUMENT_V2_VAN.xml");

			this._initODataServiceMockServer(sMetadataURL, sMockDataURL);

			this._initAnnotationMockServer(sAnnotationURL);
		}

	};

});