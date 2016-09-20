package jogging.models.user;


import io.yawp.repository.IdRef;

public class UserFacades {

    public interface Regular {

        IdRef<User> getId();

        String getUsername();

        String getName();

        void setName(String name);

        Role getRole();

    }

    public interface Manager extends Regular {

    }

    public interface Admin extends Manager {

        void setRole(Role role);

    }

}
