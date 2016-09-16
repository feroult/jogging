package jogging.models.user;

import io.yawp.commons.http.annotation.POST;
import io.yawp.repository.shields.Shield;

public class UserShield extends Shield<User> {

    @Override
    public void defaults() {
    }

    @POST
    public void signIn(UserSignInAction.SignInInfo info) {
        allow();
    }

    @POST
    public void signUp(User user) {
        allow();
    }

}
