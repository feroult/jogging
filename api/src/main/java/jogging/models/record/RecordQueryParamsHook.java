package jogging.models.record;

import io.yawp.repository.hooks.Hook;
import io.yawp.repository.query.QueryBuilder;
import jogging.auth.AuthUtils;
import jogging.models.user.User;

public class RecordQueryParamsHook extends Hook<Record> {

    private static final String FROM_PARAM = "from";

    private static final String TO_PARAM = "to";

    private static final String USER_PARAM = "user";

    @Override
    public void beforeQuery(QueryBuilder<Record> q) {

        if (requestContext.hasParam(FROM_PARAM)) {
            q.and("timestamp", ">=", Long.valueOf(requestContext.getParam(FROM_PARAM)));
        }

        if (requestContext.hasParam(TO_PARAM)) {
            q.and("timestamp", "<=", Long.valueOf(requestContext.getParam(TO_PARAM)));
        }

        if (AuthUtils.getCurrentUser().isAdmin()) {
            if (requestContext.hasParam(USER_PARAM)) {
                q.and("userId", "=", id(User.class, requestContext.getParam(USER_PARAM)));
            }
        }

    }
}
