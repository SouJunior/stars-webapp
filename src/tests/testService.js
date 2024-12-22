import { getVolunteers } from "../services/volunteerServices.js";
import { getUsers } from "../services/userServices.js";

(async () => {
    try {
        console.log("Fazendo requisição para /volunteers/...");
        const volunteers = await getVolunteers();
        console.log("Status da resposta:", volunteers?.status);
        console.log("Dados completos da resposta:", volunteers);
        console.log("Voluntários: ", volunteers);
    } catch (error) {
        console.error("Erro ao buscar voluntários:");
        console.error("Message:", error.message);
        console.error("Status:", error.response?.status);
        console.error("Dados do erro:", error.response?.data);
    }
})();

(async () => {
    try {
        console.log("Fazendo requisição para /users/...");
        const users = await getUsers();
        console.log("Status da resposta:", users?.status);
        console.log("Dados completos da resposta:", users);
        console.log("Usuários: ", users);
    } catch (error) {
        console.error("Erro ao buscar usuários:");
        console.error("Message:", error.message);
        console.error("Status:", error.response?.status);
        console.error("Dados do erro:", error.response?.data);
    }
})();