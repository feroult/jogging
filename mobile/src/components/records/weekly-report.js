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
export default class WeeklyReport extends Component {

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
        return ds.cloneWithRows(this.records.weeklyReport());
    };

    loading(on) {
        this.state.loading = on;
        this.setState(this.state);
    }

    refresh = () => {
        this.records.loadWeeklyReport().then(() => this.loading(false));
    };

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    automaticallyAdjustContentInsets={false}
                    style={styles.listView}
                    dataSource={this.dataSource()}
                    renderRow={this.renderWeeklyReport}
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

    renderWeeklyReport = (wr) => {
        let date = wr.week;
        let distUnit = wr.avgDistance == 1 ? 'meter' : 'meters';
        let runUnit = wr.count == 1 ? 'run' : 'runs';
        let velocity = wr.avgSpeed.toFixed(2);
        return (
            <TouchableHighlight style={styles.highlight}>
                <View style={styles.recordContainer}>
                    <Icon style={styles.recordIcon} name="back-in-time" size={40}/>
                    <View style={styles.rightContainer}>
                        <View style={styles.rightContainerInfo}>
                            <Text style={styles.date}>{date}</Text>
                            <Text style={styles.info}>
                                <Text style={styles.strong}> { wr.avgDistance } </Text>{distUnit} (avg) in
                                <Text style={styles.strong}> { wr.count } </Text>{runUnit}
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
    listView: {
        //top: (Platform.OS === 'ios') ? 60 : 50,
    },
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

