package jogging.models.user;

public interface UserFacade {

    String getUsername();

    void setPassword(String password);

    String getName();

    void setName(String name);

    Role getRole();

}
