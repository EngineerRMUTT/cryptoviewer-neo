import { HomeIcon, CoinsIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import AssetDetail from "./pages/AssetDetail.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Asset Detail",
    to: "/asset/:id",
    icon: <CoinsIcon className="h-4 w-4" />,
    page: <AssetDetail />,
  },
];
