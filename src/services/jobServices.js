import axios from "axios";

const create = (payload) => {

    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/jobs",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };



  const update = (payload) => {

    const config = {
      method: "PUT",
      url: `https://api.remotebootcamp.dev/api/jobs/${payload.id}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };



  const erase = (payload) => {

    const config = {
      method: "GET",
      url: `https://api.remotebootcamp.dev/api/jobs/${payload.id}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };




  const getAll = (payload) => {

    const config = {
      method: "GET",
      url: "https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=5",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };



  const search = (payload) => {

    const config = {
      method: "GET",
      url: `https://api.remotebootcamp.dev/api/jobs/search?pageIndex=0&pageSize=5&searchTerm=${payload}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };


  export {create, update, getAll, search, erase};