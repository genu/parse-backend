'use strict';

describe('Testing provider: ParseBackend', function () {
    var $q, ParseBackend;
    ParseBackend = null;
    $q = null;

    beforeEach(module('module.ParseBackend', function (ParseBackendProvider) {
        ParseBackendProvider.setApplicationId('__test_app_id');
        ParseBackendProvider.setJavascriptKey('__test_js_key');
    }));

    beforeEach(inject(function (_ParseBackend_, _$q_) {
        ParseBackend = _ParseBackend_;
        $q = _$q_;
    }));

    it('should create a parse object', function () {
        var Account, account;
        Account = ParseBackend.Object.extend("Account");

        account = new Account();
        account.set("access_token", "test_token");

        //var test = account.save();
        var test = account.save().then(function (rec) {
            var test = "test";
        }).catch(function (err) {
            var err = 'error';
        });


    });
});