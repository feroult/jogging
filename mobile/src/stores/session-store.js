import { observable } from 'mobx'

import { User } from '../api';

export default class {

    signIn(info) {
        return User.json(info).post('sign-in');
    }

    signUp(info) {
        return User.json(info).post('sign-up');
    }

}
