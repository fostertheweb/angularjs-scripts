import angular from 'angular';
import HomeComponent from './home.component';
import HomeService from './home.service';
import './home.scss';

const HomeModule = angular
  .module('home', [])
  .service('HomeService', HomeService)
  .component('home', HomeComponent)
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('home', {
        url: '/',
        component: 'home'
      });
  })
  .name;

export default HomeModule;
