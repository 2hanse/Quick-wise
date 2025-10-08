const validateEventTime = (startTime: string, endTime: string): boolean => {
  return new Date(endTime) > new Date(startTime);
};

const validateEventTitle = (title: string): boolean => {
  return title.trim().length > 0;
};

export { validateEventTime, validateEventTitle };
