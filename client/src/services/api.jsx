import axios from "axios";

const API_URL = 'http://localhost:5000'

const axiosApi = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosAuthApi = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAuthApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;

})

axiosAuthApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      //401 에러 발생 시 로그인 페이지로 이동
      console.error('Unauthorized. Redirecting to login.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getServers = async () => {
  try {
    const response = await axiosAuthApi.get(`/servers`);
    console.log("getServers", response.data);
    return response.data.servers;
  } catch (error) {
    console.error("Error fetching servers: ", error);
    throw error;
  }
};

export const getChannels = async (serverId) => {
  try {
    const response = await axiosAuthApi.get(`/servers/${serverId}/channels`);
    return response.data.channels;
  } catch (error) {
    console.error(`Error fetching content for server ${serverId}:`, error);
    throw error;
  }
};

export const getMessages = async (channelId) => {
  try {
    const response = await axiosAuthApi.get(`/channels/${channelId}/messages`);
    return response.data.messages;
  } catch (error) {
    console.error(`Error fetching messages for channel ${channelId}: `, error);
    return [];
  }
};

export const getFriends = async () => {
  try {
    const response = await axiosAuthApi.get(`/friends`);
    return response.data.friends;
  } catch (error) {
    return;
  }
}

/** 로그인 성공 시 response, 실패 시 error 반환 */
export const login = async (data) => {
  try{
    const response = await axiosApi.post(`/login`, data);
    //console.log(response.data.message);
    localStorage.setItem('token', response.data.token);
    console.log("Token : ", response.data.token);
    return response;
  } catch (error) {
    console.error('Error message:', error.response?.data?.message || error.response?.data?.error || error.message);
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await axiosApi.post(`/register`, data);
    return;
  } catch (error) {
    console.error('Error message:', error.response?.data?.message || error.response?.data?.error || error.message);
    throw error;
  }
}

export const createServer = async (data) => {
  try {
    const response = await axiosAuthApi.post(`/servers`, data);
    console.log('createServerResponse: ', response);
    return response.data;
  } catch (error) {
    console.error('createServerError: ', error);
    return false;
  }
}

export const createChannel = async (data, serverId) => {
  try {
    const response = await axiosAuthApi.post(`/servers/${serverId}/channels`, data);
    return response.data;
  } catch (error) {
    return false;
  }
};

export const createMessage = async (data, channelId) => {
  try {
    const response = await axiosAuthApi.post(`/channels/${channelId}/messages`, data);
    return;
  } catch (error) {
    return false;
  }
}