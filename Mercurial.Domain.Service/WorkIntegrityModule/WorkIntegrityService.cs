using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.WorkIntegrityModule;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.Domain.Service.UserModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Mail;
using Mercurial.DomainEntities.User.RSL;
using Mercurial.DomainEntities.Work;
using Mercurial.DomainEntities.WorkIntegrity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Mercurial.CrossCuting.Utilities.Template.TemplateEnum;

namespace Mercurial.Domain.Service.WorkIntegrityModule
{
    public class WorkIntegrityService: IWorkIntegrityService
    {
        private readonly string _ServicePrefix = "api/";
        private readonly string _UrlService;
        private LoginService _LoginService;
        private UserServices _userServices;

        public WorkIntegrityService()
        {
            _LoginService = new LoginService();
            _userServices = new UserServices();
            _UrlService = System.Configuration.ConfigurationManager.AppSettings["ServiceMercurial"].ToString();

        }
        public ApiResponse GetTextControlls(String NombreVista)
        {
            // --
            ApiResponse apiResponse;
            // --
            try
            {
                // -- 
                int IdIdioma = Int16.Parse(SessionHelper.GetValueSession(Settings.Session.Ididioma).ToString());
                // --
                GetControlsWorkIntegrityRequest getControlsWorkIntegrityRequest = new GetControlsWorkIntegrityRequest();
                getControlsWorkIntegrityRequest.IdIdioma = IdIdioma;
                getControlsWorkIntegrityRequest.NombreVista = NombreVista;
                // --
                LoginService loginService = new LoginService();
                // --
                var _request = JsonConvert.SerializeObject(getControlsWorkIntegrityRequest, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(Enums.Method.POST, _request, _UrlService, _ServicePrefix, UrlService.UrlGetTextControlls, loginService.GetToken());
                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);
            }
            catch (Exception ex)
            {
                apiResponse = new ApiResponse("ERROR", Constant.error_server);
            }
            return apiResponse;
        }

        public ApiResponse GenerateZipSelect(datosFileDow d)
        {
            ApiResponse apiResponse = new ApiResponse("OK", "");
            try
            {


                string folder = Settings.GetKey(Settings.KEY.templateGen);
                folder = Path.Combine(folder, TypeFolder.generated.ToString());
                string FolderId = Path.Combine(folder, d.id.ToString());

                List<string> data = new List<string>();


                foreach (string item in Directory.GetDirectories(FolderId))
                {

                    foreach(itemDetail i in d.idsDetail)
                    {
                        if (i.idItem ==  Convert.ToInt32(item.Split('\\')[item.Split('\\').Length -1]))
                        {
                            data.Add(item);
                        }

                    }
                    
                    
                }



                string outString = FolderId + "\\" + d.id + "_Files.zip";

                if (File.Exists(outString)) File.Delete(outString);

                using (var archive = ZipFile.Open(outString, ZipArchiveMode.Create, Encoding.UTF8))
                {

                    foreach (string item in data)
                    {
                        var iddetail = item.Split('\\')[(item.Split('\\').Count() - 1)];
                        string FolderItem = Path.Combine(FolderId, item.ToString());
                        string route = Path.Combine(FolderItem, $"{d.id}_{iddetail}.pdf");
                        if (System.IO.File.Exists(route)) archive.CreateEntryFromFile(route, Path.GetFileName(route), CompressionLevel.Optimal);
                    }

                }

                byte[] bytes = System.IO.File.ReadAllBytes(outString);
                apiResponse.data = Convert.ToBase64String(bytes);
            }

            catch (Exception ex)
            {
                apiResponse.msg = ex.Message;
                apiResponse.status = "FAIL";
            }
            return apiResponse;
        }

        //public ApiResponse GetTextControlls(String NombreVista)
        //{
        //    // --
        //    ApiResponse apiResponse;
        //    // --
        //    try
        //    {
        //        // -- 
        //        int IdIdioma = Int16.Parse(SessionHelper.GetValueSession(Settings.Session.Ididioma).ToString());
        //        // --
        //        GetControlsWorkIntegrityRequest getControlsWorkIntegrityRequest = new GetControlsWorkIntegrityRequest();
        //        getControlsWorkIntegrityRequest.IdIdioma = IdIdioma;
        //        getControlsWorkIntegrityRequest.NombreVista = NombreVista;
        //        // --
        //        LoginService loginService = new LoginService();
        //        // --
        //        var _request = JsonConvert.SerializeObject(getControlsWorkIntegrityRequest, Formatting.Indented);
        //        var _response = ConsumeService.ConsumirAPIConToken(Enums.Method.POST, _request, _UrlService, _ServicePrefix, UrlService.UrlGetTextControlls, loginService.GetToken());
        //        apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);
        //    }
        //    catch (Exception ex)
        //    {
        //        apiResponse = new ApiResponse("ERROR", Constant.error_server);
        //    }
        //    return apiResponse;
        //}

        public ApiResponse UpdateStatusIntegrity(UpdateStatus data)
        {

            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UpdateStatusIntegrity, data.idIntegrity, data.idStatus, data.porcentaje),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if(apiResponse.status == "OK" && data.statusCheck == "1")
                {
                    try
                    {
                        
                        SendMail mail = new SendMail();

                        List<GetUserRsl> usuarioRol = _userServices.GetUsers(int.Parse(data.idUsuario));

                        MailWorkIntegrity mailWorkIntegrity = new MailWorkIntegrity()
                        {
                            Correo = usuarioRol[0].Email,
                            Empresa = data.DesEmpresa,
                            keyBody = "NameFileSolicitudChange",
                            keySubject = "SubjectSolicitudChange",
                            Telefono = usuarioRol[0].Telefono,
                            Usuario = usuarioRol[0].NombreUsuario,
                            EstadoSol = data.DesStatus,
                            NroSolicitud = data.CodigoIntegridad,
                            SubjectText = new string[2] { data.CodigoIntegridad,data.DesStatus},
                            DesServicio = data.desServicios,
                        };
                        List<Message> MailSend = mail.ComposeMail(new List<MailWorkIntegrity> { mailWorkIntegrity },SendMail.MailCompose.ChangeStatusSoli);
                        var itemSend = MailSend[0];
                        mail.SendMailAll(itemSend.Address, itemSend.Subject, itemSend.Body, null);
                    }
                    catch (Exception ex)
                    {

                    }
                }


                /*if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    apiResponse = JsonConvert.DeserializeObject<ApiResponse>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }*/
            }
            catch (Exception ex)
            {
                apiResponse = null;
            }
            return apiResponse;
        }

        public ApiResponse UpdateUserInWorkIntegrityDetail(long IdIntegridad, int ItemIntegridadDet, int IdUsuarioAsignado)
        {

            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlUpdateUserInWorkIntegrityDetail, IdIntegridad, ItemIntegridadDet, IdUsuarioAsignado),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                apiResponse = null;
            }
            return apiResponse;
        }

    }
}
