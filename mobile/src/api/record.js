import yawp from 'yawp';

class Record extends yawp('/records') {

    static all(filter) {
        let q = this.order([{p: 'timestamp', d: 'desc'}]);

        if (filter) {
            var where = [];

            if (filter.from) {
                where = where.concat(['timestamp', '>=', filter.from]);
            }
            if (filter.to) {
                where = where.concat(['timestamp', '<', filter.to]);
            }
            if (filter.user) {
                where = where.concat(['userId', '=', '/users/' + filter.user]);
            }

            q.where(where);
        }

        return q.list();
    }

    static weeklyReports(filter) {
        var params = {};
        if (filter && filter.user) {
            params = {user: filter.user};
        }
        return this.params(params).get('weekly-report');
    }
}

export default Record;