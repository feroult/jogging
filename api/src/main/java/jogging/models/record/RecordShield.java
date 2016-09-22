package jogging.models.record;

import io.yawp.commons.http.annotation.GET;
import io.yawp.repository.IdRef;
import io.yawp.repository.shields.Shield;
import jogging.auth.AuthUtils;

import static jogging.models.record.RecordFacades.*;

public class RecordShield extends Shield<Record> {

    @Override
    public void defaults() {
        allow(isAdmin());
        allow().where("userId", "=", AuthUtils.getCurrentUserId());
    }

    @Override
    public void update(IdRef<Record> id, Record object) {
        allow(isAdmin()).facade(UpdateFacade.class);
        allow().where("userId", "=", AuthUtils.getCurrentUserId()).facade(UpdateFacade.class);
    }

    @GET
    public void weeklyReport() {
        allow(!requestContext.hasParam("user") || isAdmin());
    }

    private boolean isAdmin() {
        return AuthUtils.getCurrentUser().isAdmin();
    }

}
