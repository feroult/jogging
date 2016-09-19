import React, { Component } from 'react';

import {
    Platform,
    Dimensions,
    Text,
    View,
    StyleSheet,
} from 'react-native';

import { Router, Scene, Actions } from 'react-native-router-flux';
import Drawer from 'react-native-drawer';

import { connect } from '../utils/mobx/connect';

import Menu from './menu';
import SignIn from './sign-in';
import SignUp from './sign-up';
import Records from './records';

var window = Dimensions.get('window');

const drawerImage = require('../../assets/burger-menu.png');
const backButtonImage = require('../../assets/back.png');

@connect
class Pages extends Component {

    constructor(props, context) {
        super(props);
        this.store = context.store;
    }

    render() {
        return (
            <Router>
                <Scene key="root" navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                    <Scene key="signIn" component={SignIn} hideNavBar={true} type="reset" initial={true}/>
                    <Scene key="signUp" component={SignUp} hideNavBar={false} title="New Account"/>
                    <Scene key="records" component={Records} hideNavBar={false} title="Records" drawerImage={drawerImage} />
                </Scene>
            </Router>
        );
    }
}

@connect
export default class Navigation extends Component {

    constructor(props, context) {
        super(props);
        this.session = context.store.session;
    }

    componentWillMount() {
        //UserUtils.init(isUserLoggedIn => {
        //    this.session.init(isUserLoggedIn);
        //    if (isUserLoggedIn) {
        //        Actions.events();
        //    }
        //});
    }

    render() {
        //if (!this.session.isInited) {
        //    return (<Splash />);
        //}

        var menu = <Menu drawer={this.drawer}/>;

        return (
            <Drawer
                ref={(ref) => this.drawer = ref}
                type="overlay"
                content={menu}
                disabled={!this.session.isUserLoggedIn}
                acceptDoubleTap
                styles={drawerStyles}
                captureGestures={false}
                tweenDuration={100}
                panThreshold={0.08}
                openDrawerOffset={0.4}
                panOpenMask={0.2}
                tweenHandler={(ratio) => ({
                    mainOverlay: { opacity:ratio/2 }
                })}
                negotiatePan>

                <Pages isUserLoggedIn={this.session.isUserLoggedIn}/>

            </Drawer>
        );
    }
}

var styles = StyleSheet.create({
    drawerButtonIcon: {
        marginTop: (Platform.OS === 'ios') ? 0 : 0,
        marginLeft: 4,
        width: 20,
        height: 14,
    },
    backButtonIcon: {
        marginLeft: 4,
        marginTop: (Platform.OS === 'ios') ? 0 : 0,
        width: 20,
        height: 20,
    },
    navBar: {
        position: 'absolute',
        //paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        width: window.width,
        height: (Platform.OS === 'ios') ? 60 : 50,
        backgroundColor: '#342E37',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    navBarTitle: {
        //fontFamily: 'Roboto-Regular',
        top: (Platform.OS === 'ios') ? 18 : 3,
        textAlign: 'center',
        //marginLeft: 48,
        fontSize: 18,
        color: 'white',
    }

});

const drawerStyles = {
    drawer: {
        borderRightWidth: 1,
        borderRightColor: '#342e38'
    },
    mainOverlay: {
        backgroundColor: 'black',
        opacity: 0
    }
};
