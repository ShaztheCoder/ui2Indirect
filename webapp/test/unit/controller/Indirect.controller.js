/*global QUnit*/

sap.ui.define([
	"com/zewmindirect/controller/Indirect.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Indirect Controller");

	QUnit.test("I should test the Indirect controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
