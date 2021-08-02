import axios from 'axios';

// Add a request (aka client to server) interceptor
axios.interceptors.request.use((config) => {
    let user = JSON.parse(localStorage.getItem('user'));
    // Itercept any axios requests and if auth token is in localStorage, set it to the authorization header
    if (user && user.auth_token) { 
      config.headers.Authorization = `Bearer ${user.auth_token}`; 
    }
    return config;
  }, (e) => {
    alert('interceptor request has error');
    return Promise.reject(e);
});

// Add a response (aka server to client) interceptor
axios.interceptors.response.use((response) => {
    return response;
  }, async (e) => {
    // Itercept any axios responses and if jwt error occurs, send post request to remove current session token from user's tokens array, remove user from localStorage, and redirect back to login page  
    if (e.response && e.response.data.name === 'TokenExpiredError') { 
        console.log(e.response.data.message);
        const user = JSON.parse(localStorage.getItem("user"));
        await axios.post('/auth/remove', { 
          auth_token: user.auth_token, 
          id_token: user.id_token 
        }); 
        localStorage.removeItem('user');
        window.location.href = '/'; 
    } else
        return Promise.reject(e);
});

export default axios;