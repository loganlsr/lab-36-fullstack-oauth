'use strict';

describe('testing create gallery controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $window, galleryService, $httpBackend, $rootScope) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.authService = authService;
      authService.setToken('1234');
      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.authService.setToken(null);
    this.$window.localStorage.clear();
  });

  describe('component controller', () => {
    it('should return', () => {
      let url = 'http://localhost:3000/api/gallery';
      let gallery = {
        name: 'mockName',
        desc: 'mockDesc',
      };
      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };
      
      this.$httpBackend.expectPOST(url, gallery, headers)
      .respond(200);

      let galleryCtrl = this.$componentController('gallery');

      galleryCtrl.gallery = {name: 'mockName', desc: 'mockDesc'};

      galleryCtrl.createGallery();

      this.$httpBackend.flush();

      expect(galleryCtrl.gallery.name).toEqual(null);
      expect(galleryCtrl.gallery.desc).toEqual(null);
      this.$rootScope.$apply();
    });
  });
});
