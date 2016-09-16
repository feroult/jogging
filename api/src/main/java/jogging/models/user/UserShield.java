package jogging.models.user;

import io.yawp.commons.http.annotation.POST;
import io.yawp.repository.IdRef;
import io.yawp.repository.shields.Shield;
import jogging.auth.AuthUtils;

public class UserShield extends Shield<User> {

    @Override
    public void always() {
        allow(AuthUtils.isUserLoggedIn() && AuthUtils.getCurrentUser().role.equals(Role.MANAGER));
    }

    @Override
    public void update(IdRef<User> id, User user) {
        allow(id.equals(AuthUtils.getCurrentUserId()));
    }

    @POST
    public void signIn(UserSignInAction.SignInInfo info) {
        allow(true);
    }

    @POST
    public void signUp(User user) {
        allow(true);
    }

}
