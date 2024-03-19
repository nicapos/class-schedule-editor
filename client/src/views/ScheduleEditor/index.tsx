import React from "react";
import CalendarPreview from "src/components/CalendarPreview";
import { Loader2 as Spinner } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddClassModal from "./AddClassModal";

import useCurrentUser from "src/hooks/useCurrentUser";
import useSchedule from "src/hooks/useSchedule";
import { Toaster } from "src/components/ui/sonner";

const placeholderAvatar =
  "https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg";

export default function ScheduleEditorPage() {
  const { isLoading: isUserLoading, user } = useCurrentUser();
  const { isLoading: isScheduleLoading, schedule } = useSchedule(user?.id);

  const isLoading = isUserLoading || isScheduleLoading;

  const navigate = useNavigate();

  function handleLogout() {
    fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/login");
  }

  const renderPage = () => (
    <div className="mx-auto min-h-screen flex flex-col items-center justify-center p-8 gap-8">
      <Toaster richColors expand />

      {/* HEADER */}
      <header className="text-center flex-0">
        <h2 className="lg:text-2xl text-lg font-bold mb-1">Class Schedule Maker</h2>
        <p className="text-sm">
          Craft your class schedule easily with our intuitive platform.
        </p>
      </header>

      <AddClassModal scheduleId={schedule?.id} />

      {/* SCHEDULE */}
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

  return isUserLoading && isScheduleLoading ? renderLoading() : renderPage();
}
