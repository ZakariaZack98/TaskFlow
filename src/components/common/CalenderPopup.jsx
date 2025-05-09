import { useState } from "react";

export default function CalendarPopup({ deadline, onSelect }) {
  const [currentDate, setCurrentDate] = useState(deadline ? new Date(deadline) : new Date());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  const today = new Date();
  const selectedDate = deadline ? new Date(deadline) : null;

  const isSameDate = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const selectDate = (day) => {
    const selected = new Date(year, month, day);
    onSelect && onSelect(selected); // return as Date object
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-xl w-72 relative z-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-gray-500 hover:text-[#E44332]">&lt;</button>
        <div className="font-semibold text-gray-700">
          {months[month]} {year}
        </div>
        <button onClick={nextMonth} className="text-gray-500 hover:text-[#E44332]">&gt;</button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 text-center text-sm text-gray-400 mb-2">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 text-center gap-1">
        {/* Empty cells before the first day */}
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={`empty-${index}`}></div>
        ))}

        {/* Days */}
        {Array.from({ length: totalDays }).map((_, dayIndex) => {
          const day = dayIndex + 1;
          const thisDate = new Date(year, month, day);
          const isToday = isSameDate(thisDate, today);
          const isSelected = selectedDate && isSameDate(thisDate, selectedDate);

          return (
            <button
              key={day}
              onClick={() => selectDate(day)}
              className={`w-8 h-8 text-sm flex items-center justify-center rounded-full transition cursor-pointer
                ${
                  isSelected
                    ? "bg-[#E44332] text-white"
                    : isToday
                    ? "bg-gray-300 text-black"
                    : "hover:bg-[#E44332]/20 text-gray-700"
                }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
