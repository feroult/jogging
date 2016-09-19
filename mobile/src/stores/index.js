import SessionStore from './session-store';
import RecordStore from './record-store';

import { observable } from 'mobx';

export default {
    session: new SessionStore(),
    records: new RecordStore()
}
