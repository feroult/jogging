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


class App extends Component {

    render() {
        return (<Provider context={context}><Navigation /></Provider>);
    }

}

export default App;