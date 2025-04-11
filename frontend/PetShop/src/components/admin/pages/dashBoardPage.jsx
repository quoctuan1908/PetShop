import {
  People as AccountsIcon,
  AccountBalanceWallet as IncomeIcon,
  Inventory as PetItemsIcon,
  Pets as PetsIcon,
  HourglassEmpty as ProcessingOrdersIcon,
  Business as SuppliersIcon,
} from "@mui/icons-material";
import { Box, Card, CardContent, Grow, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import accountService from "../../../services/account.service";
import orderService from "../../../services/order.service";
import petService from "../../../services/pet.service";
import petItemService from "../../../services/pet_item.service";
import supplierService from "../../../services/supplier.service";

// Color palette for the cards
const cardColors = {
  income: { background: "#e3f2fd", icon: "#1976d2" }, // Blue
  accounts: { background: "#e8f5e9", icon: "#2e7d32" }, // Green
  pets: { background: "#fff3e0", icon: "#f57c00" }, // Orange
  petItems: { background: "#fce4ec", icon: "#c2185b" }, // Pink
  suppliers: { background: "#f3e5f5", icon: "#7b1fa2" }, // Purple
  processingOrders: { background: "#efebe9", icon: "#5d4037" }, // Brown
};

export const DashBoardPage = () => {
  const [processingOrders, setProcessingOrders] = useState(0);
  const [accounts, setAccounts] = useState(0);
  const [profit, setProfit] = useState(0);
  const [petNumber, setPetNumber] = useState(0);
  const [petItemNumber, setPetItemNumber] = useState(0);
  const [supplier, setSupplierNumber] = useState(0);

  const fetchData = async () => {
    //statistics
    const orders = await orderService.findHistory();
    const processingOrderCount = await orderService.countProcessingOrder();
    const accountsNumber = await accountService.count();
    const petNumber = await petService.count();
    const supplierNumber = await supplierService.count();
    const petItemNumber = await petItemService.count();
    setProcessingOrders(processingOrderCount);
    setAccounts(accountsNumber);
    setPetNumber(petNumber);
    setPetItemNumber(petItemNumber);
    setSupplierNumber(supplierNumber);
    let profit = 0;
    orders.forEach((order) => {
      if (order.status === "DONE") profit += order.price * 0.1 * order.quantity;
    });
    setProfit(profit);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Card component for reusability
  // eslint-disable-next-line react/prop-types
  const MetricCard = ({ title, value, icon: Icon, colorScheme, delay }) => (
    <Grow in timeout={delay}>
      <Card
        sx={{
          // eslint-disable-next-line react/prop-types
          backgroundColor: colorScheme.background,
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          },
          height: "100%",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
            padding: 3,
          }}
        >
          <Icon
            sx={{
              fontSize: 40,
              // eslint-disable-next-line react/prop-types
              color: colorScheme.icon,
              mb: 1,
            }}
          />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            <span className="text-gray-600">{title}</span>
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={
              // eslint-disable-next-line react/prop-types
              colorScheme.icon
            }
          >
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        Dashboard Overview
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // 1 column on extra-small screens
            sm: "repeat(2, 1fr)", // 2 columns on small screens
            md: "repeat(3, 1fr)", // 3 columns on medium screens
            lg: "repeat(4, 1fr)", // 4 columns on large screens
          },
          gap: 3,
        }}
      >
        <MetricCard
          title="PROFIT"
          value={`${profit.toLocaleString()} $`}
          icon={IncomeIcon}
          colorScheme={cardColors.income}
          delay={200}
        />
        <MetricCard
          title="ACCOUNTS"
          value={accounts}
          icon={AccountsIcon}
          colorScheme={cardColors.accounts}
          delay={400}
        />
        <MetricCard
          title="PETS"
          value={petNumber}
          icon={PetsIcon}
          colorScheme={cardColors.pets}
          delay={600}
        />
        <MetricCard
          title="PET ITEMS"
          value={petItemNumber}
          icon={PetItemsIcon}
          colorScheme={cardColors.petItems}
          delay={800}
        />
        <MetricCard
          title="SUPPLIERS"
          value={supplier}
          icon={SuppliersIcon}
          colorScheme={cardColors.suppliers}
          delay={1000}
        />
        <MetricCard
          title="PROCESSING ORDERS"
          value={processingOrders}
          icon={ProcessingOrdersIcon}
          colorScheme={cardColors.processingOrders}
          delay={1200}
        />
      </Box>
    </Box>
  );
};
