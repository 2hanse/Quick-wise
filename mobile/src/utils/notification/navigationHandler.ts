import { TabName } from "../../constants/navigation";
import NAVIGATION_CONSTANTS from "../../constants/navigation";

const handleNotificationNavigation = (
  setCurrentTab: (tab: TabName) => void
) => {
  setCurrentTab(NAVIGATION_CONSTANTS.TABS.HOME.NAME);
};

export default handleNotificationNavigation;
