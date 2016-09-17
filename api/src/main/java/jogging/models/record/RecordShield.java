package jogging.models.record;

import io.yawp.commons.http.annotation.GET;
import io.yawp.repository.shields.Shield;
import jogging.auth.AuthUtils;

public class RecordShield extends Shield<Record> {

    @Override
    public void defaults() {
        allow(isAdmin());
        allow().where("userId", "=", AuthUtils.getCurrentUserId());
    }

    @GET
    public void weeklyReport() {
        allow(!requestContext.hasParam("user") || isAdmin());
    }

    private boolean isAdmin() {
        return AuthUtils.getCurrentUser().isAdmin();
    }

}
