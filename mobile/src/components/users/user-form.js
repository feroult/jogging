import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
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

var Role = t.enums({
    USER: 'USER',
    MANAGER: 'MANAGER',
    ADMIN: 'ADMIN'
});

var formOptions = {};

@connect
export default class UserForm extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            loading: false
        };
        this.session = context.store.session;
        this.users = context.store.users;

        this.user = props.user;
        if (this.user) {
            this.state.value = this.prepareValue(this.user);
        }
    }

    getFormType = () => {
        var fields = {
            name: t.String
        };

        if (this.session.isAdmin()) {
            fields.role = Role;
        }

        return t.struct(fields);
    };

    loading(on) {
        this.state.loading = on;
        this.setState(this.state);
    }

    save = () => {
        let form = this.refs.form;
        let value = form.getValue();
        if (value) {
            this.loading(true);
            this.users.save(this.prepareUser(value)).then(() => {
                Actions.users({type: 'reset'});
            });
        }
    };

    remove = () => {
        this.users.remove(this.user).then(() => {
            Actions.users({type: 'reset'});
        });
    };

    prepareValue(user) {
        let value = _.cloneDeep(user);
        return value;
    }

    prepareUser(value) {
        let user = _.cloneDeep(this.user);
        _.assign(user, value);
        return user;
    }

    onChange = (value) => {
        this.state.value = value;
    };

    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref="form"
                    type={this.getFormType()}
                    options={formOptions}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                { !this.state.loading ? this.renderButtons() : this.renderLoading() }
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
                { this.user ? this.renderRemoveButton() : null }
            </View>
        );
    }

    renderSaveButton() {
        return (
            <TouchableHighlight style={styles.saveButton} onPress={ this.save }>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableHighlight>
        );
    }

    renderRemoveButton() {
        return (
            <TouchableHighlight style={styles.removeButton} onPress={ this.remove }>
                <Text style={styles.buttonText}>Remove</Text>
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
    removeButton: {
        marginTop: 20,
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
