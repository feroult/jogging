import yawp from 'yawp';

class Record extends yawp('/records') {

    static all(filter) {
        let q = this.order([{p: 'timestamp', d: 'desc'}]);

        if (filter) {
            q.where(['timestamp', '>=', filter.from]);
        }

        return q.list();
    }

    static weeklyReports() {
        return this.get('weekly-report');
    }
}

export default Record;