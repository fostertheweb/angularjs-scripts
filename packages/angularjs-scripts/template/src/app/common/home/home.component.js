const HomeComponent = {
  template: require('./home.html'),
  controller: class HomeComponent {
    constructor(HomeService) {
      'ngInject';
      this.HomeService = HomeService;
    }

    $onInit() {
      this.HomeService.hello();
    }
  }
};

export default HomeComponent;
