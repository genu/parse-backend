# parse-backend
Angular support for the Parse Javascript SDK using angular promises.

## Overview
  This is a simple wrapper for the Parse Javascript SDK. All the methods that the official SDK supports should be supported by this service. The only difference is that Parse promises are converted to angular promises.
  
## Getting started

**Install via bower**

`bower install parse-backend --save`

**Configure**

```javascript
angular.module('app', ['module.ParseBackend']).config(function('ParseBackendProvider'){
    ParseBackendProvider.setApplicationId('PARSE_APPLICATION_ID');
    ParseBackendProvider.setJavascriptKey('PARSE_JAVASCRIPT_KEY');
});
```

**Using in controller**

```javascript
angular.module('app').controller('Product', function($scope, ParseBackend) {
  var Product, product;
  
  Product = ParseBackend.Object.extend('Product');
  
  product = new Product();
  
  product.set("name", "Awesome Product");
  
  product.save().then(function(product){
      $scope.addedProduct = product;
  }).catch(function(error){
      console.log("Error saving the record");
  });
});
```
## Extra resources
* See the specs under `src/modules/parse/tests`
* Although there are only two configuration methods, they are documented [here](https://cdn.rawgit.com/genu/parse-backend/master/docs/index.html#/api/module.ParseBackend.ParseBackend)
* See the official [Parse Javascript SDK](https://parse.com/docs/js/guide) for parse specific methods. Remember, the official SDK specification should be valid.

## Roadmap
* Add angular-like double binding to Parse objects
* Find/build a Parse mocking module for properly testing this

## Contributing
For bugfixes and minor updates, simple fork this repo and submit a pull request. For architectural changes or major updates please open an issue first before submitting a pull.

## License
The MIT License (MIT)

Copyright (c) 2015 Eugen Istoc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
