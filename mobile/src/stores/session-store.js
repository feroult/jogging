import { observable } from 'mobx'

import { User } from '../api';

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

    signUp(info) {
        return User.json(info).post('sign-up');
    }

}
