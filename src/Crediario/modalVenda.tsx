import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import useClientesData from "../Clientes/Busca_Clientes";
import useProductsData from "../Produtos/buscaProdutos";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1a1a1a',
    p: 4,
    borderRadius: 9,
};

interface Product {
    id_produto: number;
    nome_produto: string;
    preco: number;
}

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState<Record<number, number>>({}); // Armazena a quantidade de cada produto
    const { clientes } = useClientesData();
    const { produtos } = useProductsData();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClientSelection = (client) => {
        setSelectedClient(client);
    };

    const handleProductSelection = (product: Product) => {
        const isSelected = selectedProducts[product.id_produto] !== undefined;

        setSelectedProducts((prevSelected) => {
            if (isSelected) {
                const { [product.id_produto]: _, ...rest } = prevSelected;
                return rest;
            } else {
                return { ...prevSelected, [product.id_produto]: 1 }; // Inicializa a quantidade como 1
            }
        });
    };

    const handleQuantityChange = (productId, event) => {
        const quantity = parseInt(event.target.value, 10);

        setSelectedProducts((prevSelected) => {
            if (quantity > 0) {
                return { ...prevSelected, [productId]: quantity };
            } else {
                const { [productId]: _, ...rest } = prevSelected;
                return rest;
            }
        });
    };

    const dropdownOptions = clientes.map((cliente) => ({
        value: cliente,
        label: cliente.nm_cliente,
    }));

    return (
        <div>
            <Button className='button-class' onClick={handleOpen}>
                Vender
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        style={{
                            textAlign: 'center',
                            fontSize:'35px'
                        }}
                        id="modal-modal-title" variant="h6" component="h2">
                        Anotar
                    </Typography>
                    <div>
                        <h3>Clientes</h3>
                        <Dropdown
                            options={dropdownOptions}
                            onChange={(selectedOption: Option) => handleClientSelection(selectedOption.value)}
                            value={selectedClient ? selectedClient.nm_cliente : 'Selecione um cliente'}
                            placeholder="Selecione um cliente"
                        />
                    </div>
                    <div>
                        <h3>Produtos</h3>
                        {produtos.map((product) => (
                            <div key={product.id_produto} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <Checkbox
                                    checked={selectedProducts[product.id_produto] !== undefined}
                                    onChange={() => handleProductSelection(product)}
                                />
                                <label style={{ marginRight: '8px' }}>{product.nome_produto}</label>
                                {selectedProducts[product.id_produto] !== undefined && (
                                    <>
                                        <input
                                            type="number"
                                            min="1"
                                            value={selectedProducts[product.id_produto]}
                                            onChange={(event) => handleQuantityChange(product.id_produto, event)}
                                            style={{ marginRight: '8px' }}
                                        />
                                        <span>Preço: R$ {product.preco * selectedProducts[product.id_produto]}</span>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <Button className='button-class' onClick={handleClose}>
                        Fechar Modal
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}