package jogging.models.user;

import jogging.utils.EndpointTestCase;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

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
    public void testUsersCanUpdateTheirBasicInfo() {
        login("john");

        assertPutWithStatus("/users/john", "{username: 'john', name: 'john lee', password: 'new-pass'}", 200);
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
    public void testUserCannotChangeUsername() {
        login("john");

        put("/users/john", "{username: 'john-lee', name: 'john lee', password: 'new-pass'}");
        patch("/users/john", "{username: 'john-lee'}");

        User john = id(User.class, "john").fetch();
        assertEquals("john", john.username);
        assertEquals("john lee", john.name);
        assertEquals("new-pass", john.password);
    }

    @Test
    public void testPasswordIsNotVisible() {
        login("john");
        patch("/users/john", "{password: 'new-pass'}");

        login("paul", Role.MANAGER);
        String json = get("/users/john");

        assertTrue(json.indexOf("password") == -1);
    }

    @Test
    public void testRegularUsersCannotManageUsers() {
        post("/users/sign-up", JOHN_SIGNUP_JSON);

        login("peter");
        assertGetWithStatus("/users", 404);
        assertPostWithStatus("/users", "{}", 404);
        assertPutWithStatus("/users/john", "{}", 404);
        assertPatchWithStatus("/users/john", "{}", 404);
        assertDeleteWithStatus("/users/john", 404);
    }

    @Test
    public void testManagersCanManageOtherUsers() {
        canManageUsersLoggedAs(Role.MANAGER);
    }

    @Test
    public void testManagersCanUpdateOtherUsersRole() {
        canUpdateOtherUserRoleLoggedAs(Role.MANAGER);
    }

    @Test
    public void testManagersCannotUpdateTheirOwnRole() {
        cannotChangeItsOwnRoleLoggedAs(Role.MANAGER);
    }

    @Test
    public void testAdminsCanManageOtherUsers() {
        canManageUsersLoggedAs(Role.ADMIN);
    }

    @Test
    public void testAdminsCanUpdateOtherUsersRole() {
        canUpdateOtherUserRoleLoggedAs(Role.ADMIN);
    }

    @Test
    public void testAdminsCannotUpdateTheirOwnRole() {
        cannotChangeItsOwnRoleLoggedAs(Role.ADMIN);
    }

    private void canManageUsersLoggedAs(Role role) {
        post("/users/sign-up", JOHN_SIGNUP_JSON);

        login("paul", role);
        assertGetWithStatus("/users", 200);
        assertPostWithStatus("/users", "{username: 'peter', password: 'pass', name: 'peter'}", 200);
        assertPutWithStatus("/users/john", "{username: 'john', password: 'pass', name: 'john'}", 200);
        assertPatchWithStatus("/users/john", "{name: 'john lee'}", 200);
        assertDeleteWithStatus("/users/john", 200);
    }

    private void canUpdateOtherUserRoleLoggedAs(Role role) {
        post("/users/sign-up", JOHN_SIGNUP_JSON);

        login("paul", role);
        patch("/users/john", "{role: 'MANAGER'}");

        User john = from(get("/users/john"), User.class);
        assertEquals(Role.MANAGER, john.role);
    }

    private void cannotChangeItsOwnRoleLoggedAs(Role role) {
        login("paul", role);

        patch("/users/paul", "{role: 'USER'}");

        User paul = from(get("/users/paul"), User.class);
        assertEquals(role, paul.role);
    }
    
}
