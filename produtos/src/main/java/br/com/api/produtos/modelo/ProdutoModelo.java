package br.com.api.produtos.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity // é utilizada para informar que uma classe também é uma entidade. A entidade é como uma "tabela" no banco de dados, onde cada linha representa uma instância única do objeto.
@Table(name = "produtos") // é utilizada para alterar o nome da tebela.
@Getter 
@Setter  
// O modelo é uma representação de dados, ele vai ter duas funcionalidades importantes que são: a manipualção de dados e a criação de tabelas.
public class ProdutoModelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // é utilizada para gerar o auto incremento, responsável por gerar valores de forma crescente, começando pelo 1.
    private Long codigo;
    private String nome;
    private String marca;
}
