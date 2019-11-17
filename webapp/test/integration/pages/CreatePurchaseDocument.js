sap.ui.define([
	"sap/ui/test/Opa5",
	"fiori/create/pruchase/documents/PurchaseDocumentsFreestyle/test/integration/pages/Common",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/Ancestor",
	"sap/ui/test/matchers/Properties"
], function (Opa5, Common, Press, EnterText, Ancestor, Properties) {
	"use strict";
	var sCreatePurchaseDocumentView = "CreatePurchaseDocument";
	Opa5.createPageObjects({
		onTheCreatePurchaseDocumentPage: {
			baseClass: Common,
			actions: {
				iEnterPurchaseDocumentData: function (oPurchaseDocument) {
					// Enter Description
					this.waitFor({
						viewName: sCreatePurchaseDocumentView,
						id: "descriptionSmartField",
						actions: new EnterText({
							text: oPurchaseDocument.Description
						})
					});
					// Choose Priority
					this.waitFor({
						viewName: sCreatePurchaseDocumentView,
						id: "prioritySmartField",
						matchers: [
							function (oPrioritySmartFIeld) {
								return oPrioritySmartFIeld.getInnerControls()[0];
							}
						],
						actions: new Press(),
						success: function (oComboBox) {
							oComboBox.setSelectedKey(oPurchaseDocument.Priority);
						},
						errorMessage: "Could not find Priority Smart Field"
					});

					// Enter Purchasing Organization
					this.waitFor({
						viewName: sCreatePurchaseDocumentView,
						id: "purchasingOrganizationSmartField",
						actions: new EnterText({
							text: oPurchaseDocument.PurchasingOrganization
						})
					});

					// Enter Image URL
					return this.waitFor({
						viewName: sCreatePurchaseDocumentView,
						id: "purchasingDocumentImageURLSmartField",
						actions: new EnterText({
							text: oPurchaseDocument.PurchaseDocumentImageURL
						})
					});

				},
				iSavePurchaseDocument: function () {
					// Press Save Button
					return this.waitFor({
						viewName: sCreatePurchaseDocumentView,
						id: "savePurchaseDocumentButton",
						actions: new Press()
					});
				}
			},
			assertions: {}
		}
	});

});