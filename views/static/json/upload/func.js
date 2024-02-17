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
    carregadoPreview();
    window.scrollTo({top: 536, behavior: 'smooth'});
}

function newInput(input) {
    const videoImage = input.files[0].type.includes('image');
    if(inputFiles.length == 0 && !videoImage){
        return Swal.fire({
            title: "Atenção!",
            text: "O primeiro arquivo precisa ser uma foto!",
            icon: "info"
        });
    }
    const subFileStr = videoImage ?
    `<img id="_ID_" class="_CSS_" onload="carregadoPreview()"></img>` : 
    `<video id="_ID_" class="_CSS_" autoplay muted loop onloadstart="carregadoPreview()"></video>`
    if($('#oneImg').prop('checked')){
        inputOneImg(input, subFileStr);
        verificaPrimeiroItem();
    }else{
        inputTwoImg(input, $(input).attr('name'), subFileStr);
        verificaPrimeiroItem();
    }
}

function inputOneImg(input, subFileStr){
    const name = `${input.files[0].name}${inputFiles.length - 1}`;
    inputFiles.push(input.files[0]);
    var filesStr = `
        <li class="inputOne mt-[12px] flex items-center">
            ${subFileStr.replace('_ID_', name).replace('_CSS_', 'mr-[12px]  max-w-[20%]')}
            <button onclick="removeLi(this, ${inputFiles.length - 1}, 'oneItem')" type="button" class="remove bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded itensI">Remover</button>
        </li>`;
    var file = new FileReader();
    carregandoPreview();
    $("#dp-files").append(filesStr);
    file.onload = function() {
        fileImg = file.result;
        document.getElementById(name).src = fileImg;
    };       
    file.readAsDataURL(input.files[0]);
    $("#file").val('');
    verificaFinalizar();
}

function inputTwoImg(input, nome, subFileStr){
    if(firstTime){
        var filesStr = `
        <li class="inputTwo mt-[12px] flex items-center max-w-[100%]">
            <div class="w-[70%] flex justify-between items-center" id="antesDepoisCard">
                <div id="arquivo1" class="mr-[12px] max-w-[20%]">
                </div>
                ${SVGFLECHA}
                <div id="arquivo2" class="mr-[12px] max-w-[20%]">
                </div>
            </div> 
            <button id="salvarAntesDepois" onclick="salvarLi(this, '#oneImgTemp', '#twoImgTemp', '#antesDepoisCard')" type="button" class="disabled:cursor-not-allowed enabled:cursor-pointer disabled:bg-gray-500 enabled:bg-green-500 enabled:hover:bg-green-700 text-white font-bold py-2 px-4 rounded" disabled>Salvar</button>
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
            inputFiles[inputFiles.length - 1] = input.files[0];
        }
        var file = new FileReader();
        carregandoPreview();
        file.onload = function() {
            fileImg = file.result;
            document.getElementById('oneImgTemp').src = fileImg;
            $('#fileOne').addClass("bg-green-700");
            setTimeout(() => {
                if($('#fileTwo').val() != ''){
                    $("#salvarAntesDepois").prop('disabled', false);
                    $('#salvarAntesDepois').click();
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
            inputFiles[inputFiles.length - 1] = input.files[0];
        }
        var file = new FileReader();
        carregandoPreview();
        file.onload = function() {
            fileImg = file.result;
            document.getElementById('twoImgTemp').src = fileImg;
            $('#fileTwo').addClass("bg-green-700");
            setTimeout(() => {
                if($('#fileOne').val() != ''){
                    $("#salvarAntesDepois").prop('disabled', false);
                    $('#salvarAntesDepois').click();
                }
            }, 100)
        };       
        file.readAsDataURL(input.files[0]);
    }
    verificaFinalizar();
}

function removeLi(e, item, tipo) {
    if(tipo){
        inputFiles.splice(item, tipo == 'oneItem' ? 1 : 2);
    }
    e.parentNode.parentNode.removeChild(e.parentNode);
    verificaSinalizadores();
    verificaPrimeiroItem();
    verificaFinalizar();
}

function verificaSinalizadores(){
    var soma = 0;
    inputFilesAntesDepois = [];
    for(var i = 0; i < $('.itensI').length; i++){
        let regex =  new RegExp("\(this, [0-9]+, 'twoItem'\)", 'g');
        let regexOne =  new RegExp("\(this, [0-9]+, 'oneItem'\)", 'g');
        const igual = $('.itensI')[i].outerHTML.match(regex);
        if(igual){
            $('.itensI')[i].outerHTML = $('.itensI')[i].outerHTML.replace(regex, `this, ${soma}, 'twoItem'`);
            inputFilesAntesDepois.push(soma);
            soma += 2;
        }else{
            $('.itensI')[i].outerHTML = $('.itensI')[i].outerHTML.replace(regexOne, `this, ${soma}, 'oneItem'`);
            soma += 1;
        }
    }
}

function salvarLi(e, primeiroItem, segundoItem, card) {
    const itemAntesDepois = inputFiles.length - 2;
    $(`${primeiroItem}, ${segundoItem}`).attr('id','');
    var filesStr = `
        <li class="inputTwo mt-[12px] flex items-center max-w-[100%]">
            <div class="w-[70%] flex justify-between items-center">
                ${$(card).html()}
            </div>
            <button onclick="removeLi(this, ${itemAntesDepois}, 'twoItem')" type="button" class="remove bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded itensI">Remover</button>
        </li>`;
    removeLi(e);
    $("#dp-files").append(filesStr);
    firstTime = true;
    firstTimeOne = true;
    firstTimeTwo = true;
    inputFilesAntesDepois.push(itemAntesDepois);
    $('#arquivo1, #arquivo2, #oneImgTemp, #twoImgTemp').attr('id','');
    $('#fileOne, #fileTwo').removeClass("bg-green-700");
    $(`#fileOne, #fileTwo`).val('');
    verificaFinalizar();
}

async function carregarIten(id, tipo){
    $('body').addClass('overflow-hidden')
    $('#alterarItem').removeClass('hidden');
    const {arquivo}= await $.ajax({
        url: DIRETORIO + `/funcao/${tipo.substr(0, tipo.length - 1)}/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    const {subArquivos} = await $.ajax({
        url: `/funcao/sub_arquivos/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    const tipos = arquivo.Tarquivo.split('-');
    let i = 1;
    let imagem = tipos.length == 1 ? IMAGEMMOLDEUNICA : IMAGEMMOLDEDUPLO;
    for(const tipo of tipos){
        subFileStr = tipo == 'image' ?
        `<img class="_CSS_" src="_SRC_"></img>` : 
        `<video class="_CSS_" src="_SRC_" autoplay muted loop></video>`;
        subFileStr = subFileStr
        .replace('_CSS_', tipos.length == 1 ? 'mr-[12px]  max-w-[20%]' : '')
        .replace('_SRC_', `/views/static/uploads/${i == 1 ? arquivo.caminho : arquivo.referencia}`);
        imagem = imagem
        .replace(`_IMAGEVIDEO${i}_`, subFileStr)
        .replaceAll('_VISIBLE_', 'hidden');
        i += 1
    }
    let imagens = imagem;
    for(const sub of subArquivos){
        const typo = sub.Tarquivo.split('-');
        let i = 1;
        let img = typo.length == 1 ? IMAGEMMOLDEUNICA : IMAGEMMOLDEDUPLO;
        for(const t of typo){
            subFileStr = t == 'image' ?
            `<img class="_CSS_" src="_SRC_"></img>` : 
            `<video class="_CSS_" src="_SRC_" autoplay muted loop></video>`;
            subFileStr = subFileStr
            .replace('_CSS_', typo.length == 1 ? 'mr-[12px]  max-w-[20%]' : '')
            .replace('_SRC_', `/views/static/uploads/${i == 1 ? sub.caminho : sub.referencia}`);
            img = img
            .replace(`_IMAGEVIDEO${i}_`, subFileStr)
            .replace('_ID_', sub.id)
            .replace('_TIPO_', tipo)
            .replace('_IDPRODUTO_', id);
            i += 1
        }
        imagens += img;
    }
    $('#conteudoAlterar').html(
        PRODUTOSERVICOALTERAR
        .replace('_NOMEPROD_', arquivo.nome)
        .replace('_DESCPROD_', arquivo.descricao)
        .replace('_LISTAIMAGENS_', imagens)
        .replace('_ID_', arquivo.id)
        .replace('_TIPO_', tipo)
    );
    nomeAlterarAtual = arquivo.nome;
    descricaoAlterarAtual = arquivo.descricao;
}

async function salvarAlterar(id, tipo){
    let nome = $('#nomeAlterar').val()
    let descricao = $('#descricaoAlterar').val().replaceAll('\n', '-quebra_de_linha-')
    $('#cardAlterarNomeDesc').html(DIVCARREGANDO);
    await $.ajax({
        url: DIRETORIO + '/funcao/alterarProduto',
        dataType: 'json',
        method: 'POST',
        data: {
            nome : nome, 
            descricao : descricao,
            id: id
        }
    });
    carregarIten(id, tipo);
}

async function removerFoto(id, tipo, idProduto){
    $('#cardAlterarFoto').html(DIVCARREGANDO);
    await $.ajax({
        url: DIRETORIO + `/funcao/removerFoto/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    carregarIten(idProduto, tipo);
}

async function deletar(id, tipo){
    carregandoPreview();
    const resposta = await $.ajax({
        url: DIRETORIO + `/funcao/delete_files/${id}`,
        dataType: 'json',
        method: 'GET'
    });
    if (resposta.status){
        carregarItens(tipo);
        verificaPrimeiroItem();
    }
};

function verificaPrimeiroItem(){
    if(inputFiles.length == 0){
        $('span.second').addClass('hidden');
    }else{
        $('span.second').removeClass('hidden');
    }
}

function verificaFinalizar(){
    if(inputFiles.length == 0)return $("#salvar").prop('disabled', true);
    $("#salvar").prop('disabled', $('li.inputOne').length * 1 + $('li.inputTwo').length * 2 != inputFiles.length);
}

function limparFile(){
    let id = $('.remove').length - 1;
    $('#nome, #descricao').val('');
    for(const botton of $('.remove')){
        $('.remove')[id].click();
        id -= 1;
    }
}

function verificaAlterar(){
    if($('#nomeAlterar').val() != nomeAlterarAtual){
        return $("#salvarAlterar").prop('disabled', false)
    }
    if($('#descricaoAlterar').val() != descricaoAlterarAtual){
        return $("#salvarAlterar").prop('disabled', false)
    }
    $("#salvarAlterar").prop('disabled', true)
}

function finalizarAlterar(){
    carregandoPreview();
    location.reload();
}

function carregandoPreview(){
    $('#progressoBar').addClass('hidden');
    $('#carregando').removeClass('hidden');
}

function carregadoPreview(){
    $('#progressoBar').removeClass('hidden');
    $('#carregando').addClass('hidden');
}