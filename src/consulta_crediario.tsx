import { useState } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import "./App.css";
import { CrediarioEnum } from "./modules/common/core/enums/crediario.enum";
import useClientesData from "./components/Tabela/Busca_Clientes";

export const ConsultaCred: React.FC = () => {
  const { clientes } = useClientesData();
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleDropdownChange = (selected: Option | null) => {
    if (selected !== null) {
      const selectedValue: Option = selected as Option;
      setSelectedOption(selectedValue);
    } else {
      setSelectedOption(null);
    }
  };

  const generateMonths = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const months = [
      'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
      'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
    ];

    const monthsForDropdown = months.map(month => `${month} ${currentYear}`)
      .concat(months.map(month => `${month} ${currentYear + 1}`));

    return monthsForDropdown;
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
        value={selectedOption || undefined}
        placeholder="Selecione um cliente"
      />

      <Dropdown
        options={generateMonths().map(month => ({ value: month, label: month }))}
        placeholder="Selecione um mês"
      />
    </div>
  );
};
