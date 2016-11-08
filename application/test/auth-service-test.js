'use strict';

describe('testing auth service', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $q, authService, $window, $httpBackend) => {
      this.$q = $q;
      this.authService = authService;
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.authService.setToken(null);
    this.$window.localStorage.clear();
  });

  describe('testing $q.resolve', () => {
    it('should succeed', () => {
      this.$q.resolve(2)
      .then(num => {
        expect(num).toBe(3);
      });
    });
  });

  describe('testing #getToken()', () => {

    it('should return a token', () => {
      this.authService.token = 'this token';
      this.authService.getToken()
      .then( token => {
        expect(token).toBe('this token');
      });

      this.$rootScope.$apply();
    });
  });

  describe('testing #getToken()', () => {

    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.token = 'another token';
      this.authService.getToken()
      .then( token => {
        expect(token).toBe('another token');
      });

      this.$rootScope.$apply();
    });
  });

  describe('testing authService service.signup', () => {

    it('should return a user', () => {
      let user = {
        username: 'logan',
        email: 'logan@logan.com',
        password: '1234567890',
      };

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/signup', user, headers)
      .respond(200);
      this.authService.signup(user);
      this.$httpBackend.flush();
    });
  });

  describe('testing authService service.login', () => {

    it('should authorize a returning user', () => {
      let user = {
        username: 'logan',
        password: '1234567890',
      };

      let base64 = this.$window.btoa(`${user.username}:${user.password}`);

      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/login', headers)
      .respond(200, '123');

      this.authService.login(user)
      .then( token => {
        expect(token).toBe('123');
      });

      this.$httpBackend.flush();
    });
  });
});
