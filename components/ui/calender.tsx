"use client";

import { getTwoMonthRange } from "@/lib/date-utils";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import { useState } from "react";

type CalenderProps = {
  setSelectedDate: (date: Date) => void;
  selectedDate: Date;
};

const Calender = ({ setSelectedDate, selectedDate }: CalenderProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { startDate, endDate } = getTwoMonthRange();
  const isFirstMonth = isSameMonth(currentDate, startDate);
  const isLastMonth = isSameMonth(currentDate, endDate);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-indigo-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            disabled={isFirstMonth}
            className={`p-2 rounded-lg transition-colors ${
              isFirstMonth
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-700"
            }`}
          >
            ←
          </button>
          <h2 className="text-xl font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <button
            onClick={nextMonth}
            disabled={isLastMonth}
            className={`p-2 rounded-lg transition-colors ${
              isLastMonth
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-700"
            }`}
          >
            →
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {weekDays.map((day) => (
            <div key={day} className="font-medium text-indigo-200">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((day) => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isSelected = selectedDate && isSameDay(day, selectedDate);

            const dayStyles = `
                h-10 w-10 rounded-full flex items-center justify-center
                ${isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                ${
                  isSelected ? "bg-indigo-600 text-white" : "hover:bg-indigo-50"
                }
                ${
                  (day < startDate || day > endDate) && !isSelected
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-50 cursor-pointer"
                }
                cursor-pointer transition-colors
              `;

            return (
              <button
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                className={dayStyles}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="p-6 pt-0 text-center text-gray-600">
          Selected: {format(selectedDate, "MMMM do, yyyy")}
        </div>
      )}
    </div>
  );
};

export default Calender;
