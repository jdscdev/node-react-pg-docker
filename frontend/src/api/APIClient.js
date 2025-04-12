const API_BASE_URL = 'http://localhost:5000/api';
const API_HEADERS = { 'Content-Type': 'application/json' };

const fetchAction = async (path, options) => {
  const newOptions = {
    ...options,
    headers: {
      ...API_HEADERS,
      ...options.headers,
    },
  };
  return await fetch(`${API_BASE_URL}${path}`, newOptions);
};

const apiRequest = async (path, options = {}) =>{
  try {
    const res = await fetchAction(path, options);
    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || 'Something went wrong');
      error.statusCode = res.status;
      throw error;
    }

    return data;
  } catch (err) {
    // Re-throw to be caught by custom hook
    throw err;
  }
};

const apiRequestDelete = async (path, options = {}) => {
  try {
    const res = await fetchAction(path, options);

    if (!res.ok) {
      const errorMsg = (res.error && res.error.message) || 'Something went wrong';
      const error = new Error(errorMsg);
      error.statusCode = res.status;
      throw error;
    }
  } catch (err) {
    throw err;
  }
};

// API CRUD methods
const APIClient = () => {
  return {
    getAll: async function (apiURL) {
      return await apiRequest(apiURL);
    },
    createRecord: async function (apiURL, record) {
      const options = {
        method: 'POST',
        body: JSON.stringify(record),
      };
      return await apiRequest(apiURL, options);
    },
    updateRecord: async function (apiURL, id, record) {
      const options = {
        method: 'PUT',
        body: JSON.stringify(record),
      };
      return await apiRequest(`${apiURL}/${id}`, options);
    },
    deleteRecord: async function (apiURL, id) {
      const options = { method: 'DELETE' };
      return await apiRequestDelete(`${apiURL}/${id}`, options);
    },
    getRecordById: async function (apiURL, id) {
      return await apiRequest(`${apiURL}/${id}`);
    },
  };
};

export default APIClient();