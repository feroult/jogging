import { observable } from 'mobx'

export default class {
    @observable isInited = false;
    @observable isUserLoggedIn = false;

    init(isUserLoggedIn) {
        this.isInited = true;
        this.isUserLoggedIn = isUserLoggedIn;
    }

    login() {
        this.isUserLoggedIn = true;
    }

    logout() {
        this.isUserLoggedIn = false;
    }

}
