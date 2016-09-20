import SessionStore from './session-store';
import RecordStore from './record-store';
import UserStore from './user-store';

import { observable } from 'mobx';

export default {
    session: new SessionStore(),
    records: new RecordStore(),
    users: new UserStore()
}
