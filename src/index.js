import ReactDOM from "react-dom/client";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import App from "./components/App";
import Transactions from "./routes/transactions";
import Contracts from "./routes/contracts";
import AddContractRoute from "./Contract/AddContractRoute";
import LoginRoute from "./routes/LoginRoute";
import LogoutRoute from "./routes/LogoutRoute";
import AddTransactionRoute from "./routes/AddTransactionRoute";
import EditTransactionRoute from "./routes/EditTransactionRoute";
import EditContractRoute from "./routes/EditContractRoute";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="transaction/add" element={<AddTransactionRoute />} />
        <Route path="transaction/edit" element={<EditTransactionRoute />} />
        <Route path="transactions" element={<Transactions />} />
      <Route path="contracts/add" element={<AddContractRoute />} />
      <Route path="contracts/edit" element={<EditContractRoute />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="login" element={<LoginRoute />} />
        <Route path="logout" element={<LogoutRoute />} />
        
    </Routes>
    </BrowserRouter>
    // </React.StrictMode>
);