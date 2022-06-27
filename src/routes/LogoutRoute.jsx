import { Container } from "react-bootstrap";
import LayoutHeader from "../components/LayoutHeader.js";
import Login from "../components/Login.js";
import AuthService from "../services/AuthService.js";


export default function LogoutRoute() {
    AuthService.logout();
  window.location.href = "/";
}