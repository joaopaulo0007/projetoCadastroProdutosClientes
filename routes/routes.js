import {getproduto,addproduto,updateproduto,deleteproduto, getProdutos,getCliente,getClientes,updateClient,deleteClient,addClient} from '../controllers/controlers.js'

import { Router } from 'express'

const router=Router()
router.get('/produtos/:id',getproduto)
router.post('/produtos',addproduto)
router.put('/produtos/:id',updateproduto)
router.delete('/produtos/:id',deleteproduto)
router.get('/produtos',getProdutos)
router.get('/clientes/:id',getCliente)
router.post('/clientes',addClient)
router.put('/clientes/:id',updateClient)
router.delete('/clientes/:id',deleteClient)
router.get('/clientes',getClientes)

export default router