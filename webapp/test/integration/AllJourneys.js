/* global QUnit*/
sap.ui.define([
	"sap/ui/test/Opa5",
	"fiori/create/pruchase/documents/PurchaseDocumentsFreestyle/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"fiori/create/pruchase/documents/PurchaseDocumentsFreestyle/test/integration/pages/CreatePurchaseDocument",
	"fiori/create/pruchase/documents/PurchaseDocumentsFreestyle/test/integration/pages/DisplayPurchaseDocuments",
	"fiori/create/pruchase/documents/PurchaseDocumentsFreestyle/test/integration/createPurchaseDocumentJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "fiori.create.pruchase.documents.PurchaseDocumentsFreestyle.view.",
		autoWait: true
	});
});