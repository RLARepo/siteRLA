$( document ).ready(() => {
    $('#produtosNavSelect, #produtosNav').click();
    definirLargura();
})

window.addEventListener('resize', function () {
    definirLargura();
});

function definirLargura(){
    if (window.innerWidth < 600){
        $('#descricaoItem').addClass("flex-wrap justify-center");
    }else{
        $('#descricaoItem').removeClass("flex-wrap justify-center");
    }
    if(window.innerWidth < 350){
        $('#cardImgSubImg').addClass("min-w-[225px]");
    }else{
        $('#cardImgSubImg').removeClass("min-w-[225px]"); 
    }
}

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
    const {arquivo} = await $.ajax({
        url: `/arquivos/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    const {subArquivos} = await $.ajax({
        url: `/sub_arquivos/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    var subImagens = SUBIMAGEM
    .replaceAll('_LINKIMAGEM_', arquivo.caminho)
    .replace('_SELECIONADO_', 'border: solid 1px green;')
    .replace('_ID_', 0);
    var i = 1;
    for(const item of subArquivos){
        subImagens += SUBIMAGEM
        .replaceAll('_LINKIMAGEM_', item.caminho)
        .replace('_ID_', i);
        i += 1;
    }
    `<img class="p-[2px] rounded-lg" src="views/static/uploads/_LINKIMAGEM_" alt="product image"/>`
    $('#conteudo-html').html(`
    <div class="listagem justify-center font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${
            INFOPRODUTO
            .replace('_NOME_', arquivo.nome)
            .replace('_DESCRICAO_',  arquivo.descricao)
            .replace('_LINKIMAGEM_', arquivo.caminho)
            .replace('_SUBIMAGENS_', subImagens)
        }
    </div>
    `);
    definirLargura();
}

function selecionado(id, novaImagem){
    const itens = $('#subImgens > img');
    for(var i = 0; i < itens.length; i++){
        if(i == id){
            itens[i].style.border = '1px solid green';
            continue;
        }
        itens[i].style.border = '';
    }
    $('#imgPrincipal').attr('src', 'views/static/uploads/' + novaImagem);
}