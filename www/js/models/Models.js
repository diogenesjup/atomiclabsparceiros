class Models{
    

    // TESTAR A DISPONIBILIDADE DA API
    testeApi(){
                
             console.log("TESTE API DESATIVADO");   

    }
    


    // PROC LOGIN
    procLogin(form){

            if(jQuery("#form1a").val()=="cupomteste"){
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
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3920</p>
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
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3921</p>
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
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3922</p>
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
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3923</p>
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
                                        <p class="line-height-s mt-1 opacity-90">Pedido #3924</p>
                                    </div>
                                    <div class="align-self-center ps-3">
                                        <i class="fa fa-angle-right opacity-20"></i>
                                    </div>
                                </a>
                        
            `);



    }


}