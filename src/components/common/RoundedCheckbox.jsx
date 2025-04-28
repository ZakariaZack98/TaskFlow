import { useState } from "react";

export default function RoundedCheckbox({ label }) {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={toggleChecked}
        className={`w-5 h-5 flex items-center justify-center rounded-full border-[3px] border-[#E44332] ${
          checked ? "bg-[#E44332]" : "bg-white"
        } transition-all`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      <span
        className={`text-gray-800 ${
          checked ? "line-through text-gray-400" : ""
        } transition-all`}
      >
        {label}
      </span>
    </label>
  );
}

