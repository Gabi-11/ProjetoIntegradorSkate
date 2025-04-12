import { Request, Response } from 'express';
import client from '../config/db';

// Função para criar um novo usuário
export const criarUsuario = async (req: Request, res: Response) => {
    const { nome, email, senha, tipo_usuario, regiao } = req.body;

    try {
        const result = await client.query(
            'INSERT INTO usuarios (nome, email, senha, tipo_usuario, regiao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome, email, senha, tipo_usuario, regiao]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar o usuário');
    }
};

// Função para listar todos os usuários
export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const result = await client.query('SELECT * FROM usuarios');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao listar usuários');
    }
};

// Função para editar um usuário
export const editarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, email, senha, tipo_usuario, regiao } = req.body;

    try {
        const result = await client.query(
            'UPDATE usuarios SET nome = $1, email = $2, senha = $3, tipo_usuario = $4, regiao = $5 WHERE id = $6 RETURNING *',
            [nome, email, senha, tipo_usuario, regiao, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao editar o usuário');
    }
};

// Função para excluir um usuário
export const excluirUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await client.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        res.status(200).send('Usuário excluído com sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao excluir o usuário');
    }
};
