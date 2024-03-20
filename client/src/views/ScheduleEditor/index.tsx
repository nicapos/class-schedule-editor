import React from "react";
import { UploadIcon, DownloadIcon } from "@radix-ui/react-icons"
import CalendarPreview from "src/components/CalendarPreview";
import { Loader2 as Spinner } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddClassModal from "./AddClassModal";

import useCurrentUser from "src/hooks/useCurrentUser";
import useSchedule from "src/hooks/useSchedule";
import { Toaster } from "src/components/ui/sonner";
import { Button } from "src/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar"

const placeholderAvatar =
  "https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg";

export default function ScheduleEditorPage() {
  const { isLoading: isUserLoading, user } = useCurrentUser();
  const { isLoading: isScheduleLoading, schedule, daySchedule } = useSchedule(user?.id);

  const isLoading = isUserLoading || isScheduleLoading;

  const navigate = useNavigate();

  function handleLogout() {
    fetch("https://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/login");
  }

  /**
   * Gets the first two initials, given a name
   * @param name 
   * @returns string of 2 uppercase characters
   */
  function getNameInitials(name: string) {
    const words = name.trim().split(/\s+/);
    let initials = '';
    for (let i = 0; i < Math.min(2, words.length); i++) {
      initials += words[i][0].toUpperCase();
    }
    return initials;
  }

  const renderPage = () => (
    <div className="mx-auto min-h-screen flex flex-col items-center justify-center p-8 gap-8">
      <Toaster richColors expand />

      {/* HEADER */}
      <header className="text-center flex-0">
        <h2 className="lg:text-2xl text-lg font-bold mb-1">
          Class Schedule Maker
        </h2>
        <p className="text-sm">
          Craft your class schedule easily with our intuitive platform.
        </p>
      </header>

      <div className="flex gap-4 w-full">
        <AddClassModal scheduleId={schedule?.id} />
        <Button variant="secondary" className="ml-auto">
          Import Schedule <DownloadIcon className="h-4 w-4 ml-2" />
        </Button>
        <Button variant="outline">
          Export Schedule <UploadIcon className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* SCHEDULE */}
      <div className="w-full">
        <CalendarPreview schedule={daySchedule} />
      </div>

      {!isLoading && (
        <div className="absolute top-2 right-2 flex gap-2">
          {user?.userType === "ADMIN" && (
            <Button variant="ghost" onClick={() => navigate("/admin")}>
              Admin
            </Button>
          )}
          <Button variant="secondary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      )}

      {!isLoading && user && (
        <div className="absolute top-2 left-2">
          <span className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.photoUrl ?? placeholderAvatar} />
              <AvatarFallback>{getNameInitials(user.fullName)}</AvatarFallback>
            </Avatar>
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
