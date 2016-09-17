package jogging.models.record;

import jogging.utils.EndpointTestCase;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class RecordTestCase extends EndpointTestCase {

    private static SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

    protected long timestamp(String datetime) {
        try {
            return format.parse(datetime).getTime();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    protected String postRecord(String datetime, int time, int distance) {
        return post("/records", String.format("{timestamp: %d, time: %d, distance: %d}", timestamp(datetime), time, distance));
    }

}
