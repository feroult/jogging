package jogging.models.record;

import io.yawp.commons.utils.JsonUtils;
import org.junit.Test;

import java.util.Map;

import static org.junit.Assert.assertEquals;

public class RecordWeeklyReportActionTest extends RecordTestCase {

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

    // request a weekly report for a specific user

    private void assertWeeklyReport(Map<String, WeeklyReport> wrs, String week, double expectedAvgSpeed, int expectedAvgDistance) {
        assertEquals(expectedAvgSpeed, wrs.get(week).avgSpeed, 0);
        assertEquals(expectedAvgDistance, wrs.get(week).avgDistance);
    }

}
