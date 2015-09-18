'use strict';

describe('Testing provider: ParseBackend', function () {
    var ParseBackend;
    ParseBackend = null;

    beforeEach(module('module.ParseBackend', function (ParseBackendProvider) {
        ParseBackendProvider.setApplicationId('__test_app_id');
        ParseBackendProvider.setJavascriptKey('__test_js_key');
    }));

    beforeEach(inject(function (_ParseBackend_) {
        ParseBackend = _ParseBackend_;
    }));

    it('should create a parse object', function () {
        var Account, account;
        Account = ParseBackend.Object.extend("Account");

        account = new Account();
        account.set("access_token", "test_token");

        account.save().then(function (account) {
            var test = "ts";
        }).catch(function (err) {
            var err = 'error';
        });


    });
});