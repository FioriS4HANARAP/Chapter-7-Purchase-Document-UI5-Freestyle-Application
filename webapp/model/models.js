sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createAppModel: function () {
			var oAppModel = new JSONModel({
				isBusy: false
			});
			oAppModel.setDefaultBindingMode("OneWay");
			return oAppModel;
		}

	};
});