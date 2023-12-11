import { Building2, Globe, LayoutDashboard, Library, Package, PanelLeftOpen, Store, Swords } from "lucide-react";

export const sidebarLinks = [
  {
    icon: LayoutDashboard,
    route: "/admin",
    label: "Nadzorna ploča",
  },
  {
    icon: PanelLeftOpen,
    route: "/admin/baneri",
    label: "Baneri",
  },
  {
    icon: Building2,
    route: "/admin/brendovi",
    label: "Brendovi",
  },
  {
    icon: Globe,
    route: "/admin/kategorije",
    label: "Kategorije",
  },
  {
    icon: Package,
    route: "/admin/proizvodi",
    label: "Proizvodi",
  },  
  {
    icon: Store,
    route: "/admin/narudzbe",
    label: "Narudžbe",
  },  
];

export const mobileNavLinks = [
  {
    icon: LayoutDashboard,
    route: "/",
    label: "Discover",
  },
  {
    icon: Swords,
    route: "/games",
    label: "Games",
  },  
  {
    icon: Globe,
    route: "/categories",
    label: "Categories",
  },  
  {
    icon: Library,
    route: "/library",
    label: "Library",
  },  
];