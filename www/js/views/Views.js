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

