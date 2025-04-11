import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from "@mui/icons-material/Business";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import ExtensionIcon from "@mui/icons-material/Extension";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import PetsIcon from "@mui/icons-material/Pets";
import { Box } from "@mui/material";
import { extendTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import PropTypes from "prop-types";
import * as React from "react";
import { AccountsPage } from "../../components/admin/pages/accountsPage";
import { DashBoardPage } from "../../components/admin/pages/dashBoardPage";
import { ItemsPage } from "../../components/admin/pages/itemsPage";
import { OrdersHistoryPage } from "../../components/admin/pages/ordersHistoryPage";
import { OrdersPage } from "../../components/admin/pages/ordersPage";
import { PetsPage } from "../../components/admin/pages/petsPage";
import { SpeciesPage } from "../../components/admin/pages/speciesPage";
import { SuppliersPage } from "../../components/admin/pages/supplierPage";
import { LogOutPage } from "../client/logOutPage";

const ADMIN_NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "accounts",
    title: "Accounts",
    icon: <AccountCircleIcon />,
  },
  {
    segment: "species",
    title: "Species",
    icon: <EmojiNatureIcon />,
  },
  {
    segment: "pets",
    title: "Pets",
    icon: <PetsIcon />,
  },
  {
    segment: "suppliers",
    title: "Suppliers",
    icon: <BusinessIcon />,
  },
  {
    segment: "pet_items",
    title: "Pet Items",
    icon: <ExtensionIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "orders",
    title: "Processing Orders",
    icon: <AssignmentIcon />,
  },
  {
    segment: "orders_history",
    title: "Orders History",
    icon: <HistoryIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];

const STAFF_NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "pets",
    title: "Pets",
    icon: <PetsIcon />,
  },
  {
    segment: "pet_items",
    title: "Pet Items",
    icon: <ExtensionIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "orders",
    title: "Processing Orders",
    icon: <AssignmentIcon />,
  },
  {
    segment: "orders_history",
    title: "Orders History",
    icon: <HistoryIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const useDemoRouter = (initialPath) => {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
};

const PageContent = ({ pathname }) => {
  const pages = {
    "/dashboard": <DashBoardPage />,
    "/accounts": <AccountsPage />,
    "/species": <SpeciesPage />,
    "/pets": <PetsPage />,
    "/suppliers": <SuppliersPage />,
    "/pet_items": <ItemsPage />,
    "/orders": <OrdersPage />,
    "/orders_history": <OrdersHistoryPage />,
    "/logout": <LogOutPage />,
  };

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {pages[pathname]}
    </Box>
  );
};

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export const DashBoard = () => {
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
    if (role != "ADMIN" && role != "STAFF") location.href = "/";
  }, []);

  const router = useDemoRouter("/dashboard");

  return (
    <>
      <AppProvider
        navigation={role == "STAFF" ? STAFF_NAVIGATION : ADMIN_NAVIGATION}
        router={router}
        theme={demoTheme}
      >
        <DashboardLayout>
          <PageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
    </>
  );
};
