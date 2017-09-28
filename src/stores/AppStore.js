import {EventBus} from "../main";

class AppStore {

  constructor() {
    this.state = {
      user: null,
      users: [],
      canWizz: true,
      wizzing: false,
      theme: 'dark',
      wizzWaitTime: 5000
    }
  }

  setTheme(theme) {
    this.state.theme = theme;
    document.body.setAttribute("class", "");
    document.body.classList.add("theme-" + this.state.theme);
  }

  setCanWizz(value) {
    this.state.canWizz = value;
  }

  toggleTheme() {
    this.state.theme = this.state.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", this.state.theme);
    document.body.setAttribute("class", "");
    document.body.classList.add("theme-" + this.state.theme);
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

  setLoggedUser(user) {
    this.state.user = user;
  }

  removeUser(id) {
    console.log(this.state.users.filter((u) => u.id !== id));
    this.state.users = this.state.users.filter((u) => u.id !== id)
  }

  getUserById(id) {
    return this.state.users.filter(u => u.id === id)[0];
  }

}

export default new AppStore();
