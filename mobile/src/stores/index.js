import SessionStore from './session-store';
import RecordsStore from './records-store';

import { observable } from 'mobx';

export default {
    session: new SessionStore(),
    records: new RecordsStore()
}
