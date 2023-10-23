import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';
import React, {useEffect, useState} from "react";

function App() {
  /* Cria um objeto chamado produto com três propriedades: codigo, nome e marca. Cada propriedade é associada 
    a um valor inicial. */
  const produto = {
    codigo : 0,
    nome : '',
    marca : ''
  }
  /* A variável chamada btnCadastrar que armazena o estado atual de um botão (ativado ou desativado) e uma 
    função chamada setBtnCadastrar que é usada para alterar esse estado. */
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  /* Isso é uma chamada a uma função chamada useState, que é usada em React para criar uma variável de 
    estado em um componente funcional. O true é o valor inicial desse estado. */
  const [produtos, setProdutos] = useState([]);
  /* Isso declara uma variável de estado chamada produtos. Ela inicia com um array vazio ([]) e pode ser usada 
  para armazenar e atualizar dados no componente. A função setProdutos será usada para modificar o valor de produtos. */
  const [objProduto, setObjProduto] = useState(produto)
  /* objProduto armazena informações sobre um produto, e setObjProduto é usado para modificar essas informações 
    ao longo do tempo. */
    /* O useEffect é um recurso do React que permite executar código em um componente após ele ser exibido na tela.
    É como dizer ao componente: "Faça isso depois que você aparecer na tela!" */
  useEffect(() => {
    // Aqui, usamos a função fetch para fazer uma solicitação HTTP para a URL "http://localhost:8080/listar".
    /* O fetch é uma ferramenta para buscar informações da internet, como dados de servidores ou APIs, e usá-los em seus 
    aplicativos. É uma maneira de obter e atualizar dados dinâmicos em seu aplicativo web. */
    fetch("http://localhost:8080/listar")
    // O método .then() é usado para processar a resposta da solicitação HTTP quando ela estiver pronta.
    .then(retorno => retorno.json()) // Convertemos a resposta em JSON.
    .then(retorno_convertido => setProdutos(retorno_convertido)) 
    /* toma a resposta convertida e a utiliza para atualizar o estado produtos do componente usando setProdutos. 
    Isso significa que, uma vez que os dados são buscados com sucesso, eles são armazenados no estado do componente. 
    * O [] vazio no final indica que este efeito só deve ser executado uma vez, ou seja, quando o componente é montado 
    pela primeira vez.*/
  }, [])

  // Obtendo dados do formulário
  /* uma função chamada aoDigitar que é acionada quando o usuário digita algo em um campo de entrada de dados 
  (Um campo de texto) em um formulário. A função atualiza o estado objProduto com um novo valor, que é um 
  objeto modificado. O valor é atualizado com base no que o usuário digitou no campo de entrada, usando 
  [e.target.name]: e.target.value para identificar o campo de entrada correto no objeto objProduto. */
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]: e.target.value})
  }

  // Cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar',{ // // Inicia uma solicitação HTTP para 'http://localhost:8080/cadastrar'
      method:'post', // Define o método da solicitação como POST
      body:JSON.stringify(objProduto), /* está sendo preparando os dados contidos na variável objProduto para serem 
      enviados como corpo da solicitação HTTP. O método JSON.stringify() transforma o objeto JavaScript objProduto 
      em uma string JSON. */
      headers:{
        'Content-type':'application/json', // Este cabeçalho indica ao servidor o tipo de conteúdo que está sendo enviado no corpo da solicitação.
        'Accept':'application/json' // Este cabeçalho indica ao servidor o tipo de resposta que estamos dispostos a aceitar. 
      }
    })
    .then(retorno => retorno.json()) // Converte a resposta em JSON
    .then(retorno_convertido => { // Quando a resposta é convertida em JSON, Exibe os dados da resposta no console.
      // Verifica se a resposta do serviço contém uma mensagem de erro, se houver, a condição é verdadeira.
      if(retorno_convertido.mensagem !== undefined){
        // Exibe a mensagem de erro em um alerta para o usuário.
        alert(retorno_convertido.mensagem)
      } else {  // Se não houver mensagem de erro na resposta do serviço, o código executa esta parte.
        setProdutos([...produtos, retorno_convertido]) // Atualiza o estado da lista de produtos, adicionando o novo produto.
        alert('Produto cadastrado com sucesso!') // Exibe um alerta informando que o produto foi cadastrado com sucesso.
        limparFormulario()
      }
    })
  }

  // Alterar produto
  const alterar = () => {
    fetch('http://localhost:8080/alterar',{ // // Inicia uma solicitação HTTP para 'http://localhost:8080/alterar'
      method:'put', // Define o método da solicitação como PUT para atualização.
      body:JSON.stringify(objProduto), /* está sendo preparando os dados contidos na variável objProduto para serem 
      enviados como corpo da solicitação HTTP. O método JSON.stringify() transforma o objeto JavaScript objProduto 
      em uma string JSON. */
      headers:{
        'Content-type':'application/json', // Este cabeçalho indica ao servidor o tipo de conteúdo que está sendo enviado no corpo da solicitação.
        'Accept':'application/json' // Este cabeçalho indica ao servidor o tipo de resposta que estamos dispostos a aceitar. 
      }
    })
    .then(retorno => retorno.json()) // Converte a resposta em JSON
    .then(retorno_convertido => { // Quando a resposta é convertida em JSON, Exibe os dados da resposta no console.
      // Verifica se a resposta do serviço contém uma mensagem de erro, se houver, a condição é verdadeira.
      if(retorno_convertido.mensagem !== undefined){
        // Exibe a mensagem de erro em um alerta para o usuário.
        alert(retorno_convertido.mensagem)
      } else {  // Se não houver mensagem de erro na resposta do serviço, o código executa esta parte.
        alert('Produto alterado com sucesso!') // Exibe um alerta informando que o produto foi alterado com sucesso.
        let vetorTemp = [...produtos] 
        /* Procura no array vetorTemp o índice do elemento cujo código corresponde ao código do objeto objProduto e armazena esse índice 
        na variável indice. O método .findIndex() é usado para encontrar a posição (índice) de um elemento em um array que atenda a uma determinada condição. */
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo
        })
        // Alterar produto do vetorTemp
        /* Atualiza o elemento do array vetorTemp na posição indice com os dados do objeto objProduto. Basicamente, ela substitui o 
        elemento existente no vetor pela versão atualizada do produto representada por objProduto */
        vetorTemp[indice] = objProduto
        // Atualizar o vetor de produtos
        setProdutos(vetorTemp) /* O setProdutos(vetorTemp) serve para atualizar o estado da variável produtos com os valores do array 
        vetorTemp */
        limparFormulario()
      }
    })
  }

   // Remover produto
   const remover = () => {
    fetch('http://localhost:8080/remover/'+ objProduto.codigo,{ 
      /* A solicitação é do tipo DELETE, o que indica que um recurso está sendo solicitado para remoção no servidor. O código do 
      produto (objProduto.codigo) está sendo usado na URL para identificar qual recurso deve ser removido. */
      method:'delete',
      headers:{
        'Content-type':'application/json', // Este cabeçalho indica ao servidor o tipo de conteúdo que está sendo enviado no corpo da solicitação.
        'Accept':'application/json' // Este cabeçalho indica ao servidor o tipo de resposta que estamos dispostos a aceitar. 
      }
    })
    .then(retorno => retorno.json()) // Converte a resposta da solicitação HTTP em um objeto JavaScript usando .json().
    .then(retorno_convertido => { // É o objeto JavaScript resultante após a conversão da resposta.
      alert(retorno_convertido.mensagem) // Isso exibe uma mensagem contida no objeto 
      // Cópia do vetor de produtos
      /* Cria uma cópia do array produtos e a armazena em uma nova variável chamada vetorTemp. Isso permite que você faça modificações
       em vetorTemp sem afetar o array original produtos. */
      let vetorTemp = [...produtos] 
      /* Procura no array vetorTemp o índice do elemento cujo código corresponde ao código do objeto objProduto e armazena esse índice 
      na variável indice. O método .findIndex() é usado para encontrar a posição (índice) de um elemento em um array que atenda a uma determinada condição. */
      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo
      })
      // Remover produto do vetorTemp
      /* Remove um elemento do array vetorTemp na posição indice. O 1 indica que apenas um elemento será removido. Portanto, essa linha 
      de código exclui um item específico do array vetorTemp. O método .splice() é usado para modificar um array, permitindo a remoção,
      substituição ou inserção de elementos.  */
      vetorTemp.splice(indice, 1)
      // Atualizar o vetor de produtos
      setProdutos(vetorTemp) /* O setProdutos(vetorTemp) serve para atualizar o estado da variável produtos com os valores do array vetorTemp */
      limparFormulario()
    })
  }

// Limpar formulário
const limparFormulario = () => {
  // Essa função usa setObjProduto para definir o valor de objProduto de volta para o valor de produto. 
  setObjProduto(produto)
  // Define o estado do "BtnCadastrar" como verdadeiro. Isso está ativando o botão de cadastro.
  setBtnCadastrar(true)
}

// Selecionar produto
// Esta é uma função chamada SelecionarProduto que recebe um argumento chamado "indice".
const SelecionarProduto = (indice) => {
  // Define o estado do "ObjProduto" com base no elemento do array "produtos" no índice fornecido.
  setObjProduto(produtos[indice])
  // Define o estado do "BtnCadastrar" como falso. Isso está desativando o botão de cadastro.
  setBtnCadastrar(false)
}

  return (
    <div>
      {/* A função JSON.stringify(objProduto) converte o objeto JavaScript objProduto em uma string JSON para que 
      ele possa ser exibido na interface do usuário. 
    <p>{JSON.stringify(objProduto)}</p> */}
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={SelecionarProduto}/>
    </div>
  );
}

export default App;
