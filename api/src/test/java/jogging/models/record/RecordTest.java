package jogging.models.record;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;

import jogging.utils.EndpointTestCase;

public class RecordTest extends EndpointTestCase {

    @Test
    public void testCreate() {
        // TODO Auto-generated method stub
        String json = post("/records", "{}");
        Record record = from(json, Record.class);

        assertNotNull(record);
    }

}
