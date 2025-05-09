import React, { useEffect, useRef, useState } from "react";
import RoundedCheckbox from "../../components/common/RoundedCheckbox";
import { FaAngleDown, FaLock } from "react-icons/fa6";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import BtnPrimary from "../../components/common/BtnPrimary";
import PrioritySelector from "../../components/common/PrioritySelector";
import ProjectSelector from "../../components/common/ProjectSelector";
import DateSelector from "../../components/common/DateSelector";
import _ from "../../lib/lib";
import CommentCard from "../../components/common/CommentCard";
import SubTaskCard from "../../components/common/SubTaskCard"; // Make sure this import exists
import { GetDateNow, GetMilliseconds, GetTimeNow } from "../../utils/utils";
import { onValue, push, ref, set } from "firebase/database";
import { auth, db } from "../../../Database/FirebaseConfig";
import { MdAddPhotoAlternate } from "react-icons/md";
import AddTaskPrompt from "../../components/common/AddTaskPrompt";
import { GoPlusCircle } from "react-icons/go";
import ReminderPropmpt from "../../components/taskpage/ReminderPropmpt";
import LocationPrompt from "../../components/taskpage/LocationPrompt";
import { CgCloseO } from "react-icons/cg";
import { IoMdAlarm } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const TaskPage = ({ taskData, setOpenTaskPage }) => {
  const [currentTaskData, setCurrentTaskData] = useState({});
  const [showSubTasks, setShowSubTasks] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const [subTasks, setSubTasks] = useState(taskData?.subTasks || []);
  const [comments, setComments] = useState(taskData?.comments ? Object.values(taskData?.comments)?.sort((a, b) => b.id - a.id) : []); //Sorting comments latest to oldest
  const [project, setProject] = useState(taskData?.project || 'N/A');
  const [priority, setPriority] = useState(taskData?.priority || 'N/A');
  const [date, setDate] = useState(taskData.date || GetDateNow());
  const [reminder, setReminder] = useState(null);
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');
  const [commentImgUrl, setCommentImgUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [openReminderPrompt, setOpenReminderPrompt] = useState(false);
  const [openLocationPrompt, setOpenLocationPrompt] = useState(false);
  const uploadWidget = useRef(null);


  // * FETCHING REAL TIME DATA & UPDATING STATES SO ANY CHANGES DONE CAN BE DISPLAYED REAL TIME ==========
  useEffect(() => {
    const taskRef = ref(db, `tasks/${auth.currentUser?.uid}/${taskData.id}`)
    const unsubscribe = onValue(taskRef, (taskSnapshot) => {
      if (taskSnapshot.exists()) {
        const updatedData = taskSnapshot.val()
        setCurrentTaskData(updatedData);
        if (updatedData.subTasks) {
          if (typeof updatedData.subTasks === 'object' && !Array.isArray(updatedData.subTasks)) {
            setSubTasks(Object.values(updatedData.subTasks));
          } else {
            setSubTasks(updatedData.subTasks || []);
          }
        } else {
          setSubTasks([]);
        }
        if (updatedData.comments) {
          setComments(Object.values(updatedData.comments).sort((a, b) => b.id - a.id) || []);
        } else {
          setComments([]);
        }
        setProject(updatedData.project || 'Personal');
        setPriority(updatedData.priority || 3)
        setDate(updatedData.date || new Date().toDateString())
        setReminder(updatedData.reminder || null);
        setLocation(updatedData.location || '');
      }
    })
    return () => unsubscribe();
  }, [taskData?.id])


  // * CLOUDINARY UPLOAD WIDGET HANDLER ==============================================
  useEffect(() => {
    const loadCloudinary = () => {
      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/latest/global/all.js';
      script.async = true;
      script.onload = initializeWidget;
      document.body.appendChild(script);
    };

    const initializeWidget = () => {
      if (!window.cloudinary) return;

      uploadWidget.current = window.cloudinary.createUploadWidget(
        {
          cloudName: "dubcsgtfg",
          uploadPreset: "taskflow",
          sources: ['local', 'url', 'camera', 'dropbox', 'unsplash', 'image_search', 'google_drive', 'shutterstock'],
          multiple: false,
          cropping: false,
          folder: "group_dp",
          resourceType: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error);
            setUploadError("Upload failed. Please try again.");
            setIsUploading(false);
            return;
          }

          if (result.event === "success") {
            setCommentImgUrl(result.info.secure_url);
            setTimeout(() => {
              setIsUploading(false);
              setUploadError(null);
            }, 500); // Small delay to prevent rapid successive uploads
          }

          if (result.event === "close") {
            setIsUploading(false);
          }
        }
      );
    };

    if (!window.cloudinary) {
      loadCloudinary();
    } else {
      initializeWidget();
    }

    return () => {
      if (uploadWidget.current?.close) {
        uploadWidget.current.close();
      }
    };
  }, [auth.currentUser.uid, db]);

  const handleCommentPhotoUpload = () => {
    if (!uploadWidget.current || isUploading) return;
    setIsUploading(true);
    setUploadError(null);
    uploadWidget.current.open();
  };

  const getIconClickHandler = (name) => {
    if (name === 'closePopup') {
      setOpenTaskPage(false);
      console.log('closed');
    }
  };

  const handleUpdateTask = async () => {
    const updatedTask = { ...currentTaskData };
    updatedTask.subTasks = subTasks;
    updatedTask.comments = comments;
    updatedTask.project = project;
    updatedTask.priority = priority;
    updatedTask.date = date;
    updatedTask.deadline = GetMilliseconds(date + ` ${new Date().toDateString().split(' ')[3]}`);
    updatedTask.reminder = reminder;
    updatedTask.location = location;
    const newActivity = {
      createdAt: GetTimeNow(),
      timeStamp: Date.now(),
      type: 'update',
      taskId: taskData.id,
      taskTitle: taskData.title,
      message: 'You have updated '
    };
    const taskRef = ref(db, `tasks/${auth.currentUser?.uid}/${taskData.id}`);
    const activityRef = ref(db, `/activity/${auth.currentUser?.uid}`);
    try {
      await Promise.all([set(taskRef, updatedTask), push(activityRef, newActivity)]);
      toast.success('Task updated.')
    } catch (error) {
      toast.error('Task update failed: ', error);
      console.error(error);
    } finally {
      setOpenTaskPage(false);
    }
  }

  const handleComment = async () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      text: comment,
      imgUrl: commentImgUrl,
      createdAt: GetTimeNow(),
      commenterId: auth.currentUser?.uid
    }
    const newActivity = {
      createdAt: GetTimeNow(),
      timeStamp: Date.now(),
      type: 'comment',
      taskId: taskData.id,
      taskTitle: taskData.title,
      comment,
      message: `You have added a comment to- `
    }
    const commentRef = ref(db, `tasks/${auth.currentUser?.uid}/${taskData?.id}/comments/${newComment.id}`);
    const activityRef = ref(db, `activity/${auth.currentUser?.uid}`)
    try {
      await Promise.all([set(commentRef, newComment), push(activityRef, newActivity)])
      console.log('comment added');
      setComment('')
      setCommentImgUrl('')
    } catch (error) {
      console.error('Error posting comment', error.message);
    }
  }


  return (
    <div className={`absolute top-0 left-0 w-svw h-svh z-10 text-[16px]`}>
      <div className="backdrop absolute w-svw h-svh bg-[rgba(0,0,0,0.47)]"></div>
      <div className="absolute w-full h-full flex justify-center items-center">
        <div
          className="w-6/10 h-9/10 flex justify-center items-center rounded-xl bg-white "
          style={{ boxShadow: "0 0 10 10 rgba(0, 0, 0, 0.97)" }}>
          <div className="w-[96%] h-[94%]">
            {/* ================================= HEADING PART =============================================== */}
            <div className="heading flex justify-between border-b-2 border-accentMain pb-2">
              <div className="left flex items-center">
                <RoundedCheckbox />
                <div className="taskName flex flex-col">
                  <p className="font-semibold text-sm">{currentTaskData?.title || "Title Missing"}</p>
                  <div className="text-[12px] text-fontSecondery">in {currentTaskData?.project || "N/A"}</div>
                </div>
              </div>
              <div className="iconSec flex items-center gap-x-3">
                {_.taskPageIcons.map(({ name, icon: IconComponent }) => (
                  <span
                    className="text-2xl opacity-50 cursor-pointer hover:text-accentMain"
                    key={name}
                    onClick={() => getIconClickHandler(name)}>
                    <IconComponent />
                  </span>
                ))}
              </div>
            </div>
            <div className="relative taskBody w-full h-[90%] flex">
              {/* ===================================== LEFT SIDE MARKUP ================================================= */}
              {/* =========================== HEADING PART ================================ */}
              <div className="main h-full w-7/10 p-3 overflow-y-scroll ">
                <div className="flex items-center gap-x-2">
                  <h3 className="text-2xl font-semibold text-accentMain">{currentTaskData?.title || "Take my cat to the vet"}</h3>
                  {
                    //? OVERDUE TAG IF DEADLINE HAVE CROSSED ===
                    taskData.deadline < GetMilliseconds(new Date().toDateString()) && taskData.status !== 'completed' && (
                      <span className="text-sm px-1 rounded border-2 border-red-600 text-red-600 font-semibold">overdue</span>
                    )
                  }
                </div>
                <div className="flex items-center gap-x-1">
                  <span className="text-xl">
                    <HiOutlineBars3BottomLeft />
                  </span>
                  <p className=" text-fontSecondery my-5">
                    {currentTaskData?.desc || "No Description"}
                  </p>
                </div>
                {/* ========================== SUB TASKS SECTION ============================= */}
                <div className="subTaskSec mt-3 flex items-center gap-x-1 px-2 text-lg" >
                  <span className="text-xl cursor-pointer text-fontSecondery" onClick={() => setShowSubTasks((prev) => !prev)}>
                    {showSubTasks ? (
                      <FaAngleDown className="rotate-0 duration-200" />
                    ) : (
                      <FaAngleDown className=" -rotate-90 duration-200" />
                    )}
                  </span>
                  <p className="font-semibold  text-fontSecondery">Sub tasks:</p>
                  {/* {subTasks?.length > 0 && (
                      <span>
                        task: {subTasks?.filter((task) => task.status === "complete").length || 0} / {subTasks.length}
                      </span>
                    )} */}
                </div>
                <div
                  className={`${showSubTasks ? "h-fit" : "h-0 opacity-0"
                    } subTaskList mx-3 duration-300 `}>
                  <div className="flex items-center gap-x-1 px-4">
                    {
                      taskData.status !== 'completed' && (
                        <span className="-translate-y-2 relative z-50">
                          <AddTaskPrompt isSubTask={true} motherTaskId={taskData.id} />
                        </span>
                      )
                    }
                  </div>
                  {Array.isArray(subTasks) && subTasks.length > 0 && (
                    <div className="subtasks-container pl-2 w-9/10 mx-auto">
                      {subTasks.map((subtask, idx, arr) => (
                        <div className={idx < arr.length - 1 ? 'border-b border-[rgba(0,0,0,0.25)]' : ''}>
                          <SubTaskCard
                            key={subtask.id}
                            subTaskData={subtask}
                            motherTaskId={taskData.id}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* ============================ COMMENT SECTION ================================= */}
                <div className="commentSec flex items-center gap-x-1 px-2">
                  <span className="text-xl cursor-pointer text-fontSecondery" onClick={() => setShowComments((prev) => !prev)}>
                    {showComments ? (
                      <FaAngleDown className="rotate-0 duration-200" />
                    ) : (
                      <FaAngleDown className=" -rotate-90 duration-200" />
                    )}
                  </span>
                  <p className="font-semibold py-3 text-md text-fontSecondery">Comments:</p>
                </div>
                <div className={`${showComments ? "h-[100%]" : "h-0 opacity-0"} mx-3 pb-2 duration-300`}>
                  <div className="addComment flex items-center">
                    <div className="flex gap-x-2 my-2  w-full">
                      <picture>
                        <img src={auth.currentUser?.photoURL || `https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png`} className="w-8 h-8 rounded-full bg-cover bg-center" alt="User" />
                      </picture>
                      <div className="inputField relative w-100 z-40">
                        <input
                          type="text"
                          className="px-2 py-1 rounded-md border-[3px] border-accentMain w-full "
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                        />
                        {
                          commentImgUrl.length === 0 && (
                            <div className="absolute right-2 top-1/2 -translate-y-[50%] text-fontSecondery text-xl cursor-pointer" onClick={() => handleCommentPhotoUpload()}>
                              <MdAddPhotoAlternate />
                            </div>
                          )
                        }
                      </div>
                      {
                        commentImgUrl && commentImgUrl.length !== 0 && (
                          <picture>
                            <img src={commentImgUrl} alt="Comment attachment" className="rounded-md h-10" />
                          </picture>
                        )
                      }
                      <BtnPrimary label={'Comment'} clickHandler={() => handleComment()} />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-y-1">
                    {
                      comments?.map((comment, idx) => <CommentCard key={comment.id || idx} commentData={comment} />)
                    }
                  </div>
                </div>
              </div>
              {/* ===================================== LEFT SIDE MARKUP ENDS ================================================= */}
              {/* ======================================== SIDEBAR MARKUP STARTS ========================================== */}
              <div className={`sidebar h-full w-3/10 bg-sidebarMain p-5 relative overflow-y-scroll ${taskData.status === 'completed' ? ' pointer-events-none cursor-not-allowed opacity-50' : ''}`} style={{ scrollbarWidth: 'none' }}>
                <div className="project border-b border-[rgba(0,0,0,0.14)] pb-2">
                  {/* ================================= PROJECT SELECTION ===================================== */}
                  <p className="font-semibold text-sm">Projects</p>
                  <ProjectSelector project={project} setProject={setProject} />
                </div>
                {/* ================================= DATE SELECTION ===================================== */}
                <div className="date cursor-pointer relative border-b border-[rgba(0,0,0,0.14)]">
                  <p className="text-sm text-secondary translate-y-2" >Date</p>
                  <DateSelector date={date} setDate={setDate} deadline={taskData?.deadline} />
                </div>
                {/* ================================= PRIORITY SELECTION ===================================== */}
                <div className="priority border-b border-[rgba(0,0,0,0.16)]">
                  <PrioritySelector priority={priority} setPriority={setPriority} />
                </div>
                {/* ================================= REMINDER ===================================== */}
                <div className="reminder py-4 border-b border-[#00000034]">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpenReminderPrompt(prev => !prev)}>
                    <p className="text-sm font-semibold">{reminder === null ? 'Add' : 'Update'} reminder</p>
                    <span>
                      {
                        openReminderPrompt ? <CgCloseO className="text-accentMain" /> : <GoPlusCircle />
                      }
                    </span>
                  </div>
                  {
                    reminder !== null && (
                      <div className="flex items-center gap-x-2 text-fontSecondery my-1">
                        <span className="text-xl">
                          <IoMdAlarm />
                        </span>
                        <p className="text-sm">{new Date(reminder).toLocaleString()}</p>
                      </div>
                    )
                  }
                  <div className={`${openReminderPrompt ? 'h-45 mt-3 z-50' : 'h-0 overflow-hidden opacity-0'} duration-300 ease-linear`}>
                    <ReminderPropmpt reminder={reminder} setReminder={setReminder} />
                  </div>
                </div>
                {/* ================================= LOCATION ===================================== */}
                <div className="reminder py-4 relative">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpenLocationPrompt(prev => !prev)}>
                    <p className="text-sm font-semibold">{location.length !== 0 ? 'Update' : 'Add'} location</p>
                    <span>
                      {
                        openLocationPrompt ? <CgCloseO className="text-accentMain" /> : <GoPlusCircle />
                      }
                    </span>
                  </div>
                  {
                    location.length !== 0 && (
                      <div div className="locationLabel flex items-center gap-x-2 text-fontSecondery my-1">
                        <span className="text-xl">
                          <IoLocationOutline />
                        </span>
                        <p >{location}</p>
                      </div>
                    )
                  }
                  {
                    openLocationPrompt && (
                      <div className="absolute top-7 left-0 w-full">
                        <LocationPrompt location={location} setLocation={setLocation} setOpenLocationPrompt={setOpenLocationPrompt} />
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="absolute -bottom-5 right-5">
                {taskData.status !== 'completed' && <BtnPrimary label={'Update Task'} clickHandler={() => handleUpdateTask()} />}
              </div>
            </div>
            {/* ======================================== SIDEBAR MARKUP ENDS================================================= */}
          </div>
        </div>
      </div>
    </div >
  );
};

export default TaskPage;