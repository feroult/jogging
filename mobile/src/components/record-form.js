import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from '../utils/mobx/connect'
import Spinner from 'react-native-spinkit';
import moment from 'moment';
import _ from 'lodash';

// Form
import t from 'tcomb-form-native';
var Form = t.form.Form;

var RecordFormType = t.struct({
    date: t.Date,
    distance: t.Integer,
    time: t.Integer
});

var formOptions = {
    config: {
        format: (date) => moment(date).format('MMMM Do YYYY, h:mm a')
    },
    fields: {
        distance: {
            label: 'Distance (meters)'
        },
        time: {
            label: 'Time (seconds)'
        }
    }
};

@connect
export default class NewRecord extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            loading: false
        };
        this.records = context.store.records;
    }

    loading(on) {
        this.state.loading = on;
        this.setState(this.state);
    }

    save = () => {
        let form = this.refs.form;
        let value = form.getValue();
        if (value) {
            this.loading(true);
            this.records.save(this.prepareRecord(value)).then(() => {
                Actions.records({type: 'reset'});
            });
        }
    };

    prepareRecord(value) {
        let record = _.cloneDeep(value);
        record.timestamp = record.date.getTime();
        delete record.date;
        return record;
    }

    onChange = (value) => {
        this.state.value = value;
    };

    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref="form"
                    type={RecordFormType}
                    options={formOptions}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                { !this.state.loading ? this.renderButton() : this.renderLoading() }
            </View>
        );
    }

    renderLoading() {
        return (
            <Spinner style={styles.loading} type={'Wave'}/>
        );
    }

    renderButton() {
        return (
            <TouchableHighlight style={styles.saveButton} onPress={ this.save }>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableHighlight>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        padding: 20
    },
    saveButton: {
        height: 50,
        padding: 10,
        borderRadius: 10,
        borderColor: '#444',
        borderWidth: 1,
        backgroundColor: '#3C91E6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white'
    },
    loading: {
        alignSelf: 'center'
    }
});
