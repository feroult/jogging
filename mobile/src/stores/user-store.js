import { AsyncStorage } from 'react-native';
import { observable, computed } from 'mobx'

import { User } from '../api';

export default class {

    @observable users = [];

    init() {
        return this.load();
    }

    all() {
        return this.users.slice();
    }

    load() {
        return User.all((users) => {
            this.users = users;
        });
    }

    reload() {
        return this.load();
    }

    save(user) {
        return new User(user).save().then(() => this.reload());
    }

    remove(user) {
        return user.destroy().then(() => this.reload());
    }

}
