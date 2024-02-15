// const Var's
const itensRenderizados = {};
const slideHeight = parseInt($('#mobile-menu').css('height').replace(/[a-z]+/g, '')) - 64;
// let Var's
let id_atual = 0;
let ja_AlterouPC = true;
let fotosRenderizadas = [];
let ja_AlterouMobile = true;
let fotoSelecionada = {mudou : false, id : 0};

// renderizar function Var's
var count = 0;

const verificaVideoImagem = (item, evento) => {
    const tipos = item.Tarquivo.split('-');
    let itemRender = '';
    let itemUnico = true;
    for(const tipo of tipos){
        if(tipo == 'video' && itemUnico){
            itemRender += `
            <video class="rounded-md max-w-[95%] duration-100" id="imgAtual" controls-desativado autoplay muted loop onloadstart="renderizar('${evento}')" alt="product image"/>
                <source src="${DIRETORIO}/views/static/uploads/${item.novaImagem}">
            </video>`;
            itemUnico = false;
            continue;
        }
        if(tipo == 'video' && !itemUnico){
            itemRender += `
            ${SVGFLECHA}
            <video class="rounded-md max-w-[95%] duration-100" id="imgAtual" controls-desativado autoplay muted loop onloadstart="renderizar('${evento}')" alt="product image"/>
                <source src="${DIRETORIO}/views/static/uploads/${item.novaImagemDependente}">
            </video>`;
            continue;
        }
        if(tipo == 'image' && itemUnico){
            itemRender += `
            <img class="rounded-md max-w-[95%] duration-100" id="imgAtual" onload="renderizar('${evento}')" 
            src="${DIRETORIO}/views/static/uploads/${item.novaImagem}" alt="product image"/>`;
            itemUnico = false;
            continue;
        }
        if(tipo == 'image' && !itemUnico){
            itemRender += `
            ${SVGFLECHA}
            <img class="rounded-md max-w-[95%] duration-100" id="imgAtual" onload="renderizar('${evento}')" 
            src="${DIRETORIO}/views/static/uploads/${item.novaImagemDependente}" alt="product image"/>`;
            continue;
        }
    }
    return itemRender;
}