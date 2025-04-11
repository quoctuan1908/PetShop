// eslint-disable-next-line no-unused-vars
import { useTheme } from "@emotion/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useAlert } from "../../../hooks/AlertContext";
import orderService from "../../../services/order.service";
import { TableSearchField } from "../TableSearchField";
// eslint-disable-next-line no-unused-vars

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

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoad, setIsLoad] = useState(false);
  const [listForSearch, setListForSearch] = useState([]);
  const { showAlert } = useAlert();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteItem = async (event, id) => {
    event.preventDefault();
    const staff_id = JSON.parse(localStorage.getItem("account")).id;
    const result = await orderService.cancel(id, staff_id);
    if (result) {
      showAlert("Delete successfully", "success");
    } else showAlert("Delete failed", "error");
    console.log(result);
    await fetchOrders();
  };

  const handleAcceptOrder = async (event, id) => {
    event.preventDefault();
    const staff_id = JSON.parse(localStorage.getItem("account")).id;
    const result = await orderService.accept(id, staff_id);
    if (result) {
      showAlert("Accept successfully", "success");
    } else showAlert("Accept failed", "error");
    console.log(result);
    await fetchOrders();
  };
  const handleSearch = (prompt, option) => {
    const tempList = listForSearch.filter((account) =>
      account[option].toString().toLowerCase().includes(prompt.toLowerCase())
    );
    setOrders(tempList);
  };

  const fetchOrders = async () => {
    const getOrders = await orderService.findAll();
    setOrders(getOrders.reverse());
    setListForSearch(getOrders);
    setIsLoad(true);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "buyer_id", label: "Customer", minWidth: 60 },
    {
      id: "merchandise_id",
      label: "Merchandise ID",
      minWidth: 100,
    },
    {
      id: "quantity",
      label: "Quantity",
      minWidth: 50,
    },
    {
      id: "order_time",
      label: "Order Date",
    },
    {
      id: "price",
      label: "Price",
      minWidth: 50,
    },
    {
      id: "address",
      label: "Address",
      minWidth: 50,
    },
  ];

  return (
    <Paper sx={{ width: "100%" }}>
      <div className="">
        <TableSearchField columns={columns} handleSearch={handleSearch} />
      </div>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table sx={{ minWidth: 500 }} aria-label="table pagination ">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                key="action"
                style={{
                  minWidth: 100,
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? orders.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : orders
            ).map((order) => {
              return (
                <TableRow
                  key={order.id}
                  className="hover:shadow-md hover:translate-y-1"
                >
                  <TableCell>
                    <span
                      className="inline-block w-20 overflow-hidden text-ellipsis whitespace-nowrap"
                      title={order.id}
                    >
                      {order.id}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className="inline-block w-20 overflow-hidden text-ellipsis whitespace-nowrap"
                      title={order.buyer_id}
                    >
                      {order.buyer_id}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className="inline-block w-20 overflow-hidden text-ellipsis whitespace-nowrap"
                      title={order.merchandise_id}
                    >
                      {order.merchandise_id}
                    </span>
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    {new Date(order.order_time).toDateString()}
                  </TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  {isLoad ? (
                    <TableCell>
                      {
                        <Button
                          variant="outlined"
                          onClick={(event) =>
                            handleAcceptOrder(event, order.id)
                          }
                        >
                          <CheckCircleIcon sx={{ color: "green" }} />
                        </Button>
                      }
                      <Button
                        variant="outlined"
                        onClick={(event) => handleDeleteItem(event, order.id)}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </Button>
                    </TableCell>
                  ) : (
                    ""
                  )}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={10} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={10}
                count={orders.length}
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
  );
};
