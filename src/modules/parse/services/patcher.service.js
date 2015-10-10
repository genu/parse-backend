'use strict';

/**
 * @ngdoc service
 * @module module.ParseBackend
 * @name Patcher
 * @description
 * ParseBackend provider
 */
angular.module('module.ParseBackend').factory('Patcher', function($q, $rootScope) {
  var patches, lib;

  patches = [{
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
    static: ['_upgradeToRevocableSession', 'become', 'currentAsync',
      'enableRevocableSession', 'login', 'logout', 'signUp'
    ]
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
  }];

  function patchedMethod(context, originalMethod, args) {
    var deferred = $q.defer();

    originalMethod.apply(context, args).then(function(res) {
      deferred.resolve(res);
      $rootScope.$apply();
    }, function(err) {
      deferred.reject(err);
      $rootScope.$apply();
    });

    return deferred.promise;
  }

  return {
    patch: function(ParseLib) {
      lib = ParseLib;

      angular.forEach(patches, function(patch) {
        // Patch Prototypes
        angular.forEach(patch.prototypes, function(method) {
          var originalMethod = lib[patch.className].prototype[method];

          lib[patch.className].prototype[method] = function() {
            return patchedMethod(this, originalMethod, arguments);
          };
        });

        // Patch Static Methods
        angular.forEach(patch.static, function(method) {
          var originalMethod = lib[patch.className][method];

          lib[patch.className][method] = function() {
            return patchedMethod(this, originalMethod, arguments);
          }
        })
      });

      return lib;
    }
  }
});
