
import { api } from './apiSetup';

export const getMatrixSsoTokenApi = async () => {
    try {
        const response = await api.get('/matrix/sso-token');
        return response.data;
    } catch (error) {
        console.error("Error fetching Matrix token:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};
