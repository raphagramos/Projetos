import React, { useState } from "react";
import "../App.css";
import Swal from "sweetalert2";
import { NumericFormat } from "react-number-format";
import { CadastraProdutoEnum } from "../modules/common/core/enums/cadastra_produto.enum";

export const CadastraProduto: React.FC = () => {
  const [formData, setFormData] = useState({
    nome_produto: "",
    preco: "",
    descricao: "",
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
      const response = await fetch("http://localhost:8081/produtos", {
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
        console.log("Produto cadastrado com sucesso");
      } else {
        console.error("Erro ao cadastrar Produto");
      }
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
    }
  };

  return (
    <div>
      <h2>{CadastraProdutoEnum.INSIRA_DADOS}</h2>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <label htmlFor="nome">{CadastraProdutoEnum.NOME}</label>
        <input
          type="text"
          id="nome_produto"
          name="nome_produto"
          placeholder="Leite"
          value={formData.nome_produto}
          onChange={handleChange}
        />

        <label htmlFor="preco">{CadastraProdutoEnum.PRECO}</label>
        <NumericFormat
          id="preco"
          name="preco"
          placeholder="R$10,00"
          value={formData.preco}
          onValueChange={(values) => {
            setFormData({
              ...formData,
              preco: values.value,
            });
          }}
          thousandSeparator={true}
          prefix={"R$"}
          decimalScale={2}
        />

        <label htmlFor="descricao">{CadastraProdutoEnum.TELEFONE}</label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          placeholder="Leite Desnatado Tirol"
          value={formData.descricao}
          onChange={handleChange}
        />

        <button type="submit">{CadastraProdutoEnum.CADASTRAR}</button>
      </form>
    </div>
  );
};
