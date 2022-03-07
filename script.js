//POO
//Classes
class Produto {
    //atributos da classe
    constructor() {
        this.id = 1; //ID do produto que inicia em 1
        this.arrayProdutos = []; //Vetor que recebe os produtos deve iniciar vazio
        this.editId = null; //Atributo que vai editar o produto pegando o ID como parâmetro
    }

    /* métodos ou funções ou funcionalidades */
    salvar() {
        let produto = this.lerDados(); //produto que vem do método lerDados()
        if (this.validarCampos(produto)) //Condição que valida os campos digitados
            if (this.editId == null) { //Condição que adiciona o produto comparando o atributo editId como nulo
                this.adicionar(produto);
            }
            else {
                this.atualizar(this.editId, produto); // Condição que atualiza o produto e coloca o própio produto como parâmetro 
            }


        //condição verdadeira abreviada
        this.listaTabela(); //mostra os dados inseridos nos campos de tabela 
        this.cancelar(); // Limpa os campos que ja foram salvos depois de adicionar ou atualizar

    }
    lerDados() {
        let produto = {} //produto
        produto.id = this.id; //id do produto
        //referência ao nome do produto no HTML
        produto.nomeProduto = document.getElementById('produto').value;
        //referência do preço do produto no HMTL
        produto.preco = document.getElementById('preco').value;
        //retorna nome e preço do produto
        return produto;
    }
    validarCampos() {
        let msg = '' //significa mensagem
        if (produto.nomeProduto == '') {
            //Quando o campo mensagem estiver vazio 
            msg += 'Informe o nome do produto\n';
        }
        if (produto.preco == '') {
            //Quando o campo mensagem estiver vazio 
            msg += 'Informe o preço do produto\n'
        }
        if (msg != '') {
            alert(msg)
            return false
        }

        //Retorna os dados e valida o que foi preenchido
        return true

    }
    adicionar() {
        produto.preco = parseFloat(produto.preco) //Permite inserir valores no formato real 
        this.arrayProdutos.push(produto); //Permite adicionar o produto na tabela
        this.id++; //Incrementa o valor do ID na tabela
        //alert ("Adicionar Produto")
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell(); //Criação da coluna de ID
            let td_produto = tr.insertCell(); //Criação da coluna ddo nome do produto
            let td_valor = tr.insertCell(); //Criação da coluna do valor do produto
            let td_acoes = tr.insertCell(); //Criação da coluna das ações de editar e deletar produto

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].preco;

            td_id.classList.add('center');

            let imgEdit = document.createElement('img'); //Variável de criação do ícone/botão de editar produto
            imgEdit.src = 'editar.png'; //Diretório do arquivo de imagem
            imgEdit.setAttribute("onclick", "produto.editar(" + JSON.
                stringify(this.arrayProdutos[i]) + ")"); //Evento do clique do botão do mouse para a edição do produto na tabela e transformação do valor em um objeto

            let imgDelete = document.createElement('img'); //Variável de criação do ícone/botão de deltar produto
            imgDelete.src = 'deletar.png'; //Diretório do arquivo de imagem
            imgDelete.setAttribute("onclick", "produto.deletar(" +
                this.arrayProdutos[i].id + ")"); //Evento do clique do botão do mouse para a exclusão do produto na tabela

            td_acoes.appendChild(imgEdit); //Ação que oermite editar o produto
            td_acoes.appendChild(imgDelete); //Ação que permite deletar o produto

            console.log(this.arrayProdutos); //Exibir o vetor com os produtos ja criados no console



        }
    }



    editar(dados) { //Dados são os valores já cadastrados na tabela e que precisam ser editados
        this.editId = dados.id; //Edita o nome do produto e o valor tendo o ID como referência
        document.getElementById('produto').value = dados.nomeProduto; //Edita o nome do produto
        document.getElementById('preco').value = dados.preco; //Edita o preço do produto
        document.getElementById('btn1').innerText = 'Atualizar'; //Referêcia do botão de Atualizar para confirmar operação
    }

    atualizar(id, produto) { //Tem como parâmetro o ID e o produto já cadstrado
        //Percorre todos os produtos cadastrados
        for (let i = 0; i < this.arrayProdutos.length; i++) {

            //Condição que busca o nome e valor do produto para atualização/alteração
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.
                    nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }

    }

    cancelar() {
        //alert("Cancelar produto")
        document.getElementById('produto').value = ''; //Torna o campo do nome do produto vazio
        document.getElementById('preco').value = ''; //Torna o campo do valor do produto vazio
        document.getElementById('btn1').innerText = 'Salvar'; //Altera o nome do botão de Cancelar para Salvar
        this.editId = null //Edição pelo ID torna-se nula, pois não há edição de valores nulos
    }

    deletar(id) { //Exclui um produto da tabela pegando o ID como parâmetro

        //Alerta emitido pedindo confirmação da exclusão do produto
        if (confirm('Deseja realmente excluir o produto do ID ' + id)
        ) {
            //Variável que faz referência ao corpo da tabela no HTML 
            let tbody = document.getElementById('tbody');
            //Percorre os produtos no vetor com o parâmetro ID
            for (let i = 0; i < this.arrayProdutos.length; i++) {
                //Operação que deleta (um) produto da tabela
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);

                    tbody.deleteRow(i);
                }
            }
            console.log(this.arrayProdutos);
        }
    }


}
//Objetos 
var produto = new Produto()
