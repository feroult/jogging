package jogging.models.user;

import io.yawp.repository.IdRef;

public class UserBuilder {

    User user;

    public UserBuilder() {
        this.user = new User();
    }

    public UserBuilder id(IdRef<User> id) {
        user.id = id;
        return this;
    }

    public UserBuilder username(String username) {
        user.username = username;
        return this;
    }

    public UserBuilder password(String password) {
        user.password = password;
        return this;
    }

    public UserBuilder name(String name) {
        user.name = name;
        return this;
    }

    public UserBuilder role(Role role) {
        user.role = role;
        return this;
    }

    public User build() {
        return user;
    }
}
