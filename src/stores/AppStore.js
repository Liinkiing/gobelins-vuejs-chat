class AppStore {

  constructor() {
    this.state = {
      user: null
    }
  }

  connectUser(user) {
    this.state.user = user;
  }

}

export default new AppStore();
