package jogging.models.record;

import io.yawp.repository.IdRef;
import io.yawp.repository.annotations.Endpoint;
import io.yawp.repository.annotations.Id;

@Endpoint(path = "/records")
public class Record {

    @Id
    IdRef<Record> id;

    long timestamp;

    int time;

    int distance;

}
