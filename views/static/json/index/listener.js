$(document).ready(() => {
    const param = JSON.parse(PARAMS.replaceAll('&#34;', '"'));
    switch (FUNCAO) {
        case 'inicial':
            listarItens();
            break;
        case 'listar_itens':
            listarItens(param.item);
            break
        case 'listar_item_descricao':
            listarItem(param.id, param.item);
            break
        case 'contatos':
            contatos();
            break;
        default:
            listarItens();
            break;
    }
    
});

$('#servicosNavSelect, #servicosNav').on('click', async() => {
    window.location.href = '/listar_itens?item=servicos';
});

$('#produtosNavSelect, #produtosNav').on('click', async() => {
    window.location.href = '/listar_itens?item=produtos';
});

$('#mainMenu').on('click', async() => {
    window.location.href = '/?item=servicos';
});

$('#contatoNavSelect, #contatoNav').on('click', async() => {
    window.location.href = '/contatos';
});

$('#mobile-menu').addClass('mt-[-' + slideHeight + 'px]');
setTimeout(() => {
    $('#mobile-menu').removeClass('hidden');
}, 160);

$('#show-itens').on('click', async () => {
    const mt = parseInt($('#mobile-menu').css('margin-top').replace(/[a-z]+/g, ''));
    if(mt > 0){
        $('#mobile-menu').addClass('mt-[-' + slideHeight + 'px]')
        $('#mobile-menu').removeClass('mt-16')
        return
    }
    $('#mobile-menu').removeClass('mt-[-' + slideHeight + 'px]')
    $('#mobile-menu').addClass('mt-16')
});