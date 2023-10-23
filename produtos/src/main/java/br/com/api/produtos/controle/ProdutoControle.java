package br.com.api.produtos.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.servico.ProdutoServico;

@RestController /* Anotação usada para indicar que a classe é responsável por processar solicitações e enviar 
respostas, geralmente no formato JSON, que é amplamente usado para troca de dados entre sistemas. */ 

// Classe responsável por criar rotas e ter acesso as requisições do tipo POST, GET, PUT e DELETE.
@CrossOrigin(origins = "*") /* é usada em aplicativos Spring para permitir ou restringir o acesso a recursos 
(como APIs) de diferentes origens (domínios). Ela ajuda a controlar quem pode fazer solicitações para o seu 
aplicativo.
origins: Define quais origens (domínios) externos têm permissão para acessar seu aplicativo. */
public class ProdutoControle {

    @Autowired
    private ProdutoServico ps;

    @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long codigo){
        // @PathVariable serve para pegar pedaços da URL e usá-los dinamicamente em suas funções.
         // A parte "{codigo}" da rota é uma variável que pode conter um número, e esse número é passado como um parâmetro para este método.
         // O método usa a anotação @PathVariable para extrair esse código da URL e, em seguida, chama um serviço de produtos (ps) para executar uma operação de remoção.
        return ps.remover(codigo);
        
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody ProdutoModelo pm){
        return ps.cadastrarAlterar(pm, "alterar");
    }

    /* A anotação @PostMapping serve para associar um método da classe controladora a uma rota específica onde 
       solicitações HTTP POST são feitas, ou seja, quando um cliente deseja enviar dados para um servidor. */
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutoModelo pm){
        /* Aqui, você tem um método chamado cadastrar que recebe um parâmetro pm do tipo ProdutoModelo. 
           O @RequestBody indica que o objeto pm será preenchido com os dados enviados no corpo da requisição POST. */
        return ps.cadastrarAlterar(pm, "cadastrar");
    }

    @GetMapping("/listar")
    public Iterable<ProdutoModelo> listar(){
        return ps.listar();
    }
    
    /* cria um caminho que permite acessar uma função específica em um aplicativo web. 
       É como definir um endereço para chegar a um lugar específico em um mapa. */ 
    @GetMapping("/") 
    public String rota(){
        return "API de produtos funcionando!";
    }


}
