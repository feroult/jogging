import yawp from 'yawp';

import User from './user';
import Record from './record';

yawp.config((c) => {
    if (__DEV__) {
        c.baseUrl('http://localhost:8080/api');
    } else {
        c.baseUrl('http://baggr.in/api');
    }
});

export { User, Record };
