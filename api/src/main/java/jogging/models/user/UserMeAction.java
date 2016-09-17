package jogging.models.user;

import io.yawp.commons.http.annotation.GET;
import io.yawp.repository.actions.Action;
import jogging.auth.AuthUtils;

public class UserMeAction extends Action<User> {

    @GET
    public User me() {
        return AuthUtils.getCurrentUser();
    }

}
