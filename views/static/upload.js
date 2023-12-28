$( document ).ready( async() => {
    const resposta = await $.ajax({
        url: 'https://rla-site.onrender.com' + '/itens',
        dataType: 'json',
        method: 'GET'
    });
    var ITENS = '';
    for(var i = 0; i < resposta.length; i++){
        ITENS += ITEM
        .replace('_LINKIMAGEM_', resposta[i].caminho)
        .replace('_DESCRICAO_', resposta[i].descricao);
    }
    $('#conteudo-html').html('');
    $('#conteudo-html').html(`
    <div class="listagem p-16 justify-center grid grid-flow-row-dense gap-20 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${ITENS}
    </div>
    `);
    $('#mobile-menu').addClass('mt-[-' + sh + 'px]')
    $('#mobile-menu').removeClass('mt-16')
});