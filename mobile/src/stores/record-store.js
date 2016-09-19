import { AsyncStorage } from 'react-native';
import { observable } from 'mobx'

import { Record } from '../api';

export default class {

    save(record) {
        return new Record(record).save();
    }

}
