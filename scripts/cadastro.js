// const url = "http://54.94.245.33:3000";
const url = "http://127.0.0.1:3000";

const botao = document.querySelector(".submit");

const teste = fetch(url)
  .then((response) =>{return response.json()} )
  .then((msg)=>{ console.log(msg.message)} );

const pessoaValues = {
  nome:document.querySelector("#name"),
  email:document.querySelector("#email"),
  senha:document.querySelector("#password"),
  confirmarSenha:document.querySelector("#confirm-password")
}

const pessoa = {}

let pessoaJSON, mensagemErro, isValid, errorMsg, msgAnterior;

function handleRequest(Mensagem, bool, errorType=0) {

  if(bool){
    //voltar para pagina de login
    console.log(Mensagem);
    window.location.href = './index.html';
    return;  
  }

  switch(errorType){
    case "1":      //caso o usuario não preencha o campo nome
      const containerNome = document.querySelector(".container-nome");
      msgAnterior = document.querySelector("#errorMsg");
      if(msgAnterior){
        msgAnterior.remove();
      }
      errorMsg = document.createElement('p');
      errorMsg.id="errorMsg"
      errorMsg.innerHTML = 'O campo de nome é OBRIGATÓRIO';
      containerNome.appendChild(errorMsg);
      alert("Preencha todos os Campos!");
      break;
      
    case "2":         //caso o usuario não preencha o campo email
      const containerEmail = document.querySelector(".container-email");
      msgAnterior = document.querySelector("#errorMsg");
      if(msgAnterior){
        msgAnterior.remove();
      }
      errorMsg = document.createElement('p');
      errorMsg.id="errorMsg"
      errorMsg.innerHTML = 'O campo de email é OBRIGATÓRIO';
      containerEmail.appendChild(errorMsg);
      alert("Preencha todos os Campos!");
      break;

    case "3":        //caso o usuario não preencha o campo senha
      const containerSenha = document.querySelector(".container-senha");
      msgAnterior = document.querySelector("#errorMsg");
      if(msgAnterior){
        msgAnterior.remove();
      }
      errorMsg = document.createElement('p');
      errorMsg.id="errorMsg"
      errorMsg.innerHTML = 'O campo de senha é OBRIGATÓRIO';
      containerSenha.appendChild(errorMsg);
      alert("Preencha todos os Campos!");
      break;

    case "4":          //caso o usuario não preencha as senhas igualmente
      const containerSenhaConf = document.querySelector(".container-senha");
      msgAnterior = document.querySelector("#errorMsg");
      if(msgAnterior){
        msgAnterior.remove();
      }
      errorMsg = document.createElement('p');
      errorMsg.id="errorMsg"
      errorMsg.innerHTML = 'As senhas devem ser IDÊNTICAS';
      containerSenhaConf.appendChild(errorMsg);
      alert("Preencha todos os Campos!");
      break;
  };
  console.log(mensagemErro);
}


botao.addEventListener("click", ()=>{ // configuração do envio do botao de registrar
  pessoa.name = pessoaValues.nome.value;
  pessoa.email = pessoaValues.email.value;
  pessoa.password = pessoaValues.senha.value;
  pessoa.confirmPassword = pessoaValues.confirmarSenha.value;

  pessoaJSON = JSON.stringify(pessoa);

  fetch(`${url}/auth/register/`, {
    method:'POST', 
    headers:{'Content-Type' : 'application/json'},
    body: pessoaJSON })
    .then((response)=>{
      if(!response.ok){
        response.json().then(message=>{handleRequest(message.errorMessage, false, message.errorType)});
        throw Error(response.status);
      }
      response.clone().json().then(message=>{handleRequest(message.msg, true)});
      return response.json();
    }).catch( error =>{
      console.log('Erro na requisição:', error.message); 
    })
})

