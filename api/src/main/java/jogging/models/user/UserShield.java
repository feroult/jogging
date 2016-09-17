package jogging.models.user;

import io.yawp.commons.http.annotation.POST;
import io.yawp.repository.IdRef;
import io.yawp.repository.shields.Shield;
import jogging.auth.AuthUtils;

import static jogging.models.user.UserFacades.*;
import static jogging.models.user.UserFacades.Manager;
import static jogging.models.user.UserFacades.Regular;

public class UserShield extends Shield<User> {

    @Override
    public void defaults() {
        allow(isManager()).facade(Manager.class);
        allow(isAdmin()).facade(Admin.class);
    }

    @Override
    public void update(IdRef<User> id, User user) {
        allow(isManager()).facade(Manager.class);
        allow(isAdmin()).facade(Admin.class);
        allow(isCurrentUser(id)).facade(Regular.class);
    }

    @Override
    public void destroy(IdRef<User> id) {
        allow(isManager() && !isCurrentUser(id));
        allow(isAdmin() && !isCurrentUser(id));
    }

    @POST
    public void signIn(UserSignInAction.SignInInfo info) {
        allow();
    }

    @POST
    public void signUp(User user) {
        allow();
    }

    private boolean isManager() {
        return AuthUtils.isUserLoggedIn() && AuthUtils.getCurrentUser().isManager();
    }

    private boolean isAdmin() {
        return AuthUtils.isUserLoggedIn() && AuthUtils.getCurrentUser().isAdmin();
    }

    private boolean isCurrentUser(IdRef<User> id) {
        return id.equals(AuthUtils.getCurrentUserId());
    }

}
