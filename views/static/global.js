const SVGCALL = `
<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="#e5e7eb">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3545 22.2323C15.3344 21.7262 11.1989 20.2993 7.44976 16.5502C3.70065 12.8011 2.2738 8.66559 1.76767 6.6455C1.47681 5.48459 2.00058 4.36434 2.88869 3.72997L5.21694 2.06693C6.57922 1.09388 8.47432 1.42407 9.42724 2.80051L10.893 4.91776C11.5152 5.8165 11.3006 7.0483 10.4111 7.68365L9.24234 8.51849C9.41923 9.1951 9.96939 10.5846 11.6924 12.3076C13.4154 14.0306 14.8049 14.5807 15.4815 14.7576L16.3163 13.5888C16.9517 12.6994 18.1835 12.4847 19.0822 13.1069L21.1995 14.5727C22.5759 15.5257 22.9061 17.4207 21.933 18.783L20.27 21.1113C19.6356 21.9994 18.5154 22.5232 17.3545 22.2323ZM8.86397 15.136C12.2734 18.5454 16.0358 19.8401 17.8405 20.2923C18.1043 20.3583 18.4232 20.2558 18.6425 19.9488L20.3056 17.6205C20.6299 17.1665 20.5199 16.5348 20.061 16.2171L17.9438 14.7513L17.0479 16.0056C16.6818 16.5182 16.0047 16.9202 15.2163 16.7501C14.2323 16.5378 12.4133 15.8569 10.2782 13.7218C8.1431 11.5867 7.46219 9.7677 7.24987 8.7837C7.07977 7.9953 7.48181 7.31821 7.99439 6.95208L9.24864 6.05618L7.78285 3.93893C7.46521 3.48011 6.83351 3.37005 6.37942 3.6944L4.05117 5.35744C3.74413 5.57675 3.64162 5.89565 3.70771 6.15943C4.15989 7.96418 5.45459 11.7266 8.86397 15.136Z"/>
</svg>`;
const SVGCLOCK = `
<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="#e5e7eb">
    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 6V12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.24 16.24L12 12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
const SVGLOCAL = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#e5e7eb" height="30px" width="30px" version="1.1" id="Capa_1" viewBox="0 0 297 297" xml:space="preserve">
    <g>
        <path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645   c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645   C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892   c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"/>
        <path d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614   c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901   c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104   C179.265,127.948,165.464,141.901,148.5,141.901z"/>
    </g>
</svg>`
const INFO = `
<div class="flex flex-wrap-reverse justify-center">
    <div class="w-3/6 min-w-[360px] p-5">
        <div class="grid grid-cols-2 gap-4">
            <div class="card-fones p-4 h-[150px] border-transparent rounded">
                <div class="flex text-white justify-center items-center">
                    ${SVGCALL}
                    <h5 class="ml-[12px]"><strong>Contato : </strong></h5>
                </div>
                <div class="flex mt-[12px] justify-center text-white">
                    <p class="text-sm"><strong>(19) 99999-9999</strong></p>
                </div>
                <div class="flex mt-[12px] justify-center text-white">
                    <p class="text-sm"><strong>(19) 99999-9999</strong></p>
                </div>
            </div>
            <div class="card-adress p-4 h-[150px] border-transparent rounded">
                <div class="flex text-white justify-center items-center">
                    ${SVGCLOCK}
                    <h5 class="ml-[12px]"><strong>Endereço : </strong></h5>
                </div>
                <div class="flex justify-center mt-[15px] text-white">
                    <p class="text-sm"><strong>121 Rock Street, 21 Avenue, Nova York, NY 92103-9000</strong></p>
                </div>
            </div>
            <div class="card-work p-4 h-[150px] border-transparent rounded">
                <div class="flex text-white justify-center items-center">
                    ${SVGLOCAL}
                    <h5 class="ml-[12px]"><strong>Horarios : </strong></h5>
                </div>
                <div class="flex justify-center mt-[15px] text-white">
                    <p class="text-xs"><strong>Seg a Sex (11h às 20h)</strong></p>
                </div>
                <div class="flex justify-center mt-[15px] text-white">
                    <p class="text-xs"><strong>Sáb e Dom (6h às 20h)</strong></p>
                </div>
            </div>
        </div>
    </div>
    <div class="flex w-3/6 min-w-[350px] p-5 justify-center">
        <div class="card-local w-[350px] h-[300px]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26362.65629575788!2d-42.744307296480024!3d-10.824142162336916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x765921521a3a289%3A0xd0bc236aee3dda01!2sXique-Xique%2C%20BA%2C%2047400-000!5e0!3m2!1spt-BR!2sbr!4v1703708238405!5m2!1spt-BR!2sbr" width="350" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</div>
`;
ITEM = `
    <div class="border rounded-lg shadow bg-gray-800 border-gray-700">
        <a href="#" class="flex justify-center">
            <img class="p-8 rounded-t-lg" src="views/static/_LINKIMAGEM_" alt="product image" />
        </a>
        <div class="px-5 pb-5">
            <a href="#" class="break-all">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">_DESCRICAO_</h5>
            </a>
        </div>
    </div>
`;