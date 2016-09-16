package jogging.models.record;

import io.yawp.commons.http.annotation.GET;
import io.yawp.repository.IdRef;
import io.yawp.repository.actions.Action;
import jogging.auth.AuthUtils;
import jogging.models.user.User;

import java.text.SimpleDateFormat;
import java.util.*;

public class RecordWeeklyReportAction extends Action<Record> {

    private SimpleDateFormat weekFormat = new SimpleDateFormat("yyyy/MM/dd");

    @GET
    public Map<String, WeeklyReport> weeklyReport() {
        IdRef<User> userId = AuthUtils.getCurrentUserId();
        List<Record> records = yawp(Record.class).where("userId", "=", userId).list();


        Map<String, WeeklyReport> reports = new TreeMap<>();

        for (Record record : records) {

            String week = getWeek(record);

            if (!reports.containsKey(week)) {
                reports.put(week, new WeeklyReport());
            }

            WeeklyReport wr = reports.get(week);
            wr.addRecord(record);
        }


        return reports;
    }

    private String getWeek(Record record) {
        return weekFormat.format(getWeekStart(record));
    }

    private Date getWeekStart(Record record) {
        Calendar c = Calendar.getInstance();
        c.setTimeInMillis(record.timestamp);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.clear(Calendar.MINUTE);
        c.clear(Calendar.SECOND);
        c.clear(Calendar.MILLISECOND);
        c.set(Calendar.DAY_OF_WEEK, c.getFirstDayOfWeek());
        return c.getTime();
    }

}
