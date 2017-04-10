define(['exports'], function (exports) {
  'use strict';

  exports.configure = function configure(aurelia) {
    aurelia.use.basicConfiguration();
    aurelia.start().then(() => aurelia.setRoot());
  };
});
