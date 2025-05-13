const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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

registrarLog('teste');