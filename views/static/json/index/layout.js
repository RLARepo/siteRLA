window.addEventListener('resize', function () {
    definirLargura();
    mudaLayout();
    mudaLayoutAntesDepois();
    definiGridContatos();
});

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

function mudaLayoutAntesDepois(){
    if(window.innerWidth < 760 && window.innerWidth > 530){
        $('#avancar').removeClass('ml-[150px]');
        $('#voltar').removeClass('mr-[150px]');
        $('#voltar').addClass('ml-[8px]');
        $('#avancar').addClass('mr-[8px]');
    }else if(fotoSelecionada.novaImagemDependente && window.innerWidth > 760){
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
        $('#imgPrincipal > img, #imgPrincipal > video').removeClass("mr-[12px]");
        $('#imgPrincipal > img, #imgPrincipal > video').removeClass("ml-[12px]");
        $('#imgPrincipal > img, #imgPrincipal > video').addClass("mb-[12px]");
        $('#imgPrincipal > img, #imgPrincipal > video').addClass("mt-[12px]");
        $('#imgPrincipal').addClass("flex-col");
        $('#flechaSvg').addClass("origin-center rotate-90");
    }else{
        $('#imgPrincipal').removeClass("flex-col");
        $('#flechaSvg').removeClass("origin-center rotate-90");
        $('#imgPrincipal > img, #imgPrincipal > video').addClass("mr-[12px]");
        $('#imgPrincipal > img, #imgPrincipal > video').addClass("ml-[12px]");
        $('#imgPrincipal > img, #imgPrincipal > video').removeClass("mb-[12px]");
        $('#imgPrincipal > img, #imgPrincipal > video').removeClass("mt-[12px]");
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