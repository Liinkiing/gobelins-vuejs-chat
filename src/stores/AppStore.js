import {EventBus} from "../main";

class AppStore {

  constructor() {
    this.state = {
      user: null,
      users: []
    }
  }

  connectUser(user) {
    this.state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
    EventBus.$emit('user-connected', user);
  }

  disconnectUser() {
    let disconnected = this.state.user;
    this.state.user = null;
    localStorage.removeItem('user');
    EventBus.$emit('user-disconnected', disconnected);
  }

  addUser(user) {
    this.state.users.push(user);
  }

  setLoggedUserId(id) {
    this.state.user.id = id;
  }

  removeUser(id) {
    this.state.users = this.state.users.filter((u) => u.id !== id)
  }

}

export default new AppStore();
