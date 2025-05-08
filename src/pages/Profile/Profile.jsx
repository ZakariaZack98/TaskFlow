import React, { useContext, useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { FaCloudUploadAlt, FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { TaskContext } from "../../contexts/TaskContext";

const auth = getAuth();
const db = getDatabase();

const Profile = () => {
  const {currentUser, setCurrentUser, allCompletedTask} = useContext(TaskContext);
  const [editingName, setEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || "");
  const [completedCount, setCompletedCount] = useState(0);

  // TODO: LOAD CLOUDINARY SCRIPT
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  
  
  // TODO: UPDATE COMPLETED TASK COUNT REAL TIME
  useEffect(() => {
    setCompletedCount(allCompletedTask.length)
  }, [allCompletedTask])

  const openUploadWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dubcsgtfg",
        uploadPreset: "taskflow",
        sources: ['local', 'url', 'camera', 'dropbox', 'unsplash', 'image_search', 'google_drive', 'shutterstock'],
        cropping: true,
        folder: "taskflow-profile",
      },
      async (error, result) => {
        if (!error && result.event === "success") {
          const photoURL = result.info.secure_url;
          const uid = auth.currentUser.uid;
          await Promise.all([updateProfile(auth.currentUser, { photoURL }), update(ref(db, `users/${uid}`), { profile_picture: photoURL })])
            .then(() => {
              toast.success('Profile picture update successful')
            })
            .catch(error => toast.error('Profile picture update failed'))

          setCurrentUser((prev) => ({ ...prev, photoUrl: photoURL }));
        }
      }
    );
    widget.open();
  };

  const handleNameUpdate = async () => {
    const uid = auth.currentUser.uid;
    await Promise.all([updateProfile(auth.currentUser, { displayName }), update(ref(db, `users/${uid}`), { username: displayName })])
      .then(() => {
        toast.success('Username update successful')
      })
      .catch(error => toast.error('Username update failed'))
    setEditingName(false);
  };

  return (
    <div className="w-5/10 mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <img
          src={auth.currentUser?.photoURL || "https://i.pravatar.cc/300"}
          alt="Profile"
          className="w-full h-full object-cover rounded-full border-4 border-[#E44332]"
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer"
          onClick={openUploadWidget}
        >
          <FaCloudUploadAlt className="text-white text-2xl" />
        </div>
      </div>
      <div className="mb-2 text-lg font-semibold text-gray-700 flex justify-center items-center gap-2">
        {editingName ? (
          <>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
            />
            <button
              onClick={handleNameUpdate}
              className="text-[#E44332] font-semibold text-sm cursor-pointer"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span>{auth.currentUser?.displayName || "Unnamed User"}</span>
            <FaEdit
              className="text-gray-400 hover:text-[#E44332] cursor-pointer"
              onClick={() => setEditingName(true)}
            />
          </>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">{auth.currentUser?.email}</p>
      <div className="text-sm text-gray-600">
        <span className="font-semibold text-[#E44332]">{completedCount}</span> tasks completed
      </div>
    </div>
  );
};

export default Profile;
