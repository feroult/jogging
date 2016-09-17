package jogging.models.user;

import io.yawp.commons.http.annotation.POST;
import io.yawp.repository.IdRef;
import io.yawp.repository.shields.Shield;
import jogging.auth.AuthUtils;

public class UserShield extends Shield<User> {

    @Override
    public void defaults() {
        allow(isManagerUser()).facade(UserFacade.class);
    }

    @Override
    public void update(IdRef<User> id, User user) {
        allow(isManagerUser()).facade(UserFacade.class);
        allow(id.equals(AuthUtils.getCurrentUserId())).facade(UserFacade.class);
    }

    @Override
    public void destroy(IdRef<User> id) {
        allow(isManagerUser() && !id.equals(AuthUtils.getCurrentUserId()));
    }

    @POST
    public void signIn(UserSignInAction.SignInInfo info) {
        allow();
    }

    @POST
    public void signUp(User user) {
        allow();
    }

    private boolean isManagerUser() {
        return AuthUtils.isUserLoggedIn() && AuthUtils.getCurrentUser().isManager();
    }

}
