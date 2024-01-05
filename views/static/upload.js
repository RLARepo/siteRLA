const SVGLIXO = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#f3000f" version="1.1" id="Layer_1" viewBox="0 0 492.308 492.308" xml:space="preserve">
<g>
	<g>
			<rect x="151.852" y="163.175" transform="matrix(0.9971 -0.0764 0.0764 0.9971 -21.7697 13.2064)" width="19.692" height="255.833"/>
	</g>
</g>
<g>
	<g>
		<rect x="236.308" y="163.545" width="19.692" height="255.084"/>
	</g>
</g>
<g>
	<g>
			<rect x="202.697" y="281.247" transform="matrix(0.0762 -0.9971 0.9971 0.0762 15.1818 598.5728)" width="255.831" height="19.692"/>
	</g>
</g>
<g>
	<g>
		<path d="M448.627,70.115h-51.173V27.577C397.454,12.375,385.089,0,369.887,0H122.416c-15.202,0-27.567,12.375-27.567,27.577    v42.538H43.675H14.752v19.692h31.363L91.06,452.51c2.813,22.692,22.178,39.798,45.043,39.798H356.2    c22.865,0,42.231-17.106,45.043-39.798l44.945-362.702h31.368V70.115H448.627z M114.541,27.577c0-4.346,3.534-7.885,7.875-7.885    h247.471c4.341,0,7.875,3.538,7.875,7.885v42.538H114.541V27.577z M381.704,450.087c-1.596,12.846-12.558,22.529-25.505,22.529    H136.103c-12.947,0-23.909-9.683-25.505-22.529L65.954,89.808h28.894h302.606h28.894L381.704,450.087z"/>
	</g>
</g>
</svg>`;
const ITEM = `
<div class="border rounded-lg shadow bg-gray-800 border-gray-700">
    <a class="flex justify-center">
        <img class="p-8 rounded-t-lg" src="views/static/uploads/_LINKIMAGEM_" alt="product image" />
    </a>
    <div class="px-5 pb-5">
        <a class="break-all flex justify-center">
            <h5 class="text-xl font-semibold mr-[15px] tracking-tight text-gray-900 dark:text-white">_DESCRICAO_</h5><button onclick="deletar(_ID_)">${SVGLIXO}</button>
        </a>
    </div>
</div>
`;
$( document ).ready( async() => {
    carregarItens();
    console.log(DIRETORIO);
});

async function carregarItens(){
    const resposta = await $.ajax({
        url: DIRETORIO + '/arquivos',
        dataType: 'json',
        method: 'GET'
    });
    var ITENS = '';
    for(var i = 0; i < resposta.arquivos.length; i++){
        ITENS += ITEM
        .replace('_ID_', resposta.arquivos[i].id)
        .replace('_LINKIMAGEM_', resposta.arquivos[i].caminho)
        .replace('_DESCRICAO_',  resposta.arquivos[i].descricao);
    }
    $('#conteudo-html').html('');
    $('#conteudo-html').html(`
    <div class="listagem p-16 justify-center grid grid-flow-row-dense gap-20 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${ITENS}
    </div>
    `);
}
async function deletar(id){
    const resposta = await $.ajax({
        url: DIRETORIO + '/delete_files/' + `${id}`,
        dataType: 'json',
        method: 'GET'
    });
    if (resposta.status){
        carregarItens();
    }
};
