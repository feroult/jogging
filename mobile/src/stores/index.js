import SessionStore from './session-store';
import RecordStore from './record-store';
import UserStore from './user-store';

import { observable } from 'mobx';

var session = new SessionStore();
var records = new RecordStore(session);
var users = new UserStore();

export default { session, records, users }
