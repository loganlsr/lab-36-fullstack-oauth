'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controllerAs: 'thumbnailCtrl',
  contoller: ['$log', 'picService', ThumbnailController],
  bindings: {
    pic: '<',
  },
};

function ThumbnailController($log, picService){
  $log.debug('init ThumbnailController');
  this.deletePic = function(){

  };
}
