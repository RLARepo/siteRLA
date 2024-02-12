let id_atual = 0;
let ja_AlterouPC = true;
let ja_AlterouMobile = true;
let fotoSelecionada = {mudou : false, id : 0};
const itensRenderizados = {};
let fotosRenderizadas = [];

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
    definiGridContatos();
})

window.addEventListener('resize', function () {
    definirLargura();
    mudaLayout();
    mudaLayoutAntesDepois();
    definiGridContatos();
});

$('#produtosNavSelect, #produtosNav').on('click', async() => {
    window.location.href = '/listar_itens';
});

$('#mainMenu').on('click', async() => {
    window.location.href = '/';
});

$('#contatoNavSelect, #contatoNav').on('click', async() => {
    window.location.href = '/contatos';
});

function carregarIten(id){
    window.location.href = '/listar_item_descricao?id='+id;
}

function definiGridContatos(){
    if(window.innerWidth < 380){
        $('#listagemContatos').removeClass("grid-cols-2");
        $('#listagemContatos').addClass("grid-cols-1");
        $('#principalListContatos').removeClass("min-w-[360px]");
        $('#principalListContatos').addClass("min-w-[240px]");
        $('iframe').css('width', '240px')
    }else{
        $('#listagemContatos').addClass("grid-cols-2");
        $('#listagemContatos').removeClass("grid-cols-1");
        $('#principalListContatos').addClass("min-w-[360px]");
        $('#principalListContatos').removeClass("min-w-[240px]");
        $('iframe').css('width', '350px')
    }
}

function definirLargura(){
    if(window.innerWidth < 600){
        $('#descricaoItem').addClass("flex-wrap justify-center");
    }else{
        $('#descricaoItem').removeClass("flex-wrap justify-center");
    }
    if(window.innerWidth < 450){
        $('#cardImgSubImg').removeClass("w-[20%] min-w-[300px]");
    }else{
        $('#cardImgSubImg').addClass("w-[20%] min-w-[300px]");
    }
}

function mudaLayoutAntesDepois(){
    if(window.innerWidth < 760 && window.innerWidth > 530){
        $('#avancar').removeClass('ml-[150px]');
        $('#voltar').removeClass('mr-[150px]');
        $('#voltar').addClass('ml-[8px]');
        $('#avancar').addClass('mr-[8px]');
    }else if(window.innerWidth > 760){
        $('#avancar').addClass('ml-[150px]');
        $('#voltar').addClass('mr-[150px]');
        $('#voltar').removeClass('ml-[8px]');
        $('#avancar').removeClass('mr-[8px]');
    }
    if (window.innerWidth < 760){
        $('#avancar').removeClass('ml-[150px]');
        $('#voltar').removeClass('mr-[150px]');
        $('#voltar').addClass('ml-[8px]');
        $('#avancar').addClass('mr-[8px]');
        $('#imgPrincipal > img').removeClass("mr-[12px]");
        $('#imgPrincipal > img').removeClass("ml-[12px]");
        $('#imgPrincipal > img').addClass("mb-[12px]");
        $('#imgPrincipal > img').addClass("mt-[12px]");
        $('#imgPrincipal').addClass("flex-col");
        $('#flechaSvg').addClass("origin-center rotate-90");
    }else{
        $('#imgPrincipal').removeClass("flex-col");
        $('#flechaSvg').removeClass("origin-center rotate-90");
        $('#imgPrincipal > img').addClass("mr-[12px]");
        $('#imgPrincipal > img').addClass("ml-[12px]");
        $('#imgPrincipal > img').removeClass("mb-[12px]");
        $('#imgPrincipal > img').removeClass("mt-[12px]");
    }
}

function mudaLayout(){
    const id_inicial = fotoSelecionada.id;
    $('#voltar, #avancar').addClass('cursor-pointer');
    if(id_inicial > fotosRenderizadas.length - 2){
        $('#avancar').addClass('opacity-0 cursor-default');
        $('#avancar').removeClass('cursor-pointer');
    }
    if(id_inicial < 1){
        $('#voltar').addClass('opacity-0 cursor-default');
        $('#voltar').removeClass('cursor-pointer');
    }
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
        if(fotoSelecionada.mudou) selecionado(fotoSelecionada.id, fotoSelecionada.novaImagem, fotoSelecionada.novaImagemDependente);
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
        if(fotoSelecionada.mudou) selecionado(fotoSelecionada.id, fotoSelecionada.novaImagem, fotoSelecionada.novaImagemDependente);
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
        .replace('_DESCRICAO_', arquivos[i].nome)
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
    ja_AlterouPC = false;
    ja_AlterouMobile = false;
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
    const linkReferencia = (item) => {
        return item.tipo == 'NM' ? '' : item.referencia;
    }
    fotosRenderizadas = [];
    fotosRenderizadas.push({
        id : 0, 
        novaImagem : arquivo.caminho, 
        novaImagemDependente : linkReferencia(arquivo),
    })
    var i = 1;
    for(const item of subArquivos){
        fotosRenderizadas.push({
            id : i, 
            novaImagem : item.caminho, 
            novaImagemDependente : linkReferencia(item),
        })
        i += 1;
    }
    itensRenderizados.INFOPRODUTOMOBILE = INFOPRODUTOMOBILE
    .replace('_NOME_', arquivo.nome)
    .replace('_DESCRICAO_', arquivo.descricao.replaceAll('-quebra_de_linha-', '<br>'))
    .replace('_LINKIMAGEM_', arquivo.caminho)
    itensRenderizados.INFOPRODUTOPC = INFOPRODUTOPC
    .replace('_NOME_', arquivo.nome)
    .replace('_DESCRICAO_', arquivo.descricao.replaceAll('-quebra_de_linha-', '<br>'))
    .replace('_LINKIMAGEM_', arquivo.caminho)
    $('#conteudo-html').html(`
    <div class="listagem justify-center font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${
            escolheLayout(itensRenderizados.INFOPRODUTOMOBILE, itensRenderizados.INFOPRODUTOPC)
        }
    </div>
    `);
    definirLargura();
    selecionado(0, arquivo.caminho, linkReferencia(arquivo));
    const id_inicial = fotoSelecionada.id;
    $('#voltar, #avancar').addClass('cursor-pointer');
    if(id_inicial > fotosRenderizadas.length - 2){
        $('#avancar').addClass('opacity-0 cursor-default');
        $('#avancar').removeClass('cursor-pointer');
    }
    if(id_inicial < 1){
        $('#voltar').addClass('opacity-0 cursor-default');
        $('#voltar').removeClass('cursor-pointer');
    }
};

function selecionado(id, novaImagem, novaImagemDependente){
    const item = novaImagemDependente ? `
        <img class="rounded-md max-w-[95%] mr-[12px] duration-100" id="imgAtual" src="${DIRETORIO}/views/static/uploads/${novaImagem}" alt="product image"/>
        ${SVGFLECHA}
        <img class="rounded-md max-w-[95%] ml-[12px] duration-100" id="imgAtual2" src="${DIRETORIO}/views/static/uploads/${novaImagemDependente}" alt="product image"/>
    ` 
    :
    `
        <img class="rounded-md max-w-[95%] duration-100" id="imgAtual" src="${DIRETORIO}/views/static/uploads/${novaImagem}" alt="product image"/>
    ` 
    ;
    $('#imgPrincipal').html(item);
    fotoSelecionada.id = id;
    fotoSelecionada.novaImagem = novaImagem;
    fotoSelecionada.novaImagemDependente = novaImagemDependente;
    fotoSelecionada.mudou = true;
    mudaLayoutAntesDepois();
    if(novaImagemDependente && window.innerWidth > 760){
        $('#voltar').addClass('mr-[150px]');
        $('#avancar').addClass('ml-[150px]');
    }else{
        $('#voltar').removeClass('mr-[150px]');
        $('#avancar').removeClass('ml-[150px]');
    }
}

function voltar(){
    if(!fotoSelecionada.mudou){
        return;
    }
    const id = fotoSelecionada.id - 1;
    $('#voltar').addClass('cursor-pointer');
    if(id < 0){
        $('#voltar').removeClass('cursor-pointer');
        return $('#voltar').addClass('opacity-0 cursor-default');
    } 
    if(id < 1){
        $('#voltar').removeClass('cursor-pointer');
        $('#voltar').addClass('opacity-0 cursor-default');
    } 
    $('#avancar').removeClass('opacity-0 cursor-default');
    $('#imgPrincipal').addClass('opacity-0 translate-x-[-11rem]');
    setTimeout(() => {
        $('#imgPrincipal').removeClass('translate-x-[-11rem]');
        $('#imgPrincipal').addClass('translate-x-44');
        selecionado(id, fotosRenderizadas[id].novaImagem, fotosRenderizadas[id].novaImagemDependente);
    }, 100)
    setTimeout(() => {
        
        $('#imgPrincipal').removeClass('opacity-0 translate-x-44');
    }, 300)
}

function avancar(){
    const id = fotoSelecionada.id + 1;
    $('#avancar').addClass('cursor-pointer');
    if(id > fotosRenderizadas.length - 1){
        $('#avancar').removeClass('cursor-pointer');
        return $('#avancar').addClass('opacity-0 cursor-default'); 
    } 
    if(id > fotosRenderizadas.length - 2){
        $('#avancar').addClass('opacity-0 cursor-default');
        $('#avancar').removeClass('cursor-pointer');
    } 
    $('#voltar').removeClass('opacity-0 cursor-default');
    $('#imgAtual, #imgAtual2').addClass('opacity-0 duration-200'); 
    $('#imgPrincipal').addClass('opacity-0 translate-x-44');
    setTimeout(() => {
        $('#imgPrincipal').removeClass('translate-x-44');
        $('#imgPrincipal').addClass('translate-x-[-11rem]');
        selecionado(id, fotosRenderizadas[id].novaImagem, fotosRenderizadas[id].novaImagemDependente);
    }, 100)
    setTimeout(() => {
        $('#imgPrincipal').removeClass('opacity-0 translate-x-[-11rem]');
    }, 300)
}