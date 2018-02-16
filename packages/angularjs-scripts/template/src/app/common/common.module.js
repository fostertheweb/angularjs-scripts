import angular from 'angular';
import HomeModule from './home/home.module';

const CommonModule = angular
  .module('app.common', [
    HomeModule
  ])
  .name;

export default CommonModule;
