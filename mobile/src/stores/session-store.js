import { AsyncStorage } from 'react-native';
import { observable } from 'mobx'
import yawp from 'yawp';

import { User } from '../api';

export default class {
    @observable isUserLoggedIn = false;
    @observable currentUser;

    constructor() {
        AsyncStorage.getItem('session').then((session) => {
            if (session) {
                this.isUserLoggedIn = true;
                this.currentUser = session.user;
                this.configureAccessToken(session.token);
            }
        });
    }

    configureAccessToken(token) {
        yawp.config((c) => {
            c.defaultFetchOptions({
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
        });
    }

    signIn(info) {
        return User.signIn(info).then((token) => {
            this.configureAccessToken(token);
            User.me((user) => {
                this.isUserLoggedIn = true;
                this.currentUser = user;
                return AsyncStorage.setItem('session', JSON.stringify({
                    user: user,
                    token: token
                }));
            });
        });
    }

    signUp(info) {
        return User.signUp(info);
    }

    logout() {
        return AsyncStorage.removeItem('session');
    }

}
