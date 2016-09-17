'use strict'

import React, {
    Component
} from 'react';

import {
    Dimensions,
    AsyncStorage,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';


import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-spinkit';
import Orientation from 'react-native-orientation';

import AuthUtils from '../utils/auth-utils'
import { connect } from '../utils/mobx/connect'

const window = Dimensions.get('window');

@connect
export default class Login extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            waiting: false
        };
        this.session = context.store.session;
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    onLoginFinished(error, result) {
        if (error) {
            alert("Login error = " + result.error);
            return;
        }

        if (result.isCancelled) {
            alert('Login canceled.');
            return;
        }

        this.setState({
            waiting: true
        });

        AuthUtils.init(() => {
            this.session.login();
            Actions.events();
        });
    }

    onLogoutFinished() {
        this.session.logout();
    }

    render() {
        var self = this;

        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/bg.jpg')}
                    style={styles.bg}
                    resizeMode={Image.resizeMode.cover}>
                    { this.renderJoggingLogo() }
                    <View style={styles.login}>
                        { this.state.waiting ? this.renderWaiting() : null }
                    </View>
                </Image>
            </View>
        );
    }

    renderJoggingLogo() {
        return (
            <View style={styles.logo}>
                <Text style={styles.jogging}>Jo<Text style={styles.gg}>gg</Text>ing</Text>
                <Text style={styles.subTitle}>Take Your Time</Text>
            </View>
        );
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
    login: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        bottom: 40,
    }
});
