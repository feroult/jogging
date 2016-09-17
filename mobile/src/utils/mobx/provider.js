import React, { Component } from 'react';

import { contextTypes } from './connect'

class Provider extends Component {
    getChildContext() {
        return this.props.context;
    }

    render() {
        return this.props.children;
    }
}

Provider.childContextTypes = contextTypes;

export default Provider