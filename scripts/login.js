const url = "http://127.0.0.1:3000";

const loginButton = document.querySelector(".submit");

let login, userData = {};


const loginValues = {
  email:document.querySelector('#mail'),
  password:document.querySelector('#senha')
};

function handleRequest(Mensagem, token=0, userId) {  //função que lida com a autenticação do logine seus erros

  userData.token=token;

  fetch(`${url}/user/${userId}`, {
    method:'GET',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then((response)=>{
    response.json().then((userRes)=>{   //puxa os dados do usuário logado
      userData.nome = userRes.user.name;
      userData.email = userRes.user.email;
      if(userRes.user.registerDate){
        userData.DataRegistro = userRes.user.registerDate;
      }
    })
  }).catch(error =>{
    console.log('Erro na requisição:', error.message); });

    // window.location.href = '../Conta.html';
  return;  

  console.log(Mensagem);
}

function handleError(Mensagem, errorType=0) {  //função que lida com a autenticação do logine seus erros

  console.log(Mensagem);
}

loginButton.addEventListener("click", ()=>{           //comfiguração do botão de login
  
  login = {
    email:loginValues.email.value,
    password:loginValues.password.value
  };
  let loginJson = JSON.stringify(login);

  fetch(`${url}/auth/user/`, {
    method:'POST',
    headers:{'Content-Type' : 'application/json'},
    body: loginJson
  }).then((response)=>{

    if(!response.ok){
      response.json().then(message=>{handleError(message.errorMessage, message.errorType)});
      throw Error(response.status);
    }
    response.clone().json().then(message=>{handleRequest(message.msg, message.token, message.userId)});
    return response.json();

  }).catch( error =>{
    console.log('Erro na requisição:', error.message); 
  })

});