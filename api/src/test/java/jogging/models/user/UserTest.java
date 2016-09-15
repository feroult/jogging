package jogging.models.user;

import jogging.utils.EndpointTestCase;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class UserTest extends EndpointTestCase {

    @Test
    public void testCreate() {
        String json = post("/users", "{name: 'john'}");
        User user = from(json, User.class);

        assertEquals("john", user.name);
    }

}
