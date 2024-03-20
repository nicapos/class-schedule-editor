import { DaySchedule, ScheduleView, createTheme } from "react-schedule-view";
import { ClassEvent } from "src/types/calendar";
import { ContextCalendarTile } from "./tiles";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const emptyDaySchedule = daysOfWeek.map((day) => ({ name: day, events: [] }));

function CalendarPreview({
  schedule,
}: {
  schedule?: DaySchedule<ClassEvent>[];
}) {
  const theme = createTheme("apple", {
    style: {
      dayLabels: {
        fontWeight: "500",
      },
      timeScaleLabels: {
        fontSize: "50%",
      },
    },
    customTileComponent: ContextCalendarTile,
  });

  return (
    <ScheduleView
      daySchedules={schedule ?? emptyDaySchedule}
      viewStartTime={7}
      viewEndTime={22}
      theme={theme}
    />
  );
}

export default CalendarPreview;
