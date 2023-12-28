$( document ).ready(() => {
    $('#produtosNavSelect, #produtosNav').click();
})

const sh = parseInt($('#mobile-menu').css('height').replace(/[a-z]+/g, '')) - 64;
$('#mobile-menu').addClass('mt-[-' + sh + 'px]');
$('#mobile-menu').removeClass('mt-16');

$('#contatoNavSelect, #contatoNav').on('click', () => {
    const mt = parseInt($('#mobile-menu').css('margin-top').replace(/[a-z]+/g, ''));
    $('#conteudo-html').html('');
    $('#conteudo-html').html(INFO);
    $('#mobile-menu').addClass('mt-[-' + sh + 'px]')
    $('#mobile-menu').removeClass('mt-16')
});

$('#produtosNavSelect, #produtosNav').on('click', () => {
    const mt = parseInt($('#mobile-menu').css('margin-top').replace(/[a-z]+/g, ''));
    var ITENS = '';
    for(var i = 0; i < 25; i++){
        ITENS += ITEM;
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

$('#show-itens').on('click', () => {
    const mt = parseInt($('#mobile-menu').css('margin-top').replace(/[a-z]+/g, ''));
    if(mt > 0){
        $('#mobile-menu').addClass('mt-[-' + sh + 'px]')
        $('#mobile-menu').removeClass('mt-16')
        return
    }
    $('#mobile-menu').removeClass('mt-[-' + sh + 'px]')
    $('#mobile-menu').addClass('mt-16')
});

// $('.themeRange').on('click', () => {
//     if($('.theme').css('right') == '33px'){
//         SetTheme('dark', 'light');
//         $('.theme').css('right', '1px');
//         return
//     }
//     SetTheme('light', 'dark');
//     $('.theme').css('right', '33px');
// })

// function SetTheme(temaAntigo, temaNovo) {
//     let rul = window.document.styleSheets;
//     for (i = 0; i < rul.length; i++) {
//         let rules = rul[i].cssRules;
//         for (j = 0; j < rules.length; j++) {
//             media = rules[j].media
//             if (media == undefined) {
//                 continue;
//             }
//             if(rules[j].media.mediaText == '(prefers-color-scheme: dark)' || rules[j].media.mediaText == '(prefers-color-scheme: light)'){
//                 rules[j].media.mediaText = rules[j].media.mediaText.replace(`prefers-color-scheme: ${temaAntigo}`, `prefers-color-scheme: ${temaNovo}`);
//                 break;
//             }
//         }
//     }
// }

// if(window.matchMedia('(prefers-color-scheme: dark)').matches){
//     $('.theme').css('right', '33px');
// }else{
//     $('.theme').css('right', '1px');
// }