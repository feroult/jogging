import { AsyncStorage } from 'react-native';
import { observable, computed } from 'mobx'

import { Record } from '../api';

export default class {

    @observable records = [];

    save(record) {
        return new Record(record).save().then(() => this.load());
    }

    all() {
        return this.records.slice();
    }

    load() {
        return Record.all((records) => {
            this.records = records;
        })
    }

}
