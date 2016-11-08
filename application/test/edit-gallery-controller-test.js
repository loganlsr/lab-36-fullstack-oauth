'use strict';

describe('testing edit gallery controller', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      authService.setToken('1234');
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$componentController = $componentController;
    });
  });

  afterEach(() => {
    this.authService.logout();
  });

  it('testing component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'logan',
        desc: 'description',
      },
    };

    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    console.log('editGalleryCtrl', editGalleryCtrl);
    expect(editGalleryCtrl.gallery.name).toEqual('logan');
    expect(editGalleryCtrl.gallery.desc).toEqual('description');
    this.$rootScope.$apply();
  });
});

describe('testing #updateGallery', () => {
  it('should make a valid PUT request', () => {
    let mockBindings = {
      gallery: {
        _id: '12345',
        name: 'logan',
        desc: 'description',
      },
    };

    let url = 'http://localhost:3000/api/gallery/12345';
    this.$httpBackend.expectPUT(url, {_id: '12345', name: 'newName', desc: 'newDescription'}, headers)
    .respond(200);

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer 1234',
    };

    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    editGalleryCtrl.gallery.name = 'new name';

    editGalleryCtrl.updateGallery();

    this.$httpBackend.flush();
    this.$rootScope.$apply();
  });

});
