// -- GLOBAL
const functions = new Functions()
// --
var formData = new FormData();
// --
// --
var fileTestConfiabilidad = null
var fileCriminalArchive = null
var fileTestPsychological = null
//Cambio 09/03/2021
var fileDatoRegistro = null
var fileComportamientoFinanciero = null

const byte = 1048576 // -- 1 MB	-> 1048576 B
const maxSize = 20 // -- 20 Megabytes
let objetoLista;
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

// SaveFormato primera vez 
//Para que solo se lista una vez los datos que registro anteriormente verificamos que no este null

function SaveFormatoFirsTime() {

    // --
    formData = null;
    formData = new FormData();

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
    console.log("ver si guarda sexo");
    console.log(sl_1_sexo);
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

    //Añadido por cambios
    let txt_1_razon_social = $("#txt_1_razon_social").val()
    let txt_1_endereco = $("#txt_1_endereco").val()
    let txt_1_cnp = $("#txt_1_cnp").val()


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
    console.log("Dato proceso");
    console.log(txt_3_1_proceso);

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

    // --Pdf Antecedentes Criminales
    let file_4_antecendentes_criminales = $('#file_4_antecendentes_criminales').prop("files")[0];
    var ext_file_4_antecedentes_criminales = ""
    // --
    if (file_4_antecendentes_criminales !== undefined) {
        // -
        if (validateFileSize(file_4_antecendentes_criminales)) {
            // --
            ext_file_4_antecedentes_criminales = getFileExtension(file_4_antecendentes_criminales.name)
            ext_file_4_antecedentes_criminales = ext_file_4_antecedentes_criminales.toLocaleLowerCase()
            // --
            if (ext_file_4_antecedentes_criminales == "pdf") {
                // --
                console.log("Se añadio bien el pdf");
                formData.append("dataFile", file_4_antecendentes_criminales, "AntecedenteCriminal." + ext_file_4_antecedentes_criminales);
                //formData.append("pdf", file_4_test_confiabilidad);
            }
        }
    }
    // --Pdf Psycologi
    let file_4_test_psychologi = $('#file_4_test_psychologi').prop("files")[0];
    var ext_file_4_test_psychologi = ""
    // --
    if (file_4_test_psychologi !== undefined) {
        // -
        if (validateFileSize(file_4_test_psychologi)) {
            // --
            ext_file_4_test_psychologi = getFileExtension(file_4_test_psychologi.name)
            ext_file_4_test_psychologi = ext_file_4_test_psychologi.toLocaleLowerCase()
            // --
            if (ext_file_4_test_psychologi == "pdf") {
                // --
                console.log("Se añadio bien el pdf");
                formData.append("dataFile", file_4_test_psychologi, "TestPsychological." + ext_file_4_test_psychologi);
                //formData.append("pdf", file_4_test_confiabilidad);
            }
        }
    }
    // --Pdf Datos registro
    let file_2_datos_registro = $('#file_2_datos_registro').prop("files")[0];
    var ext_file_2_datos_registro = ""
    // --
    if (file_2_datos_registro !== undefined) {
        // -
        if (validateFileSize(file_2_datos_registro)) {
            // --
            ext_file_2_datos_registro = getFileExtension(file_2_datos_registro.name)
            ext_file_2_datos_registro = ext_file_2_datos_registro.toLocaleLowerCase()
            // --
            if (ext_file_2_datos_registro == "pdf") {
                // --
                console.log("Se añadio bien el pdf");
                formData.append("dataFile", file_2_datos_registro, "DADOSCADASTRAIS." + ext_file_2_datos_registro);
                //formData.append("pdf", file_4_test_confiabilidad);
            }
        }
    }

    // --Pdf Comportamiento Financiero
    let file_3_comportamiento_financiero = $('#file_3_comportamiento_financiero').prop("files")[0];
    var ext_file_3_comportamiento_financiero = ""
    // --
    if (file_3_comportamiento_financiero !== undefined) {
        // -
        if (validateFileSize(file_3_comportamiento_financiero)) {
            // --
            ext_file_3_comportamiento_financiero = getFileExtension(file_3_comportamiento_financiero.name)
            ext_file_3_comportamiento_financiero = ext_file_3_comportamiento_financiero.toLocaleLowerCase()
            // --
            if (ext_file_3_comportamiento_financiero == "pdf") {
                // --
                console.log("Se añadio bien el pdf");
                formData.append("dataFile", file_3_comportamiento_financiero, "COMPORTAMENTOFINANCEIRO." + ext_file_3_comportamiento_financiero);
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
        "IdSignoZodiaco": validateNumber(txt_1_signo),
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
        "Puntaje": txt_1_puntaje,
        "SocioAdministrador": txt_1_socio_administrador,
        "CPNJ": txt_1_cnpj,
        "TamanoEmpresa": txt_1_tamano_empresa,
        "RazonSocial": txt_1_razon_social,
        "Endereco": txt_1_endereco,
        "CNP": txt_1_cnp

    }

    // --
    let oRegistrationData_ResumeFlt = {
        "IdDatosRegistro": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "DesDatosRegistro": txt_2_datos_registro,
        "ArchivoAdjunto": {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "DADOSCADASTRAIS." + ext_file_2_datos_registro,
            "RutaArchivo": null,
            "ExtensionArchivo": ext_file_2_datos_registro,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
    }

    // Preguntar que debe ir en archivo compFinanciero
    let oFinancialBehaviorFlt = {
        "IdComportamientoFinanciero": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        //"ArchivoCompFinanciero": null,
        "ComportamientoFinanciero": txt_3_comportamiento_financiero,
        "ArchivoAdjunto": {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "COMPORTAMENTOFINANCEIRO." + ext_file_3_comportamiento_financiero,
            "RutaArchivo": null,
            "ExtensionArchivo": ext_file_3_comportamiento_financiero,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
    }

   //
    let oCriminalRecordFlt = {
        "IdAntecCriminal": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "DescripcionAntecCriminal": txt_4_antecedentes_criminales,
        "ArchivoAdjunto": {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "AntecedenteCriminal." + ext_file_4_antecedentes_criminales,
            "RutaArchivo": null,
            "ExtensionArchivo": ext_file_4_antecedentes_criminales,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
    }
    // --
    let oPsychologicalTestAnalysisFlt = {
        "IdAnalisisTestPsicologico": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "DesAnalisisTestPsicologico": txt_5_analisis_test_psicologico,
        "ArchivoAdjunto": {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "TestPsychological." + ext_file_4_test_psychologi,
            "RutaArchivo": null,
            "ExtensionArchivo": ext_file_4_test_psychologi,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
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
    //
    let oFinancialBehavior_BrasilFlt = {
        "IdComportamientoFinanciero": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "RangoIngresosPresuntos": "10",
        "PoderAdquisitivo": "10",
        "RiesgoCredito": "10",
        "BusquedaCaptura": "10",
        "EjecucionDesalojo": "10",
        "ConsultaReembolso": "10",
        "RecibeAyudaGobierno": "10",
        "NoLlamar": "10"
    }

    let oPhysicalPersonRegistrationFlt = {
        "IdRegistroPersonaFisica": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "Proceso": "10"
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

    let objetoJsonMaster;
    console.log("viendo objeto");
    console.log(objetoJsonMaster);
    objetoJsonMaster = {
        "oBasicInformation_BrasilFlt": oBasicInformation_BrasilFlt,
        "oRegistrationData_ResumeFlt": oRegistrationData_ResumeFlt,
        "oFinancialBehaviorFlt": oFinancialBehaviorFlt,
        "oCriminalRecordFlt": oCriminalRecordFlt,
        "oPsychologicalTestAnalysisFlt": oPsychologicalTestAnalysisFlt,
        "oConclusionFlt": oConclusionFlt,
        "oEndResultFlt": oEndResultFlt,
        "oFinancialBehavior_BrasilFlt": oFinancialBehavior_BrasilFlt,
        "oPhysicalPersonRegistrationFlt": oPhysicalPersonRegistrationFlt,
        "oReliabilityTestFlt": oReliabilityTestFlt,
    }

    if (fileTestConfiabilidad != null) {
        if (fileTestConfiabilidad.ArchivoAdjunto != null) {
            objetoJsonMaster.oReliabilityTestFlt.ArchivoAdjunto = fileTestConfiabilidad.ArchivoAdjunto
        }
    }
    if (fileCriminalArchive != null) {
        if (fileCriminalArchive.ArchivoAdjunto != null) {
            objetoJsonMaster.oCriminalRecordFlt.ArchivoAdjunto = fileCriminalArchive.ArchivoAdjunto
        }
    }
    if (fileTestPsychological != null) {
        if (fileTestPsychological.ArchivoAdjunto != null) {
            objetoJsonMaster.oPsychologicalTestAnalysisFlt.ArchivoAdjunto = fileTestPsychological.ArchivoAdjunto
        }
    }
    if (fileDatoRegistro != null) {
        if (fileDatoRegistro.ArchivoAdjunto != null) {
            objetoJsonMaster.oRegistrationData_ResumeVm.ArchivoAdjunto = fileDatoRegistro.ArchivoAdjunto
        }
    }
    if (fileComportamientoFinanciero != null) {
        if (fileComportamientoFinanciero.ArchivoCompFinanciero != null) {
            objetoJsonMaster.oFinancialBehaviorVm.ArchivoCompFinanciero = fileComportamientoFinanciero.ArchivoCompFinanciero
        }
    }


    console.log(objetoJsonMaster)
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
    //if (txt_3_comportamiento_financiero == "") {                            // -- 3 COMPORTAMENTO FINANCEIRO – CADASTRO DE PESSOA FÍSICA
    //    camposVacios += "<br /><span>COMPORTAMENTO FINANCEIRO – CADASTRO DE PESSOA FÍSICA</span>"
    //}
    //if (txt_4_antecedentes_criminales == "") {                            // -- 4 ANTECEDENTES CRIMINAIS
    //    camposVacios += "<br /><span>ANTECEDENTES CRIMINAIS</span>"
    //}
    if (txt_5_analisis_test_psicologico == "") {                            // -- 5 ANÁLISE DO TESTE PSICOLÓGI      CO
        camposVacios += "<br /><span>ANÁLISE DO TESTE PSICOLÓGICO</span>"
    }
    //if (txt_6_conclusion == "") {                            // -- 5 CONCLUSÃO
    //    camposVacios += "<br /><span>CONCLUSÃO</span>"
    //}
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
       
                // --
                $.ajax({
                    type: "POST",
                    url: urlSaveorUpdateIntegrity360Brasil,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        //  console.log(data.response.status);
                        //console.log(data.response.status);

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
                        
                    }
                });

            
    } else {

     

                $.ajax({
                    type: "POST",
                    url: urlSaveorUpdateIntegrity360Brasil,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
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
                       
                    }
                });


            
    }


}




function SaveFormato() {

    // --
    formData = null;
    formData = new FormData();

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
    console.log("ver si guarda sexo");
    console.log(sl_1_sexo);
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

    //Añadido por cambios
    let txt_1_razon_social = $("#txt_1_razon_social").val()
    let txt_1_endereco = $("#txt_1_endereco").val()
    let txt_1_cnp = $("#txt_1_cnp").val()

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
    console.log("Dato proceso");
    console.log(txt_3_1_proceso);

    // --Pdf test confiabilidad
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

    // --Pdf Antecedentes Criminales
    let file_4_antecendentes_criminales = $('#file_4_antecendentes_criminales').prop("files")[0];
    var ext_file_4_antecedentes_criminales = ""
    // --
    if (file_4_antecendentes_criminales !== undefined) {
        // -
        if (validateFileSize(file_4_antecendentes_criminales)) {
            // --
            ext_file_4_antecedentes_criminales = getFileExtension(file_4_antecendentes_criminales.name)
            ext_file_4_antecedentes_criminales = ext_file_4_antecedentes_criminales.toLocaleLowerCase()
            // --
            if (ext_file_4_antecedentes_criminales == "pdf") {
                // --
                console.log("Se añadio bien el pdf");
                formData.append("dataFile", file_4_antecendentes_criminales, "AntecedenteCriminal." + ext_file_4_antecedentes_criminales);
                //formData.append("pdf", file_4_test_confiabilidad);
            }
        }
    }
    // --Pdf Psycologi
    let file_4_test_psychologi = $('#file_4_test_psychologi').prop("files")[0];
    var ext_file_4_test_psychologi = ""
    // --
    if (file_4_test_psychologi !== undefined) {
        // -
        if (validateFileSize(file_4_test_psychologi)) {
            // --
            ext_file_4_test_psychologi = getFileExtension(file_4_test_psychologi.name)
            ext_file_4_test_psychologi = ext_file_4_test_psychologi.toLocaleLowerCase()
            // --
            if (ext_file_4_test_psychologi == "pdf") {
                // --
                console.log("Se añadio bien el pdf");
                formData.append("dataFile", file_4_test_psychologi, "TestPsychological." + ext_file_4_test_psychologi);
                //formData.append("pdf", file_4_test_confiabilidad);
            }
        }
    }

    // --Pdf Datos registro
    let file_2_datos_registro = $('#file_2_datos_registro').prop("files")[0];
    var ext_file_2_datos_registro = ""
    // --
    if (file_2_datos_registro !== undefined) {
        // -
        if (validateFileSize(file_2_datos_registro)) {
            // --
            ext_file_2_datos_registro = getFileExtension(file_2_datos_registro.name)
            ext_file_2_datos_registro = ext_file_2_datos_registro.toLocaleLowerCase()
            // --
            if (ext_file_2_datos_registro == "pdf") {
                // --
                console.log("Se añadio bien el pdf");
                formData.append("dataFile", file_2_datos_registro, "DADOSCADASTRAIS." + ext_file_2_datos_registro);
                //formData.append("pdf", file_4_test_confiabilidad);
            }
        }
    }

    // --Pdf Comportamiento Financiero
    let file_3_comportamiento_financiero = $('#file_3_comportamiento_financiero').prop("files")[0];
    var ext_file_3_comportamiento_financiero = ""
    // --
    if (file_3_comportamiento_financiero !== undefined) {
        // -
        if (validateFileSize(file_3_comportamiento_financiero)) {
            // --
            ext_file_3_comportamiento_financiero = getFileExtension(file_3_comportamiento_financiero.name)
            ext_file_3_comportamiento_financiero = ext_file_3_comportamiento_financiero.toLocaleLowerCase()
            // --
            if (ext_file_3_comportamiento_financiero == "pdf") {
                // --
                console.log("Se añadio bien el pdf");
                formData.append("dataFile", file_3_comportamiento_financiero, "COMPORTAMENTOFINANCEIRO." + ext_file_3_comportamiento_financiero);
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
        "IdSignoZodiaco": validateNumber(txt_1_signo),
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
        "Puntaje": txt_1_puntaje,
        "SocioAdministrador": txt_1_socio_administrador,
        "CPNJ": txt_1_cnpj,
        "TamanoEmpresa": txt_1_tamano_empresa,
        "RazonSocial": txt_1_razon_social,
        "Endereco": txt_1_endereco,
        "CNP": txt_1_cnp
    }

    let oRegistrationData_ResumeFlt = {
        "IdDatosRegistro": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "DesDatosRegistro": txt_2_datos_registro,
        "ArchivoAdjunto": {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "DADOSCADASTRAIS." + ext_file_2_datos_registro,
            "RutaArchivo": null,
            "ExtensionArchivo": ext_file_2_datos_registro,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
    }

    // Preguntar que debe ir en archivo compFinanciero
    let oFinancialBehaviorFlt = {
        "IdComportamientoFinanciero": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        //"ArchivoCompFinanciero": null,
        "ComportamientoFinanciero": txt_3_comportamiento_financiero,
        "ArchivoCompFinanciero": {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "COMPORTAMENTOFINANCEIRO." + ext_file_3_comportamiento_financiero,
            "RutaArchivo": null,
            "ExtensionArchivo": ext_file_3_comportamiento_financiero,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
    }

    // --

    let oCriminalRecordFlt = {
        "IdAntecCriminal": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "DescripcionAntecCriminal": txt_4_antecedentes_criminales,
        "ArchivoAdjunto": {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "AntecedenteCriminal." + ext_file_4_antecedentes_criminales,
            "RutaArchivo": null,
            "ExtensionArchivo": ext_file_4_antecedentes_criminales,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
    }

    // --
    let oPsychologicalTestAnalysisFlt = {
        "IdAnalisisTestPsicologico": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "DesAnalisisTestPsicologico": txt_5_analisis_test_psicologico,
        "ArchivoAdjunto": {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "TestPsychological." + ext_file_4_test_psychologi,
            "RutaArchivo": null,
            "ExtensionArchivo": ext_file_4_test_psychologi,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
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
        "RangoIngresosPresuntos": "10",
        "PoderAdquisitivo": "10",
        "RiesgoCredito": "10",
        "BusquedaCaptura": "10",
        "EjecucionDesalojo": "10",
        "ConsultaReembolso": "10",
        "RecibeAyudaGobierno": "10",
        "NoLlamar": "10"
    }

    let oPhysicalPersonRegistrationFlt = {
        "IdRegistroPersonaFisica": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "Proceso": "10"
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

    let objetoJsonMaster;
     objetoJsonMaster = {
        "oBasicInformation_BrasilFlt": oBasicInformation_BrasilFlt,
        "oRegistrationData_ResumeFlt": oRegistrationData_ResumeFlt,
        "oFinancialBehaviorFlt": oFinancialBehaviorFlt,
        "oCriminalRecordFlt": oCriminalRecordFlt,
        "oPsychologicalTestAnalysisFlt": oPsychologicalTestAnalysisFlt,
        "oConclusionFlt": oConclusionFlt,
        "oEndResultFlt": oEndResultFlt,
        "oFinancialBehavior_BrasilFlt": oFinancialBehavior_BrasilFlt,
        "oPhysicalPersonRegistrationFlt": oPhysicalPersonRegistrationFlt,
        "oReliabilityTestFlt": oReliabilityTestFlt,
     }

    //Para que no se quede vacio
    if (fileTestConfiabilidad != null) {
        if (fileTestConfiabilidad.ArchivoAdjunto != null) {
            objetoJsonMaster.oReliabilityTestFlt.ArchivoAdjunto = fileTestConfiabilidad.ArchivoAdjunto
        }
    }

    if (fileCriminalArchive != null) {
        if (fileCriminalArchive.ArchivoAdjunto != null) {
            objetoJsonMaster.oCriminalRecordFlt.ArchivoAdjunto = fileCriminalArchive.ArchivoAdjunto
        }
    }
    if (fileTestPsychological != null) {
        if (fileTestPsychological.ArchivoAdjunto != null) {
            objetoJsonMaster.oPsychologicalTestAnalysisFlt.ArchivoAdjunto = fileTestPsychological.ArchivoAdjunto
        }
    }
    if (fileDatoRegistro != null) {
        if (fileDatoRegistro.ArchivoAdjunto != null) {
            console.log(fileDatoRegistro);
            objetoJsonMaster.oRegistrationData_ResumeVm.ArchivoAdjunto = fileDatoRegistro.ArchivoAdjunto
        }
    }
    if (fileComportamientoFinanciero != null) {
        if (fileComportamientoFinanciero.ArchivoCompFinanciero != null) {
            objetoJsonMaster.oFinancialBehaviorVm.ArchivoCompFinanciero = fileComportamientoFinanciero.ArchivoCompFinanciero
        }
    }
 
    console.log("viendo objeto");

    console.log(objetoJsonMaster)
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
    //if (txt_3_comportamiento_financiero == "") {                            // -- 3 COMPORTAMENTO FINANCEIRO – CADASTRO DE PESSOA FÍSICA
    //    camposVacios += "<br /><span>COMPORTAMENTO FINANCEIRO – CADASTRO DE PESSOA FÍSICA</span>"
    //}
    //if (txt_4_antecedentes_criminales == "") {                            // -- 4 ANTECEDENTES CRIMINAIS
    //    camposVacios += "<br /><span>ANTECEDENTES CRIMINAIS</span>"
    //}
    if (txt_5_analisis_test_psicologico == "") {                            // -- 5 ANÁLISE DO TESTE PSICOLÓGICO
        camposVacios += "<br /><span>ANÁLISE DO TESTE PSICOLÓGICO</span>"
    }
    //if (txt_6_conclusion == "") {                            // -- 5 CONCLUSÃO
    //    camposVacios += "<br /><span>CONCLUSÃO</span>"
    //}
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
                    url: urlSaveorUpdateIntegrity360Brasil,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        //  console.log(data.response.status);
                        //console.log(data.response.status);

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
                    url: urlSaveorUpdateIntegrity360Brasil,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
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
        txt_1_escala_sinceridad > -1 &&
        txt_1_nivel_riesgo > -1 &&
        txt_1_justicia_trabajo > -1
    ) {
        // --
        var chart = Highcharts.chart('container-graphic', {

            title: {
                text: 'Resultado Teste Psicol\u00f3gico'
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
        functions.notify_message('Insira um valor entre 1 e 100', 'danger')

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
        async: false,
        success: function (data) {
            // --
            let html = ''
            html += '<option value=0>[Seleccione]</option>'
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
            // --
            getListZodiacSign('txt_1_signo')
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
        async: false,
        success: function (data) {
            // --
            let html = ''
            html += '<option value=0>[Seleccione]</option>'
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
            // --
            getList360Brasil()
        }
    })
}

// --Guardar 360 brasil
$(document).on('click', '#btn_guardar', function () {
    SaveFormato()
})


// -- GET DATA
// --

function getList360Brasil() {
    // --
    let idIntegridad = getDatos("key")
    let Item = getDatos("item")
    // --
    let url = urlGetRiskAnalysisFormat360Brasil + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + Item;
    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            obj = data.Data
            objetoLista = obj;
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
                //Cambios recientes
                $("#txt_1_cnp").val(obj.oBasicInformation_BrasilVm.CNP)
                $("#txt_1_endereco").val(obj.oBasicInformation_BrasilVm.Endereco)
                $("#txt_1_razon_social").val(obj.oBasicInformation_BrasilVm.RazonSocial)
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
                $("#sl_1_sexo").val(obj.oBasicInformation_BrasilVm.IdSexo)
                $("#txt_1_situacion_cpf_rf").val(obj.oBasicInformation_BrasilVm.Situacion_CPF_RF)
                $("#txt_1_socio_administrador").val(obj.oBasicInformation_BrasilVm.SocioAdministrador)
                $("#txt_1_tamano_empresa").val(obj.oBasicInformation_BrasilVm.TamanoEmpresa)
                $("#txt_1_telefono").val(obj.oBasicInformation_BrasilVm.Telefono)
                $("#txt_1_titulo_elector").val(obj.oBasicInformation_BrasilVm.TituloElector)
                // --$("#id").val(obj.oBasicInformation_BrasilVm.idInfoBasica)
            }

            if (obj.oRegistrationData_ResumeVm != null) {
                $("#txt_2_datos_registro").val(obj.oRegistrationData_ResumeVm.DesDatosRegistro)
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
            if (obj.oCriminalRecordVM != null) {
                // --
                if (obj.oCriminalRecordVM.ArchivoAdjunto != null) {
                    // --
                    fileCriminalArchive = obj.oCriminalRecordVM
                    // --
                    $("#PreviewTestCriminal span").text(obj.oCriminalRecordVM.ArchivoAdjunto.NombreArchivo)
                }
            }
            if (obj.oPsychologicalTestAnalysisVm != null) {
                // --
                if (obj.oPsychologicalTestAnalysisVm.ArchivoAdjunto != null) {
                    // --
                    fileTestPsychological = obj.oPsychologicalTestAnalysisVm
                    // --
                    $("#PreviewTestPsychological span").text(obj.oPsychologicalTestAnalysisVm.ArchivoAdjunto.NombreArchivo)
                }
            }
            if (obj.oRegistrationData_ResumeVm != null) {
                // --
                if (obj.oRegistrationData_ResumeVm.ArchivoAdjunto != null) {
                    // --
                    fileDatoRegistro = obj.oRegistrationData_ResumeVm
                    // --
                    $("#PreviewDatosRegistro span").text(obj.oRegistrationData_ResumeVm.ArchivoAdjunto.NombreArchivo)
                }
            }
            if (obj.oFinancialBehaviorVm != null) {
                // --
                if (obj.oFinancialBehaviorVm.ArchivoCompFinanciero != null) {
                    // --
                    fileComportamientoFinanciero = obj.oFinancialBehaviorVm
                    // --
                    $("#PreviewComportamientoFinanciero span").text(obj.oFinancialBehaviorVm.ArchivoCompFinanciero.NombreArchivo)
                }
            }


            getDatosUser();

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
    let url = urlGenerateDocument + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + itemIntegridad + "&idDocumentFile=19";
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
function validateNumber(value) {
    // --
    if (value === undefined || value === null || value === 'null' || value === '') {
        return 0
    } else {
        return value
    }
}
//buscarcep boton
$("#btn_buscar_cep").on('click', function () {
    
    getApiCep();

});
//Consumir api CEP
//https://viacep.com.br/ws/55332970/json/
function getApiCep() {
    let txt_1_cep = $("#txt_1_cep").val()

    var ruta = "https://viacep.com.br/ws/" + txt_1_cep +"/json/"
    $.ajax({
        url: ruta,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            if (d != null) {
                let data = d

                console.log("trae cep");
                console.log(data.bairro);
                $("#txt_1_distrito").val(data.bairro)
                $("#txt_1_ciudad").val(data.localidade)
                $("#txt_1_direccion").val(data.logradouro)
                $("#txt_1_estado").val("Brasil")

                
                functions.notify_message("Consulta bem sucedida", 'success')

                console.log(d);
            } else {
                console.log("error ");
                    
                functions.notify_message('Erro de consulta, verifique o CEP', 'danger')
            }
            

        },
        error: function () {
            console.log("error ");
            functions.notify_message('Erro de consulta, verifique o CEP', 'danger')

        }
    })
}

function listarDatoNobucle(objdato) {
    obj = objdato
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
        //Cambios recientes
        $("#txt_1_cnp").val(obj.oBasicInformation_BrasilVm.CNP)
        $("#txt_1_endereco").val(obj.oBasicInformation_BrasilVm.Endereco)
        $("#txt_1_razon_social").val(obj.oBasicInformation_BrasilVm.RazonSocial)

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
        $("#sl_1_sexo").val(obj.oBasicInformation_BrasilVm.IdSexo)
        $("#txt_1_situacion_cpf_rf").val(obj.oBasicInformation_BrasilVm.Situacion_CPF_RF)
        $("#txt_1_socio_administrador").val(obj.oBasicInformation_BrasilVm.SocioAdministrador)
        $("#txt_1_tamano_empresa").val(obj.oBasicInformation_BrasilVm.TamanoEmpresa)
        $("#txt_1_telefono").val(obj.oBasicInformation_BrasilVm.Telefono)
        $("#txt_1_titulo_elector").val(obj.oBasicInformation_BrasilVm.TituloElector)
        // --$("#id").val(obj.oBasicInformation_BrasilVm.idInfoBasica)
    }

    if (obj.oRegistrationData_ResumeVm != null) {
        $("#txt_2_datos_registro").val(obj.oRegistrationData_ResumeVm.DesDatosRegistro)
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
    if (obj.oCriminalRecordVM != null) {
        // --
        if (obj.oCriminalRecordVM.ArchivoAdjunto != null) {
            // --
            fileCriminalArchive = obj.oCriminalRecordVM
            // --
            $("#PreviewTestCriminal span").text(obj.oCriminalRecordVM.ArchivoAdjunto.NombreArchivo)
        }
    }
    if (obj.oPsychologicalTestAnalysisVm != null) {
        // --
        if (obj.oPsychologicalTestAnalysisVm.ArchivoAdjunto != null) {
            // --
            fileTestPsychological = obj.oPsychologicalTestAnalysisVm
            // --
            $("#PreviewTestPsychological span").text(obj.oPsychologicalTestAnalysisVm.ArchivoAdjunto.NombreArchivo)
        }
    }
    if (obj.oRegistrationData_ResumeVm != null) {
        // --
        if (obj.oRegistrationData_ResumeVm.ArchivoAdjunto != null) {
            // --
            fileDatoRegistro = obj.oRegistrationData_ResumeVm
            // --
            $("#PreviewDatosRegistro span").text(obj.oRegistrationData_ResumeVm.ArchivoAdjunto.NombreArchivo)
        }
    }
    if (obj.oFinancialBehaviorVm != null) {
        // --
        if (obj.oFinancialBehaviorVm.ArchivoCompFinanciero != null) {
            // --
            fileComportamientoFinanciero = obj.oFinancialBehaviorVm
            // --
            $("#PreviewComportamientoFinanciero span").text(obj.oFinancialBehaviorVm.ArchivoCompFinanciero.NombreArchivo)
        }
    }
}
//Obtener datos de workintegrity y añadirlos
function getDatosUser() {
    var idIntegridad = getDatos("key");

    var urlUsuario = urlWorkIntegrityDetail + "?IdIntegridad=" + idIntegridad; 
    console.log(urlUsuario);



    if (objetoLista.oBasicInformation_BrasilVm != null) {

        console.log("deberia carga la data normal");
        listarDatoNobucle(objetoLista)
    } else {
        console.log("deberia guardar la primera vez");
        $.ajax({
            url: urlUsuario,
            type: 'GET',
            dataType: 'json',
            success: function (d) {

                if (d != null) {
                    let data = d.Data;

                    console.log("trae los datos ");
                    console.log(data);
                    let itemIntegridad = getDatos("item");
                    console.log(itemIntegridad);

                    //$("#txt_1_distrito").val(data.bairro)
                    //$("#txt_1_ciudad").val(data.localidade)
                    //$("#txt_1_direccion").val(data.logradouro)
                    //$("#txt_1_estado").val("Brasil")
                    if (data[itemIntegridad - 1].DesTipoDocIdentidad == "CPF") {
                        $("#txt_1_cpf").val(data[itemIntegridad - 1].NroDocumento)


                    } else {
                    }
                    if (data[itemIntegridad - 1].DesTipoDocIdentidad == "RG") {
                        $("#txt_1_rg").val(data[itemIntegridad - 1].NroDocumento)

                    }
                    if (data[itemIntegridad - 1].DesTipoDocIdentidad == "CNPJ") {
                        $("#txt_1_cnpj").val(data[itemIntegridad - 1].NroDocumento)
                    }
                    $("#txt_1_nombres").val(data[itemIntegridad - 1].NombreCompleto)

                    $("#txt_1_telefono").val(data[itemIntegridad - 1].Celular)
                    $("#txt_1_email").val(data[itemIntegridad - 1].Email)

                } else {
                    console.log("error no trae nada");

                }
                SaveFormatoFirsTime();


            },
            error: function () {
                console.log("error con la consulta getdatoworkintegriy");

            }
        })
        

    }










    
}
//Validar numero dentro del rango
function el(el) {
    return document.getElementById(el);
}

el('txt_1_escala_sinceridad').addEventListener('input', function () {
    var val = this.value;
    this.value = val.replace(/\D|\-/, '');
});

el('txt_1_nivel_riesgo').addEventListener('input', function () {
    var val = this.value;
    this.value = val.replace(/\D|\-/, '');
});

el('txt_1_justicia_trabajo').addEventListener('input', function () {
    var val = this.value;
    this.value = val.replace(/\D|\-/, '');
});

$('#txt_1_fecha_nacimiento').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd-mm-yy',
    closeText: 'Fechar',
    prevText: '<Anterior',
    nextText: 'Próximo>',
    currentText: 'Hoje',
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''

})
// -- Load
getListStatusCivil('sl_1_estado_civil')
//getListZodiacSign('txt_1_signo')
//getDatosUser();
//getList360Brasil()

//Esconder las validaciones
$('#ul_error_email').hide();


/*
closeText: 'Cerrar',
prevText: '<Ant',
nextText: 'Sig>',
currentText: 'Hoy',
monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
weekHeader: 'Sm',
dateFormat: 'dd/mm/yy',
firstDay: 1,
isRTL: false,
showMonthAfterYear: false,
yearSuffix: ''
*/