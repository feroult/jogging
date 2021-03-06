import React, { Component } from 'react';

import {
    View,
    Text
} from 'react-native';

import Navigation from './navigation'
import Provider from '../utils/mobx/provider'
import store from '../stores'

const context = {
    store: store
};

console.ignoredYellowBox = ['Warning: Failed propType', 'Warning: In next release empty'];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }

    componentWillMount() {
        context.store.session.init()
            .then(() => this.setState({ready: true}));
    }

    render() {
        if (!this.state.ready) {
            return (<View></View>);
        }
        return (<Provider context={context}><Navigation /></Provider>);
    }

}

export default App;