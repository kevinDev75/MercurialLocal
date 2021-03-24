
// -- 1. ANÁLISIS DE RIESGO BÁSICO
let chk_antecedentes_judiciales = $("#chk_antecedentes_judiciales").is(":checked")
let file_antecedentes_judiciales = $("#file_antecedentes_judiciales").prop("files")[0]

let chk_antecedentes_penales = $("#chk_antecedentes_penales").is(":checked")
let file_antecedentes_penales = $("#file_antecedentes_penales").prop("files")[0]

let chk_antecedentes_policiales_denuncias = $("#chk_antecedentes_policiales_denuncias").is(":checked")
let file_antecedentes_policiales_denuncias = $("#file_antecedentes_policiales_denuncias").prop("files")[0]

let chk_reniec = $("#chk_reniec").is(":checked")
let file_reniec = $("#file_reniec").prop("files")[0]

let chk_antecedentes_terrorismo = $("#chk_antecedentes_terrorismo").is(":checked")
let file_antecedentes_terrorismo = $("#file_antecedentes_terrorismo").prop("files")[0]

let chk_antecedentes_trafico_drogas = $("#chk_antecedentes_trafico_drogas").is(":checked")
let file_antecedentes_trafico_drogas = $("#file_antecedentes_trafico_drogas").prop("files")[0]

let chk_comportamiento_financiero_sentinel = $("#chk_comportamiento_financiero_sentinel").is(":checked")
let file_comportamiento_financiero_sentinel = $("#file_comportamiento_financiero_sentinel").prop("files")[0]


// -- 3. PRUEBAS PSIGMA
let chk_factor_oscuro = $("#chk_factor_oscuro").is(":checked")
let file_factor_oscuro = $("#file_factor_oscuro").prop("files")[0]

let chk_antes_plus = $("#chk_antes_plus").is(":checked")
let file_antes_plus = $("#file_antes_plus").prop("files")[0]

// -- 4. VISITA DOMICILIARIA
let chk_personal_encargado = $("#chk_personal_encargado").is(":checked")
let file_personal_encargado = $("#file_personal_encargado").prop("files")[0]


// -- 5. POLIGRAFO
let chk_poligrafo_adjunto = $("#chk_poligrafo_adjunto").is(":checked")
let file_poligrafo_adjunto = $("#file_poligrafo_adjunto").prop("files")[0]


// -- TABLE DYNAMIC
var listAnalisisRiesgo = new Array()
var indexListAnalisisRiesgo = 0

// -- TABLE
var tableAnalisisRiesgo = $('#tbl_analisis_riesgo').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- FUNCTIONS

// --
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

// -- Función para validar y retornar un file
function validateFile(file, description, index) {
    // -- Constantes para validar el tamaño de un archivo
    const byte = 1048576 // -- 1 MB	-> 1048576 Byte
    const maxSize = 20 // -- 20 Megabytes

    // -- Variable a retornar
    var data = null
    // -- Validamos que exista el archivo
    if (file != undefined) {
        // -- Validamos tamaño que sea menor a 20 MB
        if ((file.size / byte) <= maxSize) {
            // -- Obtenemos la extensión del archivo
            var extension = getFileExtension(file.name)
            // -- Convertimos la extensión a minúscula
            extension = extension.toLowerCase()
            // -- Validamos si es PDF
            if (extension == "pdf") {
                // -- Creamos el objeto del adjunto
                let obj = {
                    "IdArchivoAdjunto": 0,
                    "NombreArchivo": description + "_" + index + "." + extension,
                    "RutaArchivo": null,
                    "ExtensionArchivo": extension,
                    "FecRegistro": null,
                    "IdUsuarioRegistro": 0
                }
                // -- 
                data = obj
            }
        }
    }
    // -- Retornamos data
    return data
}

// -- EVENTS

// -- AGREGAR DATOS A LA TABLA
$("#btn_analisis_riesgo_basico").on('click', function () {

    // -- 
    var slItem = $("#sl_items_analisis_riesgo_basico").val()
    var file = $("#file_analisis_riesgo_basico").prop("files")[0]
    // --
    indexListAnalisisRiesgo = tableAnalisisRiesgo.rows().count() + 1
    // --
    var objFile = validateFile(file, slItem, indexListAnalisisRiesgo)

    if (objFile != null) {
        // --
        let object = {
            "IdAnexo": 0,
            "ItemAnexo": 0,
            "ArchivoAdjuntoAnalisisRiesgo": objFile
        }
        // -- Agregar objeto al listado
        listAnalisisRiesgo.push(object)
        // --
        file.id = indexListAnalisisRiesgo
        listAnalisisRiesgo.push(file)

        // -- Agregar datos a la tabla
        tableAnalisisRiesgo.row.add([
            indexListAnalisisRiesgo,
            slItem + "_" + indexListAnalisisRiesgo,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListAnalisisRiesgo + '" id="btn_analisis_riesgo_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        // --
        tableAnalisisRiesgo.columns.adjust()
            .responsive.recalc();

        // --
        indexListAnalisisRiesgo++
        // --
        $('#file_9').val(null);

    }

})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_analisis_riesgo_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableAnalisisRiesgo.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableAnalisisRiesgo.row(index).remove().draw(false);
    // --
    let indexObject = listAnalisisRiesgo.findIndex(x => x.index == value)
    listAnalisisRiesgo.splice(indexObject, 1)
    // --
    $.each(listAnalisisRiesgo, function (key, item) {
        if (item != undefined) {
            if (item.id == value) {
                listAnalisisRiesgo.splice(key, 1)
            }
        }
    });

})
