import axios from "axios";
import authHeader from "./authHeader";
import UserService from "./UserService";

const API_URL = process.env.REACT_APP_API_URL;

class ContractService {
    fetchContracts() {

        return axios.get(API_URL + 'api/contracts.json', { headers: authHeader() })
        
    }

    addContract(userData) {
        
        userData['user'] = {};
        userData['user']["@id"] = UserService.getUser().id;
        userData.rotation = parseInt(userData.rotation);
        userData.type = parseInt(userData.type);
        userData.amount = parseFloat(userData.amount);

        let h = authHeader();
        h.accept = "application/ld+json";
        h["Content-Type"] = "application/ld+json";
        return axios({
            method: "POST",
            url: API_URL + "api/contracts", 
            headers: h,
            data: userData}
            );
    }

    deleteContract(id)
    {
        return axios.delete(API_URL + "api/contracts/" + id, { headers: authHeader() });
    }
   
}
export default new ContractService();