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
import Api from "src/lib/api";
import { toast } from "sonner";

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

export const ContextCalendarTile: React.FC<TileComponentProps> = ({
  event,
  tileColor = "#087830",
}) => {
  const classId = event.id;

  function handleEdit() {
    alert(`Editing ${classId}`);
  }

  function handleDelete() {
    const confirmationMsg = `Are you sure you want to delete this instance of ${event.title}?\nThis action cannot be undone.`;
    
    if (window.confirm(confirmationMsg) === true) {
      toast.promise(Api.deleteClass(classId), {
        loading: 'Loading...',
        success: () => `'Deleted instance of '${event.title}'`,
        error: `Error in deleting instance of '${event.title}'`,
      });
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <CalendarTile event={event} tileColor={tileColor} />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>{event.title}</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleEdit}>Edit</ContextMenuItem>
        <ContextMenuItem className="text-red-500 hover:font-medium" onClick={handleDelete}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
