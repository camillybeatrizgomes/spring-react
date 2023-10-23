function Tabela({vetor, selecionar}){
    return(
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Marca</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
        {/* Começamos a criar uma tabela <tbody> para exibir dados */}
            <tbody>
            {/* Usamos .map() para percorrer cada objeto no vetor e criar uma linha <tr> para cada um */}
                {
                    vetor.map((obj, indice) => (
                <tr key={indice}>
                     {/* Exibimos o número da linha (índice + 1) na primeira coluna */}
                    <td>{indice + 1}</td>
                     {/* Exibimos o nome do objeto na segunda coluna */}
                    <td>{obj.nome}</td>
                     {/* Exibimos a marca do objeto na terceira coluna */}
                    <td>{obj.marca}</td>
                    {/* Criamos um botão "Selecionar" na quarta coluna */}
                    <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Tabela