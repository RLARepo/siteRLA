$( document ).ready( async() => {
    carregarItens();
});

async function carregarItens(){
    const resposta = await $.ajax({
        url: '/arquivos',
        dataType: 'json',
        method: 'GET'
    });
    var ITENS = '';
    for(var i = 0; i < resposta.arquivos.length; i++){
        ITENS += ITEMEDIT
        .replace('_ID_', resposta.arquivos[i].id)
        .replace('_LINKIMAGEM_', resposta.arquivos[i].caminho)
        .replace('_DESCRICAO_',  resposta.arquivos[i].descricao);
    }
    $('#conteudo-html').html('');
    $('#conteudo-html').html(`
    <div class="listagem p-16 justify-center grid grid-flow-row-dense gap-20 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${ITENS}
    </div>
    `);
}
async function deletar(id){
    const resposta = await $.ajax({
        url: '/delete_files/' + `${id}`,
        dataType: 'json',
        method: 'GET'
    });
    if (resposta.status){
        carregarItens();
    }
};
