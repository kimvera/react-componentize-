import axios from "axios";


let register = (payload) => {

  const config = {
    method: "POST",
    url: "https://localhost:50001/api/friends",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let grabAll = (pageIndex) => {

    const config = {
      method: "GET",
      url: `https://localhost:50001/api/friends/paginate/?pageIndex=${pageIndex}&pageSize=6`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  
let byId = (payload) => {

  const config = {
    method: "GET",
    url: `https://localhost:50001/api/friends${payload.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let deleteFriend = (payload) => {

  const config = {
    method: "DELETE",
    url: `https://localhost:50001/api/friends/${payload.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config).then(()=>payload);
};

let update = (payload) => {

  const config = {
    method: "PUT",
    url: `https://localhost:50001/api/friends/${payload.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let search = (payload) => {

  const config = {
    method: "GET",
    url: `https://localhost:50001/api/friends/search/?query=${payload}&pageIndex=0&pageSize=6`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};






export {register, grabAll, byId, deleteFriend, update, search};