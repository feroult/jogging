package jogging.models.user;

import io.yawp.commons.http.HttpException;
import io.yawp.commons.http.annotation.POST;
import io.yawp.repository.IdRef;
import io.yawp.repository.actions.Action;
import io.yawp.repository.query.NoResultException;

public class UserSignUpAction extends Action<User> {

    @POST
    public void signUp(User user) {
        IdRef<User> userId = id(User.class, user.username);
        assertUserDoesntExist(userId);

        user.id = userId;
        yawp.save(user);
    }

    private void assertUserDoesntExist(IdRef<User> userId) {
        try {
            userId.fetch();
            throw new HttpException(409);
        } catch (NoResultException e) {
        }
    }

}
