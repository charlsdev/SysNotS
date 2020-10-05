function numeros(e){
	key = e.keyCode || e.which;
	tecla = String.fromCharCode(key).toLowerCase();
	letras = "0123456789";
	especiales = [8];

	tecla_especial = false
	for(var i in especiales){
		if(key == especiales[i]){
		tecla_especial = true;
		break;
		} 
	}

	if(letras.indexOf(tecla)==-1 && !tecla_especial) 
	return false;
}

function letra(e){
	key = e.keyCode || e.which;
	tecla = String.fromCharCode(key).toLowerCase();
	letras = "áéíóúabcdefghijklmnñopqrstuvwxyz";
	especiales = [8, 32];

	tecla_especial = false
	for(var i in especiales){
		if(key == especiales[i]){
		tecla_especial = true;
		break;
		} 
	}

	if(letras.indexOf(tecla)==-1 && !tecla_especial)
	return false;
}

function direccionD(e){
	key = e.keyCode || e.which;
	tecla = String.fromCharCode(key).toLowerCase();
	letras = "0123456789abcdefghijklmnñopqrstuvwxyz.-";
	especiales = [8, 32];

	tecla_especial = false
	for(var i in especiales){
		if(key == especiales[i]){
			tecla_especial = true;
			break;
		} 
	}

	if(letras.indexOf(tecla)==-1 && !tecla_especial)
	return false;
}

function emailD(e){
	key = e.keyCode || e.which;
	tecla = String.fromCharCode(key).toLowerCase();
	letras = "abcdefghijklmnñopqrstuvwxyz0123456789.-_@";
	especiales = [8];

	tecla_especial = false
	for(var i in especiales){
		if(key == especiales[i]){
			tecla_especial = true;
			break;
		} 
	}

	if(letras.indexOf(tecla)==-1 && !tecla_especial)
	return false;
}

function telefonoD(e){
	key = e.keyCode || e.which;
	tecla = String.fromCharCode(key).toLowerCase();
	letras = "()-0123456789";
	especiales = [8];

	tecla_especial = false
	for(var i in especiales){
		if(key == especiales[i]){
		tecla_especial = true;
		break;
		} 
	}

	if(letras.indexOf(tecla)==-1 && !tecla_especial)
	return false;
}

//con punto
function userU(e){
	key = e.keyCode || e.which;
	tecla = String.fromCharCode(key).toLowerCase();
	letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	especiales = [8];

	tecla_especial = false
	for(var i in especiales){
		if(key == especiales[i]){
		tecla_especial = true;
		break;
		} 
	}

	if(letras.indexOf(tecla)==-1 && !tecla_especial)
	return false;
}

//Con coma
function numeros_precio(e){
	key = e.keyCode || e.which;
	tecla = String.fromCharCode(key).toLowerCase();
	letras = "0123456789";
	especiales = [8, 44];

	tecla_especial = false
	for(var i in especiales){
		if(key == especiales[i]){
		tecla_especial = true;
		break;
		} 
	}

	if(letras.indexOf(tecla)==-1 && !tecla_especial)
	return false;
}

// Validacion de Cedula
function validar(cad) {
	var total = 0;
	var longitud = cad.length;
	var longcheck = longitud - 1;

	if (cad !== "" && longitud === 10){
		for(i = 0; i < longcheck; i++){
			if (i%2 === 0) {
			var aux = cad.charAt(i) * 2;
			if (aux > 9) aux -= 9;
			total += aux;
			} else {
				total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
			}
		}

		total = total % 10 ? 10 - total % 10 : 0;
		
		if (cad.charAt(longitud-1) == total) {
			// alert("Cedula Válida");
			Swal.fire(
				'Cedula Válida',
				'Thanks for me...',
				'success'
			)
			document.getElementById("Enviar").disabled = true;
			$('button[type="submit"]').removeAttr('disabled');
			return document.getElementById('cedula').value = cad;
		}else{
			// alert("Cedula Inválida");
			Swal.fire(
				'Cedula Inválida',
				'Por favor proporcionar una cedula válida...',
				'error'
			)
			document.getElementById('Enviar').disabled = false;
			$('button[type="submit"]').attr('disabled','disabled');
			return document.getElementById('cedula').value = cad;
		}
	}
}

function Cedula(Control){
	var cad = document.getElementById('cedula').value.trim();
	var longitud = cad.length;
	if(longitud === 10){
		Control.value = validar(Control.value);
	}
}

function validarAd(cad) {
	var total = 0;
	var longitud = cad.length;
	var longcheck = longitud - 1;

	if (cad !== "" && longitud === 10){
		for(i = 0; i < longcheck; i++){
			if (i%2 === 0) {
			var aux = cad.charAt(i) * 2;
			if (aux > 9) aux -= 9;
			total += aux;
			} else {
				total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
			}
		}

		total = total % 10 ? 10 - total % 10 : 0;
		
		if (cad.charAt(longitud-1) == total) {
			// alert("Cedula Válida");
			Swal.fire(
				'Cedula Válida',
				'Thanks for me...',
				'success'
			)
			document.getElementById("Enviar").disabled = true;
			$('button[type="submit"]').removeAttr('disabled');
			return document.getElementById('cedulaAd').value = cad;
		}else{
			// alert("Cedula Inválida");
			Swal.fire(
				'Cedula Inválida',
				'Por favor proporcionar una cedula válida...',
				'error'
			)
			document.getElementById('Enviar').disabled = false;
			$('button[type="submit"]').attr('disabled','disabled');
			return document.getElementById('cedulaAd').value = cad;
		}
	}
}

function CedulaAd(Control){
	var cad = document.getElementById('cedulaAd').value.trim();
	var longitud = cad.length;
	if(longitud === 10){
		Control.value = validarAd(Control.value);
	}
}