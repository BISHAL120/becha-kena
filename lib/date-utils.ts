import { addMonths, isBefore, isAfter, startOfDay } from "date-fns";

export const isDateInRange = (date: Date, startDate: Date, endDate: Date) => {
  const day = startOfDay(date);
  return (
    !isBefore(day, startOfDay(startDate)) && !isAfter(day, startOfDay(endDate))
  );
};

export const getTwoMonthRange = (baseDate: Date = new Date()) => {
  const startDate = startOfDay(baseDate);
  const endDate = startOfDay(addMonths(baseDate, 2));
  return { startDate, endDate };
};
