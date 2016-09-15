package jogging.models.record;

import jogging.utils.EndpointTestCase;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class RecordTest extends EndpointTestCase {

    @Test
    public void testCreate() {
        login("john");

        long timestamp = System.currentTimeMillis();

        String json = post("/records", String.format("{timestamp: %d, time: 1800, distance: 5000}", timestamp));
        Record record = from(json, Record.class);

        assertEquals("john", record.userId.fetch().getUsername());
        assertEquals(timestamp, record.timestamp);
        assertEquals(1800, record.time);
        assertEquals(5000, record.distance);
    }


}
