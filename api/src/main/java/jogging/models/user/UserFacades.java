package jogging.models.user;


public class UserFacades {

    public interface Regular {

        String getUsername();

        void setPassword(String password);

        String getName();

        void setName(String name);

        Role getRole();

    }

    public interface Manager extends Regular {

        void setRole(Role role);

    }

}
