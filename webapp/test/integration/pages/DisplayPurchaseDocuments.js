sap.ui.define([
	"sap/ui/test/Opa5",
	"fiori/create/pruchase/documents/PurchaseDocumentsFreestyle/test/integration/pages/Common"
], function (Opa5, Common) {
	"use strict";

	function purchaseDocumentsAreEqual(oExpectedPurchDoc, oActualPurchDoc) {
		return oExpectedPurchDoc.Description === oActualPurchDoc.Description &&
			oExpectedPurchDoc.Priority === oActualPurchDoc.Priority &&
			oExpectedPurchDoc.PurchasingOrganization === oActualPurchDoc.PurchasingOrganization &&
			oExpectedPurchDoc.PurchaseDocumentImageURL === oActualPurchDoc.PurchaseDocumentImageURL;
	}

	Opa5.createPageObjects({
		onTheDisplayPurchaseDocumentsPage: {
			baseClass: Common,
			actions: {},
			assertions: {
				iCheckPurchaseDocumentIsInTable: function (oPurchaseDocument) {
					return this.waitFor({
						viewName: "DisplayPurchaseDocuments",
						id: "purchaseDocumentsSmartTable",
						matchers: [function (oSmartTable) {
							return oSmartTable.getTable();
						}, function (oTable) {
							return oTable.getItems().some(function (oItem) {
								var oPurchaseDocumentTableEntry = oItem.getBindingContext().getObject();
								return purchaseDocumentsAreEqual(oPurchaseDocument, oPurchaseDocumentTableEntry);
							});
						}],
						success: function () {
							Opa5.assert.ok("true", "New Purchase Document is displayed in the Smart Table");
						},
						errorMessage: "Could not find the new Purchase Document in the Smart Table"
					});

				}
			}
		}
	});
});