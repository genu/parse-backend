'use strict';

/**
 * @ngdoc service
 * @name module.ParseBackend.ParseBackend
 * @example
 * <pre>
 * angular.module('app', ['ParseBackend']).config(function(ParseBackendProvider){
 *      ParseBackendProvider.setApplicationId('APPLICATION_ID');
 *      ParseBackendProvider.setJavascriptKey('JAVASCRIPT_KEY');
 * });
 * </pre>
 * @description
 * Provider for configuring the service
 */
angular.module('module.ParseBackend')
    .provider('ParseBackend', function () {
        /**
         * @ngdoc
         * @name module.ParseBacked#setApplicationId
         * @methodOf module.ParseBackend.ParseBackend
         * @param {String} app_id The Parse application id
         */
        this.setApplicationId = function (app_id) {
            this._application_id = app_id;
        };

        /**
         * @ngdoc
         * @name module.ParseBacked#setJavascriptKey
         * @methodOf module.ParseBackend.ParseBackend
         * @param {String} js_key The Parse javascript API key
         */
        this.setJavascriptKey = function (js_key) {
            this._javascript_key = js_key;
        };

        this.$get = function (ParseLib, Patcher) {
            this.parse = Patcher.patch(ParseLib);
            this.parse.initialize(this._application_id, this._javascript_key);
            return this.parse;
        }
    });