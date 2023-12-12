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

export const inclusions = [
  {
    title: 'Besplatna dostava',
    description: 'Za narudžbe iznad 100 KM',
    icon: '/icons/shipping.svg',
  },
  {
    title: 'Povrat Novca',
    description: 'Novac vraćamo unutar 30 dana',
    icon: '/icons/dollar.svg',
  },
  {
    title: 'Online Podrška',
    description: '24 sata na dan, 7 dana u tjednu',
    icon: '/icons/support.svg',
  },
  {
    title: 'Fleksibilno plaćanje',
    description: 'Platite po pouzeću ili bankovnim karticama',
    icon: '/icons/payment.svg',
  },
]

export const profileNavItems = [
  {
    title: 'Osobne Informacije',
    url: '/account',
    icon: '/assets/icons/user.svg',
  },
  {
    title: 'Moja Kupovina',
    url: '/account/purchases',
    icon: '/assets/icons/purchases.svg',
  },
  {
    title: 'Moje Narudžbe',
    url: '/account/orders',
    icon: '/assets/icons/orders.svg',
  },
  {
    title: 'Odjava',
    url: '/logout',
    icon: '/assets/icons/logout.svg',
  },
]