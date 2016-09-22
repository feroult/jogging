import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from '../../utils/mobx/connect'
import Spinner from 'react-native-spinkit';
import moment from 'moment';
import _ from 'lodash';

// Form
import t from 'tcomb-form-native';
var Form = t.form.Form;

var formOptions = {
    config: {
        format: (date) => moment(date).format('MMMM Do YYYY')
    },
    auto: 'none',
    fields: {
        hasFrom: {
            label: 'From'
        },
        from: {
            mode: 'date'
        },
        hasTo: {
            label: 'To'
        },
        to: {
            mode: 'date'
        },
    }
};

@connect
export default class RecordFilter extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            loading: false,
            changed: false
        };
        this.session = context.store.session;
        this.records = context.store.records;

        if (this.records.hasFilter()) {
            this.state.value = this.prepareValue(this.records.getFilter());
        }
    }

    getFormType = () => {
        var fields = {};

        fields.hasFrom = t.Boolean;
        if (this.state.value && this.state.value.hasFrom) {
            fields.from = t.Date;
        }
        fields.hasTo = t.Boolean;
        if (this.state.value && this.state.value.hasTo) {
            fields.to = t.Date;
        }

        if (this.session.isAdmin()) {

        }

        return t.struct(fields);
    };

    loading(on) {
        this.state.loading = on;
        this.setState(this.state);
    }

    apply = () => {
        let form = this.refs.form;
        let value = form.getValue();
        if (value) {
            this.state.changed = false;
            this.records.applyFilter(this.prepareFilter(value));
        }
    };

    clear = () => {
        this.records.clearFilter();
    };

    prepareFilter(value) {
        let filter = {};
        if (value.from) {
            filter.from = value.from.getTime();
        }
        if (value.to) {
            filter.to = value.to.getTime();
        }
        return filter;
    }

    prepareValue(filter) {
        let value = {};
        if (filter.from) {
            value.hasFrom = true;
            value.from = new Date(filter.from);
        }
        if (filter.to) {
            value.hasTo = true;
            value.to = new Date(filter.to);
        }
        return value;
    }

    onChange = (value) => {
        this.state.value = value;
        this.state.changed = true;
        this.setState(this.state);
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll} scrollsToTop={false}>
                    <Form
                        ref="form"
                        type={this.getFormType()}
                        options={formOptions}
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                    { !this.state.loading ? this.renderButtons() : this.renderLoading() }
                </ScrollView>
            </View>
        );
    }

    renderLoading() {
        return (
            <Spinner style={styles.loading} type={'Wave'}/>
        );
    }

    renderButtons() {
        return (
            <View>
                { this.renderSaveButton() }
                { this.renderRemoveButton() }
            </View>
        );
    }

    renderSaveButton() {
        if (this.records.hasFilter() && !this.state.changed) {
            return null;
        }
        return (
            <TouchableHighlight style={styles.saveButton} onPress={ this.apply }>
                <Text style={styles.buttonText}>Apply</Text>
            </TouchableHighlight>
        );
    }

    renderRemoveButton() {
        if (!this.records.hasFilter()) {
            return null;
        }
        return (
            <TouchableHighlight style={styles.clearButton} onPress={ this.clear }>
                <Text style={styles.buttonText}>Clear</Text>
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
    scroll: {
        flex: 1,
    },
    saveButton: {
        height: 50,
        padding: 10,
        borderRadius: 10,
        borderColor: '#444',
        borderWidth: 1,
        backgroundColor: '#3C91E6',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    clearButton: {
        height: 50,
        padding: 10,
        borderRadius: 10,
        borderColor: '#444',
        borderWidth: 1,
        backgroundColor: '#E64444',
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
