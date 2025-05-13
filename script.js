import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
const app = express();
const PORT = 8002;

function registrarLog(nomeAluno) {
    const dataHora = new Date().toISOString();
    const mensagem = `${dataHora} - ${nomeAluno}`;
    fs.appendFile('./logs.txt', `${uuidv4()} - ${mensagem}\n`, (err) => {
        if (err) {
            console.error('Erro ao registrar log:', err);
        } else {
            console.log('Log registrado com sucesso.');
        }
    });
}

app.use(express.json());

app.get('/logs', (req, res) => {
    fs.readFile('./logs.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de logs:', err);
            res.status(500).send('Erro ao ler os logs.');
        } else {
            res.send(`<pre>${data}</pre>`);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando`);
    registrarLog('');
});