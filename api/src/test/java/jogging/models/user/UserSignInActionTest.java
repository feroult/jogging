package jogging.models.user;

import org.junit.Test;

public class UserSignInActionTest extends UserTestCase {

    @Test
    public void testUserSignIn() {
        post("/users/sign-up", JOHN_SIGNUP_JSON);

        assertPostWithStatus("/users/sign-in", "{username: 'john', password: 'pass'}", 200);
        assertPostWithStatus("/users/sign-in", "{username: 'john', password: 'wrong-pass'}", 400);
    }

}
