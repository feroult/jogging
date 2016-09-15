package jogging.models.record;

import io.yawp.repository.hooks.Hook;
import jogging.auth.AuthUtils;

public class RecordSetUserHook extends Hook<Record> {

    @Override
    public void beforeShield(Record record) {
        record.userId = AuthUtils.getCurrentUserId();
    }

}
