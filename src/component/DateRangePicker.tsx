import { useState } from "react";

type DateRangePickerProps = {
  minDate?: string;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ minDate = "" }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={minDate}
          className="border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate || minDate}
          className="border p-2 rounded"
        />
      </div>

      {startDate && endDate && (
        <p>
          Selected Range: {startDate} to {endDate}
        </p>
      )}
    </div>
  );
};

export default DateRangePicker;
