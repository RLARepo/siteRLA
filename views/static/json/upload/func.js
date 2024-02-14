async function carregarItens(item){
    const {arquivos} = await $.ajax({
        url: DIRETORIO + `/funcao/${item}`,
        dataType: 'json',
        method: 'GET'
    });
    var ITENS = '';
    for(var i = 0; i < arquivos.length; i++){
        ITENS += ITEMEDIT
        .replaceAll('_ID_', arquivos[i].id)
        .replaceAll('_TIPO_', item)
        .replace('_DESCRICAO_', arquivos[i].nome)
        .replace('_LINKIMAGEM_', arquivos[i].caminho);
    }
    $('#conteudo-html').html('');
    $('#conteudo-html').html(`
    <div class="listagem justify-center grid grid-flow-row-dense gap-20 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-purple rounded-lg">
        ${ITENS}
    </div>
    `);
    $('#carregando').addClass('hidden');
}

function newInput(input) {
    const videoImage = input.files[0].type.includes('image');
    console.log(inputFiles.length)
    if(inputFiles.length == 0 && !videoImage){
        return Swal.fire({
            title: "Atenção!",
            text: "O primeiro arquivo precisa ser uma foto!",
            icon: "info"
        });
    }
    const subFileStr = videoImage ?
    `<img id="_ID_" class="_CSS_"></img>` : 
    `<video id="_ID_" class="_CSS_" autoplay muted loop></video>`
    if($('#oneImg').prop('checked')){
        inputOneImg(input, subFileStr);
    }else{
        inputTwoImg(input, $(input).attr('name'), subFileStr);
    }
}

function inputOneImg(input, subFileStr){
    const name = `${input.files[0].name}${inputFiles.length - 1}`;
    inputFiles.push(input.files[0]);
    var filesStr = `
        <li class="mt-[12px] flex items-center">
            ${subFileStr.replace('_ID_', name).replace('_CSS_', 'mr-[12px]  max-w-[20%]')}
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

function inputTwoImg(input, nome, subFileStr){
    if(firstTime){
        var filesStr = `
        <li class="mt-[12px] flex items-center max-w-[100%]">
            <div class="w-[70%] flex justify-between items-center" id="antesDepoisCard">
                <div id="arquivo1" class="mr-[12px] max-w-[20%]">
                </div>
                ${SVGFLECHA}
                <div id="arquivo2" class="mr-[12px] max-w-[20%]">
                </div>
            </div> 
            <button id="salvarAntesDepois" onclick="salvarLi(this, '#oneImgTemp', '#twoImgTemp', '#antesDepoisCard')" type="button" class="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Salvar</button>
        </li>`;
        firstTime = false;
    }
    $("#dp-files").append(filesStr);
    if(nome == 'fileOne'){
        $('#arquivo1').html(subFileStr.replace('_ID_', 'oneImgTemp'));
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
                    $('#arquivo1, #arquivo2, #oneImgTemp, #twoImgTemp').attr('id','');
                }
            }, 500)
        };       
        file.readAsDataURL(input.files[0]);
    }else{
        $('#arquivo2').html(subFileStr.replace('_ID_', 'twoImgTemp'))
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
                    $('#arquivo1, #arquivo2, #oneImgTemp, #twoImgTemp').attr('id','');
                }
            }, 100)
        };       
        file.readAsDataURL(input.files[0]);
    }
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
        url: DIRETORIO + `/funcao/servico/${id}`,
        dataType: 'json',
        method: 'GET'
    });
}

async function deletar(id, tipo){
    $('#carregando').removeClass('hidden');
    const resposta = await $.ajax({
        url: DIRETORIO + `/funcao/delete_files/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    if (resposta.status){
        carregarItens(tipo);
    }
};