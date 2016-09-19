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

// Form Style
var formStylesheet = _.cloneDeep(require('../utils/form/stylesheet'));

var textboxStyle = {
    width: 200,
    height: 40,
}

_.merge(formStylesheet, {
    textbox: {
        normal: textboxStyle,
        error: textboxStyle,
        notEditable: textboxStyle,
    }
});


// Form
import _ from 'lodash';
import t from 'tcomb-form-native';
import textbox from  '../utils/form/textbox'
var Form = t.form.Form;


var SignInFormType = t.struct({
    username: t.String,
    password: t.String
});

var formOptions = {
    stylesheet: formStylesheet,
    auto: 'none',
    fields: {
        username: {
            autoCapitalize: 'none',
            placeholder: 'Username',
            template: textbox
        },
        password: {
            autoCapitalize: 'none',
            password: true,
            secureTextEntry: true,
            placeholder: 'Password',
            template: textbox
        }
    }
};

const window = Dimensions.get('window');

@connect
export default class SignIn extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            loading: false
        };
        this.session = context.store.session;
    }

    componentDidMount() {
        this.refs.form.getComponent('username').refs.input.focus();
    }


    loading(on) {
        this.state.loading = on;
        this.setState(this.state);
    }

    signIn = () => {
        let form = this.refs.form;
        let value = form.getValue();
        if (value) {
            this.loading(true);
            this.session.signIn(value)
                .then(() => {
                    Actions.records();
                })
                .catch(() => {
                    this.loading(false);
                    alert('Invalid username/password');
                });
        }
    };

    onChange = (value) => {
        this.state.value = value;
    };

    renderJoggingLogo() {
        return (
            <View style={styles.logo}>
                <Text style={styles.jogging}>Jo<Text style={styles.gg}>gg</Text>ing</Text>
                <Text style={styles.subTitle}>Take Your Time</Text>
            </View>
        );
    }

    render() {
        var self = this;
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/bg.jpg')}
                    style={styles.bg}
                    resizeMode={Image.resizeMode.cover}>
                    { this.renderJoggingLogo() }<View style={styles.login}>
                    { !this.state.loading ? this.renderSignIn() : null}
                    { this.state.loading ? this.renderWaiting() : null }
                </View>
                </Image>
            </View>
        );
    }

    renderSignIn() {
        return (<View>
            <Form
                ref="form"
                type={SignInFormType}
                options={formOptions}
                onChange={this.onChange}
                value={this.state.value}
            />
            <TouchableHighlight style={styles.signInButton} onPress={this.signIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.signUpButton} onPress={Actions.signUp}>
                <Text style={styles.buttonText}>New Account</Text>
            </TouchableHighlight>
        </View>)
    }

    renderWaiting() {
        return (
            <Spinner type={'Wave'}/>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bg: {
        flex: 1,
        //resizeMode: 'contain', // or 'stretch'
        flexDirection: 'column',
        alignItems: 'center',
        width: window.width,
    },
    logo: {
        marginTop: 200,
        backgroundColor: 'transparent'
    },
    jogging: {
        textAlign: 'center',
        fontSize: 70,
        fontWeight: 'bold',
        marginBottom: 10,
        padding: 4,
        color: '#555'
    },
    gg: {
        color: '#77cc33'
    },
    subTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 30,
        color: '#555'

    },
    login: {},
    signInButton: {
        width: 200,
        height: 50,
        padding: 10,
        borderRadius: 10,
        borderColor: '#444',
        borderWidth: 1,
        backgroundColor: '#3C91E6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpButton: {
        marginTop: 200,
        width: 200,
        height: 50,
        padding: 10,
        borderRadius: 10,
        borderColor: '#444',
        borderWidth: 1,
        backgroundColor: '#3Caa44',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    }
});
