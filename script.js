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
        mensagem: '',
        id
    });
});

app.get('/logs/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile('logs.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao ler o arquivo de logs.' });
        }

        const logs = data.split('\n');

        const logEncontrado = logs.find(log => log.startsWith(id));

        if (logEncontrado) {
            return res.status(200).json({
                logEncontrado
            });
        } else {
            return res.status(404).json({ erro: 'Log não encontrado' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
