/**
 * FUNCIÓN QUE MUESTRA POR PANTALLA LAS IMAGENES DE LA GALERIA
 * @param {Object} imagenes (Json con la información de las imagenes)
 */
function mostrar_galeria_imagenes(imagenes) {

    console.log("Carga las imagenes");

}

function abrir_popup_informacion(dato) {
    swal({
        title: 'Aviso!',
        text: dato,
        type: 'info',
        closeOnConfirm: true
    });
}

/**
 * FUNCION QUE MUESTRA UN POPUP DE ACEPTAR/CANCELAR
 * @param {Object} dato (para personalizar el popup)
 */
function abrir_popup_accion(dato) {
    swal({
        title: 'Esta seguro?',
        text: dato,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        closeOnConfirm: true
    });
}
