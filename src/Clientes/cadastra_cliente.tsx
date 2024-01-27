import React, { useState } from "react";
import InputMask from "react-input-mask";
import "../App.css";
import Swal from "sweetalert2";
import { CadastraClienteEnum } from "../modules/common/core/enums/cadastra_cliente.enum";

export const CadastraCliente: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    telefone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: "Carregando...",
        html: '<img src="https://media1.tenor.com/m/kXdU71jKYuYAAAAd/ameno-dorime-dorime.gif" width="300"  style="margin: 0 auto" alt="GIF">',
        icon: "info",
        showConfirmButton: false,
      });
      const response = await fetch("http://localhost:8081/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Sucesso!",
          text: "Cadastro efetuado com Sucesso!",
          icon: "success",
          confirmButtonText: "Ok!",
        });
        console.log("Cliente cadastrado com sucesso");
      } else {
        console.error("Erro ao cadastrar cliente");
      }
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
    }
  };

  return (
    <div>
      <h2>{CadastraClienteEnum.INSIRA_DADOS}</h2>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <label htmlFor="nome">{CadastraClienteEnum.NOME}</label>
        <input type="text" id="nome" name="nome" placeholder="Insira seu Nome" value={formData.nome} onChange={handleChange} />

        <label htmlFor="endereco">{CadastraClienteEnum.ENDERECO}</label>
        <input
          type="text"
          id="endereco"
          name="endereco"
          placeholder="Rua, Número"
          value={formData.endereco}
          onChange={handleChange}
        />

        <label htmlFor="telefone">{CadastraClienteEnum.TELEFONE}</label>
        <InputMask
          mask="(99) 99999-9999"
          type="tel"
          id="telefone"
          name="telefone"
          placeholder="(   )         -"
          value={formData.telefone}
          onChange={handleChange}
        />

        <button type="submit">{CadastraClienteEnum.CADASTRAR}</button>
      </form>
    </div>
  );
};
