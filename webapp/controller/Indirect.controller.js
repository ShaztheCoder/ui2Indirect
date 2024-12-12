sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageToast, Fragment, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.zewmindirect.controller.Indirect", {
        onInit: function () {
            // Initialize models
            var oViewModel = new JSONModel({
                createFormData: {
                    externalStep: "",
                    processor: "",
                    indirectTask: "",
                    step: "",
                    activityArea: "",
                    status: "CREATE",
                    startDate: null,
                    startTime: null,
                    endDate: null,
                    endTime: null,
                    plExDuration: "",
                    assignmentKey: "",
                    createdBy: "",
                    createdOn: null,
                    createdTime: null,
                    changedBy: "",
                    changedOn: null,
                    changedTime: null,
                    disposalParty: ""
                },
                groupTableData: []
            });
            this.getView().setModel(oViewModel);
        },

        // Header Button Handlers
        onSetStartTime: function() {
            var now = new Date();
            this._updateStartDateTime(now);
            MessageToast.show("Start time has been set");
        },

        onSetEndTime: function() {
            var now = new Date();
            this._updateEndDateTime(now);
            MessageToast.show("End time has been set");
        },

        // Tab Selection Handler
        onTabSelect: function(oEvent) {
            var sKey = oEvent.getParameter("key");
            this._handleTabChange(sKey);
        },

        // Value Help Dialog Handlers
        onPartyValueHelp: function(oEvent) {
            this._openValueHelpDialog("PartyValueHelp", oEvent.getSource());
        },

        onExternalStepHelp: function(oEvent) {
            this._openValueHelpDialog("ExternalStepHelp", oEvent.getSource());
        },

        onProcessorHelp: function(oEvent) {
            this._openValueHelpDialog("ProcessorHelp", oEvent.getSource());
        },

        onActivityAreaHelp: function(oEvent) {
            this._openValueHelpDialog("ActivityAreaHelp", oEvent.getSource());
        },

        onStatusHelp: function(oEvent) {
            this._openValueHelpDialog("StatusHelp", oEvent.getSource());
        },

        onTimeUnitHelp: function(oEvent) {
            this._openValueHelpDialog("TimeUnitHelp", oEvent.getSource());
        },

        // Mode Change Handler
        onChangeMode: function(oEvent) {
            var oButton = oEvent.getSource();
            var oRow = oButton.getBindingContext().getObject();
            // Implement mode change logic
            MessageToast.show("Mode changed for row: " + oRow.IndirectLaborTask);
        },

        // Private Helper Methods
        _updateStartDateTime: function(date) {
            var oViewModel = this.getView().getModel();
            oViewModel.setProperty("/createFormData/startDate", date);
            oViewModel.setProperty("/createFormData/startTime", date);
        },

        _updateEndDateTime: function(date) {
            var oViewModel = this.getView().getModel();
            oViewModel.setProperty("/createFormData/endDate", date);
            oViewModel.setProperty("/createFormData/endTime", date);
        },

        _handleTabChange: function(sKey) {
            switch(sKey) {
                case "create":
                    this._handleCreateTab();
                    break;
                case "createGroup":
                    this._handleCreateGroupTab();
                    break;
            }
        },

        _handleCreateTab: function() {
            // Implement create tab specific logic
        },

        _handleCreateGroupTab: function() {
            // Implement create group tab specific logic
        },

        _openValueHelpDialog: async function(sDialogName, oSource) {
            this._source = oSource;
            
            if (!this[`_${sDialogName}`]) {
                this[`_${sDialogName}`] = await Fragment.load({
                    name: `com.zewmindirect.view.fragments.${sDialogName}`,
                    controller: this
                });
                this.getView().addDependent(this[`_${sDialogName}`]);
            }
            
            this[`_${sDialogName}`].open();
        },

        onValueHelpSearch: function(oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("text", FilterOperator.Contains, sValue);
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },

        onValueHelpClose: function(oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                this._source.setValue(oSelectedItem.getTitle());
            }
            oEvent.getSource().getBinding("items").filter([]);
        }
    });
});