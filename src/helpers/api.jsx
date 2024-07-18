import axios from 'axios';

export const fetchData = (endpoint, setData, key) => {
    axios.get(`https://localhost:7071/api/${endpoint}`)
        .then(response => setData(prevState => ({ ...prevState, [key]: response.data })))
        .catch(error => console.error(`Error fetching ${key}:`, error));
};

export const deleteData = (endpoint, id, refreshData) => {
    axios.delete(`https://localhost:7071/api/${endpoint}/${id}`)
        .then(() => {
            refreshData();
        })
        .catch(error => {
            console.error(`There was an error deleting the ${endpoint.toLowerCase()}!`, error);
        });
};
