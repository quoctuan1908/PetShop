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
import itemUsageService from "../../../services/item_usage.service";
import petItemService from "../../../services/pet_item.service";
import speciesService from "../../../services/species.service";
import supplierService from "../../../services/supplier.service";
import { EditItemForm } from "../forms/editItemForm";
import AddItemModal from "../modals/addItemModal";
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

export const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [itemsUsage, setItemsUsage] = useState([]);
  const [speciesList, setSpeciesList] = React.useState([]);
  const [supplierList, setSupplierList] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoad, setIsLoad] = useState(false);
  const [listForSearch, setListForSearch] = useState([]);
  const { showAlert } = useAlert();
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteItem = async (event, id) => {
    event.preventDefault();
    const result = await petItemService.delete(id);
    if (result) {
      showAlert("Delete successfully", "success");
    } else showAlert("Delete failed", "error");
    console.log(result);
    await fetchItems();
  };

  const handleSearch = (prompt, option) => {
    const tempList = listForSearch.filter((account) =>
      account[option].toString().toLowerCase().includes(prompt.toLowerCase())
    );
    setItems(tempList);
  };

  const fetchItems = async () => {
    const getItems = await petItemService.findAll("*");
    const fetchItemsUsage = await itemUsageService.findAll();
    const fetchSpeciesList = await speciesService.findAll();
    const fetchSupplierList = await supplierService.findAll();
    setItems(getItems);
    setItemsUsage(fetchItemsUsage);
    setSpeciesList(fetchSpeciesList);
    setSupplierList(fetchSupplierList);
    setListForSearch(getItems);
    setIsLoad(true);
  };

  const fillerSpeciesForItem = (item_id) => {
    const species_name_per_item = [];
    itemsUsage
      .filter((itemUsage) => itemUsage.PetItemId == item_id)
      .map((filledItem) =>
        speciesList.map((species) =>
          species.id == filledItem.SpeciesId
            ? species_name_per_item.push(species.species_name)
            : ""
        )
      );
    return species_name_per_item;
  };

  useEffect(() => {
    fetchItems();
  }, []);

  console.log(items);

  const columns = [
    { id: "id", label: "ID" },
    { id: "seller_id", label: "Seller" },
    {
      id: "item_name",
      label: "Name",
      minWidth: 100,
    },
    {
      id: "mfg_date",
      label: "Mfg date",
      minWidth: 80,
    },
    {
      id: "exp_date",
      label: "Exp date",
      minWidth: 80,
    },
    {
      id: "material",
      label: "Material",
      minWidth: 80,
    },
    {
      id: "origin",
      label: "Origin",
      minWidth: 80,
    },
    {
      id: "quantity",
      label: "Quantity",
      minWidth: 50,
    },
    {
      id: "selling_prices",
      label: "Selling prices",
      minWidth: 50,
    },
  ];

  return (
    <Paper sx={{ width: "100%" }}>
      <div className="grid grid-cols-4">
        <div className="text-left col-span-1 p-3">
          <AddItemModal handleRefresh={fetchItems} />
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
                    maxWidth: 80,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                key="species"
                style={{
                  minWidth: 100,
                }}
              >
                Species
              </TableCell>
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
              ? items.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : items
            ).map((item) => {
              return (
                <TableRow
                  key={item.id}
                  className="hover:shadow-md hover:translate-y-1"
                >
                  <TableCell>
                    <span
                      className="inline-block w-20 overflow-hidden text-ellipsis whitespace-nowrap"
                      title={item.id}
                    >
                      {item.id}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className="inline-block w-20 overflow-hidden text-ellipsis whitespace-nowrap"
                      title={item.seller_id}
                    >
                      {item.seller_id}
                    </span>
                  </TableCell>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>
                    {new Date(item.mfg_date).toDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(item.exp_date).toDateString()}
                  </TableCell>
                  <TableCell>{item.material}</TableCell>
                  <TableCell>{item.origin}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {item.selling_prices} $ ({item.import_prices} $)
                  </TableCell>
                  <TableCell>
                    {fillerSpeciesForItem(item.id).join(", ")}
                  </TableCell>
                  {isLoad ? (
                    <TableCell>
                      <EditItemForm
                        item={item}
                        handleRefresh={fetchItems}
                        speciesList={speciesList}
                        supplierList={supplierList}
                        speciesListForItem={itemsUsage.filter(
                          (itemUsage) => item.id == itemUsage.PetItemId
                        )}
                      />
                      <Button
                        variant="outlined"
                        onClick={(event) => handleDeleteItem(event, item.id)}
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
                count={items.length}
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
