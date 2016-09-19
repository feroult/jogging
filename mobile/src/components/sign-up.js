import React, { Component } from 'react';

import {
    Dimensions,
    AsyncStorage,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight
} from 'react-native';


import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-spinkit';
import Orientation from 'react-native-orientation';

import AuthUtils from '../utils/auth-utils'
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

const window = Dimensions.get('window');

@connect
export default class SignIn extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            waiting: false,
        };
        this.session = context.store.session;
    }

    componentDidMount() {
        this.refs.form.getComponent('name').refs.input.focus();
        userExists = false;
        passwordMismatch = true;
    }

    loading(on) {
        console.log('state', this.state);
        this.state.waiting = on;
        this.setState(this.state);
    }

    signUp = () => {
        var form = this.refs.form;
        var info = form.getValue();
        if (info) {
            this.loading(true);
            this.session.signUp(info).then(() => {
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
    }

    onChange = (value) => {
        this.state.value = value;
        passwordMismatch = value.password !== value.verifyPassword;
        userExists = false;
    }

    render() {
        var self = this;

        return (
            <View style={styles.container}>
                <Form
                    ref="form"
                    type={SignInFormType}
                    options={formOptions}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                { !this.state.waiting ? this.renderButton() : this.renderLoading() }
            </View>
        );
    }

    renderLoading() {
        return (
            <Spinner style={styles.loading} type={'Wave'}/>
        );
    }

    renderButton() {
        return (<TouchableHighlight style={styles.signInButton} onPress={ this.signUp }>
            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>);
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        padding: 20,
        width: window.width,
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
        color: 'white',
    },
    loading: {
        alignSelf: 'center'
    }
});
