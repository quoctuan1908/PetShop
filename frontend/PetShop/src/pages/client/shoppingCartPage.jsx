import CancelIcon from "@mui/icons-material/Cancel";
import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAlert } from "../../hooks/AlertContext";
import orderService from "../../services/order.service";
import { API_IMAGE_PATH } from "../../utils";

export const ShoppingCartPage = () => {
  const [sumOfAllItemPrice, setSumOfAllItemPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [alert, setAlert] = useState("");
  const [address, setAddress] = useState("");
  const { showAlert } = useAlert();
  const closeAlert = () => {
    setAlert(false);
  };

  const fetchData = async () => {
    if (!localStorage.getItem("account")) {
      location.href = "/login";
    }
    const account_id = JSON.parse(localStorage.getItem("account")).id;
    if (localStorage.getItem(account_id)) {
      const getItems = JSON.parse(localStorage.getItem(account_id));
      setItems(getItems);
      setSumOfAllItemPrice(0);
      getItems.forEach((item) => {
        setSumOfAllItemPrice((preSum) => preSum + item.price * item.quantity);
      });
      if (!localStorage.getItem("address")) {
        localStorage.setItem("address", address);
      }
      setAddress(localStorage.getItem("address"));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDeleteItem = (index, buyer_id) => {
    setItems((preItems) => preItems.splice(index, 1));
    localStorage.setItem(buyer_id, JSON.stringify(items));
    fetchData();
  };
  const handleOrder = async () => {
    if (address == "") {
      setAlert("You have to update address first!", "success");
    } else {
      const createdOrders = await orderService.create(items, address);
      if (createdOrders.statusCode != 200)
        showAlert(createdOrders.message, "error");
      else showAlert(createdOrders.message, "success");
    }
  };

  return (
    <div>
      <Box sx={{ width: "90%", margin: "auto" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Seller name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => {
                  return (
                    <TableRow
                      key={item.merchandise_id + item.buyer_id}
                      className="grid"
                    >
                      <TableCell className="grid-cols-3">
                        <img src={API_IMAGE_PATH + item.image} width={100} />
                      </TableCell>
                      <TableCell className="grid-cols-5">{item.name}</TableCell>
                      <TableCell>{item.seller_id}</TableCell>
                      <TableCell>x {item.quantity}</TableCell>
                      <TableCell>{item.price} $</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            handleDeleteItem(index, item.buyer_id);
                          }}
                          color="error"
                        >
                          <CancelIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={10} align="right" className="p-4">
                    <TextField
                      variant="outlined"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      label="Where do you want us to send those items ?"
                      fullWidth
                      required
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} align="right" className="p-4">
                    Sum: {sumOfAllItemPrice} $
                  </TableCell>
                  <TableCell>
                    <Button onClick={handleOrder} variant="contained">
                      Order
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Snackbar
          open={alert != false}
          onClose={closeAlert}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={3000}
        >
          <Alert severity="error">{alert}</Alert>
        </Snackbar>
      </Box>
    </div>
  );
};
