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
export default class RecordsList extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            loading: false
        };
        this.records = context.store.records;
    }

    componentDidMount() {
        this.refresh();
    }

    dataSource = () => {
        return ds.cloneWithRows(this.records.all());
    };

    loading(on) {
        this.state.loading = on;
        this.setState(this.state);
    }

    refresh = () => {
        this.records.load().then(() => this.loading(false));
    };

    openRecord = (record) => {
        Actions.recordForm({record});
    };

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    automaticallyAdjustContentInsets={false}
                    style={styles.listView}
                    dataSource={this.dataSource()}
                    renderRow={this.renderRecord}
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

    renderRecord = (record) => {
        let date = moment(record.timestamp).format('MMM Do YY, h:mm a');
        let distUnit = record.distance == 1 ? 'meter' : 'meters';
        let timeUnit = record.time == 1 ? 'second' : 'seconds';
        let velocity = (record.distance / record.time).toFixed(2);
        return (
            <TouchableHighlight style={styles.highlight} onPress={() => this.openRecord(record)}>
                <View style={styles.recordContainer}>
                    <Icon style={styles.recordIcon} name="stopwatch" size={40}/>
                    <View style={styles.rightContainer}>
                        <View style={styles.rightContainerInfo}>
                            <Text style={styles.date}>{date}</Text>
                            <Text style={styles.info}>
                                <Text style={styles.strong}> {record.distance} </Text>{distUnit} in
                                <Text style={styles.strong}> {record.time} </Text>{timeUnit}
                            </Text>
                        </View>
                        <View style={styles.rightContainerVelocity}>
                            <Text style={styles.velocity}>{velocity}</Text>
                            <Text>m/s</Text>
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
    recordContainer: {
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
    rightContainerVelocity: {
        width: 40,
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
    date: {
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
    recordIcon: {
        color: "#342E37",
        marginTop: 15,
        marginLeft: 15,
    }
});

