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
    public List<WeeklyReport> weeklyReport(Map<String, String> params) {
        List<Record> records = getRecords(params.get("user"));

        Map<String, WeeklyReport> reports = new TreeMap<>();

        for (Record record : records) {
            addRecordToReport(reports, record);
        }

        return convertToList(reports);
    }

    private void addRecordToReport(Map<String, WeeklyReport> reports, Record record) {
        String week = getWeek(record);

        if (!reports.containsKey(week)) {
            reports.put(week, new WeeklyReport(week));
        }

        WeeklyReport wr = reports.get(week);
        wr.addRecord(record);
    }

    private List<Record> getRecords(String user) {
        IdRef<User> userId = user == null ? AuthUtils.getCurrentUserId() : id(User.class, user);
        return yawp(Record.class).where("userId", "=", userId).list();
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

    private List<WeeklyReport> convertToList(Map<String, WeeklyReport> reports) {
        List<WeeklyReport> list = new ArrayList<>();
        for (String week : reports.keySet()) {
            list.add(reports.get(week));
        }
        return list;
    }

}
