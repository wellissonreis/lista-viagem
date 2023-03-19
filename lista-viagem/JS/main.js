const itens = document.getElementById('novoItem'); //Pega a ID do formulário 
const lista = document.getElementById('lista'); //Pega a ID da <ul> da lista. 
const listaItens = JSON.parse(localStorage.getItem("itens")) || []; //Cria uma condição (if), onde ele irá adicionar um valor a variavel se houver informações advindas do localStorage. JSON.parse(localStorage.getItem("itens")) => converte a string em objetivo, sendo assim o navegador realiza a leitura da linha como objeto.

listaItens.forEach((element) => { //Irá passar por todos os dados do listaItens(conteúdo adquirido no localStorage)
    addItem(element); //Irá adicionar o valor ao objeto da função addItens na linha 34     
});

// console.log(listaItens)

itens.addEventListener("submit", (evento)=>{ //Cria um evento para quando o Submit é clicado
    evento.preventDefault(); //Previne o envio do formulário, pois não há a necessidade
    const nome = evento.target.elements['nome']; //Cria uma constante onde obtém os dados do input nome. evento = ações do submit | target = pega a informação | elemensts = pega o elemento.
    const quantidade = evento.target.elements['quantidade'];
    
    const existe = listaItens.find( element => element.nome === nome.value);



    const itens = { //Cria um objeto na qual recebe os nomes e quantidades dos produtos, criando assim uma forma simples de visualização
        "nome": nome.value, 
        "quantidade": quantidade.value
    }

    
    if(existe){
        itens.id = existe.id;  //cria o campo ID 
        atualizaElemento(itens);
        listaItens[listaItens.findIndex(elemento => elemento.id === existe.id)] = itens; //pega as informações de dentro do objeto e altera todas as suas informações.


    }else{
        itens.id = listaItens[listaItens.length -1] ? (listaItens[listaItens.length -1]).id + 1  : 0
        addItem(itens); //adiciona a informação a função
        listaItens.push(itens); //Puxa os dados do objetivo para dentro do Array listaItens.
    }


    localStorage.setItem("itens", JSON.stringify(listaItens)); //Adiciona uma informação no localStorage e converte esta informação em string para mesma ser interpretada pelo navegador.



    // nome.value = ""; //a cada submit ele reinicia os dados do input do navegador para vazio
    // quantidade.value = "";

})

function addItem(itens){ //função para criar a li no formato de HTML e adicionar ao DOM
    // console.log(nome, quantidade);

   // <li class="item"><strong>7</strong>Camisas</li>

    const elemento = document.createElement('li'); // cria uma <li>
    elemento.classList.add('item'); //adiciona a classe item a <li>
    const qtdItem = document.createElement('strong'); //cria um <strong>
    qtdItem.innerHTML = itens.quantidade;   //adiciona a quantidade dentro do strong
    qtdItem.dataset.id = itens.id;//cria o campo ID data-id="listaItens.length"
    elemento.appendChild(qtdItem); //adiciona o strong dentro da li
    elemento.innerHTML += itens.nome; //adiciona uma informação a li 
    lista.appendChild(elemento); //adiciona a <li> gerada a <ul>

    elemento.appendChild(botaoDeleta(itens.id));
//    console.log(elemento.outerHTML);



    // console.log(elemento.outerHTML);
    // lista.innerHTML +=elemento.outerHTML;
    
}


function atualizaElemento(item){ 
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;    
}


function botaoDeleta(id){
    const button = document.createElement("button");
    button.innerText = "X";

    button.addEventListener("click", function(){
        deleteTag(this.parentNode, id);
    })

    return button;
}

function deleteTag(tag, id){
    tag.remove()
    listaItens.splice(listaItens.findIndex(elemento => elemento.id === id) ,1);
    localStorage.setItem("itens", JSON.stringify(listaItens)); 

}