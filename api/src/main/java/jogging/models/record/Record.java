package jogging.models.record;

import io.yawp.repository.IdRef;
import io.yawp.repository.annotations.Endpoint;
import io.yawp.repository.annotations.Id;
import io.yawp.repository.annotations.Index;
import jogging.models.user.User;

@Endpoint(path = "/records")
public class Record {

    @Id
    IdRef<Record> id;

    @Index
    IdRef<User> userId;

    long timestamp;

    int time;

    int distance;

}
