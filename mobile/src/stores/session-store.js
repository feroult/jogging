import { observable } from 'mobx'

import { User } from '../api';

export default class {
    @observable isUserLoggedIn = false;

    signIn(info) {
        return User.json(info).post('sign-in').then(() => {
            this.isUserLoggedIn = true;
        });
    }

    signUp(info) {
        return User.json(info).post('sign-up');
    }

}
