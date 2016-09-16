package jogging.models.record;

import jogging.utils.EndpointTestCase;
import org.junit.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class RecordTest extends EndpointTestCase {
    
    private static SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

    @Test
    public void testCreate() {
        login("john");

        String json = postRecord("2016/09/15 10:00:00", 1800, 5000);
        Record record = from(json, Record.class);

        assertEquals("john", record.userId.fetch().getUsername());
        assertEquals(timestamp("2016/09/15 10:00:00"), record.timestamp);
        assertEquals(1800, record.time);
        assertEquals(5000, record.distance);
    }

    private String postRecord(String datetime, int time, int distance) {
        return post("/records", String.format("{timestamp: %d, time: %d, distance: %d}", timestamp(datetime), time, distance));
    }

    @Test
    public void testWeeklyReport() {
        login("john");

        // week 1
        postRecord("2016/07/31 10:00:00", 1800, 5000);
        postRecord("2016/08/01 10:00:00", 2000, 5000);

        // week 2
        postRecord("2016/08/07 10:00:00", 3600, 10000);
        postRecord("2016/08/08 10:00:00", 4000, 10000);

        List<WeeklyReport> wr = fromList(get("/records/weekly-report"), WeeklyReport.class);

        // TODO asserts
    }

    private long timestamp(String datetime) {
        try {
            return format.parse(datetime).getTime();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }


}
