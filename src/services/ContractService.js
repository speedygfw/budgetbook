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

    fetchContract(id) {
        let h = authHeader()
        h.accept = 'application/ld+json'
        h['Content-Type'] = 'application/ld+json'

        return axios.get(API_URL + 'api/contracts/' + id, { headers: h })
    }

    deleteContract(id)
    {
        return axios.delete(API_URL + "api/contracts/" + id, { headers: authHeader() });
    }

    patchContract(id, formData) {
        let category = []

        for (let n = 0; n < formData.categories.length; n++) {
            let cat = formData.categories[n]
            if (cat === undefined) continue

            let item = {
                name: cat.name,
                '@type': 'Category',
            }

            

            if (cat.id !== undefined) item['@id'] = cat['id'];

            category.push(item)
        }
        if (formData.categories.length > 0) formData['category'] = category;
        formData.type = parseInt(formData.type);
        formData.amount = parseFloat(formData.amount);

        let h = authHeader()
        h.accept = 'application/ld+json'
        h['Content-Type'] = 'application/merge-patch+json'

        return axios({
            method: 'PATCH',
            url: API_URL + 'api/contracts/' + id,
            headers: h,
            data: formData,
        })
    }
   
}
export default new ContractService();