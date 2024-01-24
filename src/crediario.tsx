import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import "./App.css";
import { CrediarioEnum } from "./modules/common/core/enums/crediario.enum";
import useClientesData from "./components/Tabela/Busca_Clientes";

export const Crediario: React.FC = () => {
  const { clientes } = useClientesData();
  // const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleDropdownChange = (selected: Option | null) => {
    // setSelectedOption(selected);

  };

  const dropdownOptions = clientes.map((cliente) => ({
    value: cliente,
    label: cliente.nm_cliente,
  }));

  return (
    <div>
      <h2>{CrediarioEnum.TITLE}</h2>
      <Dropdown
        options={dropdownOptions}
        onChange={handleDropdownChange}
        // value={selectedOption}
        placeholder="Selecione um cliente"
      />
    </div>
  );
};
