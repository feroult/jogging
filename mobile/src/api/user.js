import yawp from 'yawp';

class User extends yawp('/users') {

    static all(fn) {
        return this.order([{p: 'name'}]).list(fn);
    }

    static signUp(info) {
        return this.json(info).post('sign-up');
    }

    static signIn(info) {
        return this.json(info).post('sign-in').catch((err) => {
            console.log('ERR', err);
        });
    }

    static me(fn) {
        return this.get('me').then(fn);
    }

}

export default User;