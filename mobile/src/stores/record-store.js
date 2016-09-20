import { AsyncStorage } from 'react-native';
import { observable, computed } from 'mobx'

import { Record } from '../api';

export default class {

    @observable records = [];

    all() {
        return this.records.slice();
    }

    load() {
        return Record.all((records) => {
            this.records = records;
        })
    }

    save(record) {
        return new Record(record).save().then(() => this.load());
    }

    remove(record) {
        return record.destroy().then(() => this.load());
    }

}
