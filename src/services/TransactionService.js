import axios from 'axios'
import authHeader from './authHeader'
import UserService from './UserService'
const API_URL = 'http://hb-api.fwalle.de/'

class TransactionService {

    fetchTransactions(search, valFrom, valTo) {
        let ext = []
        console.log(search)
        if (search !== undefined && search.length > 2) ext.push('name=' + search)
        if (valTo !== undefined) {
            ext.push('bookingDate%5Bbefore%5D=' + valTo)
        }
        if (valFrom !== undefined) {
            ext.push('bookingDate%5Bafter%5D=' + valFrom)
        }

        if (ext.length > 0) ext = '?' + ext.join('&')
        else ext = ''

        return axios.get(API_URL + 'api/bookings.json' + ext, {
            headers: authHeader(),
        })
    }

    addTransaction(formData) {
        let category = []

        for (let n = 0; n < formData.categories.length; n++)
            category.push({
                name: formData.categories[n].name,
            })
        formData['category'] = category
        // delete formData.categories;

        formData['user'] = {}
        formData['user']['@id'] = UserService.getUser().id
        formData.type = parseInt(formData.type)
        formData.amount = parseFloat(formData.amount)

        let h = authHeader()
        h.accept = 'application/ld+json'
        h['Content-Type'] = 'application/ld+json'
        return axios({
            method: 'POST',
            url: API_URL + 'api/bookings',
            headers: h,
            data: formData,
        })
    }

    fetchTransaction(id) {
        let h = authHeader()
        h.accept = 'application/ld+json'
        h['Content-Type'] = 'application/ld+json'

        return axios.get(API_URL + 'api/bookings/' + id, { headers: h })
    }

    deleteTransaction(id) {
        return axios.delete(API_URL + 'api/bookings/' + id, {
            headers: authHeader(),
        })
    }

    patchTransaction(id, formData) {
        let category = []

        for (let n = 0; n < formData.categories.length; n++) {
            let cat = formData.categories[n]
            if (cat === undefined) continue

            let item = {
                name: cat.name,
                '@type': 'Category',
            }
            console.log(typeof cat)
            

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
            url: API_URL + 'api/bookings/' + id,
            headers: h,
            data: formData,
        })
    }
}
export default new TransactionService()
