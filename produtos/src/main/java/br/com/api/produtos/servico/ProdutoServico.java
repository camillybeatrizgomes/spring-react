package br.com.api.produtos.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.repositorio.ProdutoRepositorio;

@Service /* é usada para identificar uma classe como um componente de serviço em um aplicativo Spring. 
Isso significa que essa classe possui lógica de negócios ou funcionalidades específicas. */

/* Classe é usada para conter a lógica de negócios da sua aplicação. Ela é responsável por executar tarefas específicas, como manipulação de dados, cálculos ou processamento. */ 
public class ProdutoServico {
    
    @Autowired 
    /* é usada para injetar automaticamente dependências em uma classe. Em termos simples, ela ajuda 
    a conectar diferentes partes do seu código sem que você precise criar manualmente as instâncias dessas partes. */
    private ProdutoRepositorio pr;

    @Autowired
    private RespostaModelo rm;

    // Método para listar todos os produtos
    public Iterable<ProdutoModelo> listar(){
        /* O Iterable é usado para percorrer coleções de elementos, como listas ou conjuntos, de uma forma organizada. É como ter uma lista ordenada de itens que você pode "iterar" (ou seja, percorrer um por um) para executar operações em cada elemento. */
        return pr.findAll();
        /* O método findAll() é usado para buscar e retornar todos os registros de uma tabela ou coleção de dados. 
        É como se você estivesse pegando todos os itens de uma prateleira e colocando-os em suas mãos.  */
    }

    // Método para cadastrar produtos
    public ResponseEntity<?> cadastrarAlterar(ProdutoModelo pm, String acao){
        if(pm.getNome().equals("")){
            rm.setMensagem("O nome do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
            /* O ResponseEntity é utilizado para estruturar e enviar respostas HTTP personalizadas de maneira mais completa e flexível. 
             * O HttpStatus é um conjunto de códigos predefinidos usados para informar o resultado de uma solicitação feita por um cliente a um servidor na web. 
             * BAD_REQUEST (400): Indica que a requisição feita pelo cliente é inválida, malformada ou não atende aos critérios do servidor.
             */
        } else if (pm.getMarca().equals("")){
            rm.setMensagem("O nome da marca é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if(acao.equals("cadastrar")){
                // Verifica se a ação é "cadastrar"
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.CREATED);
            /* Aqui, estamos criando uma nova instância (Objeto), que encapsula uma resposta HTTP personalizada.
            * pr.save(pm): pr é uma instância de ProdutoRepositorio, usado para salvar informações de produtos no banco de dados. O método save(pm) está sendo chamado para salvar o objeto pm, que é um objeto da classe ProdutoModelo, no banco de dados. Esse método retorna o objeto pm depois que ele foi salvo.
            * HttpStatus.CREATED: Isso define o código de status HTTP que será incluído na respost. */
            } else {
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.OK);
                /* Salva o produto no banco de dados e retorna uma resposta de sucesso com status HTTP 200 (OK), Indicando que a requisição foi bem-sucedida e o servidor retornou os dados solicitados. */
            }
        }
    }

    // Método para remover produtos
    public ResponseEntity<RespostaModelo> remover(long codigo){
        pr.deleteById(codigo);
        // Remove o produto do banco de dados usando o código (ID) fornecido
        rm.setMensagem("O produto foi removido com sucesso!");
        // Define uma mensagem de sucesso no objeto RespostaModelo (rm).
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
         // Retorna uma resposta HTTP com o objeto RespostaModelo contendo a mensagem de sucesso.
        // O status HTTP é definido como "OK" (200) para indicar que a operação foi bem-sucedida.
    }
}
