class Views{
    
	constructor(){
	      
	     this._content = $("section#content"); 

	     this._allMenus = $("footer * a");
	     this._menu1 = $("footer .menu-1 a");
	     this._menu2 = $("footer .menu-2 a");
	     this._menu3 = $("footer .menu-3 a");

       this.header = $("header");
       this.footer = $("footer");

	}

	animarTransicao(){
		new WOW().init();
	}
  

/**
*  ------------------------------------------------------------------------------------------------
*
*
*   VIEW PRODUTOS
*
*
*  ------------------------------------------------------------------------------------------------
*/
    verProduto(idProduto){

        $('#produtosAtomicContinaer').html(`
        
                <div class="carregando-contatos text-center">
                    <i class="fa fa-sync fa-spin me-3"></i> carregando informações do produto
                </div>
        
        `);

        setTimeout(function(){
        

                        console.log("CONSULTAR DESCONTOS");
                        var descontos = JSON.parse(localStorage.getItem("descontosVendedor"));
                        console.log(descontos);

                        // RECUPERAR O PRODUTO
                        var produto;
                        var produtos = JSON.parse(localStorage.getItem("produtos"));

                        var p = 0;
                        while(p<produtos.length){
                            if(produtos[p].product_id==idProduto){
                                produto = produtos[p];
                            }
                            p++;
                        }


                        var htmlDescontos = descontos.cupons.map(desconto => {
                            return `

                            <div style="font-weight:normal;background:#fff;padding:10px;border:2px dotted #000;width:420px;max-width:100%;font-size:1.12em;line-height: 23px;text-align:center">
                                O <b>código de cupom</b> de identificação parceiro é: <br><b>COLAB-A2023-2-R${desconto.desconto_aplicado_ao_carrinho}</b>
                                <a href="" class="copiar-codigo" onclick="copiarCodigo('.codigo-cupom-name-${desconto.desconto_aplicado_ao_carrinho}')">copiar código</a>
                            </div>
                            
                            <textarea class="codigo-cupom-name-${desconto.desconto_aplicado_ao_carrinho}" style="display:none;">COLAB-A2023-2-R${desconto.desconto_aplicado_ao_carrinho}</textarea>

                            <small style="display: block;background: #fff000;width: 420px;max-width: 100%;text-align: center;padding: 3px;margin-top: 5px;font-weight: bold;font-size: 14px;margin-bottom: 37px;">
                                Com esse cupom (desconto de ${desconto.desconto_aplicado_ao_carrinho}% no carrinho), você recebe ${desconto.comissao_que_o_vendedor_ganha}% de comissão
                            </small>

                            `;
                        }).join('');

                        
                        $(`#produtosTitle`).html(`

                            Ver Produto
                        
                        `);
                        $(`#produtosTitle a`).fadeIn(500);

                        $(`#produtosAtomicContinaer`).html(`
                        
                                <div class="card card-style">
                                    <div class="card mb-0 rounded-0 bg-24" data-card-height="250" style="height: 250px;background:url('${produto.featured_image}') #f2f2f2 no-repeat;background-size:cover;backgroud-position:center center;">
                                        <div class="card-bottom">
                                            <a href="" onclick="abrirUrlBrowser('https://atomiclabs.com.br/?p=${produto.product_id}')" class="float-end btn btn-m font-700 bg-white rounded-s color-black mb-2 me-2">VER NO SITE</a>
                                            <a href="#" data-menu="menu-share-modal" class="float-end btn btn-m font-700 bg-white rounded-s color-black mb-2 me-2">COMPARTILHAR</a>
                                        </div>
                                    </div>
                                    <div class="content-d" style="padding-right:13px;">
                                        <p class="font-600 color-highlight mb-n1">Sobre o produto:</p>
                                        <h1 class="font-30 font-800">${produto.title}</h1>
                                        <p class="font-14 mb-3">
                                            ${produto.short_description}
                                        </p>
                                        <p class="opacity-80" style="font-size: 30px;font-weight: bold;color: #000;">
                                            R$${produto.price} 
                                        </p>
                                        <p>
                                            <span style="display: block;color: #118f2d;font-size: 12px;padding-top: 0px;font-weight: bold;font-size:21px">
                                                   Até ${descontos.cupons[2].comissao_que_o_vendedor_ganha}% de comissão e ${descontos.max}% de desconto
                                            </span>
                                        </p>
                                        
                                        <div style="font-weight:normal;background:#f2f2f2;padding:10px;border:2px dotted #000;width:420px;max-width:100%;font-size:1.12em;line-height: 23px;text-align:center;margin-top:30px;margin-bottom:30px;">
                                            O seu <b>código de cupom</b> de identificação parceiro é: <br><b>COLAB-A2023-2</b>
                                        </div>
                                        
                                        ${htmlDescontos}

                                    </div>
                                </div>
                        
                        `);


    }, 5000);


    }



/**
*  ------------------------------------------------------------------------------------------------
*
*
*   VIEW PRINCIPAL
*
*
*  ------------------------------------------------------------------------------------------------
*/
    viewPrincipal(){

           voltarAoTopo();

           this.header.html(`

              

           `);

            this._content.html(`
            
             
            
            `);

            this.animarTransicao();

            app.views.cssInicioLogado();

            app.views.ativarMenuUm();

            $("footer").fadeIn();

            /*
            if(localStorage.getItem("calibragem")==null){

                  app.views.calibragem();

            }
            */


    }



    desativarTodosMenus(){
    	this._allMenus.css("font-weight","normal");
    }

    ativarMenuUm(){
    	this.desativarTodosMenus();
       	this._menu1.css("font-weight","bold"); 
    }
    ativarMenuDois(){
    	this.desativarTodosMenus();
       	this._menu2.css("font-weight","bold"); 
    }
    ativarMenuTres(){
    	this.desativarTodosMenus();
       	this._menu3.css("font-weight","bold"); 
    }



}

