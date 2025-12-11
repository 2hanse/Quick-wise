import { useState, useCallback } from "react";
import { UseRefreshControlProps } from "../types/main";

const useRefreshControl = ({ onRefresh }: UseRefreshControlProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  }, [onRefresh]);

  return {
    refreshing: isRefreshing,
    onRefresh: handleRefresh,
  };
};

export default useRefreshControl;
