package jogging.models.user;

public class UserBuilder {

    User user;

    public UserBuilder() {
        this.user = new User();
    }

    public UserBuilder username(String username) {
        user.username = username;
        return this;
    }

    public UserBuilder name(String name) {
        user.name = name;
        return this;
    }

    public User build() {
        return user;
    }
}
