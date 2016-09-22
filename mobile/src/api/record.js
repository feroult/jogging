import yawp from 'yawp';

class Record extends yawp('/records') {

    static all(filter) {
        let q = this.order([{p: 'timestamp', d: 'desc'}]);

        if (filter) {
            if (filter.from) {
                q.where(['timestamp', '>=', filter.from]);
            }
            if (filter.to) {
                q.where(['timestamp', '<=', filter.to]);
            }
        }

        return q.list();
    }

    static weeklyReports() {
        return this.get('weekly-report');
    }
}

export default Record;