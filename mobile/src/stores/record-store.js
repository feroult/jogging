import { AsyncStorage } from 'react-native';
import { observable } from 'mobx'

import { Record } from '../api';

export default class {

    @observable records = [];

    save(record) {
        return new Record(record).save();
    }

    all() {
        return this.records.slice();
    }

    load() {
        return Record.list((records) => {
            this.records = records;
        })
    }

}
