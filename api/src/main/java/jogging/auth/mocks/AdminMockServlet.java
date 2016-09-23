package jogging.auth.mocks;

import io.yawp.repository.IdRef;
import io.yawp.repository.query.NoResultException;
import jogging.models.user.Role;
import jogging.models.user.User;
import jogging.models.user.UserBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static io.yawp.repository.Yawp.yawp;

public class AdminMockServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        createAdminIfNotExists();
    }

    private void createAdminIfNotExists() {
        IdRef<User> userId = IdRef.create(yawp(), User.class, "admin");

        try {
            userId.fetch();
        } catch (NoResultException e) {
            User admin = new UserBuilder()
                    .id(userId)
                    .username("admin")
                    .password("admin")
                    .name("admin")
                    .role(Role.ADMIN).build();

            yawp.save(admin);
        }
    }
}
