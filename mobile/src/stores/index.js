import SessionStore from './session-store';

import { observable } from 'mobx';

export default {
    session: new SessionStore()
}
