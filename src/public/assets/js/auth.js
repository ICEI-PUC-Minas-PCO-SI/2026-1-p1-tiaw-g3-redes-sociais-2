let usuario = null;

function checkLoggedUser(){
    const usuarioStr = sessionStorage.getItem('usuario');

    if(!usuarioStr){
        location.href = 'login.html';
    }

    usuario = JSON.parse(usuarioStr);
    return true;
}

function loginUser(login, senha){

    const usuarios = getUsuarios();
    const usuarioObj = usuarios.find(elem => (elem.login === login) && (elem.senha === senha));

    if(!usuarioObj){
        return false;
    }
    else{
        sessionStorage.setItem('usuario', JSON.stringify(usuarioObj));
        return true;
    }
}

function cadastroUser(login, nome, email, senha){

    const usuarios = getUsuarios();

    const emailExiste = usuarios.some(usuario => usuario.email === email);
    const loginExite = usuarios.some(usuario => usuario.login === login);
    
    if(emailExiste){
        alert("Este e-mail já está cadastrado!");
        return
    }

    if (loginExite) {
        alert("Este login já está em uso!");
        return;
    }

    usuarios.push({
        id: usuarios.length + 1,
        nome: nome,
        login: login,
        email: email,
        senha: senha,
        admin: false,
        favoritos: []
    });

    salvarUsuarios(usuarios);

    alert('Cadastro feito com sucesso!');
    location.href = 'login.html'
}

function logoutUser(){
    sessionStorage.clear();

    location.href = "login.html";
}