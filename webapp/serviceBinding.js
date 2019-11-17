function initModel() {
	var sUrl = "/sap/opu/odata/sap/Z_UI_PURCHASEDOCUMENT_V2/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}