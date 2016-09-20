import { AsyncStorage } from 'react-native';
import { observable, computed } from 'mobx'

import { Record } from '../api';

export default class {

    @observable records = [];
    @observable wrs = [];

    all() {
        return this.records.slice();
    }

    weeklyReport() {
        return this.wrs.slice();
    }

    load() {
        return Record.all((records) => {
            this.records = records;
        });
    }

    loadWeeklyReport() {
        return Record.weeklyReports().then((wrs) => {
            this.wrs = wrs;
        });
    }

    reload() {
        return Promise.all([this.load(), this.loadWeeklyReport()]);
    }

    save(record) {
        return new Record(record).save().then(() => this.reload());
    }

    remove(record) {
        return record.destroy().then(() => this.reload());
    }

}
