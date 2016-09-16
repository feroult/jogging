package jogging.models.record;

public class WeeklyReport {

    double avgSpeed;

    int avgDistance;

    private transient int totalDistance;

    private transient int totalTime;

    private transient int count;

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
