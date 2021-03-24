// -- GLOBAL
const functions = new Functions()

// --
var formData = new FormData();
// --
var fileTestConfiabilidad = null
const byte = 1048576 // -- 1 MB	-> 1048576 B
const maxSize = 20 // -- 20 Megabytes




// --
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


// --
function SaveFormato() {

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
        console.log(img)
        img.onload = function () {
            // --
            ctx.drawImage(img, 0, 0);
            // --
            var imgsrc = canvas.toDataURL("image/png");
            var file = dataURLtoFile(imgsrc, "FotoGrafico.png");
            formData.append("dataFile", file);
        };

    }

    // -- GET VALUES
    let idIntegridad = getDatos("key");
    let itemIntegridad = getDatos("item");

    // --
    let txt_1_nombres = $("#txt_1_nombres").val()
    let txt_1_rg = $("#txt_1_rg").val()
    let txt_1_cpf = $("#txt_1_cpf").val()
    let txt_1_situacion_cpf_rf = $("#txt_1_situacion_cpf_rf").val()
    let sl_1_sexo = $("#sl_1_sexo").val()
    let txt_1_fecha_nacimiento = formatSave($("#txt_1_fecha_nacimiento").val())
    let txt_1_signo = $("#txt_1_signo").val()
    let txt_1_edad = validateNumber($("#txt_1_edad").val())
    let txt_1_nacionalidad = $("#txt_1_nacionalidad").val()
    let txt_1_fraud_checks = $("#txt_1_fraud_checks").val()
    let txt_1_pis = $("#txt_1_pis").val()
    let txt_1_titulo_elector = $("#txt_1_titulo_elector").val()
    let sl_1_estado_civil = $("#sl_1_estado_civil").val()
    let txt_1_household = $("#txt_1_household").val()
    let txt_1_obito = $("#txt_1_obito").val()

    // --
    let txt_1_direccion = $("#txt_1_direccion").val()
    let txt_1_distrito = $("#txt_1_distrito").val()
    let txt_1_ciudad = $("#txt_1_ciudad").val()
    let txt_1_estado = $("#txt_1_estado").val()
    let txt_1_cep = $("#txt_1_cep").val()

    // --
    let txt_1_telefono = $("#txt_1_telefono").val()
    let txt_1_email = $("#txt_1_email").val()

    // --
    let txt_1_colegio = $("#txt_1_colegio").val()
    let txt_1_profesion = $("#txt_1_profesion").val()
    let txt_1_rango_ingresos_presumidos = $("#txt_1_rango_ingresos_presumidos").val()
    let txt_1_puntaje = $("#txt_1_puntaje").val()
    let txt_1_socio_administrador = $("#txt_1_socio_administrador").val()
    let txt_1_cnpj = $("#txt_1_cnpj").val()
    let txt_1_tamano_empresa = $("#txt_1_tamano_empresa").val()

    // --
    let txt_2_datos_registro = $("#txt_2_datos_registro").val()

    // --
    let txt_3_comportamiento_financiero = $("#txt_3_comportamiento_financiero").val()

    // --
    let txt_4_antecedentes_criminales = $("#txt_4_antecedentes_criminales").val()

    // --
    let txt_5_analisis_test_psicologico = $("#txt_5_analisis_test_psicologico").val()

    // --
    let txt_6_conclusion = $("#txt_6_conclusion").val()

    // --
    let txt_1_escala_sinceridad = $("#txt_1_escala_sinceridad").val()
    let txt_1_nivel_riesgo = $("#txt_1_nivel_riesgo").val()
    let txt_1_justicia_trabajo = $("#txt_1_justicia_trabajo").val()
    var radio_1_nivel = $('input:radio[name=radio_1_nivel]:checked').val()
    var radio_1_calificacion = $('input:radio[name=radio_1_calificacion]:checked').val()


    // --
    let txt_2_1_rango_ingresos_presuntos = $("#txt_2_1_rango_ingresos_presuntos").val()
    let txt_2_1_poder_adquisitivo = $("#txt_2_1_poder_adquisitivo").val()
    let txt_2_1_riesgo_credito = $("#txt_2_1_riesgo_credito").val()
    let txt_2_1_busqueda_captura = $("#txt_2_1_busqueda_captura").val()
    let txt_2_1_ejecucion_desalojo = $("#txt_2_1_ejecucion_desalojo").val()
    let txt_2_1_consulta_reembolso = $("#txt_2_1_consulta_reembolso").val()
    let txt_2_1_recibe_ayuda_gobierno = $("#txt_2_1_recibe_ayuda_gobierno").val()
    let txt_2_1_no_llamar = $("#txt_2_1_no_llamar").val()

    // --
    let txt_3_1_proceso = $("#txt_3_1_proceso").val()

    // --
    let file_4_test_confiabilidad = $('#file_4_test_confiabilidad').prop("files")[0];
    var ext_file_4_test_confiabilidad = ""
    // --
    if (file_4_test_confiabilidad !== undefined) {
        // -
        if (validateFileSize(file_4_test_confiabilidad)) {
            // --
            ext_file_4_test_confiabilidad = getFileExtension(file_4_test_confiabilidad.name)
            ext_file_4_test_confiabilidad = ext_file_4_test_confiabilidad.toLocaleLowerCase()
            // --
            if (ext_file_4_test_confiabilidad == "pdf") {
                // --
                formData.append("dataFile", file_4_test_confiabilidad, "TestConfiabilidad." + ext_file_4_test_confiabilidad);
                //formData.append("pdf", file_4_test_confiabilidad);
            }
        }
    }


    let oBasicInformation_BrasilFlt = {
        "idInfoBasica": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "Nombre": txt_1_nombres,
        "RG": txt_1_rg,
        "CPF": txt_1_cpf,
        "Situacion_CPF_RF": txt_1_situacion_cpf_rf,
        "IdSexo": sl_1_sexo,
        "FechaNacimiento": txt_1_fecha_nacimiento,
        "IdSignoZodiaco": txt_1_signo,
        "Edad": txt_1_edad,
        "Nacionalidad": txt_1_nacionalidad,
        "ControlFraude": txt_1_fraud_checks,
        "PIS": txt_1_pis,
        "TituloElector": txt_1_titulo_elector,
        "IdEstadoCivil": sl_1_estado_civil,
        "HouseHold": txt_1_household,
        "Obito": txt_1_obito,
        "Direccion": txt_1_direccion,
        "Distrito": txt_1_distrito,
        "Ciudad": txt_1_ciudad,
        "Estado": txt_1_estado,
        "CEP": txt_1_cep,
        "Telefono": txt_1_telefono,
        "Email": txt_1_email,
        "Colegio": txt_1_colegio,
        "Profesion": txt_1_profesion,
        "RangoIngresosPresumidos": txt_1_rango_ingresos_presumidos,
        "Puntaje": validateNumber(txt_1_puntaje),
        "SocioAdministrador": txt_1_socio_administrador,
        "CPNJ": txt_1_cnpj,
        "TamanoEmpresa": txt_1_tamano_empresa
    }

    // --
    let oRegistrationData_ResumeFlt = {
        "IdDatosRegistro": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "DesDatosRegistro": txt_2_datos_registro
    }

    // Preguntar que debe ir en archivo compFinanciero
    let oFinancialBehaviorFlt = {
        "IdComportamientoFinanciero": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        //"ArchivoCompFinanciero": null,
        "ComportamientoFinanciero": txt_3_comportamiento_financiero
    }

    // --
    let oCriminalRecordFlt = {
        "IdAntecCriminal": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "DescripcionAntecCriminal": txt_4_antecedentes_criminales
    }

    // --
    let oPsychologicalTestAnalysisFlt = {
        "IdAnalisisTestPsicologico": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "DesAnalisisTestPsicologico": txt_5_analisis_test_psicologico
    }

    // --
    let oConclusionFlt = {
        "IdConclusion": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "Conclusion": txt_6_conclusion
    }


    //Preguntar esos datos
    let oEndResultFlt = {
        "IdResultadoFinal": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "Riesgo": radio_1_nivel,
        "Calificacion": radio_1_calificacion,
        "EscalaSinceridad": validateNumber(txt_1_escala_sinceridad),
        "NivelRiesgo": validateNumber(txt_1_nivel_riesgo),
        "Justicia_Trabajo": validateNumber(txt_1_justicia_trabajo)
    }

    let oFinancialBehavior_BrasilFlt = {
        "IdComportamientoFinanciero": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "RangoIngresosPresuntos": txt_2_1_rango_ingresos_presuntos,
        "PoderAdquisitivo": txt_2_1_poder_adquisitivo,
        "RiesgoCredito": txt_2_1_riesgo_credito,
        "BusquedaCaptura": txt_2_1_busqueda_captura,
        "EjecucionDesalojo": txt_2_1_ejecucion_desalojo,
        "ConsultaReembolso": txt_2_1_consulta_reembolso,
        "RecibeAyudaGobierno": txt_2_1_recibe_ayuda_gobierno,
        "NoLlamar": txt_2_1_no_llamar
    }

    let oPhysicalPersonRegistrationFlt = {
        "IdRegistroPersonaFisica": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "Proceso": txt_3_1_proceso
    }


    let oReliabilityTestFlt = {
        "IdTestConfiabilidad": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "ArchivoAdjunto": {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "TestConfiabilidad." + ext_file_4_test_confiabilidad,
            "RutaArchivo": null,
            "ExtensionArchivo": ext_file_4_test_confiabilidad,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
    }


    let objetoJsonMaster = {
        "oBasicInformation_BrasilFlt": oBasicInformation_BrasilFlt,
        "oRegistrationData_ResumeFlt": oRegistrationData_ResumeFlt,
        "oFinancialBehaviorFlt": oFinancialBehaviorFlt,
        "oCriminalRecordFlt": oCriminalRecordFlt,
        "oPsychologicalTestAnalysisFlt": oPsychologicalTestAnalysisFlt,
        "oConclusionFlt": oConclusionFlt,
        "oEndResultFlt": oEndResultFlt,
        "oFinancialBehavior_BrasilFlt": oFinancialBehavior_BrasilFlt,
        "oPhysicalPersonRegistrationFlt": oPhysicalPersonRegistrationFlt,
        "oReliabilityTestFlt": oReliabilityTestFlt
    }

    if (fileTestConfiabilidad != null) {
        if (fileTestConfiabilidad.ArchivoAdjunto != null) {
            objetoJsonMaster.oReliabilityTestFlt.ArchivoAdjunto = fileTestConfiabilidad.ArchivoAdjunto
        }
    }

    // -- VALIDACION
    var camposVacios = ""
    // --
    if (txt_1_nombres == "" ||
        txt_1_rg == "" ||
        txt_1_cpf == "" ||
        txt_1_situacion_cpf_rf == "" ||
        txt_1_fecha_nacimiento == "" ||
        txt_1_signo == "0" ||
        txt_1_edad == "" ||
        txt_1_fecha_nacimiento == "" ||
        txt_1_nacionalidad == "" ||
        txt_1_edad == "" ||
        txt_1_nacionalidad == "0" ||
        txt_1_fraud_checks == "" ||
        txt_1_pis == "" ||
        txt_1_titulo_elector == "" ||
        sl_1_estado_civil == "0" ||
        txt_1_household == "" ||
        txt_1_obito == "") {                            // -- 1.1 DEMOGRÁFICO
        camposVacios += "<br /><span>DEMOGRÁFICO</span>"
    }
    if (txt_1_direccion == "" ||
        txt_1_distrito == "" ||
        txt_1_ciudad == "" ||
        txt_1_estado == "" ||
        txt_1_cep == "") {                            // -- 1.2 GEOGRÁFICO
        camposVacios += "<br /><span>GEOGRÁFICO</span>"
    }
    if (txt_1_telefono == "" ||
        txt_1_email == "") {                            // -- 1.3 CONTATO
        camposVacios += "<br /><span>CONTATO</span>"
    }
    if (txt_1_colegio == "" ||
        txt_1_profesion == "" ||
        txt_1_rango_ingresos_presumidos == "" ||
        txt_1_socio_administrador == "" ||
        txt_1_cnpj == "" ||
        txt_1_tamano_empresa == "") {                            // -- 1.4 QUALIFICAÇÃO
        camposVacios += "<br /><span>QUALIFICAÇÃO</span>"
    }
    if (txt_2_datos_registro == "") {                            // -- 2 DADOS CADASTRAIS – PESSOA FÍSICA
        camposVacios += "<br /><span>DADOS CADASTRAIS – PESSOA FÍSICA</span>"
    }
    if (txt_3_comportamiento_financiero == "") {                            // -- 3 COMPORTAMENTO FINANCEIRO – CADASTRO DE PESSOA FÍSICA
        camposVacios += "<br /><span>COMPORTAMENTO FINANCEIRO – CADASTRO DE PESSOA FÍSICA</span>"
    }
    if (txt_4_antecedentes_criminales == "") {                            // -- 4 ANTECEDENTES CRIMINAIS
        camposVacios += "<br /><span>ANTECEDENTES CRIMINAIS</span>"
    }
    if (txt_5_analisis_test_psicologico == "") {                            // -- 5 ANÁLISE DO TESTE PSICOLÓGICO
        camposVacios += "<br /><span>ANÁLISE DO TESTE PSICOLÓGICO</span>"
    }
    if (txt_6_conclusion == "") {                            // -- 5 CONCLUSÃO
        camposVacios += "<br /><span>CONCLUSÃO</span>"
    }
    if (txt_6_conclusion == "") {                            // -- 5 CONCLUSÃO
        camposVacios += "<br /><span>CONCLUSÃO</span>"
    }
    if (txt_2_1_rango_ingresos_presuntos == "" ||
        txt_2_1_poder_adquisitivo == "" ||
        txt_2_1_riesgo_credito == "" ||
        txt_2_1_busqueda_captura == "" ||
        txt_2_1_ejecucion_desalojo == "" ||
        txt_2_1_consulta_reembolso == "" ||
        txt_2_1_recibe_ayuda_gobierno == "" ||
        txt_2_1_no_llamar == "") {                            // -- I. RELATÓRIO DE ANTECEDENTES DA CRIMINAIS E JUDICIAIS
        camposVacios += "<br /><span>I. RELATÓRIO DE ANTECEDENTES DA CRIMINAIS E JUDICIAIS</span>"
    }
    if (txt_3_1_proceso == "") {                            // -- III. ANTECEDENTES CRIMINAIS - – CADASTRO DE PESSOA FÍSICA
        camposVacios += "<br /><span>III. ANTECEDENTES CRIMINAIS - – CADASTRO DE PESSOA FÍSICA</span>"
    }

    //Agregar data 
    formData.append(
        "JsonMaster",
        JSON.stringify(objetoJsonMaster)
    );

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
                $.ajax({
                    type: "POST",
                    url: urlSaveorUpdateIntegrity270Brasil,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        //  console.log(data.response.status);
                        console.log(data.response.status);

                        //let resultado = data.Data
                        //// --
                        //if (data.response.status != undefined) {
                        //    // --
                        //    functions.notify_message(MESSAGE.es.success_insert, 'success')
                        //    //window.location.reload()
                        //    console.log("saliobien");

                        //} else {
                        //    // --
                        //    functions.notify_message(MESSAGE.es.error_insert, 'danger')
                        //}

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
                                //return fetch()
                                //    .then(window.location.reload())
                                //    .catch(() => {
                                //    })
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

                $.ajax({
                    type: "POST",
                    url: urlSaveorUpdateIntegrity270Brasil,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        //  console.log(data.response.status);
                        console.log(data.response.status);

                        //let resultado = data.Data
                        //// --
                        //if (data.response.status != undefined) {
                        //    // --
                        //    functions.notify_message(MESSAGE.es.success_insert, 'success')
                        //    //window.location.reload()
                        //    console.log("saliobien");

                        //} else {
                        //    // --
                        //    functions.notify_message(MESSAGE.es.error_insert, 'danger')
                        //}

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
                                //return fetch()
                                //    .then(window.location.reload())
                                //    .catch(() => {
                                //    })
                            }
                        }]);
                    }
                });


            }
        }])
    }


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
function validateFileSize(file) {
    // --
    if ((file.size / byte) <= maxSize) {
        return true
    } else {
        return false
    }
}

// --
function calculateGraphic() {
    // --
    let txt_1_escala_sinceridad = $("#txt_1_escala_sinceridad").val()
    let txt_1_nivel_riesgo = $("#txt_1_nivel_riesgo").val()
    let txt_1_justicia_trabajo = $("#txt_1_justicia_trabajo").val()
    // --
    if (
        txt_1_escala_sinceridad <= 100 &&
        txt_1_nivel_riesgo <= 100 &&
        txt_1_justicia_trabajo <= 100 &&
        txt_1_escala_sinceridad > 0 &&
        txt_1_nivel_riesgo > 0 &&
        txt_1_justicia_trabajo > 0
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
                categories: ['Escala Sinceridade', 'Nivel de Risco', 'Justiça no trabalho']
            },

            series: [{
                type: 'column',
                colorByPoint: true,
                data: [parseFloat(txt_1_escala_sinceridad), parseFloat(txt_1_nivel_riesgo), parseFloat(txt_1_justicia_trabajo)],
                showInLegend: false
            }]

        });

    } else {
        // -- alert("Ingrese digitos entre 1 y 50")
    }
    // --
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
function getListStatusCivil(id) {
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
            $('#' + id).html(html);
        }
    })
}
//Obteniendo lista del zodiaco
function getListZodiacSign(id) {
    // --
    $.ajax({
        url: urlGetListZodiacSign,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            html += '<option value=0>[Seleccionar]</option>'
            // --
            let obj = data.Data
            // --
            console.log(obj);
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.IdSignoZodiaco + '"> ' + value.DesSignoZodiaco + '</option>'
                });
            }
            // --
            $('#' + id).html(html);
        }
    })
}


// --Guardar 270 brasil

$(document).on('click', '#btn_guardar', function () {
    SaveFormato()
})


function getList270Brasil() {
    // --
    let idIntegridad = getDatos("key")
    let Item = getDatos("item")
    // --
    let url = urlGetRiskAnalysisFormat270Brasil + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + Item
    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            let obj = data.Data
            // --
            if (obj.oBasicInformation_BrasilVm != null) {
                // --
                $("#txt_1_cep").val(obj.oBasicInformation_BrasilVm.CEP)
                $("#txt_1_cpf").val(obj.oBasicInformation_BrasilVm.CPF)
                $("#txt_1_cnpj").val(obj.oBasicInformation_BrasilVm.CPNJ)
                $("#txt_1_ciudad").val(obj.oBasicInformation_BrasilVm.Ciudad)
                $("#txt_1_colegio").val(obj.oBasicInformation_BrasilVm.Colegio)
                $("#txt_1_fraud_checks").val(obj.oBasicInformation_BrasilVm.ControlFraude)
                $("#txt_1_nacionalidad").val(obj.oBasicInformation_BrasilVm.Nacionalidad)

                // -- $("#id").val(obj.oBasicInformation_BrasilVm.DesEstadoCivil)
                //$("#txt_1_signo").val(obj.oBasicInformation_BrasilVm.DesSignoZodiaco)
                $("#txt_1_direccion").val(obj.oBasicInformation_BrasilVm.Direccion)
                $("#txt_1_distrito").val(obj.oBasicInformation_BrasilVm.Distrito)
                $("#txt_1_edad").val(obj.oBasicInformation_BrasilVm.Edad)
                $("#txt_1_email").val(obj.oBasicInformation_BrasilVm.Email)
                $("#txt_1_estado").val(obj.oBasicInformation_BrasilVm.Estado)
                $("#txt_1_fecha_nacimiento").val(obj.oBasicInformation_BrasilVm.FechaNacimiento)
                $("#txt_1_household").val(obj.oBasicInformation_BrasilVm.HouseHold)
                $("#sl_1_estado_civil").val(obj.oBasicInformation_BrasilVm.IdEstadoCivil)
                // -- $("#id").val(obj.oBasicInformation_BrasilVm.IdIntegridad)
                $("#txt_1_signo").val(obj.oBasicInformation_BrasilVm.IdSignoZodiaco)
                // -- $("#id").val(obj.oBasicInformation_BrasilVm.ItemIntegridadDet)
                $("#txt_1_nombres").val(obj.oBasicInformation_BrasilVm.Nombre)
                $("#txt_1_obito").val(obj.oBasicInformation_BrasilVm.Obito)
                $("#txt_1_pis").val(obj.oBasicInformation_BrasilVm.PIS)
                $("#txt_1_profesion").val(obj.oBasicInformation_BrasilVm.Profesion)
                $("#txt_1_puntaje").val(obj.oBasicInformation_BrasilVm.Puntaje)
                $("#txt_1_rg").val(obj.oBasicInformation_BrasilVm.RG)
                $("#txt_1_rango_ingresos_presumidos").val(obj.oBasicInformation_BrasilVm.RangoIngresosPresumidos)
              //  $("#sl_1_sexo").val(obj.oBasicInformation_BrasilVm.Sexo)
                $("#txt_1_situacion_cpf_rf").val(obj.oBasicInformation_BrasilVm.Situacion_CPF_RF)
                $("#txt_1_socio_administrador").val(obj.oBasicInformation_BrasilVm.SocioAdministrador)
                $("#txt_1_tamano_empresa").val(obj.oBasicInformation_BrasilVm.TamanoEmpresa)
                $("#txt_1_telefono").val(obj.oBasicInformation_BrasilVm.Telefono)
                $("#txt_1_titulo_elector").val(obj.oBasicInformation_BrasilVm.TituloElector)
                // --$("#id").val(obj.oBasicInformation_BrasilVm.idInfoBasica)
            }

            if (obj.oPhysicalPersonRegistrationVm != null) {
                $("#txt_2_datos_registro").val(obj.oPhysicalPersonRegistrationVm.Proceso)
            }

            if (obj.oFinancialBehaviorVm != null) {
                $("#txt_3_comportamiento_financiero").val(obj.oFinancialBehaviorVm.ComportamientoFinanciero)
            }

            if (obj.oCriminalRecordVM != null) {
                $("#txt_4_antecedentes_criminales").val(obj.oCriminalRecordVM.DescripcionAntecCriminal)
            }

            if (obj.oPsychologicalTestAnalysisVm != null) {
                $("#txt_5_analisis_test_psicologico").val(obj.oPsychologicalTestAnalysisVm.DesAnalisisTestPsicologico)
            }

            if (obj.oConclusionVm != null) {
                $("#txt_6_conclusion").val(obj.oConclusionVm.Conclusion)
            }

            if (obj.oFinancialBehavior_BrasilVm != null) {
                $("#txt_2_1_rango_ingresos_presuntos").val(obj.oFinancialBehavior_BrasilVm.RangoIngresosPresuntos)
                $("#txt_2_1_poder_adquisitivo").val(obj.oFinancialBehavior_BrasilVm.PoderAdquisitivo)
                $("#txt_2_1_riesgo_credito").val(obj.oFinancialBehavior_BrasilVm.RiesgoCredito)
                $("#txt_2_1_busqueda_captura").val(obj.oFinancialBehavior_BrasilVm.BusquedaCaptura)
                $("#txt_2_1_ejecucion_desalojo").val(obj.oFinancialBehavior_BrasilVm.EjecucionDesalojo)
                $("#txt_2_1_consulta_reembolso").val(obj.oFinancialBehavior_BrasilVm.ConsultaReembolso)
                $("#txt_2_1_recibe_ayuda_gobierno").val(obj.oFinancialBehavior_BrasilVm.RecibeAyudaGobierno)
                $("#txt_2_1_no_llamar").val(obj.oFinancialBehavior_BrasilVm.NoLlamar)
            }
            if (obj.oPhysicalPersonRegistrationVm != null) {
                $("#txt_3_1_proceso").val(obj.oPhysicalPersonRegistrationVm.Proceso)

            }

            // --
            if (obj.oEndResultVm != null) {
                // --
                $("#txt_1_escala_sinceridad").val(obj.oEndResultVm.EscalaSinceridad)
                $("#txt_1_nivel_riesgo").val(obj.oEndResultVm.NivelRiesgo)
                $("#txt_1_justicia_trabajo").val(obj.oEndResultVm.Justicia_Trabajo)
                // --
                let radio_nivel = obj.oEndResultVm.Riesgo
                $("input:radio[name='radio_1_nivel'][value=" + radio_nivel + "]").prop('checked', true)
                // --
                let radio_calificacion = obj.oEndResultVm.Calificacion
                $("input:radio[name='radio_1_calificacion'][value=" + radio_calificacion + "]").prop('checked', true)
                // --
                calculateGraphic()
            }

            // --
            if (obj.oReliabilityTestVm != null) {
                // --
                if (obj.oReliabilityTestVm.ArchivoAdjunto != null) {
                    // --
                    fileTestConfiabilidad = obj.oReliabilityTestVm
                    // --
                    $("#PreviewTestConfiabilidad span").text(obj.oReliabilityTestVm.ArchivoAdjunto.NombreArchivo)
                }
            }

        }
    })
}



//validarEmail
function terminarValidarEmail() {
    let emailText = $("#txt_1_email").val()


    if (emailText == "") {

        //$('#ul_error_email').show();
        $('#ul_error_email').hide();

        return 1;
    } else {
        if (emailText.indexOf("@") == -1) {
            functions.notify_message(MESSAGE.es.complete_formulary, 'warning')

            $('#ul_error_email').show();

            return 0;
        } else {
            console.log("Deberia pasar")
            $('#ul_error_email').hide();

            return 1;
        }
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

//Generar
$("#btn_generar").on('click', function () {
    GenerateDocument();
});
//Regresar
$("#btn_regresar").on('click', function () {
    let idIntegridad = getDatos("key");

    window.location.href = "/Services/WorkIntegrityDetail?IdIntegridad=" + idIntegridad;


});
function GenerateDocument() {
    // --
    let idIntegridad = getDatos("key");
    var itemIntegridad = getDatos("item");
    let url = urlGenerateDocument + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + itemIntegridad + "&idDocumentFile=18";
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


$('#txt_1_lugar_nacimiento').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd-mm-yy'
})
// -- Load
getListStatusCivil('sl_1_estado_civil')
getListStatusCivil('sl_1_1_estado_civil')
getListZodiacSign('txt_1_signo')

getList270Brasil() 


//Esconder las validaciones
$('#ul_error_email').hide();
