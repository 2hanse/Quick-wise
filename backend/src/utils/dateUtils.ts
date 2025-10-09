const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTodayDateRange = (): { startDate: string; endDate: string } => {
  const today = new Date();
  const dateString = formatDateString(today);

  return {
    startDate: dateString,
    endDate: dateString,
  };
};

export { getTodayDateRange };
