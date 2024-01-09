$( document ).ready( async() => {
    carregarItens();
});

async function carregarItens(){
    const {arquivos} = await $.ajax({
        url: DIRETORIO + '/funcao/arquivos',
        dataType: 'json',
        method: 'GET'
    });
    var ITENS = '';
    for(var i = 0; i < arquivos.length; i++){
        ITENS += ITEMEDIT
        .replaceAll('_ID_', arquivos[i].id)
        .replace('_DESCRICAO_',  arquivos[i].nome)
        .replace('_LINKIMAGEM_', arquivos[i].caminho);
    }
    $('#conteudo-html').html('');
    $('#conteudo-html').html(`
    <div class="listagem p-16 justify-center grid grid-flow-row-dense gap-20 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${ITENS}
    </div>
    `);
}

var inputFiles = [];

$('#salvar').on('click', async() => {
    const formData = new FormData();
    const {arquivo} = await $.ajax({
        url: DIRETORIO + '/funcao/ultimo_arquivo',
        dataType: 'json',
        method: 'GET'
    });
    formData.append('idProduto', arquivo);
    formData.append('nome', $('#produto').val());
    formData.append('descricao', $('#descricao').val());
    for(const file of inputFiles){
        formData.append('file[]', file);
    }
    await $.ajax({
        url: DIRETORIO + '/funcao/upload_files',
        dataType: 'json',
        method: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false
    });
    location.reload()
})

function newInput(input) {
    var filesStr = "";
  
    for (let i = 0; i < input.files.length; i++) {
      inputFiles.push(input.files[i]);
      filesStr += `
        <li class="mt-[12px]">
            <button onclick="removeLi(this)" type="button" class="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remover</button>
            ${input.files[i].name}
        </li>`;
    }
  
    $("#file").val('')
  
    $("#dp-files").append(filesStr)
}

function removeLi(e) {
    inputFiles = inputFiles.filter(function(file) {
      return file.name !== e.parentNode.innerHTML.split("<button")[0];
    })
    e.parentNode.parentNode.removeChild(e.parentNode);
}

async function carregarIten(id){
    const {arquivo}= await $.ajax({
        url: DIRETORIO + `/funcao/arquivos/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    console.log(arquivo)
}

async function deletar(id){
    const resposta = await $.ajax({
        url: DIRETORIO + `/funcao/delete_files/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    if (resposta.status){
        carregarItens();
    }
};
