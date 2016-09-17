package jogging.models.user;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

public class UserMeActionTest extends UserTestCase {

    @Test
    public void testMe() {
        post("/users/sign-up", JOHN_SIGNUP_JSON);

        login("john");
        User john = from(get("/users/me"), User.class);

        assertEquals("john", john.name);
        assertNull(john.password);
    }

}

