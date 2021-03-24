// -- GLOBAL
const functions = new Functions()
var listEstudiosRealizados = new Array()
var indexListEstudiosRealizados = 1
var listExperienciaLaboral = new Array()
var indexListExperienciaLaboral = 1

// --
$(".previewClass").click(async function () {
    let route = $(this).attr('data-route');
    if (route != undefined && route != null && route != "") {
        $("#imgPreview").attr('src', 'https://i.gifer.com/YCZH.gif');
        $("#modalIMG").modal("show");
        $("#modalIMG").addClass("in");
        let typeFile = $(this).attr('data-typefile');
        var RouteDecode = route;
        await getImgBase64(RouteDecode, typeFile);
    } else {
        console.log("no se encontro");
        Swal.fire(
            'Previsualizar imagen',
            "No se encontro ningun archivo",
            "warning"
        )
    }
});

$("#btn_generar").on('click', function () {
    GenerateDocument();
});

function GenerateDocument() {
    // --
    let idIntegridad = getDatos("key");
    var itemIntegridad = getDatos("item");
    let url = urlGenerateDocument + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + itemIntegridad + "&idDocumentFile=8";
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
async function getImgBase64(route, typeFile) {
    let datos = {
        "route": route
    };
    $.ajax({
        url: urlDownloadBase64,
        type: 'POST',
        dataType: 'json',
        data: datos,
        success: function (d) {
            // -- console.log(d);
            $("#imgPreview").attr('src',
                'data:image/' + typeFile + ';base64,' + d);
        }
    });
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
function validateNumber(value) {
    // --
    if (value === undefined || value === null || value === 'null' || value === '') {
        return 0
    } else {
        return value
    }
}

// -- ESTUDIOS REALIZADOS

// -- VARIABLES


// -- TABLE
var table_estudios_realizados = $('#tbl_1_2_estudios_realizados').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_2_agregar_estudio_realizado").on('click', function () {
    // -- 
    var txt_1_2_estudio_realizado = $("#txt_1_2_estudio_realizado").val()
    
    indexListEstudiosRealizados = table_estudios_realizados.rows().count() + 1
    // --
    let object = {
        "IdPoligrafo": 0,
        "ItemEstudioRealizado": indexListEstudiosRealizados,
        "DesEstudioRealizado": txt_1_2_estudio_realizado
    }

    // -- Agregar objeto al listado
    listEstudiosRealizados.push(object)


    // -- Agregar datos a la tabla
    table_estudios_realizados.row.add([
        indexListEstudiosRealizados,
        txt_1_2_estudio_realizado,
        ' <button class= "btn btn-sm btn-danger" data-id="' + indexListEstudiosRealizados + '" id="btn_1_2_delete_row"> <i class="fa fa-trash"></i></button >'
    ]).draw(false);
    // --
    table_estudios_realizados.columns.adjust()
        .responsive.recalc();

    // --
    indexListEstudiosRealizados++

    clearFormularyEstudiosRealizados()

})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_2_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    table_estudios_realizados.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    table_estudios_realizados.row(index).remove().draw(false);
    // --
    console.log(listEstudiosRealizados)
    let indexObject = listEstudiosRealizados.findIndex(x => x.index == value);
    listEstudiosRealizados.splice(indexObject, 1);

    //$.each(listEstudiosRealizados, function (key, item) {
    //    if (item != undefined) {
    //        if (item.id == value) {
    //            listEstudiosRealizados.splice(key, 1)
    //        }
    //    }
    //});
    console.log(listEstudiosRealizados)
})

// -- LIMPIAR FORMULARIO
function clearFormularyEstudiosRealizados() {
    // --
    $('#txt_1_2_estudio_realizado').val('')
}


// -- EXPERIENCIA LABORAL

// -- VARIABLES
var listExperienciaLaboral = new Array()

// -- TABLE
var table_experiencia_laboral = $('#tbl_1_2_experiencia_laboral').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})


// -- AGREGAR DATOS A LA TABLA
$("#btn_1_2_agregar_experiencia_laboral").on('click', function () {
    // -- 
    var txt_1_2_nombre_cargo = $("#txt_1_2_nombre_cargo").val()
    var txt_1_2_descripcion_cargo = $("#txt_1_2_descripcion_cargo").val()

    indexListExperienciaLaboral = table_experiencia_laboral.rows().count() + 1
    // --
    let object = {
        "IdPoligrafo": 0,
        "ItemExperienciaLaboral": indexListExperienciaLaboral,
        "NombreCargo": txt_1_2_nombre_cargo,
        "DescripcionCargo": txt_1_2_descripcion_cargo
    }

    // -- Agregar objeto al listado
    listExperienciaLaboral.push(object)


    // -- Agregar datos a la tabla
    table_experiencia_laboral.row.add([
        indexListExperienciaLaboral,
        txt_1_2_nombre_cargo,
        txt_1_2_descripcion_cargo,
        ' <button class= "btn btn-sm btn-danger" data-id="' + indexListExperienciaLaboral + '" id="btn_1_3_delete_row"> <i class="fa fa-trash"></i></button >'
    ]).draw(false);
    // --
    table_experiencia_laboral.columns.adjust()
        .responsive.recalc();

    // --
    indexListExperienciaLaboral++

    clearFormularyExperienciaLaboral()

})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_3_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    table_experiencia_laboral.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    table_experiencia_laboral.row(index).remove().draw(false);
    // --
    let indexObject = listExperienciaLaboral.findIndex(x => x.index == value);
    listExperienciaLaboral.splice(indexObject, 1);
})

// -- LIMPIAR FORMULARIO
function clearFormularyExperienciaLaboral() {
    // --
    $('#txt_1_2_nombre_cargo').val('')
    $('#txt_1_2_descripcion_cargo').val('')
}



// -- GUARDAR
$('#btn_guardar').on('click', function () {
    // --
    var formData = new FormData();
    // -- GET VALUES
    let idIntegridad = getDatos("key");
    let itemIntegridad = getDatos("item");

    // --
    var txt_senores = $("#txt_senores").val()
    var file_foto = $("#file_foto").val()
    var txt_nombre = $("#txt_nombre").val()
    var txt_direccion = $("#txt_direccion").val()
    var txt_celular = $("#txt_celular").val()
    var txt_puesto_postula = $("#txt_puesto_postula").val()
    var txt_personas_convive = $("#txt_personas_convive").val()
    var txt_1_2_examen_poligrafo = $("#txt_1_2_examen_poligrafo").val()
    var txt_1_2_vacio_laboral = $("#txt_1_2_vacio_laboral").val()
    var txt_1_2_conducta_laboral = $("#txt_1_2_conducta_laboral").val()
    var txt_1_3_verificacion_antecedentes = $("#txt_1_3_verificacion_antecedentes").val()
    var txt_1_3_situacion_financiera = $("#txt_1_3_situacion_financiera").val()
    var txt_1_3_bebidas_alcoholicas = $("#txt_1_3_bebidas_alcoholicas").val()
    var txt_1_3_drogas_ilegales = $("#txt_1_3_drogas_ilegales").val()
    var txt_1_3_vinculo_personas_margen_ley = $("#txt_1_3_vinculo_personas_margen_ley").val()
    var txt_1_3_tipo_evaluacion_poligrafica = $("#txt_1_3_tipo_evaluacion_poligrafica").val()
    var txt_1_6_repaso_preguntas_realizadas_examen = $("#txt_1_6_repaso_preguntas_realizadas_examen").val()
    var txt_1_7_preguntas_relevantes_examen = $("#txt_1_7_preguntas_relevantes_examen").val()
    var txt_1_8_conclusion = $("#txt_1_8_conclusion").val()
    var txt_examen_realizado_por = $("#txt_examen_realizado_por").val()

    // -- FOTO ADJUNTA
    var file_foto = $('#file_foto').prop("files")[0];
    var ext_foto = ""
    // --
    if (file_foto !== undefined) {
        // --
        ext_foto = getFileExtension(file_foto.name)
        // --
        if (ext_foto == "img" || ext_foto == "png" || ext_foto == "jpg" || ext_foto == "jpeg") {
            // --
            formData.append("dataFile", file_foto, "FotoAdjunta." + ext_foto)
        }
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdPoligrafo": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "Senores": txt_senores,
        "FotoAdjunta": {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "FotoAdjunta." + ext_foto,
            "RutaArchivo": null,
            "ExtensionArchivo": ext_foto,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "Nombre": txt_nombre,
        "Direccion": txt_direccion,
        "Celular": txt_celular,
        "PuestoPostula": txt_puesto_postula,
        "PersonasConvive": txt_personas_convive,
        "TextoExamenPoligrafo": txt_1_2_examen_poligrafo,
        "ListStudyConductedFlt": new Array(),
        "ListWorkExperienceFlt": new Array(),
        "VacioLaboral": txt_1_2_vacio_laboral,
        "ConductaLaboral": txt_1_2_conducta_laboral,
        "VerificacionAntecedentes": txt_1_3_verificacion_antecedentes,
        "SituacionFinanciera": txt_1_3_situacion_financiera,
        "BebidasAlcoholicas": txt_1_3_bebidas_alcoholicas,
        "DrogasIlegales": txt_1_3_drogas_ilegales,
        "VinculoPersonasMargenLey": txt_1_3_vinculo_personas_margen_ley,
        "TipoEvaluacionPoligrafica": txt_1_3_tipo_evaluacion_poligrafica,
        "RepasoPreguntasRealizadasExamen": txt_1_6_repaso_preguntas_realizadas_examen,
        "PreguntasRelevantesExamen": txt_1_7_preguntas_relevantes_examen,
        "Conclusion": txt_1_8_conclusion,
        "ExamenRealizadoPor": txt_examen_realizado_por
    }
    console.log(listEstudiosRealizados)
    console.log('listEstudiosRealizados')
    // --
    listEstudiosRealizados.forEach((element) => {
        objectData.ListStudyConductedFlt.push(element)
    })
    listExperienciaLaboral.forEach((element) => {
        objectData.ListWorkExperienceFlt.push(element)
    })

    
    var camposVacios = ""
    // --
    if (txt_senores == "") {                            // --
        camposVacios += "<span>SEÑORES</span>"
    }
    // --
    if (txt_nombre == "" || txt_direccion == "" || txt_celular == "" || txt_puesto_postula == "") {                 // -- 1.1 DATOS PERSONALES
        camposVacios += "<br><span>1.1 DATOS PERSONALES</span>"
    }
    if (txt_1_2_examen_poligrafo == "" || listEstudiosRealizados.length < 1 || listExperienciaLaboral < 1 ||
        txt_1_2_vacio_laboral == "" || txt_1_2_conducta_laboral == "") {        // -- 1.2 EXAMEN DE POLÍGRAFO DE
        camposVacios += "<br><span>1.2 EXAMEN DE POLÍGRAFO DE</span> "
    }
    if (txt_1_3_verificacion_antecedentes == "" ||
        txt_1_3_situacion_financiera == "" ||
        txt_1_3_bebidas_alcoholicas == "" ||
        txt_1_3_drogas_ilegales == "" ||
        txt_1_3_vinculo_personas_margen_ley == "" ||
        txt_1_3_tipo_evaluacion_poligrafica == "") {                   // -- 1.3 ACTIVIDADES DESHONESTAS EN SU CONDUCTA LABORAL
        camposVacios += "<br><span>1.3 ACTIVIDADES DESHONESTAS EN SU CONDUCTA LABORAL</span>"
    }
    if (txt_1_6_repaso_preguntas_realizadas_examen == "") {            // --  1.6 REPASO DE PREGUNTAS RELEVANTES REALIZADAS EN EL EXAMEN
        camposVacios += "<br><span>1.6 REPASO DE PREGUNTAS RELEVANTES REALIZADAS EN EL EXAMEN</span>"
    }
    if (                                                    // -- 1.7 PREGUNTAS RELEVANTES REALIZADAS EN EL EXAMEN
        txt_1_7_preguntas_relevantes_examen == "") {
        camposVacios += "<br><span>1.7 PREGUNTAS RELEVANTES REALIZADAS EN EL EXAMEN</span>"
    }
    if (                                                    // -- 1.8 CONCLUSIÓN
        txt_1_8_conclusion == "") {
        camposVacios += "<br><span>1.8 CONCLUSIÓN</span>"
    }
    if (                                                    // -- 
        txt_examen_realizado_por == ""
    ) {
        camposVacios += "<br><span>EXAMEN REALIZADO POR</span>"
    }
    
    // --
    formData.append(
        "JsonMaster",
        JSON.stringify(objectData)
    );
    // --
    console.log(objectData)

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
                    url: urlSaveorUpdateFormatPolygraphColombia,
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
                    url: urlSaveorUpdateFormatPolygraphColombia,
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
function getListFormatPolygraphColombia() {
    let idIntegridad = getDatos("key")
    let Item = getDatos("item")
    // --
    let url = urlGetFormatPolygraphColombia + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + Item
    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            let obj = data.Data
            console.log(obj);
            if (obj != null) {
                // -- 
                if (obj.Senores != null) {
                    // --
                    $('#txt_senores').val(obj.Senores)
                    if (obj.FotoAdjunta != null) {
                        //$("#PreviewFoto button").attr("data-typefile", obj.FotoAdjunta.ExtensionArchivo)
                        //$("#PreviewFoto button").attr("data-route", btoa(obj.FotoAdjunta.RutaArchivo))
                        $("#PreviewFoto span").text(obj.FotoAdjunta.NombreArchivo)
                    }
                }

                // -- 1.1 DATOS PERSONALES
                if (obj.Nombre != null) {
                    // --
                    $('#txt_nombre').val(obj.Nombre)
                }
                if (obj.Direccion != null) {
                    // --
                    $('#txt_direccion').val(obj.Direccion)
                }
                if (obj.Celular != null) {
                    // --
                    $('#txt_celular').val(obj.Celular)
                }
                if (obj.PuestoPostula != null) {
                    // --
                    $('#txt_puesto_postula').val(obj.PuestoPostula)
                }
                if (obj.PersonasConvive != null) {
                    // --
                    $('#txt_personas_convive').val(obj.PersonasConvive)
                }

                // -- EXAMEN DE POLIGRAFO
                if (obj.TextoExamenPoligrafo != null) {
                    // --
                    $('#txt_1_2_examen_poligrafo').val(obj.TextoExamenPoligrafo)
                }
                if (obj.ListStudyConductedVm != null) {
                    // --
                    let lista = obj.ListStudyConductedVm
                    listEstudiosRealizados = lista
                    lista.forEach((element) => {
                        //listEstudiosRealizados.push(element)
                        // --
                        let index = table_estudios_realizados.rows().count() + 1
                        // --
                        table_estudios_realizados.row.add([
                            index,
                            element.DesEstudioRealizado,
                            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_2_delete_row"> <i class="fa fa-trash"></i></button >'
                        ]).draw(false);
                        table_estudios_realizados.columns.adjust()
                            .responsive.recalc();
                    })
                }
                console.log(obj.ListWorkExperienceVm)
                if (obj.ListWorkExperienceVm != null) {
                    // --
                    let lista = obj.ListWorkExperienceVm
                    listExperienciaLaboral = lista
                    lista.forEach((element) => {
                        // --
                        let index = table_experiencia_laboral.rows().count() + 1
                        // --
                        table_experiencia_laboral.row.add([
                            index,
                            element.NombreCargo,
                            element.DescripcionCargo,
                            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_3_delete_row"> <i class="fa fa-trash"></i></button >'
                        ]).draw(false);
                        table_experiencia_laboral.columns.adjust()
                            .responsive.recalc();
                    })
                }
                if (obj.VacioLaboral != null) {
                    // --
                    $('#txt_1_2_vacio_laboral').val(obj.VacioLaboral)
                }
                if (obj.ConductaLaboral != null) {
                    // --
                    $('#txt_1_2_conducta_laboral').val(obj.ConductaLaboral)
                }

                // -- ACTIVIDADES DESHONESTAS EN SU CONDUCTA LABORAL
                if (obj.VerificacionAntecedentes != null) {
                    // --
                    $('#txt_1_3_verificacion_antecedentes').val(obj.VerificacionAntecedentes)
                }
                if (obj.SituacionFinanciera != null) {
                    // --
                    $('#txt_1_3_situacion_financiera').val(obj.SituacionFinanciera)
                }
                if (obj.BebidasAlcoholicas != null) {
                    // --
                    $('#txt_1_3_bebidas_alcoholicas').val(obj.BebidasAlcoholicas)
                }
                if (obj.DrogasIlegales != null) {
                    // --
                    $('#txt_1_3_drogas_ilegales').val(obj.DrogasIlegales)
                }
                if (obj.VinculoPersonasMargenLey != null) {
                    // --
                    $('#txt_1_3_vinculo_personas_margen_ley').val(obj.VinculoPersonasMargenLey)
                }
                if (obj.TipoEvaluacionPoligrafica != null) {
                    // --
                    $('#txt_1_3_tipo_evaluacion_poligrafica').val(obj.TipoEvaluacionPoligrafica)
                }

                // -- REPASO DE PREGUNTAS RELEVANTES REALIZADAS EN EL EXAMEN
                if (obj.RepasoPreguntasRealizadasExamen != null) {
                    // --
                    $('#txt_1_6_repaso_preguntas_realizadas_examen').val(obj.RepasoPreguntasRealizadasExamen)
                }

                // -- PREGUNTAS RELEVANTES REALIZADAS EN EL EXAMEN
                if (obj.PreguntasRelevantesExamen != null) {
                    // --
                    $('#txt_1_7_preguntas_relevantes_examen').val(obj.PreguntasRelevantesExamen)
                }

                // -- CONCLUSIÓN
                if (obj.Conclusion != null) {
                    // --
                    $('#txt_1_8_conclusion').val(obj.Conclusion)
                }
                if (obj.ExamenRealizadoPor != null) {
                    // --
                    $('#txt_examen_realizado_por').val(obj.ExamenRealizadoPor)
                }
                

            }

        }
    });

}

getListFormatPolygraphColombia()