import { DaySchedule, ScheduleView, createTheme } from "react-schedule-view";
import { ClassEvent } from "src/types/calendar";
import { ContextCalendarTile } from "./tiles";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const emptyDaySchedule = daysOfWeek.map((day) => ({ name: day, events: [] }));

interface CalendarPreviewProps {
  schedule?: DaySchedule<ClassEvent>[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string, name: string) => void;
}

function CalendarPreview({ schedule, handleEdit, handleDelete }: CalendarPreviewProps) {
  const theme = createTheme("apple", {
    style: {
      dayLabels: {
        fontWeight: "500",
      },
      timeScaleLabels: {
        fontSize: "50%",
      },
    },
    // @ts-ignore
    customTileComponent: (props: any) => (
      <ContextCalendarTile
        {...props}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    ),
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
