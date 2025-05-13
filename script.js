import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 8002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function registrarLog(nomeAluno) {
    const id = uuidv4();
    const dataHora = new Date().toISOString();
    const log = `${id} - ${dataHora} - ${nomeAluno}\n`;

    fs.appendFileSync('logs.txt', log);
    return id;
}

app.post('/logs', (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ erro: 'Nome é obrigatório' });
    }

    const id = registrarLog(nome);

    return res.status(201).json({
        mensagem: 'Log registrado com sucesso',
        id
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
