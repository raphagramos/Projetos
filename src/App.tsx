import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { PadariaEnum, PadariaTabsEnum } from "./modules/common/core/enums/padaria.enum";
import { Clientes } from "@/modules/clientes/clientes";
import { Crediario } from "@/modules/crediario/crediario";
import { Produtos } from "@/modules/produtos/produtos";
import { CadastraCliente } from "@/modules/cadastra_cliente/cadastra_cliente";
import { CadastraProduto } from "@/modules/cadastra_produto/cadastra_produto";

export const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>{PadariaEnum.TITLE}</h1>
        <div className="background-container"></div>
        <div className="card">
          <Link to="/clientes">
            <button className="button-class">{PadariaTabsEnum.CLIENTES}</button>
          </Link>
          <Link to="/crediario">
            <button>{PadariaTabsEnum.CREDIARIO}</button>
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
          <Route path="/crediario" element={<Crediario />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/cadastra_cliente" element={<CadastraCliente />} />
          <Route path="/cadastra_produto" element={<CadastraProduto />} />
        </Routes>
      </div>
    </Router>
  );
};
