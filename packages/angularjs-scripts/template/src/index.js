import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-ui-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import 'typeface-roboto';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import CommonModule from './app/common/common.module';
import ComponentsModule from './app/components/components.module';

const AppModule = angular
  .module('app', [
    'ui.router',
    'ui.bootstrap',
    CommonModule,
    ComponentsModule
  ])
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    'ngInject';
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');
  })
  .name;

export default AppModule;

