function carregarIten(id, tipo){
    window.location.href = '/listar_item_descricao?id='+id+'&item='+tipo;
}

function contatos(){
    $('#conteudo-html').html('');
    $('#conteudo-html').html(INFO);
    $('#mobile-menu').addClass('mt-[-' + slideHeight + 'px]');
    $('#mobile-menu').removeClass('mt-16');
};

async function listarItens(item){
    const {arquivos}= await $.ajax({
        url: `/funcao/${item}`,
        dataType: 'json',
        method: 'GET'
    });
    var ITENS = '';
    for(var i = 0; i < arquivos.length; i++){
        ITENS += ITEM
        .replace('_ID_', arquivos[i].id)
        .replace('_DESCRICAO_', arquivos[i].nome)
        .replace('_LINKIMAGEM_', arquivos[i].caminho)
        .replace('_TIPO_', item.substring(0, item.length - 1))
    }
    $('#conteudo-html').html('');
    $('#conteudo-html').html(`
    <div class="listagem justify-center grid grid-flow-row-dense gap-20 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${ITENS}
    </div>
    `);
    $('#mobile-menu').addClass('mt-[-' + slideHeight + 'px]')
    $('#mobile-menu').removeClass('mt-16');
    definirLargura();
};

async function listarItem(id, item){
    $('#conteudo-html').html('');
    const {arquivo} = await $.ajax({
        url: `/funcao/${item}/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    const {subArquivos} = await $.ajax({
        url: `/funcao/sub_arquivos/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    fotosRenderizadas = [];
    fotosRenderizadas.push({
        id : 0, 
        novaImagem : arquivo.caminho, 
        novaImagemDependente : arquivo.referencia,
        Tarquivo : arquivo.Tarquivo
    })
    var i = 1;
    for(const item of subArquivos){
        fotosRenderizadas.push({
            id : i, 
            novaImagem : item.caminho, 
            novaImagemDependente : item.referencia,
            Tarquivo : item.Tarquivo
        })
        i += 1;
    }
    itensRenderizados.INFOPRODUTOMOBILE = INFOPRODUTOMOBILE
    .replace('_NOME_', arquivo.nome)
    .replace('_DESCRICAO_', arquivo.descricao.replaceAll('-quebra_de_linha-', '<br>'))
    .replace('_LINKIMAGEM_', arquivo.caminho);
    itensRenderizados.INFOPRODUTOPC = INFOPRODUTOPC
    .replace('_NOME_', arquivo.nome)
    .replace('_DESCRICAO_', arquivo.descricao.replaceAll('-quebra_de_linha-', '<br>'))
    .replace('_LINKIMAGEM_', arquivo.caminho);
    $('#conteudo-html').html(`
    <div class="listagem justify-center font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${
            escolheLayout(itensRenderizados.INFOPRODUTOMOBILE, itensRenderizados.INFOPRODUTOPC)
        }
    </div>
    `);
    definirLargura();
    selecionado(0);
    const id_inicial = fotoSelecionada.id;
    $('#voltar, #avancar').addClass('cursor-pointer');
    if(id_inicial > fotosRenderizadas.length - 2){
        $('#avancar').addClass('scale-0 cursor-default');
        $('#avancar').removeClass('cursor-pointer');
    }
    if(id_inicial < 1){
        $('#voltar').addClass('scale-0 cursor-default');
        $('#voltar').removeClass('cursor-pointer');
    }
};

function selecionado(id, evento){
    const itemImgVideo = verificaVideoImagem(fotosRenderizadas[id], evento);
    $('#imgPrincipal').html(itemImgVideo);
    fotoSelecionada.id = fotosRenderizadas[id].id;
    fotoSelecionada.novaImagem = fotosRenderizadas[id].novaImagem;
    fotoSelecionada.novaImagemDependente = fotosRenderizadas[id].novaImagemDependente;
    fotoSelecionada.mudou = true;
    mudaLayoutAntesDepois();
    if(fotoSelecionada.novaImagemDependente && window.innerWidth > 760){
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
        return $('#voltar').addClass('scale-0 cursor-default');
    } 
    if(id < 1){
        $('#voltar').removeClass('cursor-pointer');
        $('#voltar').addClass('scale-0 cursor-default');
    }
    $('#avancar').removeClass('scale-0 cursor-default');
    $('#avancar').addClass('cursor-pointer');
    $('#imgPrincipal').addClass('opacity-0 scale-0');
    setTimeout(() => {
        selecionado(id, 'voltar');
    }, 100)
}

function avancar(){
    const id = fotoSelecionada.id + 1;
    $('#avancar').addClass('cursor-pointer');
    if(id > fotosRenderizadas.length - 1){
        $('#avancar').removeClass('cursor-pointer');
        return $('#avancar').addClass('scale-0 cursor-default'); 
    } 
    if(id > fotosRenderizadas.length - 2){
        $('#avancar').addClass('scale-0 cursor-default');
        $('#avancar').removeClass('cursor-pointer');
    } 
    $('#voltar').removeClass('scale-0 cursor-default');
    $('#voltar').addClass('cursor-pointer');
    $('#imgPrincipal').addClass('opacity-0 scale-0');
    setTimeout(() => {
        selecionado(id, 'avancar');
    }, 100)
}

function renderizar(evento, c){
    if(c && count == 0){
        count += 1;
        return
    }
    count = 0;
    if(evento == 'avancar'){
        setTimeout(() => {
            $('#imgPrincipal').removeClass('opacity-0 scale-0');
        }, 100)
        return;
    }
    setTimeout(() => {
        $('#imgPrincipal').removeClass('opacity-0 scale-0');
    }, 100)
}

