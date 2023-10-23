package br.com.api.produtos.modelo;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

/* Anotação usada em estruturas de desenvolvimento, como Spring, para indicar que uma classe é um componente 
gerenciado pelo contêiner de injeção de dependência. */ 
@Component
@Getter
@Setter
// Classe responsável por retornar um feedback caso ocorra uma falha na API.
public class RespostaModelo {
    
    private String mensagem;
}
