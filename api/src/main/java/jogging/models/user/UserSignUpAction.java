package jogging.models.user;

import io.yawp.commons.http.annotation.POST;
import io.yawp.repository.actions.Action;

public class UserSignUpAction extends Action<User> {

    @POST
    public User signUp(User user) {
        return null;
    }

}
