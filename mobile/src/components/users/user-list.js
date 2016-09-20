import React, { Component } from 'react';

import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ListView,
    RefreshControl
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from '../../../node_modules/react-native-vector-icons/Entypo';
import moment from 'moment';
import { connect } from '../../utils/mobx/connect';

const window = Dimensions.get('window');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

@connect
export default class UserList extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            loading: false
        };
        this.users = context.store.users;
    }

    componentDidMount() {
        this.refresh();
    }

    dataSource = () => {
        return ds.cloneWithRows(this.users.all());
    };

    loading(on) {
        this.state.loading = on;
        this.setState(this.state);
    }

    refresh = () => {
        this.users.load().then(() => this.loading(false));
    };

    openUser = (user) => {
        Actions.userForm({user});
    };

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    automaticallyAdjustContentInsets={false}
                    style={styles.listView}
                    dataSource={this.dataSource()}
                    renderRow={this.renderUser}
                    refreshControl={
                  <RefreshControl
                    refreshing={this.state.loading}
                    onRefresh={this.refresh}
                  />
                }
                />
            </View>
        );
    }

    renderUser = (user) => {
        return (
            <TouchableHighlight style={styles.highlight} onPress={() => this.openUser(user)}>
                <View style={styles.userContainer}>
                    <Icon style={styles.userIcon} name="user" size={40}/>
                    <View style={styles.rightContainer}>
                        <View style={styles.rightContainerInfo}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.info}>{user.username}</Text>
                        </View>
                        <View style={styles.rightContainerRole}>
                            <Text>{user.role}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

var gap = (Platform.OS === 'ios') ? 65 : 50;

var styles = StyleSheet.create({
    container: {
        marginTop: gap,
        height: window.height - gap
    },
    listView: {},
    userContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 86,
        alignItems: 'flex-start',
    },
    rightContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 8,
        paddingBottom: 15,
        flex: 1,
        height: 86,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

    },
    rightContainerInfo: {
        flexDirection: 'column',
        marginLeft: 8,
        flex: 1
    },
    rightContainerRole: {
        width: 80,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    velocity: {
        fontWeight: 'bold',
        fontSize: 18
    },
    rightContainerIsGoingIcon: {
        color: '#77CC33'
    },
    name: {
        fontSize: 20,
        marginBottom: 8,
        color: 'black'
    },
    info: {
        fontSize: 14,
        color: '#333'
    },
    strong: {
        fontWeight: 'bold'
    },
    userIcon: {
        color: "#342E37",
        marginTop: 15,
        marginLeft: 15,
    }
});

