import React, { useEffect } from "react";
import CalendarPreview from "../components/CalendarPreview";
import { Loader2 as Spinner } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Api, { Schedule } from "../lib/api";
import useCurrentUser from "../hooks/useCurrentUser";

const placeholderAvatar =
  "https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg";

export default function ScheduleEditorPage() {
  const { isLoading, user } = useCurrentUser();

  const navigate = useNavigate();

  function handleLogout() {
    Api.signOut().then(() => navigate("/login"));
  }

  useEffect(() => {
    // Get first item of user schedules
    if (user) {
      Api.getAllSchedules(user.id).then((schedules: Schedule[]) => {
        console.log("schedulecount:" + schedules.length);
        if (schedules.length === 0) {
          // If no user schedules, create default schedule
          Api.createSchedule({
            name: "My Schedule",
            userId: user?.id,
          });
        }
      });
    }
  }, [user]);

  const renderPage = () => (
    <div className="mx-auto min-h-screen flex flex-col items-center justify-center p-8 gap-8">
      <header className="text-center flex-0">
        <h1 className="lg:text-2xl text-lg font-bold">Class Schedule Maker</h1>
        <p className="text-sm">
          Craft your class schedule easily with our intuitive platform.
        </p>
      </header>
      <div className="w-full">
        <CalendarPreview />
      </div>

      {!isLoading && (
        <div className="absolute top-2 right-2 flex gap-2">
          {user?.userType === "ADMIN" && (
            <button
              className="bg-gray-500 rounded-md text-sm"
              onClick={() => navigate("/admin")}
            >
              Admin
            </button>
          )}
          <button
            className="bg-gray-500 rounded-md text-sm"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}

      {!isLoading && user && (
        <div className="absolute top-2 left-2">
          <span className="flex items-center gap-2">
            <img
              src={user.photoUrl ?? placeholderAvatar}
              alt="Avatar"
              className="w-10 h-10 border border-black rounded-full"
            />
            {user.fullName}
          </span>
        </div>
      )}
    </div>
  );

  const renderLoading = () => (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <Spinner className="h-32 w-32 animate-spin" />
      <p>Loading app...</p>
    </div>
  );

  return isLoading ? renderLoading() : renderPage();
}
