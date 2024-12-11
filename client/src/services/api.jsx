import axios from "axios"

const API_URL = 'http://localhost:5000'

export const getServers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/servers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching servers: ", error);
    return [];
  }
};

export const getChannels = async (serverId) => {
  try {
    const response = await axios.get(`${API_URL}/api/server/${serverId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching content for server ${serverId}:`, error);
    return null;
  }
};

/** 로그인 성공 시 true, 실패 시 false 반환 */
export const login = async (data) => {
  try{
    const response = await axios.post(`${API_URL}/api/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    return true;
  } catch (error) {
    return false;
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return true;
  } catch (error) {
    return false;
  }

}