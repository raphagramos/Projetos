import './App.css'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Clientes from '@/clientes.tsx';
import Crediario from '@/crediario.tsx';
import Produtos from '@/produtos.tsx';
import CadastraCliente from '@/cadastra_cliente.tsx';
import CadastraProduto from '@/cadastra_produto.tsx';

function App() {
  return (
    <Router>
      <div>
      
        <h1>Padaria Vó Mercides</h1>
        <div className="background-container"></div>
        <div className="card">
          <Link to="/clientes">
            <button className='button-class'>Clientes</button>
          </Link>
          <Link to="/crediario">
            <button>Crediário</button>
          </Link>
          <Link to="/produtos">
            <button>Produtos</button>
          </Link>
        </div>
        <div className="card">
          <Link to="/cadastra_cliente">
            <button>Cadastrar Cliente</button>
          </Link>
          <Link to="/cadastra_produto">
            <button>Cadastrar Produto</button>
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
}

export default App;
