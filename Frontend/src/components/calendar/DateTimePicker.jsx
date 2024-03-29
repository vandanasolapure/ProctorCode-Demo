import React from "react";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const DateTimePickerComponent = ({ extra, label, id, variant, format }) => {
  const [value, setValue] = useState(new Date());

  // Define a function to handle changes in the DateTimePicker value
  const handleDateTimeChange = (newValue) => {
    console.log(newValue);
    setValue(newValue); // Update the value state with the new selected date and time
  };

  return (
    <div className="flex flex-col w-fit justify-center items-start ">
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ${
          variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
        }`}
      >
        {label}
      </label>
      <DateTimePicker
        className={`${extra}`}
        onChange={handleDateTimeChange}
        value={value}
        format={format}
      />
    </div>
  );
};

export default DateTimePickerComponent;
