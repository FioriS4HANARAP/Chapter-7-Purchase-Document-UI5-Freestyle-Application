sap.ui.define([
	"fiori/create/pruchase/documents/PurchaseDocumentsFreestyle/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("fiori.create.pruchase.documents.PurchaseDocumentsFreestyle.controller.CreatePurchaseDocument", {
		onInit: function () {
			this.getRouter().getRoute("CreatePurchaseDocument").attachMatched(this._createPurchaseDocument, this);
		},

		_createPurchaseDocument: function () {
			this.getModel().metadataLoaded()
				.then(function () {
					if (!this.getModel().hasPendingChanges()) {
						var oPurchaseDocumentBindingContext = this.getModel().createEntry("/PurchaseDocument");
						this.getView().bindElement(oPurchaseDocumentBindingContext.getPath());
					}
				}.bind(this));
		},

		onSave: function () {
			// 	Checks Smart Fields in the Smart Form for client errors
			var oSmartForm = this.getView().byId("createPurchaseDocumentSmartForm");
			var aSmartFieldsWithErrors = oSmartForm.check();
			if (aSmartFieldsWithErrors.length !== 0) {
				return;
			}

			this.getModel("app").setProperty("/isBusy", true);

			this.getModel().submitChanges({
				success: function () {
					this.getView().unbindElement();
					this._navToList();
					this.getModel("app").setProperty("/isBusy", false);
				}.bind(this),
				error: function () {
					this.getModel("app").setProperty("/isBusy", false);
				}.bind(this)
			});
		},

		onNavToList: function () {
			this._navToList();
		},

		_navToList: function () {
			this.getRouter().navTo("DisplayPurchaseDocuments");
		}
	});
});