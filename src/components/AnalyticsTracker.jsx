import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../analytics";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Wait a tick so <Seo> has updated document.title for this route.
    const t = setTimeout(() => trackPageView(location.pathname + location.search), 0);
    return () => clearTimeout(t);
  }, [location]);

  return null;
}

export default AnalyticsTracker;
