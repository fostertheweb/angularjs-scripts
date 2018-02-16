export default class HomeService {
  constructor($log) {
    'ngInject';

    this.$log = $log;
  }

  hello() {
    this.$log('hello');
  }
}
