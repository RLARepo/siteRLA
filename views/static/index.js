$( document ).ready(() => {
    $('#produtosNavSelect, #produtosNav').click();
})

const sh = parseInt($('#mobile-menu').css('height').replace(/[a-z]+/g, '')) - 64;
$('#mobile-menu').addClass('mt-[-' + sh + 'px]');
$('#mobile-menu').removeClass('mt-16');

$('#contatoNavSelect, #contatoNav').on('click', () => {
    $('#conteudo-html').html('');
    $('#conteudo-html').html(INFO);
    $('#mobile-menu').addClass('mt-[-' + sh + 'px]')
    $('#mobile-menu').removeClass('mt-16')
});

$('#produtosNavSelect, #produtosNav').on('click', async () => {
    const {arquivos}= await $.ajax({
        url: '/arquivos',
        dataType: 'json',
        method: 'GET'
    });
    var ITENS = '';
    for(var i = 0; i < arquivos.length; i++){
        ITENS += ITEM
        .replace('_ID_', arquivos[i].id)
        .replace('_DESCRICAO_',  arquivos[i].nome)
        .replace('_LINKIMAGEM_', arquivos[i].caminho);
    }
    $('#conteudo-html').html('');
    $('#conteudo-html').html(`
    <div class="listagem pt-16 justify-center grid grid-flow-row-dense gap-20 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${ITENS}
    </div>
    `);
    $('#mobile-menu').addClass('mt-[-' + sh + 'px]')
    $('#mobile-menu').removeClass('mt-16')
});

$('#show-itens').on('click', async () => {
    const mt = parseInt($('#mobile-menu').css('margin-top').replace(/[a-z]+/g, ''));
    if(mt > 0){
        $('#mobile-menu').addClass('mt-[-' + sh + 'px]')
        $('#mobile-menu').removeClass('mt-16')
        return
    }
    $('#mobile-menu').removeClass('mt-[-' + sh + 'px]')
    $('#mobile-menu').addClass('mt-16')
});

async function carregarIten(id){
    $('#conteudo-html').html('');
    const {arquivo}= await $.ajax({
        url: `/arquivos/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    $('#conteudo-html').html(`
    <div class="listagem justify-center font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${
            INFOPRODUTO
            .replace('_NOME_', arquivo.nome)
            .replace('_DESCRICAO_',  arquivo.descricao)
            .replace('_LINKIMAGEM_', arquivo.caminho)
        }
    </div>
    `);
}