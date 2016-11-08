'use strict';

module.exports = {
  template: '(./upload-pic.html)',
  controllerAs: 'uploadPicCtrl',
  contoller: ['$log', 'picService', UploadPicController],
  bindings: {
    gallery: '<',
  },
};

function UploadPicController($log, picService){
  $log.debug('init uploadPicCtrl');
  this.pic = {};
  this.uploadPic = function(){
    picService.uploadGalleryPic(this.gallery, this.pic)
    .then( () => {
      this.pic.name = null;
      this.pic.desc = null;
      this.pic.file = null;
    });
  };
}
