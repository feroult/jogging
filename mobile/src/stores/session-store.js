import { AsyncStorage } from 'react-native';
import { observable } from 'mobx'

import { User } from '../api';

export default class {
    @observable isUserLoggedIn = false;

    constructor() {
        AsyncStorage.getItem('currentUser').then((currentUser) => {
            if (currentUser) {
                this.isUserLoggedIn = true;
            }
        });
    }

    signIn(info) {
        return User.json(info).post('sign-in').then(() => {
            this.isUserLoggedIn = true;
            return AsyncStorage.setItem('currentUser', JSON.stringify({value: 'x'}));
        });
    }

    signUp(info) {
        return User.json(info).post('sign-up');
    }

    logout() {
        return AsyncStorage.removeItem('currentUser');
    }

}
