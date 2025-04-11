// eslint-disable-next-line no-unused-vars
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
// eslint-disable-next-line no-unused-vars
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/AlertContext";
import orderService from "../../services/order.service";
import userService from "../../services/user.service";
import { API_IMAGE_PATH } from "../../utils";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const PersonalPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    gender: "",
    birthday: "",
    address: "",
    email: "",
    phone_number: "",
  });
  const [accountId, setAccountId] = useState("");
  const [orders, setOrders] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);
  const { showAlert } = useAlert();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeBirthday = (date) => {
    setUser((prevState) => ({
      ...prevState,
      birthday: date.$d,
    }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const result = await userService.updateUserProfile(accountId, user);
      console.log(result[0]);
      if (result[0]) showAlert("Update successfully", "success");
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };

  const fetchOrders = async () => {
    const account = await JSON.parse(localStorage.getItem("account"));
    const filledOrders = await orderService.findByUser(account.id);
    const filledOrdersHistory = await orderService.findHistory(account.id);
    if (!account) {
      navigate("/login");
      return;
    }
    setAccountId(account.id);
    setOrders(filledOrders);
    setOrdersHistory(filledOrdersHistory.reverse());
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteItem = async (e, id) => {
    e.preventDefault();
    try {
      await orderService.cancel(id, accountId);
      fetchOrders();
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 p-4">
      <div className="grid-cols-2 text-center lg:w-[50%]">
        <Typography variant="h4" className="text-center">
          Profile
        </Typography>
        <FormControl margin="normal">
          <TextField
            id="name"
            label="Full Name"
            name="name"
            onChange={handleChange}
            value={user.name || ""}
            sx={{ mb: 2 }}
          />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="gender"
            value={user.gender || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value={true} control={<Radio />} label="Male" />
            <FormControlLabel value={""} control={<Radio />} label="Other" />
          </RadioGroup>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birthday"
              defaultValue={dayjs(user.birthday)}
              maxDate={dayjs().subtract(16, "year")}
              onChange={handleChangeBirthday}
              disableFuture
              name="birthday"
              sx={{ mb: 2 }}
            />
          </LocalizationProvider>
          <TextField
            id="address"
            label="Address"
            name="address"
            value={user.address || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            value={user.email || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            id="phone_number"
            label="Phone number"
            name="phone_number"
            value={user.phone_number || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleUpdateUser}>
            Update
          </Button>
        </FormControl>
      </div>
      <div>
        <Box sx={{ width: "100%", margin: "auto" }}>
          <Paper sx={{ mb: 5 }}>
            <TableContainer>
              <Typography variant="h4" className="text-center">
                Your Orders
              </Typography>
              <Table
                sx={{ overflow: "scroll" }}
                aria-labelledby="tableTitle"
                size="medium"
                className="border"
              >
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell className="w-20">Price</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img
                          src={API_IMAGE_PATH + item.image}
                          width={100}
                          alt="Merchandise"
                        />
                      </TableCell>
                      <TableCell>
                        <span
                          className="inline-block w-20 overflow-hidden text-ellipsis whitespace-nowrap"
                          title={item.merchandise_id}
                        >
                          {item.merchandise_id}
                        </span>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price} $</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        {item.status === "PROCESSING" && (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={(e) => handleDeleteItem(e, item.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          {/* Order history table */}
          <Paper sx={{ mb: 5 }}>
            <TableContainer>
              <Typography variant="h4" className="text-center">
                Your Orders History
              </Typography>
              <Table
                sx={{ overflow: "scroll" }}
                aria-labelledby="tableTitle"
                size="medium"
                className="border"
              >
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell className="w-20">Price</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? ordersHistory.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : ordersHistory
                  ).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img
                          src={API_IMAGE_PATH + item.image}
                          width={100}
                          alt="Merchandise"
                        />
                      </TableCell>
                      <TableCell>
                        <span
                          className="inline-block w-20 overflow-hidden text-ellipsis whitespace-nowrap"
                          title={item.merchandise_id}
                        >
                          {item.merchandise_id}
                        </span>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price} $</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={10}
                      count={ordersHistory.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </div>
  );
};
