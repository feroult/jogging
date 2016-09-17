package jogging.auth;

import org.apache.http.HttpStatus;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class SecurityFilter implements Filter {

    private static final String AUTHORIZATION_HEADER = "Authorization";

    private static final String API_URI = "/api/";

    private static final String SIGNUP_URI = "/api/users/sign-up";

    private static final String SIGNIN_URI = "/api/users/sign-in";

    private static final int BEARER_LENGTH = "Bearer".length();

    private Set<String> publicUris = new HashSet<>();

    private Set<String> publicRoots = new HashSet<>();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        publicUris.add(SIGNUP_URI);
        publicUris.add(SIGNIN_URI);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;

        boolean granted = processSecurity(req, resp);

        if (!granted) {
            resp.setStatus(HttpStatus.SC_FORBIDDEN);
            return;
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {

    }

    private boolean processSecurity(HttpServletRequest req, HttpServletResponse resp) {
        if (!isProtected(req)) {
            return true;
        }

        String token = getAccessToken(req);
        if (token == null) {
            return false;
        }

        return AuthUtils.validateAndRegisterUser(token);
    }

    private String getAccessToken(HttpServletRequest req) {
        return req.getHeader(AUTHORIZATION_HEADER).substring(BEARER_LENGTH).trim();
    }

    private boolean isProtected(HttpServletRequest req) {
        return publicUris.contains(req.getRequestURI());
    }

}
