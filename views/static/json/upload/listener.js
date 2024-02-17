$( document ).ready( async() => {
    await carregarItens('servicos');
    $('#servico').click();
    window.scrollTo({top: 0, behavior: 'smooth'});
    $('#descricao').val('');
});

$('#produto, #servico').on('click', (e) => {
    if($("#salvarAntesDepois").prop('disabled')){
        return Swal.fire({
            title: "Atenção!",
            text: "É preciso finalizar as fotos Antes > Depois!",
            icon: "info"
        });
    }
    if(e.target.id != tipo){
        $('#' + tipo).removeClass('bg-sky-500');
        $('#' + tipo).addClass('bg-slate-500');
        tipo = e.target.id;
        $('#' + tipo).removeClass('bg-slate-500');
        $('#' + tipo).addClass('bg-sky-500');
        limparFile();
    }
    if(tipo == 'servico'){
        $('#opcoesInput').html(`
            <div class="block">
                <input id="oneImg" class="peer/draft" type="radio" name="status" checked />
                <label for="draft" class="peer-checked/draft:text-sky-500"> Imagem<span class="second hidden">/Video</span> </label>
            </div>
            <div class="block">
                <input id="twoImg" class="peer/published" type="radio" name="status" value="antesDepois" />
                <label for="published" class="peer-checked/published:text-sky-500"> Antes & Depois (Imagem<span class="second hidden">/Video</span>) </label>
            </div>
        `);
    }else{
        $('#opcoesInput').html(`
            <div class="block">
                <input id="oneImg" class="peer/draft" type="radio" name="status" checked />
                <label for="draft" class="peer-checked/draft:text-sky-500"> Imagem<span class="second hidden">/Video</span> </label>
            </div>
        `);
    }
    $('#upload').html(`
        <input type="file" name="file" id="file" onchange="newInput(this)" class="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none">
    `);
    verificaPrimeiroItem();
    $('input:radio').on('change', () => {
        if($("#salvarAntesDepois").prop('disabled')){
            $('#twoImg').click();
            return Swal.fire({
                title: "Atenção!",
                text: "É preciso finalizar as fotos Antes > Depois!",
                icon: "info"
            });
        }
        if($('#oneVideo').prop("checked")){
            return $('#upload').html(`
                <input type="file" name="file" id="file" onchange="newInput(this)" class="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none">
            `);
        }
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
})

$('#produtoListagem, #servicoListagem').on('click', (e) => {
    if(e.target.id != tipoListagem){
        $('#' + tipoListagem).removeClass('bg-sky-500')
        $('#' + tipoListagem).addClass('bg-slate-500')
        tipoListagem = e.target.id;
        $('#' + tipoListagem).removeClass('bg-slate-500')
        $('#' + tipoListagem).addClass('bg-sky-500')
    }
    if(tipoListagem == 'servicoListagem'){
        carregarItens('servicos');
    }else{
        carregarItens('produtos');
    }
});

$('#salvar').on('click', async() => {
    $('#carregando').removeClass('hidden');
    const formData = new FormData();
    const {arquivo} = await $.ajax({
        url: DIRETORIO + '/funcao/ultimo_arquivo',
        dataType: 'json',
        method: 'GET'
    });
    formData.append('idProduto', arquivo);
    formData.append('nome', $('#nome').val());
    formData.append('descricao', $('#descricao').val().replaceAll('\n', '-quebra_de_linha-'));
    formData.append('antesDepois', inputFilesAntesDepois);
    formData.append('tipo', tipo);
    for(const file of inputFiles){
        formData.append('file[]', file);
    }
    try{
        await $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = (evt.loaded / evt.total) * 100;
                        $('#progresso').css('width', `${percentComplete}%`);
                    }
                }, false);
                return xhr;
            },
            url: DIRETORIO + '/funcao/upload_files',
            dataType: 'json',
            method: 'POST',
            data: formData,
            contentType: false,
            cache: false,
            processData: false
        });
    }catch{
        $('#carregando').addClass('hidden');
    }
    limparFile();
    $('#carregando').addClass('hidden');
    $('#' + tipo + 'Listagem').click();
});