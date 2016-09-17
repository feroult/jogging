package jogging.models.user;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class UserSignUpActionTest extends UserTestCase {

    @Test
    public void testUserSignUp() {
        assertPostWithStatus("/users/sign-up", JOHN_SIGNUP_JSON, 200);

        assertEquals("john", id(User.class, "john").fetch().name);
    }

    @Test
    public void testUsersCannotSignUpTwice() {
        assertPostWithStatus("/users/sign-up", JOHN_SIGNUP_JSON, 200);
        assertPostWithStatus("/users/sign-up", JOHN_SIGNUP_JSON, 409);
    }

}
