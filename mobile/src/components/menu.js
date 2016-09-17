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
        this.store = context.store;
    }

    action(fn) {
        return () => {
            this.props.drawer.close();
            fn();
        }
    }

    render() {
        var self = this;
        return (
            <ScrollView scrollsToTop={false} style={styles.menu} contentContainerStyle={styles.content}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri }}/>

                </View>

                <View style={styles.shortcutsContainer}>
                    <Icon style={styles.shortcut} name="home" size={25}
                          onPress={this.action(() => Actions.events())}
                    />
                    <Icon style={styles.shortcut} name="log-out" size={25}
                          onPress={this.action(() => Actions.login())}
                    />
                </View>

                <TouchableHighlight onPress={this.action(() => Actions.events())}>
                    <View style={styles.itemContainer}>
                        <Icon style={styles.menuIcon} name="list" size={30}/>
                        <Text style={styles.item}>Find Events</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => alert('not implemented')}>
                    <View style={styles.itemContainer}>
                        <Icon style={styles.menuIcon} name="heart" size={30}/>
                        <Text style={styles.item}>I am going</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.action(() => Actions.eventNew())}>
                    <View style={styles.itemContainer}>
                        <Icon style={styles.menuIcon} name="circle-with-plus" size={30}/>
                        <Text style={styles.item}>New Event</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => alert('not implemented')}>
                    <View style={styles.itemContainer}>
                        <Icon style={styles.menuIcon} name="edit" size={30}/>
                        <Text style={styles.item}>Edit Events</Text>
                    </View>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: '#342E37',
    },
    content: {},
    avatarContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,

    },
    avatar: {
        //borderWidth: 1,
        //borderColor: '#FAFFFD',
        marginBottom: 10,
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    shortcutsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FA824C',
        padding: 10,
        //paddingTop: 12
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


