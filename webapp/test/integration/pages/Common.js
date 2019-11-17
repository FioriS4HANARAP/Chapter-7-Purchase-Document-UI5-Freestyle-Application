sap.ui.define([
	"sap/ui/test/Opa5",
	"fiori/create/pruchase/documents/PurchaseDocumentsFreestyle/localService/mockserver"
], function (Opa5, mockserver) {
	"use strict";

	return Opa5.extend("fiori.create.pruchase.documents.PurchaseDocumentsFreestyle.test.integration.pages.Common", {
		iStartTheApp: function (oOptions) {
			mockserver.init();

			this.iStartMyUIComponent({
				componentConfig: {
					name: "fiori.create.pruchase.documents.PurchaseDocumentsFreestyle"
				}
			});
		}
	});
});