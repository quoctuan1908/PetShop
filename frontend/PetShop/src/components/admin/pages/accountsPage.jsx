// eslint-disable-next-line no-unused-vars
import { useTheme } from "@emotion/react";
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
import accountService from "../../../services/account.service";
import AccountEditForm from "../forms/editAccountForm";
import AddAccountModal from "../modals/addAccountModal";
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

export const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [listForSearch, setListForSearch] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { showAlert } = useAlert();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - accounts.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteItem = async (event, id) => {
    event.preventDefault();
    const result = await accountService.delete(id);
    if (result) {
      showAlert("Delete successfully", "success");
    } else showAlert("Delete failed", "error");
    await fetchAccounts();
  };

  const handleSearch = (prompt, option) => {
    const tempList = listForSearch.filter((account) =>
      account[option].toString().toLowerCase().includes(prompt.toLowerCase())
    );
    setAccounts(tempList);
  };

  const fetchAccounts = async () => {
    const getAccounts = await accountService.findAll();
    setAccounts(getAccounts);
    setListForSearch(getAccounts);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  console.log(accounts);

  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "username", label: "Username", minWidth: 100 },
    {
      id: "role",
      label: "Role",
      minWidth: 170,
    },
  ];

  return (
    <Paper sx={{ width: "80%" }}>
      <div className="grid grid-cols-4">
        <div className="text-left col-span-1 p-3">
          <AddAccountModal handleRefresh={fetchAccounts} />
        </div>
        <div className="text-left col-span-3 p-3">
          <TableSearchField columns={columns} handleSearch={handleSearch} />
        </div>
      </div>
      <TableContainer sx={{ maxHeight: 700 }}>
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
              ? accounts.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : accounts
            ).map((account) => {
              return (
                <TableRow
                  key={account.id}
                  className="hover:shadow-md hover:translate-y-1"
                >
                  <TableCell>
                    <span
                      className="inline-block w-20 overflow-hidden text-ellipsis whitespace-nowrap"
                      title={account.id}
                    >
                      {account.id}
                    </span>
                  </TableCell>
                  <TableCell>{account.username}</TableCell>
                  <TableCell>{account.role}</TableCell>
                  <TableCell>
                    <AccountEditForm
                      account={account}
                      handleRefresh={fetchAccounts}
                    />
                    <Button
                      variant="outlined"
                      onClick={(e) => handleDeleteItem(e, account.id)}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={accounts.length}
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
