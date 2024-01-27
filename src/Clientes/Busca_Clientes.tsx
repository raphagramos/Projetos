import { useState, useEffect } from "react";
import { columns } from "./clientes";
const useClientesData = () => {
  const [clientes, setClientes] = useState<columns[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = "http://localhost:8081/clientes";
        const response = await fetch(backendUrl);

        if (response.ok) {
          const data = await response.json();
          console.log("Dados dos clientes:", data);
          setClientes(data as columns[]);
        } else {
          console.error("Erro ao buscar dados dos clientes:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar dados dos clientes:", error);
      }
    };

    fetchData();
  }, []);

  return { clientes };
};

export default useClientesData;
