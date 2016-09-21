import React, { Component } from 'react';

import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableHighlight,
    Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from '../utils/mobx/connect'

const window = Dimensions.get('window');

const uri = 'http://graph.facebook.com/100001252357122/picture?width=200&height=200&redirect=true';

@connect
export default class Menu extends Component {

    constructor(props, context) {
        super(props);
        this.session = context.store.session;
    }

    action = (fn) => {
        return () => {
            this.props.navigation.closeDrawer();
            fn();
        }
    };

    logout = () => {
        this.session.logout().then(() => {
            Actions.signIn();
        });
    };

    render() {
        var self = this;
        return (
            <ScrollView scrollsToTop={false} style={styles.menu} contentContainerStyle={styles.content}>
                <View style={styles.shortcutsContainer}>
                    <Icon style={styles.shortcut} name="home" size={25}
                          onPress={this.action(() => Actions.records({type: 'reset'}))}
                    />
                    <Icon style={styles.shortcut} name="log-out" size={25}
                          onPress={this.action(this.logout)}
                    />
                </View>

                <TouchableHighlight onPress={this.action(() => Actions.recordFilter({type: 'reset'}))}>
                    <View style={styles.itemContainer}>
                        <Icon style={styles.menuIcon} name="funnel" size={30}/>
                        <Text style={styles.item}>Filter</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.action(() => Actions.records({type: 'reset'}))}>
                    <View style={styles.itemContainer}>
                        <Icon style={styles.menuIcon} name="stopwatch" size={30}/>
                        <Text style={styles.item}>Records</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.action(() => Actions.weeklyReport({type: 'reset'}))}>
                    <View style={styles.itemContainer}>
                        <Icon style={styles.menuIcon} name="back-in-time" size={30}/>
                        <Text style={styles.item}>Weekly Report</Text>
                    </View>
                </TouchableHighlight>

                { this.renderUsersMenu() }
            </ScrollView>
        );
    }

    renderUsersMenu() {
        if (!this.session.isManagerOrAdmin()) {
            return null;
        }
        return (
            <TouchableHighlight onPress={this.action(() => Actions.users({type: 'reset'}))}>
                <View style={styles.itemContainer}>
                    <Icon style={styles.menuIcon} name="users" size={30}/>
                    <Text style={styles.item}>Users</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: '#342E37',
    },
    content: {},
    shortcutsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FA824C',
        padding: 10,
        paddingTop: 30,
    },
    shortcut: {
        flex: 1,
        textAlign: 'center',
        color: 'black'
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 12,
        marginTop: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    item: {
        //fontFamily: 'Bariol-Regular',
        fontSize: 16,
        fontWeight: '300',
        color: 'white',
        marginLeft: 8,
        marginBottom: 4
    },
    menuIcon: {
        color: '#FA824C'
    },
    name: {
        color: '#FA824C',
        fontFamily: 'Optima'
    },
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


