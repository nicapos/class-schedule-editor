import { ClassEvent } from "src/types/calendar";
import { hexToRGBA } from "src/lib/colors";
import { formatTime } from "src/lib/time";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "src/components/ui/context-menu";

type TileComponentProps = { event: ClassEvent; tileColor?: string };

export const CalendarTile: React.FC<TileComponentProps> = ({
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

interface ContextCalendarTileProps extends TileComponentProps {
  handleEdit: (id: string) => void;
  handleDelete: (id: string, name: string) => void;
}

export const ContextCalendarTile: React.FC<ContextCalendarTileProps> = ({
  event,
  tileColor = "#087830",
  handleEdit,
  handleDelete,
}) => {
  const classId = event.id;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <CalendarTile event={event} tileColor={tileColor} />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>{event.title}</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => handleEdit(classId)}>
          Edit
        </ContextMenuItem>
        <ContextMenuItem
          className="text-red-500 hover:font-medium"
          onClick={() => handleDelete(classId, event.title)}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
