import axios from "axios";

export const fetchDashboardAPI = async () => {
  const response = await axios.get("https://d29l1nxcqevrmo.cloudfront.net/dashboard");
  return response.data.data;
};
