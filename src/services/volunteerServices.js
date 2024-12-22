import ApiClient from "./apiClient.js";

export const getVolunteers = async () => {
    try {
        const response = await ApiClient.get("/volunteers");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar voluntários:", error);
        throw error;
    }
};