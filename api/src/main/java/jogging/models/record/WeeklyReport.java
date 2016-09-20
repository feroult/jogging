package jogging.models.record;

public class WeeklyReport {

    String week;

    int count;

    double avgSpeed;

    int avgDistance;

    private transient int totalDistance;

    private transient int totalTime;
    
    public WeeklyReport(String week) {
        this.week = week;
    }

    public void addRecord(Record record) {
        acumulate(record);
        averages();
    }

    private void averages() {
        avgSpeed = totalDistance / (double) totalTime;
        avgDistance = totalDistance / count;
    }

    private void acumulate(Record record) {
        totalDistance += record.distance;
        totalTime += record.time;
        count++;
    }
}
