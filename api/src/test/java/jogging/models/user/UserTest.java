package jogging.models.user;

import jogging.utils.EndpointTestCase;
import org.junit.Test;

public class UserTest extends EndpointTestCase {

    public static final String JOHN_SIGNUP_JSON = "{username: 'john', password: 'pass', name: 'john'}";

    @Test
    public void testUserSignUp() {
        assertPostWithStatus("/users/sign-up", JOHN_SIGNUP_JSON, 200);
        assertPostWithStatus("/users/sign-up", JOHN_SIGNUP_JSON, 409);
    }

    @Test
    public void testUserSignIn() {
        post("/users/sign-up", JOHN_SIGNUP_JSON);

        assertPostWithStatus("/users/sign-in", "{username: 'john', password: 'pass'}", 200);
        assertPostWithStatus("/users/sign-in", "{username: 'john', password: 'wrong-pass'}", 400);
    }

    @Test
    public void testUsersCanUpdateThemselves() {
        login("john");

        assertPutWithStatus("/users/john", "{username: 'john', name: 'john  lee', password: 'new-pass'}", 200);
        assertPatchWithStatus("/users/john", "{name: 'john lee'}", 200);
    }

    @Test
    public void testUsersCannotDeleteThemselves() {
        login("john");
        assertDeleteWithStatus("/users/john", 404);

        login("paul", Role.MANAGER);
        assertDeleteWithStatus("/users/paul", 404);

        login("mat", Role.ADMIN);
        assertDeleteWithStatus("/users/mat", 404);
    }

    @Test
    public void testRegularUsersCantManageUsers() {
        post("/users/sign-up", JOHN_SIGNUP_JSON);

        login("peter");
        assertGetWithStatus("/users", 404);
        assertPostWithStatus("/users", "{}", 404);
        assertPutWithStatus("/users/john", "{}", 404);
        assertPatchWithStatus("/users/john", "{}", 404);
        assertDeleteWithStatus("/users/john", 404);
    }


    @Test
    public void testManagersCanManageUsers() {
        post("/users/sign-up", JOHN_SIGNUP_JSON);

        login("paul", Role.MANAGER);
        assertGetWithStatus("/users", 200);
        assertPostWithStatus("/users", "{username: 'peter', password: 'pass', name: 'peter'}", 200);
        assertPutWithStatus("/users/john", "{username: 'john', password: 'pass', name: 'john'}", 200);
        assertPatchWithStatus("/users/john", "{name: 'john lee'}", 200);
        assertDeleteWithStatus("/users/john", 200);
    }

    // test admins
    // test users can't delete themselves
    // test users can't change username
}
