import { useEffect, useState } from "react";
import CalendarPreview from "../components/CalendarPreview";
import { Loader2 as Spinner } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const placeholderAvatar = "https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg";

export default function ScheduleEditorPage() {
  const [isLoading, setLoadingState] = useState<boolean>(true);
  const [name, setName] = useState<string>();
  const [photoURL, setPhotoURL] = useState<string>(placeholderAvatar);
  const [isAdmin, setIsAdmin] = useState<boolean>();

  const navigate = useNavigate();

  function getCurrentUser() {
    fetch("http://localhost:8080/api/user/me", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
      },
      credentials: "include",
    })
      .then(response => response.json())
      .then((data) =>  {
        if (!data.user) {
          // No logged in user. Redirect back to login
          navigate("/login");
          return;
        }

        setName(data.user.full_name);
        setIsAdmin(data.user.user_type === "ADMIN");
        if (data.user.photo_url) {
          setPhotoURL(data.user.photo_url);
        }

        setLoadingState(false);
      });
  }

  function handleLogout() {
    fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/login");
  }

  function handleAdmin() {
    navigate("/admin");
  }

  // Fetch current user on enter page
  useEffect(getCurrentUser, []);

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

      {!isLoading && <div className="absolute top-2 right-2 flex gap-2">
        {isAdmin && <button className="bg-gray-500 rounded-md text-sm" onClick={handleAdmin}>
          Admin
        </button>}
        <button className="bg-gray-500 rounded-md text-sm" onClick={handleLogout}>
          Log out
        </button>
      </div>}

      {!isLoading && <div className="absolute top-2 left-2">
        <span className="flex items-center gap-2">
          <img src={photoURL} alt="Avatar" className="w-10 h-10 border border-black rounded-full" />
          {name}
        </span>
      </div>}
    </div>
  );

  const renderLoading = () => (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <Spinner className="h-32 w-32 animate-spin" />
      <p>Loading app...</p>
    </div>
  )

  return isLoading ? renderLoading() : renderPage();
}
