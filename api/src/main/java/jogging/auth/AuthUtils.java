package jogging.auth;


import io.yawp.repository.IdRef;
import jogging.models.user.User;

public class AuthUtils {

    private static ThreadLocal<User> currentUser = new ThreadLocal<>();

    public static IdRef<User> getCurrentUserId() {
        return currentUser.get().getId();
    }

    public static User getCurrentUser() {
        return currentUser.get();
    }

    public static void setCurrentUser(User user) {
        currentUser.set(user);
    }

    public static boolean validateAndRegisterUser(String token) {
        // TODO: add jwt token validation
        return true;
    }
}
