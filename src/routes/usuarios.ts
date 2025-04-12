import express from 'express';
import { criarUsuario, listarUsuarios, editarUsuario, excluirUsuario } from '../controllers/usuarios';

const router = express.Router();

// Rota para criar um novo usuário
router.post('/usuarios', criarUsuario);

// Rota para listar todos os usuários
router.get('/usuarios', listarUsuarios);

// Rota para editar um usuário
router.put('/usuarios/:id', editarUsuario);

// Rota para excluir um usuário
router.delete('/usuarios/:id', excluirUsuario);

export default router;
