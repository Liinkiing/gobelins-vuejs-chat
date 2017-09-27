import {EventBus} from "../main";

class AppStore {

  constructor() {
    this.state = {
      user: null,
      users: [],
      canWizz: true,
      wizzing: false,
      wizzWaitTime: 5000
    }
  }

  setCanWizz(value) {
    this.state.canWizz = value;
  }

  setWizzing(value) {
    this.state.wizzing = value;
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

  setUsers(users) {
    this.state.users = users;
  }

  setLoggedUserId(id) {
    this.state.user.id = id;
  }

  removeUser(id) {
    this.state.users = this.state.users.filter((u) => u.id !== id)
  }

}

export default new AppStore();
