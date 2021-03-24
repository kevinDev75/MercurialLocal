// -- GLOBAL
const functions = new Functions()
// --
const byte = 1048576 // -- 1 MB	-> 1048576 B
const maxSize = 20 // -- 20 Megabytes
// --
var listRestrictivasNacionales = null
var listTestConfiabilidad = null
// -- VARIABLES
var listAnexos = new Array()
var listFilesAnexos = new Array()
var indexListAnexos = 1


function validateFileSize(file) {
    // --
    if ((file.size / byte) <= maxSize) {
        return true
    } else {
        return false
    }
}

// --
function validateNumber(value) {
    // --
    if (value === undefined || value === null || value === 'null' || value === '') {
        return 0
    } else {
        return value
    }
}


function dataURLtoFile(dataurl, filename) {
    // --
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    // --
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    // --
    return new File([u8arr], filename, { type: mime });
}


$("#btn_upload").on('click', function () {
    // --
    $("#modal_file").modal("show");
    $("#file_csv").val(null)
})

$("#btn_generar").on('click', function () {
    GenerateDocument();
});


// --
function GenerateDocument() {
    // --
    let idIntegridad = getDatos("key");
    var itemIntegridad = getDatos("item");
    let url = urlGenerateDocument + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + itemIntegridad + "&idDocumentFile=17";
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            console.log(d);
            var typeAlert = (d.Data.status == "0") ? 'success' : 'error';
            var Message = (d.Data.status == "0") ? 'Se genero el documento correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
            // --
            Swal.fire(
                'Generación de documentos',
                Message,
                typeAlert
            )
        }
    })
}


// --
function calculateGraphic() {
    // --
    let txt_escala_sinceridad = $("#txt_1_escala_sinceridad").val()
    let txt_nivel_riesgo = $("#txt_1_nivel_riesgo").val()
    // --
    if (
        txt_escala_sinceridad <= 100 &&
        txt_nivel_riesgo <= 100 &&
        txt_escala_sinceridad > 0 &&
        txt_nivel_riesgo > 0
    ) {
        // --
        var chart = Highcharts.chart('container-graphic', {

            title: {
                text: 'Resultados Test Psicologico'
            },

            subtitle: {
                text: ''
            },

            xAxis: {
                categories: ['Escala sinceridad', 'Nivel de Riesgo']
            },

            series: [{
                type: 'column',
                colorByPoint: true,
                data: [parseFloat(txt_escala_sinceridad), parseFloat(txt_nivel_riesgo)],
                showInLegend: false
            }]

        });

    } else {
        // -- alert("Ingrese digitos entre 1 y 50")
    }
    svg_to_png('container-graphic')
}

// --
function svg_to_png(container) {
    // --
    var wrapper = document.getElementById(container);
    var svg = wrapper.querySelector("svg");
    // --
    if (svg != null) {
        // --
        if (typeof window.XMLSerializer != "undefined") {
            var svgData = (new XMLSerializer()).serializeToString(svg);
        } else if (typeof svg.xml != "undefined") {
            var svgData = svg.xml;
        }
        // --
        var canvas = document.createElement("canvas");
        var svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
        var ctx = canvas.getContext("2d");
        // --
        var img = document.createElement("img");
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));

        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            var imgsrc = canvas.toDataURL("image/png");
        };
    }

}



// --
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

// --
function getDatos(variable) {
    // --
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}

// --
function getListStatusCivil() {
    // --
    $.ajax({
        url: UrlGetStatusCivil,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            html += '<option value=0>[Seleccionar]</option>'
            // --
            let obj = data.Data
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.IdEstadoCivil + '"> ' + value.DesEstadoCivil + '</option>'
                });
            }
            // --
            $('#sl_1_estado_civil').html(html);
        }
    })
}

function getListDocumentType() {
    // --
    $.ajax({
        url: UrlGetDocumentType,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            html += '<option value=0>[Seleccionar]</option>'
            // --
            let obj = data.Data
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.IdTipoDocIdentidad + '"> ' + value.DesTipoDocIdentidad + '</option>'
                });
            }
            // --
            $('.ClassDocumentType').html(html);
        }
    })
}


// -- TABLE
var tableAnexos = $('#tbl_anexo_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})


// -- AGREGAR DATOS A LA TABLA
$("#btn_anexo_agregar").on('click', function () {

    // -- 
    var file = $("#file_anexo").prop("files")[0]

    var ext = ""
    // --
    if (file !== undefined) {
        // --
        ext = getFileExtension(file.name)
        // --
        if (ext != "" && (ext == "pdf" || ext == "PDF")) {
            // --
            indexListAnexos = tableAnexos.rows().count() + 1
            // --
            let object = {
                "IdAnexo": 0,
                "ItemAnexo": 0,
                "ArchivoAdjuntoAnexo":
                {
                    "IdArchivoAdjunto": 0,
                    "NombreArchivo": "Anexo_" + indexListAnexos + "." + ext,
                    "RutaArchivo": null,
                    "ExtensionArchivo": ext,
                    "FecRegistro": null,
                    "IdUsuarioRegistro": 0
                }
            }
            // -- Agregar objeto al listado
            listAnexos.push(object)
            // --
            file.id = indexListAnexos
            listFilesAnexos.push(file)

            // -- Agregar datos a la tabla
            tableAnexos.row.add([
                indexListAnexos,
                'Anexo_' + indexListAnexos,
                ' <button class= "btn btn-sm btn-danger" data-id="' + indexListAnexos + '" id="btn_anexo_delete_row"> <i class="fa fa-trash"></i></button >'
            ]).draw(false);
            // --
            tableAnexos.columns.adjust()
                .responsive.recalc();

            // --
            indexListAnexos++
            // --
            $('#file_anexo').val(null);

        } else {
            functions.notify_message('Solo se admiten archivos PDF', 'warning')
        }

    }

})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_anexo_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableAnexos.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableAnexos.row(index).remove().draw(false);
    // --
    let indexObject = listAnexos.findIndex(x => x.index == value)
    listAnexos.splice(indexObject, 1)
    // --
    $.each(listFilesAnexos, function (key, item) {
        if (item != undefined) {
            if (item.id == value) {
                listFilesAnexos.splice(key, 1)
            }
        }
    });

})

$("#btn_guardar_csv").on('click', function () {
    // --
    var formDataCsv = new FormData();
    // --
    var file_csv = $('#file_csv').prop("files")[0];
    var ext_file_csv = ""
    // --
    if (file_csv !== undefined) {
        // -
        if (validateFileSize(file_csv)) {
            // --
            ext_file_csv = getFileExtension(file_csv.name)
            // --
            if (ext_file_csv == "csv") {
                // --
                formDataCsv.append("dataFile", file_csv, file_csv.name);

                // --
                $.ajax({
                    type: "POST",
                    url: urlGetDataCSVBrasil,
                    data: formDataCsv,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (object) {
                        console.log('DATA', object)
                        if (object.Data != null) {
                            // --

                            console.log(object.Data.data);
                            if (object.Data.data != null) {
                                // --
                                console.log("sxdf");
                                let obj = object.Data.data
                                // --
                                // -- Inteligencia Artificial :D
                                if (obj.oPersonalDataEvaluatedVm != null && obj.oPersonalDataEvaluatedVm != undefined) {
                                    // --
                                    if (obj.oPersonalDataEvaluatedVm.DesEstadoCivil != null && obj.oPersonalDataEvaluatedVm.DesEstadoCivil != undefined) {
                                        // --
                                        let descriptionEstadoCivil = obj.oPersonalDataEvaluatedVm.DesEstadoCivil
                                        // --
                                        if (descriptionEstadoCivil == "SOLTEIRO") {
                                            obj.oPersonalDataEvaluatedVm.IdEstadoCivil = 3
                                        } else if (descriptionEstadoCivil == "CASADO") {
                                            obj.oPersonalDataEvaluatedVm.IdEstadoCivil = 4
                                        } else if (descriptionEstadoCivil == "VIÚVO") {
                                            obj.oPersonalDataEvaluatedVm.IdEstadoCivil = 8
                                        } else if (descriptionEstadoCivil == "DIVORCIADO") {
                                            obj.oPersonalDataEvaluatedVm.IdEstadoCivil = 11
                                        }
                                        
                                    }
                                    
                                }
                                // --
                                if (object.Data.status == "Ok") {
                                    // --
                                    loadDataBrasil(obj)
                                    // --
                                    $("#modal_file").modal("hide");
                                    $("#file_csv").val(null)
                                }
                               
                            }
                        }
                    }
                });
            } else {
                functions.notify_message('Ups! Formato incorrecto :(', 'warning')
            }
        } else {
            functions.notify_message('Ups! Era grande demais :(', 'warning')
        }
    }

    // --



})



// -- GUARDAR
$('#btn_guardar').on('click', function () {
    // --
    var formData = new FormData();

    // -- GET VALUES
    let idIntegridad = getDatos("key");
    let itemIntegridad = getDatos("item");

    // --
    var txt_1_2_ofac = $("#txt_1_2_ofac").val()
    var txt_1_2_interpol = $("#txt_1_2_interpol").val()
    var txt_1_2_onu = $("#txt_1_2_onu").val()


    // --
    var radio_1_2_poder_juridico_civil = $('input:radio[name=radio_1_2_poder_juridico_civil]:checked').val()
    var file_1_2_poder_juridico_civil = $('#file_1_2_poder_juridico_civil').prop("files")[0];
    var ext_1_2_poder_juridico_civil = ""

    // --
    if (file_1_2_poder_juridico_civil !== undefined) {
        // --
        if (validateFileSize(file_1_2_poder_juridico_civil)) {
            // --
            ext_1_2_poder_juridico_civil = getFileExtension(file_1_2_poder_juridico_civil.name)
            // --
            if (ext_1_2_poder_juridico_civil == "pdf" || ext_1_2_poder_juridico_civil == "PDF") {
                // --
                formData.append("dataFile", file_1_2_poder_juridico_civil, "PoderJudicialCivil." + ext_1_2_poder_juridico_civil);
            }
        }
    }



    // --
    var radio_1_2_poder_juridico_federal = $('input:radio[name=radio_1_2_poder_juridico_federal]:checked').val()
    var file_1_2_poder_juridico_federal = $('#file_1_2_poder_juridico_federal').prop("files")[0];
    var ext_1_2_poder_juridico_federal = ""

    // --
    if (file_1_2_poder_juridico_federal !== undefined) {
        // --
        if (validateFileSize(file_1_2_poder_juridico_federal)) {
            // --
            ext_1_2_poder_juridico_federal = getFileExtension(file_1_2_poder_juridico_federal.name)
            // --
            if (ext_1_2_poder_juridico_federal == "pdf" || ext_1_2_poder_juridico_federal == "PDF") {
                // --
                formData.append("dataFile", file_1_2_poder_juridico_federal, "PoderJudicialFederal." + ext_1_2_poder_juridico_federal);
            }
        }
    }


    // --
    var txt_1_2_poder_ejecutivo = $("#txt_1_2_poder_ejecutivo").val()
    var file_1_2_poder_ejecutivo = $('#file_1_2_poder_ejecutivo').prop("files")[0];
    var ext_1_2_poder_ejecutivo = ""

    // --
    if (file_1_2_poder_ejecutivo !== undefined) {
        // --
        if (validateFileSize(file_1_2_poder_ejecutivo)) {
            // --
            ext_1_2_poder_ejecutivo = getFileExtension(file_1_2_poder_ejecutivo.name)
            // --
            if (ext_1_2_poder_ejecutivo == "pdf" || ext_1_2_poder_ejecutivo == "PDF") {
                // --
                formData.append("dataFile", file_1_2_poder_ejecutivo, "PoderEjecutivo." + ext_1_2_poder_ejecutivo);
            }
        }
    }


    // --
    var txt_1_2_mei = $("#txt_1_2_mei").val()
    var file_1_2_mei = $('#file_1_2_mei').prop("files")[0];
    var ext_1_2_mei = ""
    // --
    if (file_1_2_mei !== undefined) {
        // --
        if (validateFileSize(file_1_2_mei)) {
            // --
            ext_1_2_mei = getFileExtension(file_1_2_mei.name)
            // --
            if (ext_1_2_mei == "pdf" || ext_1_2_mei == "PDF") {
                // --
                formData.append("dataFile", file_1_2_mei, "MEI." + ext_1_2_mei);
            }
        }
    }


    // --
    var txt_1_2_pep = $("#txt_1_2_pep").val()
    var file_1_2_pep = $('#file_1_2_pep').prop("files")[0]
    var ext_1_2_pep = ""
    // --
    if (file_1_2_pep !== undefined) {
        // --
        if (validateFileSize(file_1_2_pep)) {
            // --
            ext_1_2_pep = getFileExtension(file_1_2_pep.name)
            // --
            if (ext_1_2_pep == "pdf" || ext_1_2_pep == "PDF") {
                // --
                formData.append("dataFile", file_1_2_pep, "PEP." + ext_1_2_pep);
            }
        }
    }

    // --
    var txt_1_2_funcionario_publico = $("#txt_1_2_funcionario_publico").val()
    var file_1_2_funcionario_publico = $('#file_1_2_funcionario_publico').prop("files")[0]
    var ext_1_2_funcionario_publico = ""
    // --
    if (file_1_2_funcionario_publico !== undefined) {
        // --
        if (validateFileSize(file_1_2_funcionario_publico)) {
            // --
            ext_1_2_funcionario_publico = getFileExtension(file_1_2_funcionario_publico.name)
            // --
            if (ext_1_2_funcionario_publico == "pdf" || ext_1_2_funcionario_publico == "PDF") {
                // --
                formData.append("dataFile", file_1_2_funcionario_publico, "FuncionarioPublico." + ext_1_2_funcionario_publico);
            }
        }
    }


    // -- II. TEST CONFIABILIDAD
    var file_2_0_test_confiabilidad = $('#file_2_0_test_confiabilidad').prop("files")[0];
    var ext2_0_test_confiabilidad = ""
    // --
    if (file_2_0_test_confiabilidad !== undefined) {
        // -
        if (validateFileSize(file_2_0_test_confiabilidad)) {
            // --
            ext2_0_test_confiabilidad = getFileExtension(file_2_0_test_confiabilidad.name)
            // --
            if (ext2_0_test_confiabilidad == "pdf" || ext2_0_test_confiabilidad == "PDF") {
                // --
                formData.append("dataFile", file_2_0_test_confiabilidad, "TestConfiabilidad." + ext2_0_test_confiabilidad);
            }
        }
    }

    // -- I. DADOS PESSOAIS DO AVALIADO

    var txt_1_nombres_apellidos = $("#txt_1_nombres_apellidos").val()
    var txt_1_nro_documento = $("#txt_1_nro_documento").val()
    var txt_1_lugar_nacimiento = $("#txt_1_lugar_nacimiento").val()
    var txt_1_fecha_nacimiento = $("#txt_1_fecha_nacimiento").val()
    var txt_1_nacionalidad = $("#txt_1_nacionalidad").val()
    var txt_1_edad = $("#txt_1_edad").val()
    var sl_1_estado_civil = $("#sl_1_estado_civil").val()
    var txt_1_registro_general = $("#txt_1_registro_general").val()

    // --
    var radioNivel = $('input:radio[name=radioNivel]:checked').val()
    var radioCalificacion = $('input:radio[name=radioCalificacion]:checked').val()

    // --
    var txt_escala_sinceridad = $("#txt_escala_sinceridad").val()
    var txt_nivel_riesgo = $("#txt_nivel_riesgo").val()

    // --
    var wrapper = document.getElementById("container-graphic");
    var svg = wrapper.querySelector("svg");
    // --
    if (svg != null) {
        // --
        if (typeof window.XMLSerializer != "undefined") {
            var svgData = (new XMLSerializer()).serializeToString(svg);
        } else if (typeof svg.xml != "undefined") {
            var svgData = svg.xml;
        }

        // --
        var canvas = document.createElement("canvas");
        var svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
        var ctx = canvas.getContext("2d");
        // --
        var img = document.createElement("img");
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));

        img.onload = function () {
            // --
            ctx.drawImage(img, 0, 0);
            // --
            var imgsrc = canvas.toDataURL("image/png");
            var file = dataURLtoFile(imgsrc, "FotoGrafico.png");
            formData.append("dataFile", file, "FotoGrafico.png");
        };
    }

    // -- II. ANÁLISE DE ANTECEDENTES PESSOAIS NACIONAIS
    var txt_policia_civil_informa = $("#txt_policia_civil_informa").val()
    var txt_policia_federal_informa = $("#txt_policia_federal_informa").val()
    var txt_comision_inmobiliaria_informa = $("#txt_comision_inmobiliaria_informa").val()
    var txt_micro_emprendedor_individual = $("#txt_micro_emprendedor_individual").val()

    // -- III. ANÁLISE DE ANTECEDENTES PESSOAIS INTERNACIONAIS
    var txt_ofac = $("#txt_ofac").val()
    var txt_interpol = $("#txt_interpol").val()
    var txt_onu = $("#txt_onu").val()
    var txt_informes_adicionales = $("#txt_informes_adicionales").val()

    // -- VI. ANÁLISE DE TESTE DE CONFIABILIDADE
    var txt_analisis_test_antes_plus = $("#txt_analisis_test_antes_plus").val()

    // -- VIII. CONCLUSÃO
    var txt_conclusion = $("#txt_conclusion").val()

    // --
    let objectData = {
        "oBasicDataFlt": {
            "IdDatoBasico": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Nombre": txt_1_nombres_apellidos,
            "Identificacion": txt_1_nro_documento,
            "LugarNacimiento": txt_1_lugar_nacimiento,
            "Nacionalidad": txt_1_nacionalidad,
            "FechaNacimiento": txt_1_fecha_nacimiento,
            "Edad": validateNumber(txt_1_edad),
            "IdEstadoCivil": sl_1_estado_civil,
            "RegistroGeneral": txt_1_registro_general
        },
        "oInternationalRestrictiveLists_BrasilFlt": {
            "IdListaRestrictivaInternacionalBra": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "OFAC": txt_1_2_ofac,
            "INTERPOL": txt_1_2_interpol,
            "ONU": txt_1_2_onu
        },
        "oNationalRestrictiveLists_BrasilFlt": {
            "IdListaRestrictivaNacionalBra": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "IdPoderJuridicoCivil": radio_1_2_poder_juridico_civil,
            "ArchivoAdjunto_PoderJudicial_MandadoPrision": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "PoderJudicialCivil." + ext_1_2_poder_juridico_civil,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_1_2_poder_juridico_civil,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "IdPoderJuridicoFederal": radio_1_2_poder_juridico_federal,
            "ArchivoAdjunto_PoderJudicial_LavaJato": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "PoderJudicialFederal." + ext_1_2_poder_juridico_federal,
                "RutaArchivo": null,
                "ExtensionArchivo": "PNG",
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "PoderEjecutivo_CVM": txt_1_2_poder_ejecutivo,
            "ArchivoAdjunto_PoderEjecutivo_CVM": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "PoderEjecutivo." + ext_1_2_poder_ejecutivo,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_1_2_poder_ejecutivo,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "InfoAdicional_MEI": txt_1_2_mei,
            "ArchivoAdjunto_InfoAdicional_MEI": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "MEI." + ext_1_2_poder_ejecutivo,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_1_2_poder_ejecutivo,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "InfoAdicional_PEP": txt_1_2_pep,
            "ArchivoAdjunto_InfoAdicional_PEP": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "PEP." + ext_1_2_pep,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_1_2_pep,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "InfoAdicional_FuncPublico": txt_1_2_funcionario_publico,
            "ArchivoAdjunto_InfoAdicional_FuncPublico": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FuncionarioPublico." + ext_1_2_funcionario_publico,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_1_2_funcionario_publico,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            }
        },
        "oReliabilityTestFlt": {
            "IdTestConfiabilidad": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ArchivoAdjunto": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "TestConfiabilidad." + ext2_0_test_confiabilidad,
                "RutaArchivo": null,
                "ExtensionArchivo": ext2_0_test_confiabilidad,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            }
        },
        "oPersonalDataEvaluatedFlt": {
            "IdDatoPersonalEvaluado": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NombresApellidos": txt_1_nombres_apellidos,
            "NroDocumento": txt_1_nro_documento,
            "FechaInscripcion": null,
            "FechaExpedicion": null,
            "Caducidad": null,
            "Direccion": null,
            "LugarNacimiento": txt_1_lugar_nacimiento,
            "FechaNacimiento": txt_1_fecha_nacimiento,
            "Nacionalidad": txt_1_nacionalidad,
            "Edad": validateNumber(txt_1_edad),
            "IdEstadoCivil": sl_1_estado_civil,
            "GradoInstruccion": null,
            "Estatura": null,
            "NombreMadre": null,
            "NombrePadre": null
        },
        "oEndResultFlt": {
            "IdResultadoFinal": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Riesgo": radioNivel,
            "Calificacion": radioCalificacion,
            "EscalaSinceridad": validateNumber(txt_escala_sinceridad),
            "NivelRiesgo": validateNumber(txt_nivel_riesgo)
        },
        "oNationalBackgroundAnalysis_BrasilFlt": {
            "IdAnalisisAntecPersoNacional": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "PoliciaCivilInforma": txt_policia_civil_informa,
            "PoliciaFederalInforma": txt_policia_federal_informa,
            "ComisionInmobiliariaInforma": txt_comision_inmobiliaria_informa,
            "MicroEmprendedorIndividual": txt_micro_emprendedor_individual
        },
        "oInternationalBackgroundAnalysis_BrasilFlt": {
            "IdAnalisisAntecPersonInter": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "OFAC": txt_ofac,
            "INTERPOL": txt_interpol,
            "ONU": txt_onu,
            "InformacionAdicional": txt_informes_adicionales
        },
        "oAnalysisReliabilityTestFlt": {
            "IdTestConfiabilidad": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Analisis": txt_analisis_test_antes_plus
        },
        "oConclusionFlt": {
            "IdConclusion": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Conclusion": txt_conclusion
        },
        "oAnexosFlt": {
            "IdAnexo": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ListAnexosDetFlt": listAnexos
        },
    }


    // --
    if (listRestrictivasNacionales != null) {
        // --
        if (listRestrictivasNacionales.ArchivoAdjunto_InfoAdicional_FuncPublico != null) {
            objectData.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_InfoAdicional_FuncPublico = listRestrictivasNacionales.ArchivoAdjunto_InfoAdicional_FuncPublico
        }
        // --
        if (listRestrictivasNacionales.ArchivoAdjunto_InfoAdicional_MEI != null) {
            objectData.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_InfoAdicional_MEI = listRestrictivasNacionales.ArchivoAdjunto_InfoAdicional_MEI
        }
        // --
        if (listRestrictivasNacionales.ArchivoAdjunto_InfoAdicional_PEP != null) {
            objectData.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_InfoAdicional_PEP = listRestrictivasNacionales.ArchivoAdjunto_InfoAdicional_PEP
        }
        // --
        if (listRestrictivasNacionales.ArchivoAdjunto_PoderEjecutivo_CVM != null) {
            objectData.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_PoderEjecutivo_CVM = listRestrictivasNacionales.ArchivoAdjunto_PoderEjecutivo_CVM
        }
        // --
        if (listRestrictivasNacionales.ArchivoAdjunto_PoderJudicial_LavaJato != null) {
            objectData.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_PoderJudicial_LavaJato = listRestrictivasNacionales.ArchivoAdjunto_PoderJudicial_LavaJato
        }
        // --
        if (listRestrictivasNacionales.ArchivoAdjunto_PoderJudicial_MandadoPrision != null) {
            objectData.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_PoderJudicial_MandadoPrision = listRestrictivasNacionales.ArchivoAdjunto_PoderJudicial_MandadoPrision
        }

    }

    // --
    if (listFilesAnexos != undefined && listFilesAnexos.length > 0) {
        // --
        listFilesAnexos.forEach((element) => {
            // --
            var ext = getFileExtension(element.name)
            formData.append("dataFile", element, "Anexo_" + element.id + "." + ext);
        })
    }


    // --
    if (listTestConfiabilidad != null) {
        if (listTestConfiabilidad.ArchivoAdjunto != null) {
            objectData.oReliabilityTestFlt.ArchivoAdjunto = listTestConfiabilidad.ArchivoAdjunto
        }
    }

    // -- VALIDACION
    var camposVacios = ""


    // --
    if (txt_1_2_ofac == "" ||
        txt_1_2_interpol == "" ||
        txt_1_2_onu == "" ||
        txt_1_2_funcionario_publico == "") {
        camposVacios += "<span>SARLAFT - LISTAS RESTRITIVAS INTERNACIONAIS</span>"
    }

    // --
    if (txt_1_2_poder_ejecutivo == "" ||
        txt_1_2_mei == "" ||
        txt_1_2_pep == "") {
        camposVacios += "<span>LISTAS RESTRITIVAS NACIONAIS</span>"
    }

    // --
    if (txt_policia_civil_informa == "" ||
        txt_policia_federal_informa == "" ||
        txt_comision_inmobiliaria_informa == "" ||
        txt_micro_emprendedor_individual == "") {
        camposVacios += "<span>II. ANÁLISE DE ANTECEDENTES PESSOAIS NACIONAIS</span>"
    }

    // --
    if (txt_ofac == "" ||
        txt_interpol == "" ||
        txt_informes_adicionales == "" ||
        txt_onu == "") {
        camposVacios += "<span>III. ANÁLISE DE ANTECEDENTES PESSOAIS INTERNACIONAIS</span>"
    }

    // --
    if (txt_analisis_test_antes_plus == "") {
        camposVacios += "<span>VI. ANÁLISE DE TESTE DE CONFIABILIDADE</span>"
    }

    // --
    if (txt_conclusion == "") {
        camposVacios += "<span>VIII. CONCLUSÃO</span>"
    }

    console.log(objectData)
    // --
    formData.append(
        "JsonMaster",
        JSON.stringify(objectData)
    );

    // --
    if (camposVacios != "") {

        // --
        Swal.queue([{
            icon: 'warning',
            title: 'Formularios incompletos...',
            html: camposVacios,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                // --
                return $.ajax({
                    type: "POST",
                    url: urlSaveorUpdateIntegrity03Brasil,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log('DATA', data)
                        var typeAlert = (data.response.status == "OK") ? 'success' : 'error';
                        var Message = (data.response.status == "OK") ? 'Se guardo la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
                        // --
                        Swal.queue([{
                            title: 'Guardar información',
                            confirmButtonText: 'OK',
                            text: Message,
                            icon: typeAlert,
                            showLoaderOnConfirm: true,
                            preConfirm: () => {
                                return fetch()
                                    .then(window.location.reload())
                                    .catch(() => {
                                    })
                            }
                        }]);
                    }
                });
            }
        }])
    } else {
        Swal.queue([{
            icon: 'info',
            title: '¿Desea guardar el registro?',
            html: camposVacios,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {

                return $.ajax({
                    type: "POST",
                    url: urlSaveorUpdateIntegrity03Brasil,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log('DATA', data)
                        var typeAlert = (data.response.status == "OK") ? 'success' : 'error';
                        var Message = (data.response.status == "OK") ? 'Se guardo la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
                        // --
                        Swal.queue([{
                            title: 'Guardar información',
                            confirmButtonText: 'OK',
                            text: Message,
                            icon: typeAlert,
                            showLoaderOnConfirm: true,
                            preConfirm: () => {
                                return fetch()
                                    .then(window.location.reload())
                                    .catch(() => {
                                    })
                            }
                        }]);
                    }
                });
            }
        }])
    }


})


// --

function getList03Brasil() {
    // --
    let idIntegridad = getDatos("key")
    let Item = getDatos("item")
    // --
    let url = urlGetRiskAnalysisFormat03Brasil + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + Item

    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            let obj = data.Data
            loadDataBrasil(obj)

            //// --
            //if (obj.oInternationalRestrictiveLists_BrasilVm != null) {
            //    // --
            //    $("#txt_1_2_ofac").val(obj.oInternationalRestrictiveLists_BrasilVm.OFAC)
            //    $("#txt_1_2_interpol").val(obj.oInternationalRestrictiveLists_BrasilVm.INTERPOL)
            //    $("#txt_1_2_onu").val(obj.oInternationalRestrictiveLists_BrasilVm.ONU)
            //}

            //// --
            //if (obj.oNationalRestrictiveLists_BrasilVm != null) {
            //    // --
            //    let poder_juridico_civil = obj.oNationalRestrictiveLists_BrasilVm.IdPoderJuridicoCivil
            //    $("input:radio[name='radio_1_2_poder_juridico_civil'][value=" + poder_juridico_civil + "]").prop('checked', true)
            //    // --
            //    let poder_juridico_federal = obj.oNationalRestrictiveLists_BrasilVm.IdPoderJuridicoFederal
            //    $("input:radio[name='radio_1_2_poder_juridico_federal'][value=" + poder_juridico_federal + "]").prop('checked', true)
            //    // --
            //    $("#txt_1_2_poder_ejecutivo").val(obj.oNationalRestrictiveLists_BrasilVm.PoderEjecutivo_CVM)
            //    $("#txt_1_2_mei").val(obj.oNationalRestrictiveLists_BrasilVm.InfoAdicional_MEI)
            //    $("#txt_1_2_pep").val(obj.oNationalRestrictiveLists_BrasilVm.InfoAdicional_PEP)
            //    $("#txt_1_2_funcionario_publico").val(obj.oNationalRestrictiveLists_BrasilVm.InfoAdicional_FuncPublico)
            //}

            //// -- Files
            //// -- LISTAS RESTRICTIVAS NACIONALES
            //if (obj.oInternationalRestrictiveLists_BrasilVm != null) {
            //    // --
            //    listRestrictivasNacionales = obj.oNationalRestrictiveLists_BrasilVm
            //    // --
            //    if (obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderJudicial_MandadoPrision != null) {
            //        $("#PreviewPoderJuridicoCivil span").text(obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderJudicial_MandadoPrision.NombreArchivo)
            //    }

            //    // --
            //    if (obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderJudicial_LavaJato != null) {
            //        $("#PreviewPoderJuridicoFederal span").text(obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderJudicial_LavaJato.NombreArchivo)
            //    }

            //    // --
            //    if (obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderEjecutivo_CVM != null) {
            //        $("#PreviewPoderEjecutivo span").text(obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderEjecutivo_CVM.NombreArchivo)
            //    }

            //    // --
            //    if (obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_MEI != null) {
            //        $("#PreviewMei span").text(obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_MEI.NombreArchivo)
            //    }

            //    // --
            //    if (obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_PEP != null) {
            //        $("#PreviewPep span").text(obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_PEP.NombreArchivo)
            //    }

            //    // --
            //    if (obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_FuncPublico != null) {
            //        $("#PreviewFuncionarioPublico span").text(obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_FuncPublico.NombreArchivo)
            //    }

            //}

            //// -- Test de confiabilidad
            //if (obj.oReliabilityTestVm != null) {
            //    // --
            //    if (obj.oReliabilityTestVm.ArchivoAdjunto != null) {
            //        // --
            //        listTestConfiabilidad = obj.oReliabilityTestVm
            //        $("#PreviewTestConfiabilidad span").text(obj.oReliabilityTestVm.ArchivoAdjunto.NombreArchivo)
            //    }
            //}

            //// --
            //if (obj.oAnexosVm != null) {
            //    // --
            //    let lista = obj.oAnexosVm.ListAnexosDetailVm
            //    listAnexos = lista
            //    lista.forEach((element) => {
            //        // --
            //        let index = tableAnexos.rows().count() + 1
            //        // --
            //        tableAnexos.row.add([
            //            index,
            //            'Anexo_' + index,
            //            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_9_delete_row"> <i class="fa fa-trash"></i></button >'
            //        ]).draw(false);
            //        tableAnexos.columns.adjust()
            //            .responsive.recalc();
            //    })
            //}

            //// --
            //if (obj.oPersonalDataEvaluatedVm != null) {
            //    // --
            //    $("#txt_1_nombres_apellidos").val(obj.oPersonalDataEvaluatedVm.NombresApellidos)
            //    $("#txt_1_nro_documento").val(obj.oPersonalDataEvaluatedVm.NroDocumento)
            //    $("#txt_1_lugar_nacimiento").val(obj.oPersonalDataEvaluatedVm.LugarNacimiento)
            //    $("#txt_1_fecha_nacimiento").val(obj.oPersonalDataEvaluatedVm.FechaNacimiento)
            //    $("#txt_1_nacionalidad").val(obj.oPersonalDataEvaluatedVm.Nacionalidad)
            //    $("#txt_1_edad").val(obj.oPersonalDataEvaluatedVm.Edad)
            //    $("#sl_1_estado_civil").val(obj.oPersonalDataEvaluatedVm.IdEstadoCivil)
            //}


            //// --
            //if (obj.oEndResultVm != null) {
            //    // --
            //    $("#txt_escala_sinceridad").val(obj.oEndResultVm.EscalaSinceridad)
            //    $("#txt_nivel_riesgo").val(obj.oEndResultVm.NivelRiesgo)
            //    // --
            //    let radio_nivel = obj.oEndResultVm.Riesgo
            //    $("input:radio[name='radioNivel'][value=" + radio_nivel + "]").prop('checked', true)
            //    // --
            //    let radio_calificacion = obj.oEndResultVm.Calificacion
            //    $("input:radio[name='radioCalificacion'][value=" + radio_calificacion + "]").prop('checked', true)
            //    // --
            //    calculateGraphic()
            //}

            //// -- 
            //if (obj.oNationalBackgroundAnalysis_BrasilVm != null) {

            //    $("#txt_policia_civil_informa").val(obj.oNationalBackgroundAnalysis_BrasilVm.PoliciaCivilInforma)
            //    $("#txt_policia_federal_informa").val(obj.oNationalBackgroundAnalysis_BrasilVm.PoliciaFederalInforma)
            //    $("#txt_comision_inmobiliaria_informa").val(obj.oNationalBackgroundAnalysis_BrasilVm.ComisionInmobiliariaInforma)
            //    $("#txt_micro_emprendedor_individual").val(obj.oNationalBackgroundAnalysis_BrasilVm.MicroEmprendedorIndividual)
            //}

            //// -- 
            //if (obj.oInternationalBackgroundAnalysis_BrasilVm != null) {

            //    $("#txt_ofac").val(obj.oInternationalBackgroundAnalysis_BrasilVm.OFAC)
            //    $("#txt_interpol").val(obj.oInternationalBackgroundAnalysis_BrasilVm.INTERPOL)
            //    $("#txt_onu").val(obj.oInternationalBackgroundAnalysis_BrasilVm.ONU)
            //    $("#txt_informes_adicionales").val(obj.oInternationalBackgroundAnalysis_BrasilVm.InformacionAdicional)
            //}

            //// --
            //if (obj.oAnalysisReliabilityTestVm != null) {
            //    // --
            //    $("#txt_analisis_test_antes_plus").val(obj.oAnalysisReliabilityTestVm.Analisis)

            //}

            //// --
            //if (obj.oConclusionVm != null) {
            //    // --
            //    $("#txt_conclusion").val(obj.oConclusionVm.Conclusion)

            //}


        }
    })
}

// --
function loadDataBrasil(obj) {
    console.log('loadDataBrasil')
    console.log(obj)
    // --
    if (obj.oBasicDataVm != null) {
        $("#txt_1_registro_general").val(obj.oBasicDataVm.RegistroGeneral)
    }

    // --
    if (obj.oInternationalRestrictiveLists_BrasilVm != null) {
        // --
        $("#txt_1_2_ofac").val(obj.oInternationalRestrictiveLists_BrasilVm.OFAC)
        $("#txt_1_2_interpol").val(obj.oInternationalRestrictiveLists_BrasilVm.INTERPOL)
        $("#txt_1_2_onu").val(obj.oInternationalRestrictiveLists_BrasilVm.ONU)
    }

    // --
    if (obj.oNationalRestrictiveLists_BrasilVm != null) {
        // --
        let poder_juridico_civil = obj.oNationalRestrictiveLists_BrasilVm.IdPoderJuridicoCivil
        $("input:radio[name='radio_1_2_poder_juridico_civil'][value=" + poder_juridico_civil + "]").prop('checked', true)
        // --
        let poder_juridico_federal = obj.oNationalRestrictiveLists_BrasilVm.IdPoderJuridicoFederal
        $("input:radio[name='radio_1_2_poder_juridico_federal'][value=" + poder_juridico_federal + "]").prop('checked', true)
        // --
        $("#txt_1_2_poder_ejecutivo").val(obj.oNationalRestrictiveLists_BrasilVm.PoderEjecutivo_CVM)
        $("#txt_1_2_mei").val(obj.oNationalRestrictiveLists_BrasilVm.InfoAdicional_MEI)
        $("#txt_1_2_pep").val(obj.oNationalRestrictiveLists_BrasilVm.InfoAdicional_PEP)
        $("#txt_1_2_funcionario_publico").val(obj.oNationalRestrictiveLists_BrasilVm.InfoAdicional_FuncPublico)
    }

    // -- Files
    // -- LISTAS RESTRICTIVAS NACIONALES
    if (obj.oInternationalRestrictiveLists_BrasilVm != null) {
        // --
        listRestrictivasNacionales = obj.oNationalRestrictiveLists_BrasilVm
        // --
        if (obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderJudicial_MandadoPrision != null) {
            $("#PreviewPoderJuridicoCivil span").text(obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderJudicial_MandadoPrision.NombreArchivo)
        }

        // --
        if (obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderJudicial_LavaJato != null) {
            $("#PreviewPoderJuridicoFederal span").text(obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderJudicial_LavaJato.NombreArchivo)
        }

        // --
        if (obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderEjecutivo_CVM != null) {
            $("#PreviewPoderEjecutivo span").text(obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderEjecutivo_CVM.NombreArchivo)
        }

        // --
        if (obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_MEI != null) {
            $("#PreviewMei span").text(obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_MEI.NombreArchivo)
        }

        // --
        if (obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_PEP != null) {
            $("#PreviewPep span").text(obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_PEP.NombreArchivo)
        }

        // --
        if (obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_FuncPublico != null) {
            $("#PreviewFuncionarioPublico span").text(obj.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_FuncPublico.NombreArchivo)
        }

    }

    // -- Test de confiabilidad
    if (obj.oReliabilityTestVm != null) {
        // --
        if (obj.oReliabilityTestVm.ArchivoAdjunto != null) {
            // --
            listTestConfiabilidad = obj.oReliabilityTestVm
            $("#PreviewTestConfiabilidad span").text(obj.oReliabilityTestVm.ArchivoAdjunto.NombreArchivo)
        }
    }

    // --
    if (obj.oAnexosVm != null) {
        // --
        let lista = obj.oAnexosVm.ListAnexosDetailVm
        listAnexos = lista
        lista.forEach((element) => {
            // --
            let index = tableAnexos.rows().count() + 1
            // --
            tableAnexos.row.add([
                index,
                'Anexo_' + index,
                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_9_delete_row"> <i class="fa fa-trash"></i></button >'
            ]).draw(false);
            tableAnexos.columns.adjust()
                .responsive.recalc();
        })
    }

    // --
    if (obj.oPersonalDataEvaluatedVm != null) {
        // --
        $("#txt_1_nombres_apellidos").val(obj.oPersonalDataEvaluatedVm.NombresApellidos)
        $("#txt_1_nro_documento").val(obj.oPersonalDataEvaluatedVm.NroDocumento)
        $("#txt_1_lugar_nacimiento").val(obj.oPersonalDataEvaluatedVm.LugarNacimiento)
        $("#txt_1_fecha_nacimiento").val(obj.oPersonalDataEvaluatedVm.FechaNacimiento)
        $("#txt_1_nacionalidad").val(obj.oPersonalDataEvaluatedVm.Nacionalidad)
        $("#txt_1_edad").val(obj.oPersonalDataEvaluatedVm.Edad)
        $("#sl_1_estado_civil").val(obj.oPersonalDataEvaluatedVm.IdEstadoCivil)
    }


    // --
    if (obj.oEndResultVm != null) {
        // --
        $("#txt_escala_sinceridad").val(obj.oEndResultVm.EscalaSinceridad)
        $("#txt_nivel_riesgo").val(obj.oEndResultVm.NivelRiesgo)
        // --
        let radio_nivel = obj.oEndResultVm.Riesgo
        $("input:radio[name='radioNivel'][value=" + radio_nivel + "]").prop('checked', true)
        // --
        let radio_calificacion = obj.oEndResultVm.Calificacion
        $("input:radio[name='radioCalificacion'][value=" + radio_calificacion + "]").prop('checked', true)
        // --
        calculateGraphic()
    }

    // -- 
    if (obj.oNationalBackgroundAnalysis_BrasilVm != null) {

        $("#txt_policia_civil_informa").val(obj.oNationalBackgroundAnalysis_BrasilVm.PoliciaCivilInforma)
        $("#txt_policia_federal_informa").val(obj.oNationalBackgroundAnalysis_BrasilVm.PoliciaFederalInforma)
        $("#txt_comision_inmobiliaria_informa").val(obj.oNationalBackgroundAnalysis_BrasilVm.ComisionInmobiliariaInforma)
        $("#txt_micro_emprendedor_individual").val(obj.oNationalBackgroundAnalysis_BrasilVm.MicroEmprendedorIndividual)
    }

    // -- 
    if (obj.oInternationalBackgroundAnalysis_BrasilVm != null) {

        $("#txt_ofac").val(obj.oInternationalBackgroundAnalysis_BrasilVm.OFAC)
        $("#txt_interpol").val(obj.oInternationalBackgroundAnalysis_BrasilVm.INTERPOL)
        $("#txt_onu").val(obj.oInternationalBackgroundAnalysis_BrasilVm.ONU)
        $("#txt_informes_adicionales").val(obj.oInternationalBackgroundAnalysis_BrasilVm.InformacionAdicional)
    }

    // --
    if (obj.oAnalysisReliabilityTestVm != null) {
        // --
        $("#txt_analisis_test_antes_plus").val(obj.oAnalysisReliabilityTestVm.Analisis)

    }

    // --
    if (obj.oConclusionVm != null) {
        // --
        $("#txt_conclusion").val(obj.oConclusionVm.Conclusion)

    }

}

// -- DATEPICKER
setInputDatePicker("txt_1_fecha_nacimiento")

// -- 
getListStatusCivil()
getListDocumentType();
getList03Brasil()
