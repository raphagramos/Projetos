import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useClientesData from "../Clientes/Busca_Clientes";
import useProductsData from "../Produtos/buscaProdutos";
import Select from 'react-select';
import { customSelectStyles } from '../components/SelectStyle/selectStyle';

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
interface Cliente {
    nm_cliente: string;
}
interface BasicModalProps {
    open: boolean;
    handleClose: () => void;
}

export default function BasicModal(props: BasicModalProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<Record<number, number>>({}); // Armazena a quantidade de cada produto
    const { clientes } = useClientesData();
    const { produtos } = useProductsData();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSum = () => setOpen(false);

    const handleClientSelection = (client: Cliente) => {
        setSelectedClient(client);
    };
    
    const handleProductSelection = (product: Product) => {
        const isSelected = selectedProducts[product.id_produto] !== undefined;
    
        setSelectedProducts((prevSelected) => {
            if (isSelected) {
                const { [product.id_produto]: _, ...rest } = prevSelected;
                recalculateTotalPrice(rest); 
                return rest;
            } else {
                const newSelected = { ...prevSelected, [product.id_produto]: 1 };
                recalculateTotalPrice(newSelected); 
                return newSelected;
            }
        });
    };
    const recalculateTotalPrice = (updatedSelected: Record<number, number>) => {
        const newTotalPrice = Object.keys(updatedSelected).reduce((total, productId) => {
            const product = produtos.find((p) => p.id_produto === parseInt(productId, 10));
            if (product) {
                total += product.preco * updatedSelected[product.id_produto];
            }
            return total;
        }, 0);
    
        setTotalPrice(newTotalPrice);
    };
    const dropdownOptions = clientes.map((cliente) => ({
        value: cliente.nm_cliente,
        label: cliente.nm_cliente,
    }));
    const optionsWithPrice = produtos.map((product) => ({
        value: product,
        label: `${product.nome_produto} - R$${product.preco.toFixed(2)}`,
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
                            fontSize: '35px'
                        }}
                        id="modal-modal-title" variant="h6" component="h2">
                        Anotar
                    </Typography>
                    <div>
                        <h3 style={{ textAlign: "center" }}>Clientes</h3>
                        <Select
                            options={dropdownOptions}
                            onChange={(selectedOption: any) => {
                                const selectedClient = clientes.find(cliente => cliente.nm_cliente === selectedOption.value);
                                if (selectedClient) {
                                    handleClientSelection(selectedClient);
                                }
                            }}
                            value={selectedClient ? { value: selectedClient.nm_cliente, label: selectedClient.nm_cliente } : null}
                            placeholder="Selecione um cliente"
                            styles={customSelectStyles}
                        />
                    </div>

                    <div>
                        <h3 style={{ textAlign: "center" }}>Produtos</h3>

                        <Select
                            isMulti={true}
                            options={optionsWithPrice}
                            onChange={(selectedOptions: any) => {
                                setSelectedProducts(
                                    selectedOptions.reduce((acc: Record<number, number>, option: any) => {
                                        acc[option.value.id_produto] = 1;
                                        return acc;
                                    }, {})
                                );
                            }}
                            value={produtos.filter((product) => selectedProducts[product.id_produto]).map((product) => ({
                                value: product,
                                label: product.nome_produto,

                            }))}
                            styles={customSelectStyles}
                            placeholder="Selecione um produto"
                        />

                    </div>
                    <Button
                        style={{
                            top: '-310px',
                            left: '360px',
                        }}
                        onClick={handleClose}
                    >
                        <img
                            src="src/assets/images/closeIcon.png"
                            alt="Fechar"
                            style={{ width: '20px', height: '20px' }}
                        />
                    </Button>
                    <Button className='button-modal' style={{ marginLeft: '60px' }} onClick={handleSum}>
                        Anotar
                    </Button>
                    <p>Total: R${totalPrice.toFixed(2)}</p>
                </Box>               
            </Modal>
        </div>
    );
}
