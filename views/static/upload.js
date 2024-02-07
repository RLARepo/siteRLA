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
var inputFilesAntesDepois = [];
var firstTime = true;
var firstTimeOne = true;
var firstTimeTwo = true;

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
    formData.append('antesDepois', inputFilesAntesDepois);
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

$('input:radio').on('change', () => {
    if($('#oneImg').prop("checked")){
        return $('#upload').html(`
            <input type="file" name="file" id="file" onchange="newInput(this)" class="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none">
        `);
    }else{
        return $('#upload').html(`
            <input type="file" name="fileOne" id="fileOne" onchange="newInput(this)" class="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none">
            <input type="file" name="fileTwo" id="fileTwo" onchange="newInput(this)" class="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none">
        `);
    }
});

function newInput(input) {
    if($('#oneImg').prop('checked')){
        inputOneImg(input);
    }else{
        inputTwoImg(input, $(input).attr('name'));
    }
}

function inputTwoImg(input, nome){
    if(firstTime){
        var filesStr = `
        <li class="mt-[12px] flex items-center max-w-[100%]">
            <div class="w-[70%] flex justify-between items-center" id="antesDepoisCard">
                <img id="oneImgTemp" class="mr-[12px] max-w-[20%]"></img>
                ${SVGFLECHA}
                <img id="twoImgTemp" class="mr-[12px] max-w-[20%]"></img>
            </div> 
            <button id="salvarAntesDepois" onclick="salvarLi(this, '#oneImgTemp', '#twoImgTemp', '#antesDepoisCard')" type="button" class="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Salvar</button>
        </li>`;
        firstTime = false;
    }
    $("#dp-files").append(filesStr);
    if(nome == 'fileOne'){
        if(firstTimeOne){
            inputFiles.push(input.files[0]);
            firstTimeOne = false;
        }else{
            inputFiles[inputFiles.length] = input.files[0];
        }
        var file = new FileReader();
        file.onload = function() {
            fileImg = file.result;
            document.getElementById('oneImgTemp').src = fileImg;
            $('#fileOne').addClass("bg-green-700");
            setTimeout(() => {
                if($('#fileTwo').val() != ''){
                    $('#salvarAntesDepois').click();
                }
            }, 500)
        };       
        file.readAsDataURL(input.files[0]);
    }else{
        if(firstTimeTwo){
            inputFiles.push(input.files[0]);
            firstTimeTwo = false;
        }else{
            inputFiles[inputFiles.length + 1] = input.files[0];
        }
        var file = new FileReader();
        file.onload = function() {
            fileImg = file.result;
            document.getElementById('twoImgTemp').src = fileImg;
            $('#fileTwo').addClass("bg-green-700");
            setTimeout(() => {
                if($('#fileOne').val() != ''){
                    $('#salvarAntesDepois').click();
                }
            }, 100)
        };       
        file.readAsDataURL(input.files[0]);
    }
}

function inputOneImg(input){
    const name = `${input.files[0].name}${inputFiles.length - 1}`;
    inputFiles.push(input.files[0]);
    var filesStr = `
        <li class="mt-[12px] flex items-center max-w-[20%]">
            <img id="${name}" class="mr-[12px]"></img>
            <button onclick="removeLi(this, ${inputFiles.length - 1}, 'oneItem')" type="button" class="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded itensI">Remover</button>
        </li>`;
    var file = new FileReader();
    $("#dp-files").append(filesStr);
    file.onload = function() {
        fileImg = file.result;
        document.getElementById(name).src = fileImg;
    };       
    file.readAsDataURL(input.files[0]);
    $("#file").val('');
}

function removeLi(e, item, tipo) {
    inputFiles = inputFiles.filter(function(file) {
        return file.name !== e.parentNode.innerHTML.split("<button")[0];
    });
    if(tipo){
        inputFiles.splice(item, tipo == 'oneItem' ? 1 : 2);
    }
    e.parentNode.parentNode.removeChild(e.parentNode);
    verificaSinalizadores();
}

function verificaSinalizadores(){
    var soma = 0;
    inputFilesAntesDepois = [];
    for(var i = 0; i < $('.itensI').length; i++){
        let regex =  new RegExp("\(this, [0-9]+, 'twoItem'\)", 'g');
        const igual = $('.itensI')[i].outerHTML.match(regex);
        if(igual){
            $('.itensI')[i].outerHTML = $('.itensI')[i].outerHTML.replace(regex, `this, ${soma}, 'twoItem'`);
            inputFilesAntesDepois.push(soma);
            soma += 2;
        }else{
            soma += 1;
        }
    }
}

function salvarLi(e, primeiroItem, segundoItem, card) {
    const itemAntesDepois = inputFiles.length - 2;
    $(`${primeiroItem}, ${segundoItem}`).attr('id','');
    var filesStr = `
        <li class="mt-[12px] flex items-center max-w-[100%]">
            <div class="w-[70%] flex justify-between items-center">
                ${$(card).html()}
            </div> 
            <button onclick="removeLi(this, ${itemAntesDepois}, 'twoItem')" type="button" class="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded itensI">Remover</button>
        </li>`;
    removeLi(e);
    $("#dp-files").append(filesStr);
    firstTime = true;
    firstTimeOne = true;
    firstTimeTwo = true;
    inputFilesAntesDepois.push(itemAntesDepois);
    $('#fileOne, #fileTwo').removeClass("bg-green-700");
    $(`#fileOne, #fileTwo`).val('');
}

async function carregarIten(id){
    const {arquivo}= await $.ajax({
        url: DIRETORIO + `/funcao/arquivos/${id}`,
        dataType: 'json',
        method: 'GET'
    });
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
