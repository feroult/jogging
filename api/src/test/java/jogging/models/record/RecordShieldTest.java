package jogging.models.record;

import jogging.models.user.Role;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class RecordShieldTest extends RecordTestCase {

    @Test
    public void testUsersCanCreateRecords() {
        login("john");

        String json = postRecord("2016/09/15 10:00:00", 1800, 5000);
        Record record = from(json, Record.class);

        assertEquals("john", record.userId.fetch().getUsername());
        assertEquals(timestamp("2016/09/15 10:00:00"), record.timestamp);
        assertEquals(1800, record.time);
        assertEquals(5000, record.distance);
    }

    @Test
    public void testUsersCanCrudTheirRecords() {
        login("john");
        Record record = from(postRecord("2016/07/31 10:00:00", 1800, 5000), Record.class);

        assertGetWithStatus(record.id.getUri(), 200);
        assertEquals(1, fromList(get("/records"), Record.class).size());

        patch(record.id.getUri(), "{distance: 1000}");
        Record patchedRecord = record.id.fetch();
        assertEquals(1000, patchedRecord.distance);

        assertDeleteWithStatus(record.id.getUri(), 200);
    }

    @Test
    public void testUsersCannotCrudOtherUsersRecords() {
        login("john");
        Record record = from(postRecord("2016/07/31 10:00:00", 1800, 5000), Record.class);

        login("pter");
        assertGetWithStatus(record.id.getUri(), 404);
        assertPatchWithStatus(record.id.getUri(), "{distance: 1000}", 403);
        assertEquals(0, fromList(get("/records"), Record.class).size());
        assertDeleteWithStatus(record.id.getUri(), 403);
    }

    @Test
    public void testAdminsCanCrudOtherUsersRecords() {
        login("john");
        Record record = from(postRecord("2016/07/31 10:00:00", 1800, 5000), Record.class);

        login("mat", Role.ADMIN);

        assertGetWithStatus(record.id.getUri(), 200);
        assertEquals(1, fromList(get("/records"), Record.class).size());

        patch(record.id.getUri(), "{distance: 1000}");
        Record patchedRecord = record.id.fetch();
        assertEquals(1000, patchedRecord.distance);

        assertDeleteWithStatus(record.id.getUri(), 200);
    }

    @Test
    public void testOnlyAdminsCanRequestWeeklyReportsForSpecificUsers() {
        login("john");
        assertGetWithStatus("/records/weekly-report", params("user", "paul"), 404);

        login("mat", Role.ADMIN);
        assertGetWithStatus("/records/weekly-report", params("user", "paul"), 200);
    }

}
