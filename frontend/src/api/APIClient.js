const API_BASE_URL = 'http://localhost:5000/api';
const API_HEADERS = { 'Content-Type': 'application/json' };

const fetchAction = async (path, options = {}) => {
  const newOptions = {
    ...options,
    headers: {
      ...API_HEADERS,
      ...options.headers,
    },
  };
  const res = await fetch(`${API_BASE_URL}${path}`, newOptions);
  const data = await res.json();

  if (!res.ok) {
    const errorMsg = (data && data.error) ? data.error : 'Something went wrong';
    const error = new Error(errorMsg);
    error.statusCode = res.status;
    throw error;
  }

  return data;
};

// API CRUD methods
const APIClient = () => {
  return {
    getAll: async function (apiURL) {
      return await fetchAction(apiURL);
    },
    createRecord: async function (apiURL, record) {
      const options = {
        method: 'POST',
        body: JSON.stringify(record),
      };
      return await fetchAction(apiURL, options);
    },
    updateRecord: async function (apiURL, id, record) {
      const options = {
        method: 'PUT',
        body: JSON.stringify(record),
      };
      return await fetchAction(`${apiURL}/${id}`, options);
    },
    deleteRecord: async function (apiURL, id) {
      const options = { method: 'DELETE' };
      return await fetchAction(`${apiURL}/${id}`, options);
    },
    getRecordById: async function (apiURL, id) {
      return await fetchAction(`${apiURL}/${id}`);
    },
  };
};

export default APIClient();