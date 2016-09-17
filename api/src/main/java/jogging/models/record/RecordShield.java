package jogging.models.record;

import io.yawp.commons.http.annotation.GET;
import io.yawp.repository.shields.Shield;
import jogging.auth.AuthUtils;

public class RecordShield extends Shield<Record> {

    @Override
    public void defaults() {
        allow().where("userId", "=", AuthUtils.getCurrentUserId());
    }

    @GET
    public void weeklyReport() {
        allow();
    }
    
}
