import axios from "axios";

const baseUrl = "http://localhost:58059/api/"



export default {

    admin(url = baseUrl + 'admins/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    teacher(url = baseUrl + 'teachers/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
        user(url = 'http://localhost:58059/users/') {
            return {
                fetchAll: () => axios.get(url),
                fetchById: id => axios.get(url + id),
                create: newRecord => axios.post(url, newRecord),
                update: (id, updateRecord) => axios.put(url + id, updateRecord),
                delete: id => axios.delete(url + id)
            }
    }
}

