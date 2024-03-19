import { useEffect, useState } from "react";
import CalendarPreview from "../components/CalendarPreview";
import { Loader2 as Spinner } from 'lucide-react';
import { useNavigate } from "react-router-dom";

import React from "react";
import Modal from "../components/Modal";
import useCurrentUser from "src/hooks/useCurrentUser";

const placeholderAvatar =
  "https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg";

export default function ScheduleEditorPage() {
  const { isLoading, user } = useCurrentUser();

  // Modals
  const [isAddClassModalOpen, setAddClassModalOpen] = useState<boolean>(false);
  const [isImportScheduleModalOpen, setImportScheduleModalOpen] = useState<boolean>(false);
  const [isExportScheduleModalOpen, setExportScheduleModalOpen] = useState<boolean>(false);
  const [isCreateScheduleModalOpen, setCreateScheduleModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

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

  // ACTION-HANDLERS
  function handleAddClass() {
    setAddClassModalOpen(true);
  }

  function handleExportSchedule() {
    setExportScheduleModalOpen(true);
  }

  function handleImportSchedule() {
    // TODO: View saved schedules
    setImportScheduleModalOpen(true);
  }

  function handleCreateNewSchedule() {
    setCreateScheduleModalOpen(true)
  }

  // UPDATE ACTIONS
  function handleAddClassToCalendar(){
    // TODO: Update Calendar View to add class
    alert('You have added a class to your schedule!');
  }

  function handleExportScheduleConfirmation(){
    // TODO: Save current schedule to database and update UI accordingly.
    alert('Your Schedule has been exported!');
  }

  function handleBlankSchedule(){
    // TODO: Clear current schedule and create a new one with no classes.
    alert('Your Schedule has been reset!');
  }

  const renderPage = () => (
    <div className="mx-auto min-h-screen flex flex-col items-center justify-center p-8 gap-8">
      {/* HEADER */}
      <header className="text-center flex-0">
        <h1 className="lg:text-2xl text-lg font-bold">Class Schedule Maker</h1>
        <p className="text-sm">
          Craft your class schedule easily with our intuitive platform.
        </p>
      </header>

      {/* ACTION-BAR */}
      <div className="action-bar">
        <nav className="flex gap-4">
          <button className="bg-blue-500 rounded-md text-sm" onClick={handleAddClass}>
            Add Class
          </button>
          <button className="bg-blue-500 rounded-md text-sm" onClick={handleImportSchedule}>
            Import Schedule
          </button>
          <button className="bg-blue-500 rounded-md text-sm" onClick={handleExportSchedule}>
            Export Schedule
          </button>
          <button className="bg-blue-500 rounded-md text-sm" onClick={handleCreateNewSchedule}>
            Create New Schedule
          </button>
        </nav>
      </div>
      
      {/* SCHEDULE */}
      <div className="w-full">
        <CalendarPreview />
      </div>

      {!isLoading && <div className="absolute top-2 right-2 flex gap-2">
        {user?.userType === "ADMIN" && <button className="bg-gray-500 rounded-md text-sm" onClick={handleAdmin}>
          Admin
        </button>}
        <button className="bg-gray-500 rounded-md text-sm" onClick={handleLogout}>
          Log out
        </button>
      </div>}

      {!isLoading && user && <div className="absolute top-2 left-2">
        <span className="flex items-center gap-2">
          <img src={user.photoUrl ?? placeholderAvatar} alt="Avatar" className="w-10 h-10 border border-black rounded-full" />
          {user.fullName}
        </span>
      </div>}

      {/* MODALS */}
      {/* Add Class Modal */}
      <Modal isOpen={isAddClassModalOpen} onClose={() =>setAddClassModalOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '3px', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>ADD CLASS</h1>
          <form style={{ width: '100%' }}>
            
            <div style={{ marginBottom: '3px', width: '100%' }}>
            <label style={{ fontWeight: 'bold' }} htmlFor="className">Class Name</label>
              <input type="text" id="className" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '3px', width: '100%' }}>
              <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Day</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', justifyItems: 'center' }}>
                <label style={{ marginBottom: '2px' }}>
                    <input type="checkbox" value="Mon" /> Monday
                </label>
                <label style={{ marginBottom: '2px' }}>
                    <input type="checkbox" value="Tue" /> Tuesday
                </label>
                <label style={{ marginBottom: '2px' }}>
                    <input type="checkbox" value="Wed" /> Wednesday
                </label>
                <label style={{ marginBottom: '2px' }}>
                    <input type="checkbox" value="Thu" /> Thursday
                </label>
                <label style={{ marginBottom: '2px' }}>
                    <input type="checkbox" value="Fri" /> Friday
                </label>
                <label style={{ marginBottom: '2px' }}>
                    <input type="checkbox" value="Sat" /> Saturday
                </label>
                <label style={{ marginBottom: '2px' }}>
                    <input type="checkbox" value="Sun" /> Sunday
                </label>
              </div>
          </div>

            <div style={{ marginBottom: '3px', width: '100%' }}>
              <label style={{ fontWeight: 'bold' }} htmlFor="classStartTime">Class Start Time</label>
              <input type="text" id="classStartTime" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '3px', width: '100%' }}>
              <label style={{ fontWeight: 'bold' }} htmlFor="classEndTime">Class End Time</label>
              <input type="text" id="classEndTime" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '3px', width: '100%' }}>
              <label style={{ fontWeight: 'bold' }} htmlFor="classDescription">Class Description</label>
              <input type="text" id="classDescription" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>
            
            <button
              type="submit"
              className="bg-gray-500 rounded-md text-sm flex gap-4 hover:bg-green-600 hover:text-white"
              style={{ width: '50%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => { handleAddClassToCalendar(); setAddClassModalOpen(false); }}
            >
              Add Class
            </button>
          </form>
        </div>
      </Modal>

      {/* Import Schedule Modal */}
      <Modal isOpen={isImportScheduleModalOpen} onClose={() => setImportScheduleModalOpen(false)}>
        TODO: Add Import Upload Function
      </Modal>

      {/* Export Schedule Modal */}
      <Modal isOpen={isExportScheduleModalOpen} onClose={() => setExportScheduleModalOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem' }}>
            Export Current Schedule?
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <button type="button" className="bg-gray-500 rounded-md text-sm px-4 py-2 text-white hover:bg-gray-600" onClick={() => setExportScheduleModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="bg-red-500 rounded-md text-sm px-4 py-2 text-white hover:bg-green-600 hover:text-white" onClick={() => {setExportScheduleModalOpen(false); handleExportScheduleConfirmation();}}>
              Export
            </button>
          </div>
        </div>
      </Modal>

      {/* Create New Schedule Modal */}
      <Modal isOpen={isCreateScheduleModalOpen} onClose={() => setCreateScheduleModalOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem' }}>Creating a new schedule without saving the current schedule will DELETE your progress. Proceed?</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <button type="button" className="bg-gray-500 rounded-md text-sm px-4 py-2 text-white hover:bg-gray-600" onClick={() => setCreateScheduleModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="bg-red-500 rounded-md text-sm px-4 py-2 text-white hover:bg-red-600 hover:text-white" onClick={() => {handleBlankSchedule(); setCreateScheduleModalOpen(false);}}>
              Proceed
            </button>
          </div>
        </div>
      </Modal>

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
