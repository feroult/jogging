package jogging.auth;

import jogging.models.user.User;
import jogging.utils.EndpointTestCase;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class AuthUtilsTest extends EndpointTestCase {

    @Test
    public void testAuthTokenCreationAndValidation() {
        User john = from(post("/users/john", "{name: 'john'}"), User.class);

        String token = AuthUtils.createJwtToken(john);
        boolean isValidToken = AuthUtils.validateAndRegisterUser(token);

        assertTrue(isValidToken);
        assertEquals(john.getId(), AuthUtils.getCurrentUserId());
    }

}
