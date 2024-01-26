import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { PadariaEnum, PadariaTabsEnum } from "./modules/common/core/enums/padaria.enum";
import { Clientes } from "@/clientes.tsx";
import { ConsultaCred } from "@/consulta_crediario";
import { Produtos } from "@/produtos.tsx";
import { CadastraCliente } from "@/cadastra_cliente.tsx";
import { CadastraProduto } from "@/cadastra_produto.tsx";

export const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>{PadariaEnum.TITLE}</h1>
        <div className="background-container"></div>
        <div className="card">
          <Link to="/clientes">
            <button>{PadariaTabsEnum.CLIENTES}</button>
          </Link>
          <Link to="/consulta_crediario">
            <button>{PadariaTabsEnum.CONSULTA_CRED}</button>
          </Link>
          <Link to="/venda_crediario">
            <button>{PadariaTabsEnum.VENDA_CRED}</button>
          </Link>
          <Link to="/produtos">
            <button>{PadariaTabsEnum.PRODUTOS}</button>
          </Link>
        </div>
        <div className="card">
          <Link to="/cadastra_cliente">
            <button>{PadariaTabsEnum.CADASTRAR_CLIENTE}</button>
          </Link>
          <Link to="/cadastra_produto">
            <button>{PadariaTabsEnum.CADASTRAR_PRODUTO}</button>
          </Link>
        </div>
        <Routes>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/consulta_crediario" element={<ConsultaCred />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/cadastra_cliente" element={<CadastraCliente />} />
          <Route path="/cadastra_produto" element={<CadastraProduto />} />
        </Routes>
      </div>
    </Router>
  );
};
