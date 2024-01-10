let id_atual = 0;
let ja_AlterouPC = false;
let ja_AlterouMobile = false;
const itensRenderizados = {};

$(document).ready(() => {
    switch (FUNCAO) {
        case 'inicial':
            listarItens();
            break;
        case 'listar_itens':
            listarItens();
            break
        case 'listar_item_descricao':
            listarItem(JSON.parse(PARAMS.replaceAll('&#34;', '"')).id);
            break
        case 'contatos':
            contatos();
            break;
        default:
            listarItens();
            break;
    }
    definirLargura();
})

window.addEventListener('resize', function () {
    definirLargura();
    mudaLayout();
});

$('#produtosNavSelect, #produtosNav').on('click', async() => {
    window.location.href = '/listar_itens';
});

$('#contatoNavSelect, #contatoNav').on('click', async() => {
    window.location.href = '/contatos';
});

function carregarIten(id){
    window.location.href = '/listar_item_descricao?id='+id;
}

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

function mudaLayout(){
    if (window.innerWidth < 750 && !ja_AlterouMobile){
        $('#conteudo-html').html(`
        <div class="listagem justify-center font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
            ${
                escolheLayout(itensRenderizados.INFOPRODUTOMOBILE, itensRenderizados.INFOPRODUTOPC)
            }
        </div>
        `);
        ja_AlterouMobile = true;
        ja_AlterouPC = false;
    }
    if(window.innerWidth > 751 && !ja_AlterouPC){
        $('#conteudo-html').html(`
        <div class="listagem justify-center font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
            ${
                escolheLayout(itensRenderizados.INFOPRODUTOMOBILE, itensRenderizados.INFOPRODUTOPC)
            }
        </div>
        `);
        ja_AlterouPC = true
        ja_AlterouMobile = false;
    }
    
}

function escolheLayout(layoutMobile, layoutPc){
    if (window.innerWidth < 750){
        return layoutMobile;
    }
    if(window.innerWidth > 750){
        return layoutPc;
    }
}

const sh = parseInt($('#mobile-menu').css('height').replace(/[a-z]+/g, '')) - 64;
$('#mobile-menu').addClass('mt-[-' + sh + 'px]');
$('#mobile-menu').removeClass('mt-16');

function contatos(){
    $('#conteudo-html').html('');
    $('#conteudo-html').html(INFO);
    $('#mobile-menu').addClass('mt-[-' + sh + 'px]');
    $('#mobile-menu').removeClass('mt-16');
};

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

async function listarItens(){
    const {arquivos}= await $.ajax({
        url: '/funcao/arquivos',
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
    $('#mobile-menu').removeClass('mt-16');
    definirLargura();
};

async function listarItem(id){
    id_atual = id;
    $('#conteudo-html').html('');
    const {arquivo} = await $.ajax({
        url: `/funcao/arquivos/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    const {subArquivos} = await $.ajax({
        url: `/funcao/sub_arquivos/${id}`,
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
    itensRenderizados.INFOPRODUTOMOBILE = INFOPRODUTOMOBILE
    .replace('_NOME_', arquivo.nome)
    .replace('_DESCRICAO_',  arquivo.descricao)
    .replace('_LINKIMAGEM_', arquivo.caminho)
    .replace('_SUBIMAGENS_', subImagens);
    itensRenderizados.INFOPRODUTOPC = INFOPRODUTOPC
    .replace('_NOME_', arquivo.nome)
    .replace('_DESCRICAO_',  arquivo.descricao)
    .replace('_LINKIMAGEM_', arquivo.caminho)
    .replace('_SUBIMAGENS_', subImagens)
    $('#conteudo-html').html(`
    <div class="listagem justify-center font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${
            escolheLayout(itensRenderizados.INFOPRODUTOMOBILE, itensRenderizados.INFOPRODUTOPC)
        }
    </div>
    `);
    
    definirLargura();
};

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