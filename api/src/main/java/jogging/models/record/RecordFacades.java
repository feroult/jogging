package jogging.models.record;

import io.yawp.repository.IdRef;

public class RecordFacades {

    public interface UpdateFacade {

        IdRef<Record> getId();

        long getTimestamp();

        int getDistance();

        int getTime();

        void setTimestamp(long timestamp);

        void setDistance(int distance);

        void setTime(int time);


    }
}
