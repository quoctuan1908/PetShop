import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import PetsIcon from "@mui/icons-material/Pets";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Button, Select } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "60px",
  },
}));

export const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isLogin, setLogin] = React.useState(false);
  const [user, setUser] = React.useState({
    id: "",
  });
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [searchOption, setSearchOption] = React.useState(1);
  const [searchPrompt, setPrompt] = React.useState("");

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    if (localStorage.getItem("account")) setLogin(true);
    if (localStorage.getItem("user"))
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLogin ? (
        <MenuItem onClick={handleMenuClose}>
          <Link to="/profile">Profile</Link>
        </MenuItem>
      ) : (
        <MenuItem>
          <Link to="/signup">Sign up</Link>
        </MenuItem>
      )}
      <MenuItem onClick={handleMenuClose}>
        <Link to={isLogin ? "/logout" : "/login"}>
          {isLogin ? "Logout" : "Login"}
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="medium"
          edge="end"
          aria-label="account of current user"
          color="inherit"
        >
          <Link to="/items">
            Items <WidgetsIcon />
          </Link>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="medium" edge="end" aria-label="pets" color="inherit">
          <Link to="/pets">
            Pets <PetsIcon />
          </Link>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="medium" edge="end" aria-label="cart" color="inherit">
          <Badge
            badgeContent={JSON.parse(localStorage.getItem(user?.id))?.length}
            color="error"
          >
            <Link to="/shoppingCart">
              Cart <ShoppingCartIcon />
            </Link>
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          Profile <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, margin: "0px 0px 70px 0px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            className="lg:pr-20"
          >
            <Link to="/">Pet Shop</Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <div className="lg:pl-10 lg:block hidden">
            <IconButton
              size="medium"
              edge="end"
              aria-label="pets"
              color="inherit"
            >
              <Link to="/pets">
                Pets <PetsIcon />
              </Link>
            </IconButton>
          </div>
          <div className="lg:pl-10 lg:block hidden">
            <IconButton
              size="medium"
              edge="end"
              aria-label="account of current user"
              color="inherit"
            >
              <Link to="/items">
                Items <WidgetsIcon />
              </Link>
            </IconButton>
          </div>
          <div>
            <Search>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchPrompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
              />
              <Button>
                <Link
                  to={"/search/" + searchOption + "/" + searchPrompt}
                  className="text-white"
                >
                  <SearchIcon />
                </Link>
              </Button>
              <Select
                onChange={(e) => {
                  setSearchOption(e.target.value);
                }}
                value={searchOption}
              >
                <MenuItem value={1}>Pets</MenuItem>
                <MenuItem value={0}>Items</MenuItem>
              </Select>
            </Search>
          </div>
          <div className="lg:pr-10 lg:block hidden">
            <IconButton
              size="medium"
              edge="end"
              aria-label="cart"
              color="inherit"
            >
              <Badge
                badgeContent={
                  JSON.parse(localStorage.getItem(user?.id))?.length
                }
                color="error"
              >
                <Link to="/shoppingCart">
                  <ShoppingCartIcon />
                </Link>
              </Badge>
            </IconButton>
          </div>
          <div>
            <IconButton
              size="medium"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
