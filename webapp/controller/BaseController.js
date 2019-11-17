sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";
	return Controller.extend("fiori.create.pruchase.documents.PurchaseDocumentsFreestyle.controller.BaseController", {

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("CreatePurchaseDocument", {}, true /*no history*/ );
			}
		},

		getModel: function (sName) {
			var oModel = this.getView().getModel(sName);
			if (!oModel) {
				oModel = this.getOwnerComponent().getModel(sName);
			}
			return oModel;
		}

	});

});