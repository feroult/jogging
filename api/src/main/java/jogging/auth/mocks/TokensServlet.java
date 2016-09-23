package jogging.auth.mocks;

import jogging.auth.AuthUtils;
import jogging.models.user.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static io.yawp.repository.Yawp.yawp;

public class TokensServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        printTokens(resp);
    }

    private void printTokens(HttpServletResponse resp) throws IOException {
        resp.setContentType("text/plain");

        PrintWriter pw = new PrintWriter(resp.getOutputStream());

        List<User> users = yawp(User.class).order("name").list();
        for (User user : users) {
            pw.println(user.getName() + " - " + AuthUtils.createJwtToken(user));
        }

        pw.flush();
    }

}
