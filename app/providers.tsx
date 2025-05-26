import { useEffect } from "react";
import { TempoDevtools } from "tempo-devtools";
import { Platform } from "react-native";

export function TempoProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize TempoDevtools in web environment
    // This prevents the window.addEventListener error in native environments
    if (Platform.OS === "web") {
      TempoDevtools.init();
    }
  }, []);

  return <>{children}</>;
}

// Add default export to fix the warning
export default TempoProvider;
