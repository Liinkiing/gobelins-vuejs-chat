class User {
  get avatarUrl() {
    return this._avatarUrl;
  }

  get username() {
    return this._username;
  }

  constructor(username) {
    this._username = username
    // this._avatarUrl = require('blueimp-md5')()
  }

}

export default new User()
