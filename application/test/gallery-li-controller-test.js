'use strict';

describe('testing gallery-li controller', function(){
  beforeEach(() =>{
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, authService, $httpBackend) => {
      authService.setToken('secrettoken');
      this.authService = authService;
      this.$httpBackend = $httpBackend;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
    });
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe(' testing #deleteDone', () => {
    it('should call deleteDone', () => {
      let mockBindings = {
        gallery: {
          _id: '4567',
          name: 'hello',
          desc: 'informative',
          pics: [],
        },
        deleteDone: function(data){
          expect(data.gallery._id).toBe('4567');
        },
      };

      let galleryLiCtrl = this.$componentController('galleryLi', null, mockBindings);

      galleryLiCtrl.deleteDone({galleryData: galleryLiCtrl.gallery});

      this.$rootScope.$apply();
    });

    it('should call deleteDone', () => {
      let url = 'http://localhost:3000/api/gallery/4567';
      let headers = {
        Authorization: 'Bearer secrettoken',
        Accept: 'application/json, text/plain, */*',
      };

      this.$httpBackend.expectDELETE(url, headers).respond(204);

      let mockBindings = {
        gallery: {
          _id: '4567',
          name: 'hello',
          desc: 'informative',
          pics: [],
        },
        deleteDone: function(data){
          expect(data.gallery._id).toBe(mockBindings.gallery._id);
        },
      };

      let galleryLiCtrl = this.$componentController('galleryLi', null, mockBindings);

      galleryLiCtrl.deleteGallery({galleryData: galleryLiCtrl.gallery});

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
