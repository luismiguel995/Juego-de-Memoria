var Tfigura = 50; 
var IniciaJuego = false 
var ProximoNivel = true; 
var columnas = filas = 2 


$(document).ready(
function()
{
		GeneraJuego(columnas ,filas);
}
	);
 
function GeneraJuego(c,r)
{
	if(!ProximoNivel)
	return;
	ProximoNivel = false;
	$( ".juego" ).fadeOut( 1000, 

	function() 
	{ 
		$( ".juego" ).empty();
		$( ".contenedor" ).animate({height: ((Tfigura+8)*r)+"px",width: ((Tfigura+8)*c)+"px"},1000, 
		function()
		{
			for(i = 0; i < (c * r); i++)
			$( ".juego" ).append(CrearFigura("cuadrado", Tfigura)); 
			$( ".juego" ).fadeIn(200);
			CrearFiguraAzul();
		}) 
	});
}
 
function CrearFigura(tipofigura, r)
{
	return $("<div>").addClass("figura "+tipofigura).width(r).height(r).click(function()
	{
		if(IniciaJuego)
		{
			if($(this).attr("selected") == "selected")
			$(this).addClass("activa");
			else
			$(this).addClass("error");
			 
			var TotalSeleccionadas= $( ".figura[selected='selected']" ).length
			 
			if(($(".activa").length + $(".error").length) >= TotalSeleccionadas)
			{
				IniciaJuego = false;
				$( ".figura[selected='selected']:not(.activa)" ).addClass("activa");
				 
				if($(".error").length == 0)
				{
				 
					alert("Muy bien, Siguiente figura");
					 
					if(columnas == filas)
					columnas++;
					else if( columnas > filas)
					filas++;
					if(columnas > 6)
					{
						columnas = 6;
						filas = 6;
					} 
				}
				GeneraJuego(columnas,filas);
			}
		}
	});
}

function CrearFiguraAzul()
{
	var count = 0;
	var length = $( ".juego > .figura" ).length
	 
	for( count = 0; count < Math.ceil(length/3);)
	{
		var random = Math.ceil(Math.random()*length ); 
		if(random < length)
		{
			if(!$( ".juego > .figura" ).eq(random).hasClass("activa"))
			{
				$( ".juego > .figura" ).eq(random).addClass("activa").attr( "selected", "selected" );
				count++;
			}
		}
	} 
	window.setTimeout(OcultarfigurasAzules,2000)
}

function OcultarfigurasAzules()
{
	$( ".juego > .figura" ).removeClass( "activa" );
	IniciaJuego = true;
	ProximoNivel = true;
}