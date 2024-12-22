export const getUsers = async () => {
    try {
        const response = await ApiClient.get("/users/");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
};