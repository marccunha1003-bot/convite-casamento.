const btnSim = document.querySelector(".sim");
const btnNao = document.querySelector(".nao");
const resultado = document.querySelector("#resultado");
const nome = document.querySelector("#nomeConvidado");


const URL =
"https://script.google.com/macros/s/AKfycbzTIYBFdUwgdSwzf7sflXRRhCrcRZi1J5xqEEd7GpvEKf5b02eMOR8nb3pdKB8WYnMX/exec";


async function enviar(resposta) {

    if (nome.value.trim() === "") {

        alert("Por favor, informe seu nome.");

        return;

    }


    const dados = {

        nome: nome.value.trim(),

        resposta: resposta

    };


    try {

        const respostaServidor = await fetch(URL, {

            method: "POST",

            body: JSON.stringify(dados)

        });


        const resultadoServidor =
            await respostaServidor.json();


        // Nome já registrado
        if (resultadoServidor.status === "duplicado") {

            resultado.innerHTML = `
                ⚠️<br><br>
                <strong>Este nome já possui uma confirmação.</strong>
                <br><br>
                Não é possível confirmar novamente.
            `;

            return;

        }


        // Resposta registrada
        if (resultadoServidor.status === "ok") {

            resultado.innerHTML = `
                ❤️<br><br>
                Obrigado, <strong>${nome.value}</strong>!<br><br>
                Sua resposta foi registrada com sucesso.
            `;


            btnSim.disabled = true;

            btnNao.disabled = true;

            nome.disabled = true;

        }


        // Erro retornado pelo Apps Script
        if (resultadoServidor.status === "erro") {

            resultado.innerHTML = `
                ❌<br><br>
                ${resultadoServidor.mensagem}
            `;

        }


    } catch (erro) {

        console.error(erro);

        resultado.innerHTML = `
            ❌<br><br>
            Ocorreu um erro ao enviar sua resposta.
        `;

    }

}


btnSim.addEventListener("click", function() {

    enviar("Sim");

});


btnNao.addEventListener("click", function() {

    enviar("Não");

});
