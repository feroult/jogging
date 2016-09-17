package jogging.models.user;

import org.junit.Test;

public class UserSignUpActionTest extends UserTestCase {

    @Test
    public void testUserSignUp() {
        assertPostWithStatus("/users/sign-up", JOHN_SIGNUP_JSON, 200);
        assertPostWithStatus("/users/sign-up", JOHN_SIGNUP_JSON, 409);
    }

}
