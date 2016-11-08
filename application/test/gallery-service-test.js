'use strict';

describe('testing gallery service', function(){
  //beforeEach that mocks the demoApp module
  //           that mocks the service.
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

  describe('test galleryService.createGallery method', () => {
    it('should return a gallery', () => {
      let galleryData = {
        name: 'exampleGallery',
        desc: 'my beach adventure',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', galleryData, headers)
      .respond(200, {_id: '5678', name: galleryData.name, desc: galleryData.desc, pics: []});

      this.galleryService.createGallery(galleryData)
      .then(gallery => {
        expect(gallery._id).toBe('5678');
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('test galleryService.fetchGalleries method', () => {
    it('should return a gallery', () => {
      let galleryData = {
        name: 'exampleGallery',
        desc: 'my beach adventure',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/gallery', galleryData, headers)
      .respond(200, {_id: '5678', name: galleryData.name, desc: galleryData.desc, pics: []});

      this.galleryService.Gallery(galleryData)
      .then(gallery => {
        expect(gallery._id).toBe('5678');
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });


  describe('test galleryService.deleteGallery(galleryID)', () => {

    it('should succeed in deleting a gallery', () => {
      let galleryID = 'helloworld';

      let headers = {
        Authorization: 'Bearer 1234',
        Accept: 'application/json, text/plain, */*',
      };

      this.$httpBackend.expectDELETE('http://localhost:3000/api/gallery/helloworld', headers)
      .respond(204);

      this.galleryService.deleteGalleries(galleryID);

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('test galleryService.updateGallery(galleryID)', () => {

    it('should succeed in deleting a gallery', () => {
      let galleryID = 'helloworld';

      let galleryData = {
        name: 'updatedName',
        desc: 'updatedDesc',
      };

      let headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
        Accept: 'application/json',
      };

      this.$httpBackend.expectPUT('http://localhost:3000/api/gallery/helloworld', galleryData, headers)
      .respond(200, {_id: 'helloworld', name: 'updatedName', desc: 'updatedDesc', pics: []});

      this.galleryService.updateGalleries(galleryID, galleryData)
      .then( gallery => {
        expect(gallery._id).toBe(galleryID);
        expect(gallery.name).toBe(galleryData.name);
        expect(gallery.desc).toBe(galleryData.desc);
      });

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
    //
    // it('should respond with a 404', () => {
    //   let headers = {
    //     Authorization: 'Bearer 1234',
    //     Accept: 'application/json, text/plain, */*',
    //   };
    //
    //   this.$httpBackend.whenDELETE('http://localhost:3000/api/gallery/:galleryID', headers)
    //   .respond(function(method, url, data, headers, params){
    //     if(params.galleryID !== '1234'){
    //       return[404, 'NotFoundError'];
    //     }
    //     return [204];
    //   });
    //
    //   this.galleryService.deleteGallery('helloworld')
    //   .catch(err => {
    //     console.log('err');
    //     expect(err.status).toBe('404');
    //   });
    //
    //   this.$httpBackend.flush();
    // });
  // });
});
