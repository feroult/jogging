package jogging.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.yawp.repository.IdRef;
import jogging.models.user.User;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

import static io.jsonwebtoken.SignatureAlgorithm.HS512;
import static io.yawp.repository.Yawp.yawp;

public class AuthUtils {

    // TODO: move secret to a external config or rotate it periodically
    // TODO: add token expiration

    private static String secret = "secret";

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
        try {
            Jws<Claims> claims = parseJwtToken(token);
            String userIdUri = claims.getBody().getSubject();
            setCurrentUser(fetchUser(userIdUri));
        } catch (Exception e) {
            return false;
        }

        return true;
    }

    public static String createJwtToken(User user) {

        return Jwts.builder()
                .setSubject(user.getId().getUri())
                .signWith(HS512, createSigningKey())
                .compact();
    }

    private static Jws<Claims> parseJwtToken(String token) {
        return Jwts.parser().setSigningKey(createSigningKey()).parseClaimsJws(token);
    }

    private static Key createSigningKey() {
        return new SecretKeySpec(secret.getBytes(), HS512.getJcaName());
    }

    private static User fetchUser(String userIdUri) {
        IdRef<User> userId = IdRef.parse(User.class, yawp(), userIdUri);
        return userId.fetch();
    }

}
