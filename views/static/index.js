let id_atual = 0;
let ja_AlterouPC = false;
let ja_AlterouMobile = false;
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
})

window.addEventListener('resize', function () {
    definirLargura();
    mudaLayout();
    mudaLayoutAntesDepois();
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
    if(window.innerWidth < 430){
        $('#cardImgSubImg').removeClass("w-[20%] min-w-[300px]");
    }else{
        $('#cardImgSubImg').addClass("w-[20%] min-w-[300px]");
    }
}

function mudaLayoutAntesDepois(){
    if(window.innerWidth < 760 && window.innerWidth > 530){
        $('#avancar').removeClass('ml-[90px]');
        $('#voltar').removeClass('mr-[90px]');
        $('#voltar').addClass('ml-[8px]');
        $('#avancar').addClass('mr-[8px]');
    }else if(window.innerWidth > 760){
        $('#avancar').addClass('ml-[90px]');
        $('#voltar').addClass('mr-[90px]');
        $('#voltar').removeClass('ml-[8px]');
        $('#avancar').removeClass('mr-[8px]');
    }
    if (window.innerWidth < 760){
        $('#avancar').removeClass('ml-[90px]');
        $('#voltar').removeClass('mr-[90px]');
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
        console.log('peguei')
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
        console.log('peguei')
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
    const baseAntesDepoisPC = (tipo) => {
        return tipo == 'NM' ? SUBIMAGEMPC : SUBIMAGEMPCANTESDEPOIS;
    }
    const baseAntesDepoisMOBILE = (tipo) => {
        return tipo == 'NM' ? SUBIMAGEMMOBILE : SUBIMAGEMMOBILEANTESDEPOIS;
    }
    const linkReferencia = (item) => {
        return item.tipo == 'NM' ? '' : item.referencia;
    }
    fotosRenderizadas = [];
    var subImagensPc = baseAntesDepoisPC(arquivo.tipo)
    .replaceAll('_LINKIMAGEM_', arquivo.caminho)
    .replaceAll('_LINKIMAGEMDEPENDENTE_', linkReferencia(arquivo))
    .replace('_SELECIONADO_', 'border: solid 1px green;')
    .replace('_ID_', 0);
    var subImagensMobile = baseAntesDepoisMOBILE(arquivo.tipo)
    .replaceAll('_LINKIMAGEM_', arquivo.caminho)
    .replaceAll('_LINKIMAGEMDEPENDENTE_', linkReferencia(arquivo))
    .replace('_SELECIONADO_', 'border: solid 1px green;')
    .replace('_ID_', 0);
    fotosRenderizadas.push({
        id : 0, 
        novaImagem : arquivo.caminho, 
        novaImagemDependente : linkReferencia(arquivo),
    })
    var i = 1;
    for(const item of subArquivos){
        subImagensMobile += baseAntesDepoisMOBILE(item.tipo)
        .replaceAll('_LINKIMAGEM_', item.caminho)
        .replaceAll('_LINKIMAGEMDEPENDENTE_', linkReferencia(item))
        .replace('_ID_', i);
        subImagensPc += baseAntesDepoisPC(item.tipo)
        .replaceAll('_LINKIMAGEM_', item.caminho)
        .replaceAll('_LINKIMAGEMDEPENDENTE_', linkReferencia(item))
        .replace('_ID_', i);
        fotosRenderizadas.push({
            id : i, 
            novaImagem : item.caminho, 
            novaImagemDependente : linkReferencia(item),
        })
        i += 1;
    }
    itensRenderizados.INFOPRODUTOMOBILE = INFOPRODUTOMOBILE
    .replace('_NOME_', arquivo.nome)
    .replace('_DESCRICAO_',  arquivo.descricao)
    .replace('_LINKIMAGEM_', arquivo.caminho)
    .replace('_SUBIMAGENS_', subImagensMobile);
    itensRenderizados.INFOPRODUTOPC = INFOPRODUTOPC
    .replace('_NOME_', arquivo.nome)
    .replace('_DESCRICAO_',  arquivo.descricao)
    .replace('_LINKIMAGEM_', arquivo.caminho)
    .replace('_SUBIMAGENS_', subImagensPc)
    $('#conteudo-html').html(`
    <div class="listagem justify-center font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${
            escolheLayout(itensRenderizados.INFOPRODUTOMOBILE, itensRenderizados.INFOPRODUTOPC)
        }
    </div>
    `);
    definirLargura();
    const id_inicial = fotoSelecionada.id + 1;
    if(id_inicial > fotosRenderizadas.length - 2) $('#avancar').addClass('opacity-0');
    if(id_inicial < 1) $('#voltar').addClass('opacity-0');
};

function selecionado(id, novaImagem, novaImagemDependente){
    const itens = $('#subImgens > img, #subImgens > div');
    for(var i = 0; i < itens.length; i++){
        if(i == id){
            itens[i].style.border = '1px solid green';
            continue;
        }
        itens[i].style.border = '';
    }
    if(novaImagemDependente){
        $('#voltar').addClass('mr-[90px]');
        $('#avancar').addClass('ml-[90px]');
    }else{
        $('#voltar').removeClass('mr-[90px]');
        $('#avancar').removeClass('ml-[90px]');
    }
    const item = novaImagemDependente ? `
        <img class="rounded-md max-w-[70%] mr-[12px]" id="" src="${DIRETORIO}/views/static/uploads/${novaImagem}" alt="product image"/>
        ${SVGFLECHA}
        <img class="rounded-md max-w-[70%] ml-[12px]" id="" src="${DIRETORIO}/views/static/uploads/${novaImagemDependente}" alt="product image"/>
    ` 
    :
    `
        <img class="rounded-md max-w-[70%]" id="" src="${DIRETORIO}/views/static/uploads/${novaImagem}" alt="product image"/>
    ` 
    ;
    $('#imgPrincipal').html(item);
    fotoSelecionada.id = id;
    fotoSelecionada.novaImagem = novaImagem;
    fotoSelecionada.novaImagemDependente = novaImagemDependente;
    fotoSelecionada.mudou = true;
    mudaLayoutAntesDepois() 
}

function voltar(){
    if(!fotoSelecionada.mudou){
        return;
    }
    const id = fotoSelecionada.id - 1;
    if(id < 0) return;
    if(id < 1) $('#voltar').addClass('opacity-0');
    $('#avancar').removeClass('opacity-0');
    $('#imgPrincipal').addClass('opacity-0 translate-x-[-11rem]');
    setTimeout(() => {
        $('#imgPrincipal').removeClass('translate-x-[-11rem]');
        $('#imgPrincipal').addClass('translate-x-44');
        selecionado(id, fotosRenderizadas[id].novaImagem, fotosRenderizadas[id].novaImagemDependente);
    }, 200)
    setTimeout(() => {
        $('#imgPrincipal').removeClass('opacity-0 translate-x-44');
    }, 500)
}

function avancar(){
    const id = fotoSelecionada.id + 1;
    if(id > fotosRenderizadas.length - 1) return;
    if(id > fotosRenderizadas.length - 2) $('#avancar').addClass('opacity-0');
    $('#voltar').removeClass('opacity-0');
    $('#imgPrincipal').addClass('opacity-0 translate-x-44');
    setTimeout(() => {
        $('#imgPrincipal').removeClass('translate-x-44');
        $('#imgPrincipal').addClass('translate-x-[-11rem]');
        selecionado(id, fotosRenderizadas[id].novaImagem, fotosRenderizadas[id].novaImagemDependente);
    }, 200)
    setTimeout(() => {
        $('#imgPrincipal').removeClass('opacity-0 translate-x-[-11rem]');
    }, 500)
}