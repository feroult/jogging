import { AsyncStorage } from 'react-native';
import { observable } from 'mobx'
import yawp from 'yawp';

import { User } from '../api';

export default class {
    @observable isUserLoggedIn = false;
    @observable currentUser;

    constructor() {
        AsyncStorage.getItem('session')
            .then((session) => JSON.parse(session))
            .then((session) => {
                    console.log('session', session);

                    if (session) {
                        this.isUserLoggedIn = true;
                        this.currentUser = session.user;
                        this.configureAccessToken(session.token);
                    }
                }
            )
        ;
    }

    configureAccessToken(token) {
        yawp.config((c) => {
            console.log('token', token);
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
            return User.me((user) => {
                console.log('saving session');
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
