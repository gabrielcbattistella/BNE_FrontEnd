import axios from 'axios';

const usersUrl = 'http://localhost:5000/api/users';
const productsUrl = 'http://localhost:5000/api/products';
const salesUrl = 'http://localhost:5000/api/sales';


export const getUsers = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

export const addUser = async (user) => {
    return await axios.post(`${usersUrl}`, user);
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

export const editUser = async (id, user) => {
    return await axios.put(`${usersUrl}/${id}`, user)
}

export const getProducts = async (id) => {
    id = id || '';
    return await axios.get(`${productsUrl}/${id}`);
}

export const addProduct = async (product) => {
    return await axios.post(`${productsUrl}`, product);
}

export const deleteProduct = async (id) => {
    return await axios.delete(`${productsUrl}/${id}`);
}

export const editProduct = async (id, product) => {
    return await axios.put(`${productsUrl}/${id}`, product)
}

export const getSales = async (id) => {
    id = id || '';
    return await axios.get(`${salesUrl}/${id}`);
}

export const addSale = async (sale) => {
    return await axios.post(`${salesUrl}`, sale);
}

export const deleteSale = async (id) => {
    return await axios.delete(`${salesUrl}/${id}`);
}

export const editSale = async (id, sale) => {
    return await axios.put(`${salesUrl}/${id}`, sale)
}