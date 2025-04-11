import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { AccountsPage } from "./components/admin/pages/accountsPage";
import FooterContext from "./components/FooterContext";
import { NavBar } from "./components/NavBar";
import { DashBoard } from "./pages/admin/dashBoard";
import { HomePage } from "./pages/client/homePage";
import { ItemDetailPage } from "./pages/client/itemDetailPage";
import { ItemsPage } from "./pages/client/itemsPage";
import { LoginPage } from "./pages/client/loginPage";
import { LogOutPage } from "./pages/client/logOutPage";
import { NoPage } from "./pages/client/noPage";
import { PersonalPage } from "./pages/client/personalPage";
import { PetDetailPage } from "./pages/client/petDetailPage";
import { PetsPage } from "./pages/client/petsPage";
import { SearchPage } from "./pages/client/searchPage";
import { ShoppingCartPage } from "./pages/client/shoppingCartPage";
import { SignUpPage } from "./pages/client/signUpPage";

function App() {
  const [role, setRole] = useState(0);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if ((role == "ADMIN") | (role == "STAFF")) {
      setRole(1);
    }
  }, []);

  return (
    <BrowserRouter>
      {role ? "" : <NavBar />}
      <Routes>
        <Route path="/" element={role ? <DashBoard /> : <HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<LogOutPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="admin" element={<DashBoard />}>
          <Route index element={<DashBoard />} />
          <Route path="accounts" element={<AccountsPage />} />
        </Route>
        <Route path="pets" element={<PetsPage />} />
        <Route path="pets/:speciesId" element={<PetsPage />} />
        <Route path="pets/:speciesId/:petId" element={<PetDetailPage />} />
        <Route path="items" element={<ItemsPage />} />
        <Route path="items/:itemId" element={<ItemDetailPage />} />
        <Route path="search/:type/:id" element={<SearchPage />} />
        <Route path="/shoppingCart" element={<ShoppingCartPage />} />
        <Route path="/profile" element={<PersonalPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <FooterContext />
    </BrowserRouter>
  );
}

export default App;
