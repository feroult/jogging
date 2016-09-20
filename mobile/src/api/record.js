import yawp from 'yawp';

class Record extends yawp('/records') {

    static all(fn) {
        return this.order([{p: 'timestamp', d: 'desc'}]).list(fn);
    }
}

export default Record;