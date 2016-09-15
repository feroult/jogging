package jogging.models.user;

import io.yawp.commons.http.annotation.POST;
import io.yawp.repository.actions.Action;

public class UserSignInAction extends Action<User> {

    public class SignInInfo {
        String username;
        String password;
    }

    @POST
    public String signIn(SignInInfo info) {
        return null;
    }

}
