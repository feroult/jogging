package jogging.models.user;

import io.yawp.repository.shields.Shield;

public class UserShield extends Shield<User> {

    @Override
    public void defaults() {
        // TODO Auto-generated method stub
        allow();
    }

}
