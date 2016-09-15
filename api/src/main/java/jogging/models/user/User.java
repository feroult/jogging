package jogging.models.user;

import io.yawp.repository.IdRef;
import io.yawp.repository.annotations.Endpoint;
import io.yawp.repository.annotations.Id;

@Endpoint(path = "/users")
public class User {

    @Id
    IdRef<User> id;

    String user;

    String password;

    String name;

    Role role;

    public IdRef<User> getId() {
        return id;
    }
}
