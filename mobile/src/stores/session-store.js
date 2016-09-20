import { AsyncStorage } from 'react-native';
import { observable } from 'mobx'
import yawp from 'yawp';

import { User } from '../api';

export default class {
    @observable isUserLoggedIn = false;
    @observable currentUser;

    init() {
        return AsyncStorage.getItem('session')
            .then((session) => JSON.parse(session))
            .then((session) => {
                    if (session) {
                        return this.configureAccessToken(session.token);
                    }
                }
            );
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
        return User.me((user) => {
            this.isUserLoggedIn = true;
            this.currentUser = user;
            return AsyncStorage.setItem('session', JSON.stringify({
                token: token
            }));
        }).catch((error) => {
            console.log('authentication error', error);
            return this.logout();
        });
    }

    signIn(info) {
        return User.signIn(info).then((token) => {
            return this.configureAccessToken(token);
        });
    }

    signUp(info) {
        return User.signUp(info);
    }

    isManagerOrAdmin() {
        if (!this.currentUser) {
            return false;
        }
        return this.currentUser.role === 'MANAGER' || this.currentUser.role === 'ADMIN';
    }

    isAdmin() {
        if (!this.currentUser) {
            return false;
        }
        return this.currentUser.role === 'ADMIN';
    }

    isMe(user) {
        if (!this.currentUser) {
            return false;
        }
        return this.currentUser.id === user.id;
    }

    logout() {
        this.isUserLoggedIn = false;
        this.currentUser = null;
        return AsyncStorage.removeItem('session');
    }

}
