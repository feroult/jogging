import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight
} from 'react-native';


import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-spinkit';
import Orientation from 'react-native-orientation';

import { connect } from '../utils/mobx/connect'

// Form
import t from 'tcomb-form-native';
var Form = t.form.Form;

var userExists = false;
var Username = t.refinement(t.String, function (s) {
    return !userExists;
});

var passwordMismatch = true;
var Password = t.refinement(t.String, function (s) {
    return !passwordMismatch;
});

var SignInFormType = t.struct({
    name: t.String,
    username: Username,
    password: Password,
    verifyPassword: Password
});

var formOptions = {
    fields: {
        username: {
            autoCapitalize: 'none',
        },
        password: {
            autoCapitalize: 'none',
            password: true,
            secureTextEntry: true,
        },
        verifyPassword: {
            autoCapitalize: 'none',
            password: true,
            secureTextEntry: true,
        }
    }
};

@connect
export default class SignIn extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            loading: false,
        };
        this.session = context.store.session;
    }

    componentDidMount() {
        this.refs.form.getComponent('name').refs.input.focus();
        userExists = false;
        passwordMismatch = true;
    }

    loading(on) {
        this.state.loading = on;
        this.setState(this.state);
    }

    signUp = () => {
        let form = this.refs.form;
        let value = form.getValue();
        if (value) {
            this.loading(true);
            this.session.signUp(value).then(() => {
                Actions.signIn();
            }).catch((result) => {
                if (result.status == 409) {
                    this.loading(false);
                    userExists = true;
                    form.validate();
                    return;
                }
                throw 'error: ' + result;
            });
        }
    };

    onChange = (value) => {
        this.state.value = value;
        passwordMismatch = value.password !== value.verifyPassword;
        userExists = false;
    }

    render() {
        let self = this;

        return (
            <View style={styles.recordContainer}>
                <Form
                    ref="form"
                    type={SignInFormType}
                    options={formOptions}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                { !this.state.loading ? this.renderButton() : this.renderLoading() }
            </View>
        );
    }

    renderLoading() {
        return (
            <Spinner style={styles.loading} type={'Wave'}/>
        );
    }

    renderButton() {
        return (
            <TouchableHighlight style={styles.signInButton} onPress={ this.signUp }>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableHighlight>
        );
    }

}

var styles = StyleSheet.create({
    recordContainer: {
        flex: 1,
        marginTop: 60,
        padding: 20
    },
    signInButton: {
        height: 50,
        padding: 10,
        borderRadius: 10,
        borderColor: '#444',
        borderWidth: 1,
        backgroundColor: '#3C91E6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white'
    },
    loading: {
        alignSelf: 'center'
    }
});
