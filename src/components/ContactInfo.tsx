import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, Video } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge Tailwind CSS classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Inlining CSS for react-day-picker to avoid import issues in some environments
const dayPickerStyles = `
.rdp {
    --rdp-cell-size: 50px;
    --rdp-accent-color: #2563eb;
    --rdp-background-color: #ffffff;
    --rdp-border-radius: 8px;
    margin: 0;
}
.rdp-month {
    margin: 0;
}
.rdp-table {
    max-width: none;
    border-collapse: collapse;
    width: 100%;
}
.rdp-caption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1em;
    position: relative;
}
.rdp-caption_label {
    font-size: 1.3em;
    font-weight: 700;
}
.rdp-nav {
    display: flex;
    gap: 1em;
}
.rdp-nav_button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0.5em;
    border-radius: var(--rdp-border-radius);
    border: 2px solid #e5e7eb;
}
.rdp-nav_button:hover {
    background-color: #f3f4f6;
}
.rdp-head_cell {
    font-size: 1.1em;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
    color: #6b7280;
    width: var(--rdp-cell-size);
    padding: 0.75em 0;
}
.rdp-cell {
    width: var(--rdp-cell-size);
    height: var(--rdp-cell-size);
    padding: 0;
    text-align: center;
}
.rdp-day {
    width: 100%;
    height: 100%;
    border-radius: var(--rdp-border-radius);
    border: 2px solid transparent;
}
.rdp-day_today:not(.rdp-day_selected) {
    font-weight: 700;
    color: var(--rdp-accent-color);
    border: 2px solid var(--rdp-accent-color);
}
.rdp-day_selected, .rdp-day_selected:focus, .rdp-day_selected:active, .rdp-day_selected:hover {
    color: #fff;
    background-color: var(--rdp-accent-color);
}
.rdp-day_disabled {
    opacity: .5;
    cursor: not-allowed;
}
.rdp-day_outside {
    opacity: .5;
}
.rdp-button_reset {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
    margin: 0;
    padding: 0;
    cursor: pointer;
    color: inherit;
    border: none;
    background: 0 0;
    font: inherit;
}
.rdp-button:not([disabled]):hover {
    background-color: #f3f4f6;
}
.rdp-button:focus:not([disabled]) {
    border: 2px solid var(--rdp-accent-color);
    outline: none;
}
`;

export const ContactInfo: React.FC = () => {
  const [date, setDate] = useState(new Date(2023, 3, 15)); // April 2023
  const [hours, setHours] = useState("06");
  const [minutes, setMinutes] = useState("28");
  const [ampm, setAmPm] = useState("PM");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const hourOptions = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const minuteOptions = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 font-sans">
      <style>{dayPickerStyles}</style>
      <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Booking Info */}
          <div className="flex flex-col justify-center space-y-8 bg-blue-50 p-12">
            <div>
              <h1 className="text-5xl font-bold text-blue-600">
                Book a
                <span className="inline-flex items-center">
                  <Video className="ml-3 mr-2 h-10 w-10" />
                </span>
              </h1>
              <h1 className="text-5xl font-bold text-blue-600">Consultation</h1>
              <h1 className="text-5xl font-bold text-blue-600">Instantly</h1>
            </div>
            <p className="text-xl text-gray-700">
              30 Minutes video Meeting<br />
              This is our Mini Discovery call meeting.
            </p>
            <div className="flex items-center space-x-3">
              <Globe className="h-6 w-6 text-blue-600" />
              <select defaultValue="Africa/Lagos" className="w-auto border-none bg-transparent text-lg font-medium text-blue-600 focus:outline-none focus:ring-0">
                <option value="Africa/Lagos">Africa/Lagos</option>
                <option value="Europe/London">Europe/London</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </div>
          </div>

          {/* Right Side - Date & Time Picker */}
          <div className="bg-white p-8">
            {/* Date Picker */}
            <div className="relative mb-6">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className={cn(
                  "w-full justify-between border rounded-lg px-6 py-3 text-left font-normal flex items-center text-lg",
                  !date && "text-gray-500"
                )}
              >
                <div className="flex w-full justify-between items-center">
                  <span>Select Date</span>
                  {date && (
                    <span className="text-gray-600">
                      {format(date, "MMM yyyy")}
                    </span>
                  )}
                </div>
                <ChevronDown className={`ml-3 h-5 w-5 transition-transform ${showDatePicker ? "rotate-180" : ""}`} />
              </button>
              {showDatePicker && (
                <div className="absolute z-10 mt-2 w-auto rounded-lg border bg-white shadow-xl p-4">
                  <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      if (newDate) setDate(newDate);
                      setShowDatePicker(false);
                    }}
                    initialFocus
                    defaultMonth={new Date(2023, 3)}
                  />
                </div>
              )}
            </div>

            {/* Time Picker */}
            <div className="relative mb-6">
              <button
                onClick={() => setShowTimePicker(!showTimePicker)}
                className="w-full justify-between border rounded-lg px-6 py-3 text-left font-normal flex items-center text-lg"
              >
                <div className="flex w-full justify-between">
                  <span>Select Time</span>
                  <span className="text-gray-600">{`${hours} : ${minutes} ${ampm}`}</span>
                </div>
                <ChevronDown className={`ml-3 h-5 w-5 transition-transform ${showTimePicker ? "rotate-180" : ""}`} />
              </button>
              {showTimePicker && (
                <div className="absolute z-10 mt-2 w-[320px] rounded-lg border bg-white p-4 shadow-xl">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Hours */}
                    <div className="flex flex-col space-y-2">
                      <span className="text-center text-sm font-medium">Hours</span>
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="rounded-full p-2 hover:bg-gray-100"
                          onClick={() => {
                            const idx = hourOptions.indexOf(hours);
                            const newIdx = (idx - 1 + hourOptions.length) % hourOptions.length;
                            setHours(hourOptions[newIdx]);
                          }}
                        >
                          <ChevronUp className="h-5 w-5" />
                        </button>
                        <div className="flex h-10 w-full items-center justify-center rounded-md bg-gray-100">
                          <span className="text-xl font-medium">{hours}</span>
                        </div>
                        <button
                          className="rounded-full p-2 hover:bg-gray-100"
                          onClick={() => {
                            const idx = hourOptions.indexOf(hours);
                            const newIdx = (idx + 1) % hourOptions.length;
                            setHours(hourOptions[newIdx]);
                          }}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Minutes */}
                    <div className="flex flex-col space-y-2">
                      <span className="text-center text-sm font-medium">Minutes</span>
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="rounded-full p-2 hover:bg-gray-100"
                          onClick={() => {
                            const idx = minuteOptions.indexOf(minutes);
                            const newIdx = (idx - 1 + minuteOptions.length) % minuteOptions.length;
                            setMinutes(minuteOptions[newIdx]);
                          }}
                        >
                          <ChevronUp className="h-5 w-5" />
                        </button>
                        <div className="flex h-10 w-full items-center justify-center rounded-md bg-gray-100">
                          <span className="text-xl font-medium">{minutes}</span>
                        </div>
                        <button
                          className="rounded-full p-2 hover:bg-gray-100"
                          onClick={() => {
                            const idx = minuteOptions.indexOf(minutes);
                            const newIdx = (idx + 1) % minuteOptions.length;
                            setMinutes(minuteOptions[newIdx]);
                          }}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* AM/PM */}
                    <div className="flex flex-col space-y-2">
                      <span className="text-center text-sm font-medium">AM/PM</span>
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="rounded-full p-2 hover:bg-gray-100"
                          onClick={() => setAmPm(ampm === "AM" ? "PM" : "AM")}
                        >
                          <ChevronUp className="h-5 w-5" />
                        </button>
                        <div className="flex h-10 w-full items-center justify-center rounded-md bg-gray-100">
                          <span className="text-xl font-medium">{ampm}</span>
                        </div>
                        <button
                          className="rounded-full p-2 hover:bg-gray-100"
                          onClick={() => setAmPm(ampm === "AM" ? "PM" : "AM")}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pick Date/Time Button */}
            <button
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-xl text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => {
                console.log("Booking confirmed:", {
                  date: date,
                  time: `${hours}:${minutes} ${ampm}`
                });
                setShowDatePicker(false);
                setShowTimePicker(false);
              }}
            >
              Pick Date/Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};