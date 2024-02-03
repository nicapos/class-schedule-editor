import CalendarPreview from "../components/CalendarPreview";

export default function ScheduleEditorPage() {
  return (
    <div className="border container mx-auto min-h-screen flex flex-col items-center justify-center py-8 gap-8">
      <header className="text-center flex-0">
        <h1 className="lg:text-2xl text-lg font-bold">Class Schedule Maker</h1>
        <p className="text-sm">
          Craft your class schedule easily with our intuitive platform.
        </p>
      </header>
      <div className="w-full">
        <CalendarPreview />
      </div>
    </div>
  );
}
