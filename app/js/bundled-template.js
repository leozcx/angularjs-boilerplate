(function(module) {
try {
  module = angular.module('SampleApp');
} catch (e) {
  module = angular.module('SampleApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/template-directive.html',
    '<h1>template directive, {{1 + 1}} times</h1>');
}]);
})();
