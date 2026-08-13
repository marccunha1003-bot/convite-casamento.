const btnSim = document.querySelector(".sim");
const btnNao = document.querySelector(".nao");
const resultado = document.querySelector("#resultado");
const nome = document.querySelector("#nomeConvidado");

const URL =
"https://script.google.com/macros/s/AKfycbzTIYBFdUwgdSwzf7sflXRRhCrcRZi1J5xqEEd7GpvEKf5b02eMOR8nb3pdKB8WYnMX/exec";

async function enviar(resposta){

    if(nome.value.trim()==""){

        alert("Por favor, informe seu nome.");
        return;

    }

    const dados={

        nome:nome.value,
        resposta:resposta

    };

    try{

        const respostaServidor = await fetch(URL,{
            method:"POST",
            body:JSON.stringify(dados)
        });

        const texto = await respostaServidor.text();

        console.log(texto);

        resultado.innerHTML=`
        ❤️<br><br>
        Obrigado, <strong>${nome.value}</strong>!<br><br>
        Sua resposta foi registrada com sucesso.<br><br>
        Por favor, confirme apenas uma vez.🙏
        `;

        btnSim.disabled=true;
        btnNao.disabled=true;

    }catch(erro){

        console.log(erro);

        resultado.innerHTML=`
        ❌<br><br>
        Ocorreu um erro ao enviar sua resposta.
        `;

    }

}

btnSim.addEventListener("click",function(){

    enviar("Sim");

});

btnNao.addEventListener("click",function(){

    enviar("Não");

});
