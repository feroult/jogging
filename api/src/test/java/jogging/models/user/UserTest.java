package jogging.models.user;

import jogging.utils.EndpointTestCase;
import org.junit.Test;

public class UserTest extends EndpointTestCase {

    @Test
    public void testUserSignUp() {
        assertPostWithStatus("/users/sign-up", "{username: 'john', password: 'pass', name: 'john'}", 200);
        assertPostWithStatus("/users/sign-up", "{username: 'john', password: 'pass', name: 'john'}", 409);
    }


}
