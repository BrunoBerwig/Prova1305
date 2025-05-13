import express from 'express';
const app = express();
const PORT = 8002;
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

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
app.listen(PORT, () => {
    console.log(`Servidor rodando`);
    registrarLog('João da Silva');
});