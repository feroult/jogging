package jogging.models.user;

import io.yawp.commons.http.HttpException;
import io.yawp.commons.http.annotation.POST;
import io.yawp.repository.IdRef;
import io.yawp.repository.actions.Action;
import io.yawp.repository.query.NoResultException;
import jogging.auth.AuthUtils;

public class UserSignInAction extends Action<User> {

    // TODO: encrypt password

    public class SignInInfo {
        String username;
        String password;
    }

    @POST
    public String signIn(SignInInfo info) {

        try {
            IdRef<User> id = id(User.class, info.username);

            User user = id.fetch();
            if (user.password.equals(info.password)) {
                return AuthUtils.createJwtToken(user);
            }

        } catch (NoResultException e) {
        }

        throw new HttpException(400, "invalid username/password");
    }

}
