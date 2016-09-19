import yawp from 'yawp';

class User extends yawp('/users') {

    static signUp(info) {
        return this.json(info).post('sign-up');
    }

    static signIn(info) {
        return this.json(info).post('sign-in');
    }

    static me() {
        return this.get('me');
    }

}

export default User;