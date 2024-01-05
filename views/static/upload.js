$( document ).ready( async() => {
    carregarItens();
});

async function carregarItens(){
    const {arquivos} = await $.ajax({
        url: '/arquivos',
        dataType: 'json',
        method: 'GET'
    });
    var ITENS = '';
    for(var i = 0; i < arquivos.length; i++){
        ITENS += ITEMEDIT
        .replaceAll('_ID_', arquivos[i].id)
        .replace('_DESCRICAO_',  arquivos[i].nome)
        .replace('_LINKIMAGEM_', arquivos[i].caminho);
    }
    $('#conteudo-html').html('');
    $('#conteudo-html').html(`
    <div class="listagem p-16 justify-center grid grid-flow-row-dense gap-20 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${ITENS}
    </div>
    `);
}

async function carregarIten(id){
    const {arquivo}= await $.ajax({
        url: `/arquivos/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    console.log(arquivo)
}

async function deletar(id){
    const resposta = await $.ajax({
        url: `/delete_files/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    if (resposta.status){
        carregarItens();
    }
};
