package jogging.models.record;

import io.yawp.commons.utils.JsonUtils;
import jogging.models.user.Role;
import jogging.utils.EndpointTestCase;
import org.junit.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;

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

    @Test
    public void testWeeklyReport() {
        login("john");

        // week 1
        postRecord("2016/07/31 10:00:00", 1800, 5000);
        postRecord("2016/08/01 10:00:00", 2000, 5000);

        // week 2
        postRecord("2016/08/07 10:00:00", 3600, 10000);
        postRecord("2016/08/08 10:00:00", 4000, 10000);

        Map<String, WeeklyReport> wrs = JsonUtils.fromMap(yawp, get("/records/weekly-report"), String.class, WeeklyReport.class);

        assertWeeklyReport(wrs, "2016/07/31", (5000 + 5000) / (double) (1800 + 2000), 5000);
        assertWeeklyReport(wrs, "2016/08/07", (10000 + 10000) / (double) (3600 + 4000), 10000);
    }

    @Test
    public void testWeeklyReportOnlyForUser() {
        login("john");
        postRecord("2016/07/31 10:00:00", 1800, 5000);

        login("paul");
        postRecord("2016/08/01 10:00:00", 2000, 5000);

        login("john");
        Map<String, WeeklyReport> wrs = JsonUtils.fromMap(yawp, get("/records/weekly-report"), String.class, WeeklyReport.class);

        assertWeeklyReport(wrs, "2016/07/31", 5000 / (double) 1800, 5000);
    }

    private void assertWeeklyReport(Map<String, WeeklyReport> wrs, String week, double expectedAvgSpeed, int expectedAvgDistance) {
        assertEquals(expectedAvgSpeed, wrs.get(week).avgSpeed, 0);
        assertEquals(expectedAvgDistance, wrs.get(week).avgDistance);
    }

    private long timestamp(String datetime) {
        try {
            return format.parse(datetime).getTime();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
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

    // admins can access other users weekfly report

    private String postRecord(String datetime, int time, int distance) {
        return post("/records", String.format("{timestamp: %d, time: %d, distance: %d}", timestamp(datetime), time, distance));
    }
}
