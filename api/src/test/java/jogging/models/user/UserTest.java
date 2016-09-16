package jogging.models.user;

import jogging.utils.EndpointTestCase;
import org.junit.Test;

public class UserTest extends EndpointTestCase {

    @Test
    public void testUserSignUp() {
        assertPostWithStatus("/users/sign-up", "{username: 'john', password: 'pass', name: 'john'}", 200);
        assertPostWithStatus("/users/sign-up", "{username: 'john', password: 'pass', name: 'john'}", 409);
    }

    @Test
    public void testUserSignIn() {
        post("/users/sign-up", "{username: 'john', password: 'pass', name: 'john'}");

        assertPostWithStatus("/users/sign-in", "{username: 'john', password: 'pass'}", 200);
        assertPostWithStatus("/users/sign-in", "{username: 'john', password: 'wrong-pass'}", 400);
    }

    @Test
    public void testRegularUsersCantManageUsers() {
        login("john");
        assertGetWithStatus("/users", 404);
        assertPostWithStatus("/users", "{}", 404);
        assertPutWithStatus("/users/john", "{}", 404);
        assertPatchWithStatus("/users/john", "{}", 404);
        assertDeleteWithStatus("/users/john", 404);
    }

}
