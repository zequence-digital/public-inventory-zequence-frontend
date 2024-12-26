import SvgHome from "@/components/svg/svg-home";
import SvgProducts from "@/components/svg/svg-products";
import SvgSettings from "@/components/svg/svg-settings";
import SvgStocks from "@/components/svg/svg-stocks";

export const links = [
  {
    name: "Home",
    IconComponent: SvgHome,
    subLinks: [
      {
        name: "Overview",
        href: "/dashboard/overview",
      },
      {
        name: "Notifications",
        href: "/dashboard/notifications",
      },
    ],
  },
  {
    name: "Categories",
    IconComponent: SvgProducts,
    subLinks: [
      {
        name: "Add new category",
        href: "/dashboard/categories/add-category",
      },
      {
        name: "List categories",
        href: "/dashboard/categories/list-categories",
      },
    ],
  },
  {
    name: "Products",
    IconComponent: SvgProducts,
    subLinks: [
      {
        name: "Add product",
        href: "/dashboard/products/add-product",
      },
      {
        name: "List products",
        href: "/dashboard/products/list-products",
      },
    ],
  },

  {
    name: "Stock",
    IconComponent: SvgStocks,
    subLinks: [
      {
        name: "Add stock",
        href: "/dashboard/stocks/add-stock",
      },
      {
        name: "List stock",
        href: "/dashboard/stocks/list-stock",
      },
      {
        name: "Add stock transfer",
        href: "/dashboard/stocks/add-stock-transfer",
      },
      {
        name: "Stock request",
        href: "/dashboard/stocks/stock-request",
      },
      {
        name: "Stock usage",
        href: "/dashboard/stocks/stock-usage",
      },
    ],
  },
  {
    name: "Sales",
    IconComponent: SvgStocks,
    subLinks: [
      {
        name: "Add sales",
        href: "/dashboard/sales/add-sales",
      },
      {
        name: "All sales",
        href: "/dashboard/sales/all-sales",
      },
    ],
  },
];

// SubLinks

export const subLinks = [
  {
    name: "Settings",
    href: "/dashboard/settings",
    IconComponent: SvgSettings,
  },
];

// Default Login Page
export const defaultLoginPage = "/dashboard/overview";
