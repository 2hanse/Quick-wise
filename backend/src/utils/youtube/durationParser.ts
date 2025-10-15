import PARSING_CONSTANTS from "../../constants/parsing";
import TIME_CONSTANTS from "../../constants/time";

const parseDuration = (duration: string): number => {
  const match = duration.match(PARSING_CONSTANTS.YOUTUBE.DURATION_REGEX);
  if (!match) return 0;

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");

  return (
    hours * TIME_CONSTANTS.UNIT.SECONDS_PER_HOUR +
    minutes * TIME_CONSTANTS.UNIT.SECONDS_PER_MINUTE +
    seconds
  );
};

export default parseDuration;
