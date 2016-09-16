package jogging.utils;

import io.yawp.repository.IdRef;
import io.yawp.repository.query.NoResultException;
import io.yawp.testing.EndpointTestCaseBase;
import jogging.auth.AuthUtils;
import jogging.models.user.User;
import jogging.models.user.UserBuilder;
import org.junit.Before;

public class EndpointTestCase extends EndpointTestCaseBase {

    @Before
    public void before() {
        logout();
    }

    protected void login(String username) {
        User user = fetchOrCreateUser(username);
        AuthUtils.setCurrentUser(user);
    }

    protected void logout() {
        AuthUtils.setCurrentUser(null);
    }

    private User fetchOrCreateUser(String username) {
        IdRef<User> userId = id(User.class, username);
        User user;
        try {
            user = userId.fetch();
        } catch (NoResultException e) {
            user = new UserBuilder()
                    .id(userId)
                    .username(username)
                    .name(username).build();
            yawp.save(user);
        }
        return user;
    }

}
