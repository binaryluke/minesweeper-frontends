'use strict';

var INTEGER_REGEXP = /^\-?\d+$/;

module.exports = function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$validators.integer = function (modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          return true;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          return true;
        }

        return false;
      };
    }
  };
};