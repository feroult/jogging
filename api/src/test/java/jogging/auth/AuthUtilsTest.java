package jogging.auth;

import jogging.models.user.User;
import jogging.utils.EndpointTestCase;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class AuthUtilsTest extends EndpointTestCase {

    @Test
    public void testAuthTokenCreationAndValidation() {
        post("/users/sign-up", "{username: 'john', password: 'pass', name: 'john'}");
        User john = id(User.class, "john").fetch();

        String token = AuthUtils.createJwtToken(john);
        boolean isValidToken = AuthUtils.validateAndRegisterUser(token);

        assertTrue(isValidToken);
        assertEquals(john.getId(), AuthUtils.getCurrentUserId());
    }

    @Test
    public void testInvalidToken() {
        assertFalse(AuthUtils.validateAndRegisterUser("xpto"));
    }

}
