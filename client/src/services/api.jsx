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