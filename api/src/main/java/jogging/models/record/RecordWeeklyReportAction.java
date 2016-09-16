package jogging.models.record;

import io.yawp.commons.http.annotation.GET;
import io.yawp.repository.actions.Action;

import java.util.Collections;
import java.util.List;

public class RecordWeeklyReportAction extends Action<Record> {

    @GET
    public List<WeeklyReport> weeklyReport() {
        return Collections.emptyList();
    }

}
