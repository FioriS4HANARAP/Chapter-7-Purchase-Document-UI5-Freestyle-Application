/*global QUnit*/
sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	QUnit.module("Create Purchase Document Journey");

	opaTest("Should see the newly created Purchase Document in the Smart Table",
		function (Given, When, Then) {

			Given.iStartTheApp();

			var oPurchaseDocument = {
				PurchaseDocument: "1",
				Description: "OPA5 Test Description",
				Priority: "1",
				PurchasingOrganization: "ORG1",
				PurchaseDocumentImageURL: "../images/book.jpg"
			};

			When.onTheCreatePurchaseDocumentPage
				.iEnterPurchaseDocumentData(oPurchaseDocument).and
				.iSavePurchaseDocument();

			Then.onTheDisplayPurchaseDocumentsPage
				.iCheckPurchaseDocumentIsInTable(oPurchaseDocument).and
				.iTeardownMyUIComponent();
		});

});