import yawp from 'yawp';

class User extends yawp('/users') {

    static signUp(info) {
        return this.json(info).post('sign-up');
    }

    static signIn(info) {
        return this.json(info).post('sign-in');
    }

    static me(fn) {
        return this.get('me').then(fn);
    }

}

export default User;