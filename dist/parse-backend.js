/*!
 * parse-backend -v 1.0.3 -build 2015-10-09
 */

'use strict';

angular.module('module.ParseBackend', []);
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

        this.$get = ["ParseLib", "Patcher", function (ParseLib, Patcher) {
            this.parse = Patcher.patch(ParseLib);
            this.parse.initialize(this._application_id, this._javascript_key);
            return this.parse;
        }]
    });
'use strict';

angular.module('module.ParseBackend').service('ParseLib', function () {
    return Parse;
});
'use strict';

/**
 * @ngdoc service
 * @module module.ParseBackend
 * @name Patcher
 * @description
 * ParseBackend provider
 */
angular.module('module.ParseBackend').factory('Patcher', ["$q", "$rootScope", function ($q, $rootScope) {
    var patches, lib;

    patches = [
        {
            className: "Object",
            prototypes: ['destroy', 'fetch', 'save'],
            static: ['destroyAll']

        }, {
            className: "Query",
            prototypes: ['count', 'each', 'find', 'first']
        }, {
            className: "Cloud",
            static: ['run']
        }, {
            className: "User",
            prototypes: ['login', 'signUp'],
            static: ['_upgradeToRevocableSession', 'become', 'currentAsync', 'enableRevocableSession', 'login', 'logout', 'signUp']
        }, {
            className: "Push",
            static: ['send']
        }, {
            className: "Config",
            static: ['get']
        }, {
            className: "Session",
            static: ['current']
        }, {
            className: "Analytics",
            static: ['track']
        }
    ];

    function patchedMethod(context, originalMethod, args) {
        var deferred = $q.defer();

        originalMethod.apply(context, args).then(function (res) {
            deferred.resolve(res);
            $rootScope.$apply();
        });

        return deferred.promise;
    }

    return {
        patch: function (ParseLib) {
            lib = ParseLib;

            angular.forEach(patches, function (patch) {
                // Patch Prototypes
                angular.forEach(patch.prototypes, function (method) {
                    var originalMethod = lib[patch.className].prototype[method];

                    lib[patch.className].prototype[method] = function () {
                        return patchedMethod(this, originalMethod, arguments);
                    };
                });

                // Patch Static Methods
                angular.forEach(patch.static, function (method) {
                    var originalMethod = lib[patch.className][method];

                    lib[patch.className][method] = function () {
                        return patchedMethod(this, originalMethod, arguments);
                    }
                })
            });

            return lib;
        }
    }
}]);