package jogging.models.user;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class UserShieldTest extends UserTestCase {

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

        put("/users/john", "{username: 'john-lee', name: 'john lee'}");
        patch("/users/john", "{username: 'john-lee'}");

        User john = id(User.class, "john").fetch();
        assertEquals("john", john.username);
        assertEquals("john lee", john.name);
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
    public void testManagersCannotUpdateOtherUsersRole() {
        assertUserRoleAfterUpdateLoggedAs(Role.MANAGER, Role.USER);
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
        assertUserRoleAfterUpdateLoggedAs(Role.ADMIN, Role.MANAGER);
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

    private void cannotUpdateOtherUserRoleLoggedAs(Role role) {
        assertUserRoleAfterUpdateLoggedAs(role, Role.USER);
    }

    private void assertUserRoleAfterUpdateLoggedAs(Role role, Role newRole) {
        post("/users/sign-up", JOHN_SIGNUP_JSON);

        login("paul", role);
        patch("/users/john", "{role: 'MANAGER'}");

        User john = from(get("/users/john"), User.class);
        assertEquals(newRole, john.role);
    }

    private void cannotChangeItsOwnRoleLoggedAs(Role role) {
        login("paul", role);

        patch("/users/paul", "{role: 'USER'}");

        User paul = from(get("/users/paul"), User.class);
        assertEquals(role, paul.role);
    }

    // TODO: test manager cannot delete admins

}
