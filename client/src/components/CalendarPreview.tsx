import { DaySchedule, ScheduleView, createTheme } from "react-schedule-view";
import { ClassEvent } from "../types/calendar";
import { hexToRGBA } from "../lib/colors";
import { formatTime } from "../lib/time";

type TileComponentProps = { event: ClassEvent; tileColor?: string };

const CalendarTile: React.FC<TileComponentProps> = ({
  event,
  tileColor = "#087830",
}: TileComponentProps) => (
  <div
    className="flex h-32 select-none flex-col border-l-2 p-1 text-[0.5rem] sm:border-l-4 sm:text-xs md:px-1.5"
    style={{
      backgroundColor: hexToRGBA(tileColor, 0.15),
      color: tileColor,
      borderColor: hexToRGBA(tileColor, 0.75),
    }}
  >
    <span>{formatTime(event.startTime)}</span>
    <span className="mt-[2px] font-semibold">{event.title}</span>
    <span>{event.description}</span>
  </div>
);

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const emptyDaySchedule = daysOfWeek.map((day) => ({ name: day, events: [] }));

function CalendarPreview({ schedule }: { schedule?: DaySchedule<ClassEvent>[] }) {
  const theme = createTheme("apple", {
    style: {
      dayLabels: {
        fontWeight: "500",
      },
      timeScaleLabels: {
        fontSize: "50%",
      },
    },
    customTileComponent: CalendarTile,
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
