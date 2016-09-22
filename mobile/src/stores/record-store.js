import { AsyncStorage } from 'react-native';
import { observable, computed } from 'mobx'

import { Record } from '../api';

import _ from 'lodash';

export default class {

    @observable records = [];
    @observable wrs = [];
    @observable filter;

    constructor(session) {
        this.session = session;
    }

    all() {
        return this.records.slice();
    }

    weeklyReport() {
        return this.wrs.slice();
    }

    load() {
        return Record.all(this.prepareFilter()).then((records)=> {
                this.records = records;
            }
        );
    }

    loadWeeklyReport() {
        return Record.weeklyReports(this.prepareFilter()).then((wrs) => {
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

    hasFilter() {
        return this.filter != null;
    }

    getFilter() {
        return this.filter;
    }

    applyFilter(filter) {
        this.filter = filter;
    }

    prepareFilter() {
        var currentUser = this.session.getCurrentUser();
        if (!this.session.isAdmin() || (this.filter && this.filter.user) || !currentUser) {
            return this.filter;
        }

        var filter = this.filter ? _.cloneDeep(this.filter) : {};
        filter.user = currentUser.username;
        return filter;
    }

    clearFilter() {
        this.filter = null;
    }
}
