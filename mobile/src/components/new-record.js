import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { connect } from '../utils/mobx/connect'

@connect
export default class NewRecord extends Component {

    constructor(props, context) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello New Record</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        padding: 20,
    }
});
