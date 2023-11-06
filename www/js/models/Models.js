class Models{
    

    // TESTAR A DISPONIBILIDADE DA API
    testeApi(){
                
             console.log("TESTE API DESATIVADO");   

    }
    


    // PROC LOGIN
    procLogin(form){

            if(jQuery("#form1a").val()=="ygor.asti@gmail.com"){
                location.href="dashboard.html";
            }else{
                document.getElementById('msgErroLoginSenha').click();
            }
            
    }

   


    // PROC CADASTRO
    procCadastro(form){

                var dadosForm = $(form).serialize();

                // CONFIGURAÇÕES AJAX VANILLA
                let xhr = new XMLHttpRequest();
                
                xhr.open('POST', app.urlApi+'auth/cadastro/',true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                var params = "token="+app.token+
                            "&"+dadosForm;
                
                // INICIO AJAX VANILLA
                xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) {

                        console.log("OPERAÇÃO REALIZADA COM SUCESSO");
                        console.log(JSON.parse(xhr.responseText));

                        var dados = JSON.parse(xhr.responseText);

                        if(dados.sucesso==403){

                            document.getElementById('msgCadastro').click();

                        }else{
                            
                            // LOGIN OK
                            //app.login(dados.dados[0].id,dados.dados[0].email,dados.dados[0]);

                            // CADASTRO OK
                            localStorage.setItem("cadastroOk",2);

                            location.href="index.html";
                            

                        }
                        
                    }else{
                    
                        console.log("SEM SUCESSO procCadastro()");
                        console.log(JSON.parse(xhr.responseText));
                        document.getElementById('msgErroLoginSenha').click();

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send(params);
  
  
    }


    



    // RESET DE SENHA  
    procResetSenha(form){

                var dadosForm = $(form).serialize();

                // CONFIGURAÇÕES AJAX VANILLA
                let xhr = new XMLHttpRequest();
                
                xhr.open('POST', app.urlApi+'auth/reset-senha/',true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                var params = "token="+app.token+
                            "&"+dadosForm;
                
                // INICIO AJAX VANILLA
                xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) {

                        console.log("OPERAÇÃO REALIZADA COM SUCESSO");
                        console.log(JSON.parse(xhr.responseText));

                        var dados = JSON.parse(xhr.responseText);

                        if(dados.sucesso==403){

                            document.getElementById('msgErroLoginSenha').click();

                        }else{
                            
                            document.getElementById('msgSucessoReset').click();
                        }
                        
                    }else{
                    
                        console.log("SEM SUCESSO procResetSenha()");
                        console.log(JSON.parse(xhr.responseText));

                        document.getElementById('msgErroLoginSenha').click();

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send(params);

    }

    getDescontos(){

        console.log("TENTADO OBTER OS DESCONTOS...");

         // CONFIGURAÇÕES AJAX VANILLA
         let xhr = new XMLHttpRequest();
                                
         xhr.open('GET', "https://parceiro.atomiclabs.com.br/wp-json/atomiclabs/v1/vendedor/1",true);
         xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

         var params = "token="+app.token;
         
         // INICIO AJAX VANILLA
         xhr.onreadystatechange = () => {

         if(xhr.readyState == 4) {

             if(xhr.status == 200) {

                 console.log("OPERAÇÃO REALIZADA COM SUCESSO");
                 console.log(JSON.parse(xhr.responseText));

                 var dados = JSON.parse(xhr.responseText);

                 if(dados.sucesso==200){

                    localStorage.setItem("descontosVendedor",JSON.stringify(dados));

                 }else{
                     
                     
                 }
                 
             }else{
             
                 console.log("SEM SUCESSO getDescontos()");
                 console.log(JSON.parse(xhr.responseText));
                
                 
             }

         }
     }; // FINAL AJAX VANILLA

     /* EXECUTA */
     xhr.send(params);


    }
    getProdutos(){
        
            console.log("TENTADO OBTER OS PRODUTOS...");

                        // CONFIGURAÇÕES AJAX VANILLA
                        let xhr = new XMLHttpRequest();
                                
                        xhr.open('GET', "https://atomiclabs.com.br/wp-json/atomiclabs/v1/produtos",true);
                        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                        var params = "token="+app.token;
                        
                        // INICIO AJAX VANILLA
                        xhr.onreadystatechange = () => {

                        if(xhr.readyState == 4) {

                            if(xhr.status == 200) {

                                console.log("OPERAÇÃO REALIZADA COM SUCESSO");
                                console.log(JSON.parse(xhr.responseText));

                                var dados = JSON.parse(xhr.responseText);

                                if(dados.sucesso==200){

                                   

                                    console.log("CONSULTAR DESCONTOS");
                                    var descontos = JSON.parse(localStorage.getItem("descontosVendedor"));
                                    console.log(descontos);

                                    localStorage.setItem("produtos",JSON.stringify(dados.dados));

                                    // PREPARAR E MONTAR O HTML
                                    // Mapear cada produto para uma string HTML e juntá-las
                                    var produtosHTML = dados.dados.map(produto => {
                                        return `
                                            <div class="col-6 pe-2">
                                                <div class="card card-style mx-0">
                                                    <img src="${produto.featured_image}" class="img-fluid"  onclick="app.views.verProduto(${produto.product_id});">
                                                    <div class="px-2">
                                                        <p class="color-highlight font-600 mb-n1 pt-1">Suplementos</p>
                                                        <h2 style="margin-bottom: -1px;">${produto.title}</h2>
                                                        <h5 class="font-14">R$${produto.price}</h5>
                                                        <p class="font-11 line-height-s">
                                                            ${produto.short_description}
                                                        </p>
                                                        ${
                                                            produto.comissao_dif === "Sim"
                                                            ? `<span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;margin-top: -30px;margin-bottom: 19px;">
                                                                ${produto.comissao_dif_val}% de comissão!
                                                            </span>`
                                                            : `
                                                                <span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;margin-top: -30px;margin-bottom: 19px;">
                                                                    Até ${descontos.max}% de comissão
                                                                </span>
                                                            `
                                                        }
                                                        <a href="" onclick="app.views.verProduto(${produto.product_id});" class="btn btn-s btn-full border-highlight rounded-s color-highlight mb-3"><i class="fa fa-bullhorn" aria-hidden="true"></i> VER DETALHES</a>
                                                    </div>
                                                </div>
                                            </div>`;
                                    }).join('');

                                    $(".carregando-contatos").hide();
                                    $(".carregando-contatos-vazio").hide();

                                    // Inserir HTML no contêiner de produtos
                                    $('#produtosAtomicContinaer').html(produtosHTML);




                                }else{
                                    
                                    $(".carregando-contatos-vazio").show();

                                }
                                
                            }else{
                            
                                console.log("SEM SUCESSO getProdutos()");
                                console.log(JSON.parse(xhr.responseText));
                                $(".carregando-contatos-vazio").show();
                                

                            }

                        }
                    }; // FINAL AJAX VANILLA

                    /* EXECUTA */
                    xhr.send(params);


    }



    getContatos(){

        console.log("INICIANDO FUNÇÃO PARA CARREGAR OS CONTATOS DO USÁRIO");

                    // FEED DE PESQUISA
                    jQuery("#listaContatosPesquisa").html(`

                   
                        
                            <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Diogenes Junior" style="padding-top:26px">
                
                                <div class="resumo-letra-contato">
                                     Diogenes Junior
                                </div>
                                <div>
                                    <h5 class="font-16 font-600">Diogenes Junior</h5>
                                    <p class="line-height-s mt-1 opacity-90">Pedido #3920</p>
                                </div>
                                <div class="align-self-center ps-3">
                                    <i class="fa fa-angle-right opacity-20"></i>
                                </div>
                            </a>

                            <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Ygor Kaza" style="padding-top:26px">
                
                                <div class="resumo-letra-contato">
                                    Ygor Kaza
                                </div>
                                <div>
                                    <h5 class="font-16 font-600">Ygor Kaza</h5>
                                    <p class="line-height-s mt-1 opacity-90">Pedido #3921</p>
                                </div>
                                <div class="align-self-center ps-3">
                                    <i class="fa fa-angle-right opacity-20"></i>
                                </div>
                            </a>

                            <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Halley Hart" style="padding-top:26px">
                
                                <div class="resumo-letra-contato">
                                    Halley Hart
                                </div>
                                <div>
                                    <h5 class="font-16 font-600">Halley Hart</h5>
                                    <p class="line-height-s mt-1 opacity-90">Pedido #3922</p>
                                </div>
                                <div class="align-self-center ps-3">
                                    <i class="fa fa-angle-right opacity-20"></i>
                                </div>
                            </a>

                            <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Fernanda Paiola" style="padding-top:26px">
                
                                <div class="resumo-letra-contato">
                                    Fernanda Paiola
                                </div>
                                <div>
                                    <h5 class="font-16 font-600">Fernanda Paiola</h5>
                                    <p class="line-height-s mt-1 opacity-90">Pedido #3923</p>
                                </div>
                                <div class="align-self-center ps-3">
                                    <i class="fa fa-angle-right opacity-20"></i>
                                </div>
                            </a>

                            <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Jorginho Vans" style="padding-top:26px">
                
                                <div class="resumo-letra-contato">
                                    Jorginho Vans
                                </div>
                                <div>
                                    <h5 class="font-16 font-600">Jorginho Vans</h5>
                                    <p class="line-height-s mt-1 opacity-90">Pedido #3924</p>
                                </div>
                                <div class="align-self-center ps-3">
                                    <i class="fa fa-angle-right opacity-20"></i>
                                </div>
                            </a>
                        
                       
            
            `);

            $(".carregando-contatos").hide();
            $(".carregando-contatos-vazio").hide();

            // LISTAGEM GERAL
            jQuery("#listaContatosListagem").html(`

                                <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Diogenes Junior" style="padding-top:26px">
                        
                                    <div class="resumo-letra-contato">
                                        D
                                    </div>
                                    <div>
                                        <h5 class="font-16 font-600">Diogenes Junior</h5>
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3920 <span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;">Comissão R$12 (6%)</span></p>
                                    </div>
                                    <div class="align-self-center ps-3">
                                        <i class="fa fa-angle-right opacity-20"></i>
                                    </div>
                                </a>

                                <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Ygor Kaza" style="padding-top:26px">
                    
                                    <div class="resumo-letra-contato">
                                        Y
                                    </div>
                                    <div>
                                        <h5 class="font-16 font-600">Ygor Kaza</h5>
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3921 <span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;">Comissão R$12 (6%)</span></p>
                                    </div>
                                    <div class="align-self-center ps-3">
                                        <i class="fa fa-angle-right opacity-20"></i>
                                    </div>
                                </a>

                                <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Halley Hart" style="padding-top:26px">
                    
                                    <div class="resumo-letra-contato">
                                        H
                                    </div>
                                    <div>
                                        <h5 class="font-16 font-600">Halley Hart</h5>
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3922 <span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;">Comissão R$12 (6%)</span></p>
                                    </div>
                                    <div class="align-self-center ps-3">
                                        <i class="fa fa-angle-right opacity-20"></i>
                                    </div>
                                </a>

                                <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Fernanda Paiola" style="padding-top:26px">
                    
                                    <div class="resumo-letra-contato">
                                        F
                                    </div>
                                    <div>
                                        <h5 class="font-16 font-600">Fernanda Paiola</h5>
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3923 <span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;">Comissão R$12 (6%)</span></p>
                                    </div>
                                    <div class="align-self-center ps-3">
                                        <i class="fa fa-angle-right opacity-20"></i>
                                    </div>
                                </a>

                                <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Jorginho Vans" style="padding-top:26px">
                    
                                    <div class="resumo-letra-contato">
                                        J
                                    </div>
                                    <div>
                                        <h5 class="font-16 font-600">Jorginho Vans</h5>
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3924 <span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;">Comissão R$12 (6%)</span></p>
                                    </div>
                                    <div class="align-self-center ps-3">
                                        <i class="fa fa-angle-right opacity-20"></i>
                                    </div>
                                </a>

                                <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Diogenes Junior" style="padding-top:26px">
                        
                                    <div class="resumo-letra-contato">
                                        D
                                    </div>
                                    <div>
                                        <h5 class="font-16 font-600">Diogenes Junior</h5>
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3920 <span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;">Comissão R$12 (6%)</span></p>
                                    </div>
                                    <div class="align-self-center ps-3">
                                        <i class="fa fa-angle-right opacity-20"></i>
                                    </div>
                                </a>

                                <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Ygor Kaza" style="padding-top:26px">
                    
                                    <div class="resumo-letra-contato">
                                        Y
                                    </div>
                                    <div>
                                        <h5 class="font-16 font-600">Ygor Kaza</h5>
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3921 <span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;">Comissão R$12 (6%)</span></p>
                                    </div>
                                    <div class="align-self-center ps-3">
                                        <i class="fa fa-angle-right opacity-20"></i>
                                    </div>
                                </a>

                                <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Halley Hart" style="padding-top:26px">
                    
                                    <div class="resumo-letra-contato">
                                        H
                                    </div>
                                    <div>
                                        <h5 class="font-16 font-600">Halley Hart</h5>
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3922 <span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;">Comissão R$12 (6%)</span></p>
                                    </div>
                                    <div class="align-self-center ps-3">
                                        <i class="fa fa-angle-right opacity-20"></i>
                                    </div>
                                </a>

                                <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Fernanda Paiola" style="padding-top:26px">
                    
                                    <div class="resumo-letra-contato">
                                        F
                                    </div>
                                    <div>
                                        <h5 class="font-16 font-600">Fernanda Paiola</h5>
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3923 <span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;">Comissão R$12 (6%)</span></p>
                                    </div>
                                    <div class="align-self-center ps-3">
                                        <i class="fa fa-angle-right opacity-20"></i>
                                    </div>
                                </a>

                                <a href="" class="d-flex mb-3" data-filter-item data-filter-name="todos Jorginho Vans" style="padding-top:26px">
                    
                                    <div class="resumo-letra-contato">
                                        J
                                    </div>
                                    <div>
                                        <h5 class="font-16 font-600">Jorginho Vans</h5>
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3924 <span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;">Comissão R$12 (6%)</span></p>
                                    </div>
                                    <div class="align-self-center ps-3">
                                        <i class="fa fa-angle-right opacity-20"></i>
                                    </div>
                                </a>
                        
            `);



    }


}