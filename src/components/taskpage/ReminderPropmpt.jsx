import { useState, useEffect } from "react";

// Utility: Convert time string to hours and minutes
const parseTime = (timeStr) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "pm" && hours !== 12) hours += 12;
  if (modifier === "am" && hours === 12) hours = 0;

  return { hours, minutes };
};

// Utility: Format time to "hh:mm am/pm" format
const formatTimeString = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  hours = hours.toString().padStart(2, '0');
  
  return `${hours}:${minutes} ${ampm}`;
};

const ReminderPrompt = ({ reminder, setReminder }) => {
  // Initialize states based on reminder prop if available
  const [selectedDate, setSelectedDate] = useState(() => {
    return reminder ? new Date(reminder) : new Date();
  });
  
  const [selectedTime, setSelectedTime] = useState(() => {
    return reminder ? formatTimeString(new Date(reminder)) : "09:00 am";
  });
  
  const [reminderTimeMS, setReminderTimeMS] = useState(() => {
    if (reminder) {
      return reminder;
    } else {
      // Just calculate the MS value but don't set the parent state
      const { hours, minutes } = parseTime("09:00 am");
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date.getTime();
    }
  });

  // Initialize component with reminder value if provided
  useEffect(() => {
    if (reminder) {
      const reminderDate = new Date(reminder);
      setSelectedDate(reminderDate);
      setSelectedTime(formatTimeString(reminderDate));
      setReminderTimeMS(reminder);
    }
  }, [reminder]);

  const timeOptions = [
    "08:00 am", "09:00 am", "10:00 am", "11:00 am",
    "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm",
    "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"
  ];

  const updateReminder = (date, time) => {
    const { hours, minutes } = parseTime(time);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    
    const timeInMS = newDate.getTime();
    setReminderTimeMS(timeInMS);
    
    // Only update parent state when user makes a change
    setReminder(timeInMS);
  };

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    updateReminder(newDate, selectedTime);
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setSelectedTime(newTime);
    updateReminder(selectedDate, newTime);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 w-full max-w-md space-y-4">
      {/* Date Picker */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Date</label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E44332]"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={handleDateChange}
        />
      </div>

      {/* Time Picker */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Time</label>
        <select
          value={selectedTime}
          onChange={handleTimeChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E44332]"
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ReminderPrompt;