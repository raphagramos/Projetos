import React, { useState } from 'react';
import 'react-dropdown/style.css';
import "../App.css";
import BasicModal from './modalVenda';

export const Crediario: React.FC = () => {
const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>      
      <BasicModal open={isModalOpen} handleClose={handleCloseModal} />
    </div>
  );
};
