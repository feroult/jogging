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
import Icon from 'react-native-vector-icons/Entypo';

import { connect } from '../utils/mobx/connect';

import Menu from './menu';
import SignIn from './auth/sign-in';
import SignUp from './auth/sign-up';
import RecordList from './records/record-list';
import RecordForm from './records/record-form';
import WeeklyReport from './records/weekly-report';
import UserList from './users/user-list';
import UserForm from './users/user-form';

var window = Dimensions.get('window');

const drawerImage = require('../../assets/burger-menu.png');
const backButtonImage = require('../../assets/back.png');

@connect
class Pages extends Component {

    constructor(props, context) {
        super(props);
        this.session = context.store.session;
    }

    newRecord = () => {
        Actions.recordForm();
    };

    render() {
        return (
            <Router>
                <Scene key="root" navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                    <Scene key="signIn" component={SignIn} hideNavBar={true} type="reset"
                           duration={0}
                           initial={!this.session.isUserLoggedIn}/>
                    <Scene key="signUp" component={SignUp} hideNavBar={false} title="New Account"
                           duration={0}
                           backButtonImage={backButtonImage} leftButtonIconStyle={styles.backButtonIcon}/>
                    <Scene key="records" component={RecordList} hideNavBar={false} title="Records"
                           duration={0}
                           initial={this.session.isUserLoggedIn}
                           getRightTitle={this.addButton} rightButtonStyle={styles.rightButton}
                           onRight={this.newRecord}
                           drawerImage={drawerImage}
                           leftButtonIconStyle={styles.drawerButtonIcon}/>
                    <Scene key="recordForm" component={RecordForm} hideNavBar={false} title="Record"
                           duration={0}
                           backButtonImage={backButtonImage} leftButtonIconStyle={styles.backButtonIcon}/>
                    <Scene key="weeklyReport" component={WeeklyReport} hideNavBar={false} title="Weekly Report"
                           duration={0}
                           drawerImage={drawerImage}
                           leftButtonIconStyle={styles.drawerButtonIcon}/>
                    <Scene key="users" component={UserList} hideNavBar={false} title="Users"
                           duration={0}
                           drawerImage={drawerImage}
                           leftButtonIconStyle={styles.drawerButtonIcon}/>
                    <Scene key="userForm" component={UserForm} hideNavBar={false} title="User"
                           duration={0}
                           backButtonImage={backButtonImage} leftButtonIconStyle={styles.backButtonIcon}/>

                </Scene>
            </Router>
        );
    }

    addButton() {
        return (<Icon style={styles.addButton} name="circle-with-plus" size={28}/>);
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

    closeDrawer() {
        this.drawer.close();
    }

    render() {
        //if (!this.session.isInited) {
        //    return (<Splash />);
        //}

        var menu = <Menu navigation={this}/>;

        //(ref) => this.drawer = ref
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
        marginTop: (Platform.OS === 'ios') ? 4 : 0,
        marginLeft: 6,
        width: 26,
        height: 18,
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
    },
    rightButton: {
        margin: 0,
        padding: 0,
        paddingTop: 3,
        paddingRight: 12,
    },
    addButton: {
        color: '#FA824C',
        marginBottom: 3
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
