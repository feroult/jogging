package jogging.models.record;

import jogging.models.user.Role;
import org.junit.Test;

import java.util.List;

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

        List<WeeklyReport> wrs = fromList(get("/records/weekly-report"), WeeklyReport.class);

        assertWeeklyReport(wrs.get(0), "2016/07/31", 2, (5000 + 5000) / (double) (1800 + 2000), 5000);
        assertWeeklyReport(wrs.get(1), "2016/08/07", 2, (10000 + 10000) / (double) (3600 + 4000), 10000);
    }

    @Test
    public void testWeeklyReportOnlyForUser() {
        login("john");
        postRecord("2016/07/31 10:00:00", 1800, 5000);

        login("paul");
        postRecord("2016/08/01 10:00:00", 2000, 5000);

        login("john");
        List<WeeklyReport> wrs = fromList(get("/records/weekly-report"), WeeklyReport.class);

        assertWeeklyReport(wrs.get(0), "2016/07/31", 1, 5000 / (double) 1800, 5000);
    }

    @Test
    public void testWeeklyReportForASpecificUser() {
        login("john");
        postRecord("2016/07/31 10:00:00", 1800, 5000);

        login("mat", Role.ADMIN);
        List<WeeklyReport> wrs = fromList(get("/records/weekly-report", params("user", "john")), WeeklyReport.class);

        assertWeeklyReport(wrs.get(0), "2016/07/31", 1, 5000 / (double) 1800, 5000);
    }

    private void assertWeeklyReport(WeeklyReport wr, String expectedWeek, int expectedCount, double expectedAvgSpeed, int expectedAvgDistance) {
        assertEquals(expectedWeek, wr.week);
        assertEquals(expectedCount, wr.count);
        assertEquals(expectedAvgSpeed, wr.avgSpeed, 0);
        assertEquals(expectedAvgDistance, wr.avgDistance);
    }

}
