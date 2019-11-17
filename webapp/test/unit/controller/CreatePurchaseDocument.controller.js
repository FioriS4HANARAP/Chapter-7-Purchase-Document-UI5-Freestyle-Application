/*global QUnit*/

sap.ui.define([
	"fiori/create/pruchase/documents/PurchaseDocumentsFreestyle/controller/CreatePurchaseDocument.controller"
], function (oController) {
	"use strict";

	//This module tests the main controller of the app. Add any other relevant tests.
	//For more information on Qunit, see https://sapui5.hana.ondemand.com/#/topic/09d145cd86ee4f8e9d08715f1b364c51
	QUnit.module("CreatePurchaseDocument Controller");

	QUnit.test("I should test the app controller loads", function (assert) {
		var oAppController = new oController();
		var sName = oAppController.getMetadata().getName();
		assert.ok(sName, "fiori/create/pruchase/documents/PurchaseDocumentsFreestyle.controller.CreatePurchaseDocument");
	});


});