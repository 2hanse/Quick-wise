const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTodayDateRange = (): { startDate: string; endDate: string } => {
  const today = new Date();

  const startDate = new Date(today);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 1);
  endDate.setHours(23, 59, 59, 999);

  return {
    startDate: formatDateString(startDate),
    endDate: formatDateString(endDate),
  };
};

export { getTodayDateRange };
