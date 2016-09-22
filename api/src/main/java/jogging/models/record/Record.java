package jogging.models.record;

import io.yawp.repository.IdRef;
import io.yawp.repository.annotations.Endpoint;
import io.yawp.repository.annotations.Id;
import io.yawp.repository.annotations.Index;
import jogging.models.user.User;

import static jogging.models.record.RecordFacades.*;

@Endpoint(path = "/records")
public class Record implements UpdateFacade {

    @Id
    IdRef<Record> id;

    @Index
    IdRef<User> userId;

    @Index
    long timestamp;

    int time;

    int distance;

    @Override
    public IdRef<Record> getId() {
        return id;
    }

    @Override
    public long getTimestamp() {
        return timestamp;
    }

    @Override
    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public int getDistance() {
        return distance;
    }

    @Override
    public int getTime() {
        return time;
    }

    @Override
    public void setDistance(int distance) {
        this.distance = distance;
    }

    @Override
    public void setTime(int time) {
        this.time = time;
    }

}
