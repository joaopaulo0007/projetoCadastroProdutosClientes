import db from '../db/db.js';

export async function getproduto(req, res) {
    try {
        const { id } = req.params;
        await db.query("SET search_path TO vendas");
        const query = `SELECT * FROM vendas.produtos WHERE id = $1`;
        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            res.status(404).send("ID de produto não encontrado");
            return;
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Erro ao obter produto:", error);
        res.status(500).send("Erro interno no servidor");
    }
}

export async function getProdutos(req, res) {
    try {
        await db.query("SET search_path TO vendas");
        const query = `SELECT * FROM vendas.produtos`;
        const result = await db.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Erro ao obter produtos:", error);
        res.status(500).send("Erro interno no servidor");
    }
}

export async function addproduto(req, res) {
    try {
        const { sku, nome, descricao, preco } = req.body;
        if (!sku || !nome || !descricao || !preco) {
            res.status(400).send("Todos os campos são obrigatórios");
            return;
        }
        const data_cadastro = new Date();
        await db.query("SET search_path TO vendas");
        const query = `INSERT INTO vendas.produtos (sku, nome, descricao, preco, data_cadastro) VALUES ($1, $2, $3, $4, $5)`;
        await db.query(query, [sku, nome, descricao, preco, data_cadastro]);

        res.status(201).send("Produto adicionado com sucesso");
    } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        res.status(500).send("Erro interno no servidor");
    }
}

export async function updateproduto(req, res) {
    try {
        const { id } = req.params;
        const { sku, nome, descricao, preco } = req.body;

        if (!id) {
            res.status(404).send('ID de produto não encontrado');
            return;
        }

        let query = 'UPDATE vendas.produtos SET';
        const queryValues = [];
        let valueIndex = 1;

        if (sku) {
            query += ` sku = $${valueIndex},`;
            queryValues.push(sku);
            valueIndex++;
        }
        if (nome) {
            query += ` nome = $${valueIndex},`;
            queryValues.push(nome);
            valueIndex++;
        }
        if (descricao) {
            query += ` descricao = $${valueIndex},`;
            queryValues.push(descricao);
            valueIndex++;
        }
        if (preco) {
            query += ` preco = $${valueIndex},`;
            queryValues.push(preco);
            valueIndex++;
        }

        query = query.slice(0, -1);
        query += ' WHERE id = $' + valueIndex;
        queryValues.push(id);

        const result = await db.query(query, queryValues);

        if (result.rowCount === 0) {
            res.status(404).send("ID de produto não encontrado");
            return;
        }

        res.status(200).send("Produto atualizado com sucesso");
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).send('Erro interno no servidor');
    }
}

export async function deleteproduto(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(404).send('ID de produto não encontrado');
            return;
        }

        await db.query('SET search_path TO vendas');
        const result = await db.query('DELETE FROM vendas.produtos WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            res.status(404).send("ID de produto não encontrado");
            return;
        }

        res.status(200).send('Produto deletado com sucesso');
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).send('Erro interno no servidor');
    }
}

export async function getCliente(req, res) {
    try {
        const { id } = req.params;

        await db.query("SET search_path TO vendas");
        const result = await db.query("SELECT * FROM vendas.clientes WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            res.status(404).send("Cliente não encontrado");
            return;
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar cliente");
    }
}

export async function getClientes(req, res) {
    try {
        await db.query("SET search_path TO vendas");
        const result = await db.query("SELECT * FROM vendas.clientes");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar clientes");
    }
}

export async function addClient(req, res) {
    try {
        const { nome, cpf, email, telefone, endereco, nascimento } = req.body;
        if (!nome || !cpf || !email || !telefone || !endereco || !nascimento) {
            res.status(400).send("Preencha todos os campos");
            return;
        }
        const data_cadastro = new Date();
       
        await db.query("SET search_path TO vendas");
        await db.query(`INSERT INTO vendas.clientes (nome, cpf, email, telefone, endereco, nascimento, data_cadastro) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [nome, cpf, email, telefone, endereco, nascimento, data_cadastro]);
        res.status(201).send("Cliente cadastrado com sucesso");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar cliente");
    }
}

export async function updateClient(req, res) {
    try {
        const { id } = req.params;
        const { nome, cpf, email, telefone, endereco, nascimento } = req.body;
        if (!id) {
            res.status(400).send("ID não encontrado");
            return;
        }
        let query = "UPDATE vendas.clientes SET ";
        const queryValues = [];
        let queryCont = 1;

        if (nome) {
            query += `nome = $${queryCont}, `;
            queryValues.push(nome);
            queryCont++;
        }
        if (cpf) {
            query += `cpf = $${queryCont}, `;
            queryValues.push(cpf);
            queryCont++;
        }
        if (email) {
            query += `email = $${queryCont}, `;
            queryValues.push(email);
            queryCont++;
        }
        if (telefone) {
            query += `telefone = $${queryCont}, `;
            queryValues.push(telefone);
            queryCont++;
        }
        if (endereco) {
            query += `endereco = $${queryCont}, `;
            queryValues.push(endereco);
            queryCont++;
        }
        if (nascimento) {
            query += `nascimento = $${queryCont}, `;
            queryValues.push(nascimento);
            queryCont++;
        }

        query = query.slice(0, -2); 
        query += ` WHERE id = $${queryCont}`;
        queryValues.push(id);

        const result = await db.query(query, queryValues);
        if (result.rowCount === 0) {
            res.status(404).send("Cliente não encontrado");
            return;
        }
        res.status(200).send("Cliente atualizado com sucesso");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar cliente");
    }
}

export async function deleteClient(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).send('Cliente não encontrado');
            return;
        }
        await db.query("SET search_path TO vendas");
        const result = await db.query("DELETE FROM vendas.clientes WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            res.status(404).send('Cliente não encontrado');
            return;
        }
        res.status(200).send('Cliente deletado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao deletar cliente');
    }
}