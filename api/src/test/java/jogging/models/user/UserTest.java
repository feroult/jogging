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
    public void testUsersCanUpdateTheirOwnInformation() {
        login("john");

        assertPutWithStatus("/users/john", "{username: 'john', name: 'john  lee', password: 'new-pass'}", 200);
        assertPatchWithStatus("/users/john", "{name: 'john lee'}", 200);
    }

    @Test
    public void testRegularUsersCantManageUsers() {
        post("/users/sign-up", "{username: 'paul', password: 'pass', name: 'paul'}");

        login("john");
        assertGetWithStatus("/users", 404);
        assertPostWithStatus("/users", "{}", 404);
        assertPutWithStatus("/users/paul", "{}", 404);
        assertPatchWithStatus("/users/paul", "{}", 404);
        assertDeleteWithStatus("/users/john", 404);
    }

    @Test
    public void testManagersCanManageUsers() {
        login("paul", Role.MANAGER);
        assertGetWithStatus("/users", 200);
        assertPostWithStatus("/users", "{username: 'peter', password: 'pass', name: 'peter'}", 200);
        assertPutWithStatus("/users/peter", "{username: 'peter', password: 'pass', name: 'peter'}", 200);
        assertPatchWithStatus("/users/peter", "{name: 'peter pan'}", 200);
        assertDeleteWithStatus("/users/peter", 200);
    }

    // test admins
    // test users can't delete themselves
    // test users can't change username
}
