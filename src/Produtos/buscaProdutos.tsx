import { useState, useEffect } from "react";
import { columns } from "./produtos";
const useProductsData = () => {
    const [produtos, setClientes] = useState<columns[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const backendUrl = "http://localhost:8081/produtos";
                const response = await fetch(backendUrl);

                if (response.ok) {
                    const data = await response.json();
                    console.log("Dados dos Produtos:", data);
                    setClientes(data as columns[]);
                } else {
                    console.error("Erro ao buscar dados dos produtos:", response.statusText);
                }
            } catch (error) {
                console.error("Erro ao buscar dados dos produtos:", error);
            }
        };

        fetchData();
    }, []);

    return { produtos };
};

export default useProductsData;
