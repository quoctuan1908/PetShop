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
import supplierService from "../../../services/supplier.service";
import { handleSortText } from "../../../utils";
import SupplierEditForm from "../forms/editSupplierForm";
import AddSupplierModal from "../modals/addSupplierModal";
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

export const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [listForSearch, setListForSearch] = useState([]);
  const { showAlert } = useAlert();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - suppliers.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteItem = async (event, supplier_id) => {
    event.preventDefault();
    const result = await supplierService.delete(supplier_id);
    if (result) {
      showAlert("Delete successfully", "success");
    } else showAlert("Delete failed", "error");
    console.log(result);
    await fetchSuppliers();
  };

  const handleClickSort = (columnId) => {
    const sortedSuppliers = handleSortText(suppliers, columnId);
    console.log(sortedSuppliers);
    setSuppliers(sortedSuppliers);
  };

  const handleSearch = (prompt, option) => {
    const tempList = listForSearch.filter((account) =>
      account[option].toString().toLowerCase().includes(prompt.toLowerCase())
    );
    setSuppliers(tempList);
  };

  const fetchSuppliers = async () => {
    const getSuppliers = (await supplierService.findAll()).sort(
      (a, b) => a.id - b.id
    );
    setSuppliers(getSuppliers);
    setListForSearch(getSuppliers);
  };

  useEffect(() => {
    console.log("Hello");
    fetchSuppliers();
  }, []);

  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "supplier_name", label: "Name", minWidth: 100 },
    {
      id: "address",
      label: "Address",
      minWith: 100,
    },
    {
      id: "phone_number",
      label: "Contact",
      minWidth: 170,
    },
  ];

  return (
    <Paper sx={{ width: "80%" }}>
      <div className="grid grid-cols-4">
        <div className="text-left col-span-1 p-3">
          <AddSupplierModal handleRefresh={fetchSuppliers} />
        </div>
        <div className="text-left col-span-3 p-3">
          <TableSearchField columns={columns} handleSearch={handleSearch} />
        </div>
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
                  onClick={() => handleClickSort(column.id)}
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
              ? suppliers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : suppliers
            ).map((supplier) => {
              return (
                <TableRow
                  key={supplier.id}
                  className="hover:shadow-md hover:translate-y-1"
                >
                  <TableCell>
                    <span
                      className="inline-block w-20 overflow-hidden text-ellipsis whitespace-nowrap"
                      title={supplier.id}
                    >
                      {supplier.id}
                    </span>
                  </TableCell>
                  <TableCell>{supplier.supplier_name}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>{supplier.phone_number}</TableCell>
                  <TableCell>
                    <SupplierEditForm
                      supplier={supplier}
                      handleRefresh={fetchSuppliers}
                    />
                    <Button
                      variant="outlined"
                      onClick={(e) => handleDeleteItem(e, supplier.id)}
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
                count={suppliers.length}
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
