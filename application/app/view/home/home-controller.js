'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$location', 'authService', 'galleryService', HomeController];

function HomeController($log, $rootScope, $location, authService, galleryService){
  $log.debug('init homeCtrl');

  this.today = new Date();

  this.galleries = [];

  this.fetchGalleries = function(){
    galleryService.fetchGalleries()
   .then( galleries => {
     this.galleries = galleries;
     this.currentGallery = galleries[0];
   });
  };

  this.galleryDeleteDone = function(gallery){
    $log.debug('homeCtrl.galleryDeleteDone()');
    if (this.currentGallery._id === gallery._id){
      this.currentGallery = null;
    }
  };

  this.fetchGalleries();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });

  let query = $location.search();
  if (query.token){
    authService.setToken(query.token)
    .then(() => {
      $location.path('/#/home');
    });
  }

  $rootScope.$on('locationChangeSuccess', () => {
    let query = $location.search();
    if (query.token){
      authService.setToken(query.token)
      .then(() => {
        $location.path('/#/home');
      });
    }
  });

  let googleAuthBase = 'https://accounts.google.com/o/oauth2/v2/auth';
  let googleAuthResponseType = 'response_type=code';
  let googleAuthClientID = `client_id=${__GOOGLE_CLIENT_ID__}`;
  let googleAuthScope = 'scope=profile%20email%20openid';
  let googleAuthRedirectUri = 'redirect_uri=http://localhost:3000/api/auth/oauth_callback';
  let googleAuthAccessType = 'access_type=offline';


  this.googleAuthUrl = `${googleAuthBase}?${googleAuthResponseType}&${googleAuthClientID}&${googleAuthScope}&${googleAuthRedirectUri}&${googleAuthAccessType}`;
}
