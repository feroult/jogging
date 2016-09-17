package jogging.models.user;

import io.yawp.repository.IdRef;
import io.yawp.repository.annotations.Endpoint;
import io.yawp.repository.annotations.Id;

@Endpoint(path = "/users")
public class User implements UserFacades.Regular, UserFacades.Manager, UserFacades.Admin {

    @Id
    IdRef<User> id;

    String username;

    String password;

    String name;

    Role role;

    public IdRef<User> getId() {
        return id;
    }

    public void setId(IdRef<User> id) {
        this.id = id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isManager() {
        return role != null && role.equals(Role.MANAGER);
    }

    public boolean isAdmin() {
        return role != null && role.equals(Role.ADMIN);
    }
}
