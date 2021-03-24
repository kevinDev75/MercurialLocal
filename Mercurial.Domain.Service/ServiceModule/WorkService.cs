
using Mercurial.CrossCuting.Utilities;
using Mercurial.CrossCuting.Utilities.Template;
using Mercurial.Domain.Interfaces.ServiceModule;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Mail;
using Mercurial.DomainEntities.Master;
using Mercurial.DomainEntities.User.RSL;
using Mercurial.DomainEntities.Work;
using Mercurial.DomainEntities.Work.VM;
using Mercurial.DomainEntities.WorkIntegrity;
using Mercurial.DomainEntities.WorkIntegrity.Master;
using Mercurial.DomainEntities.WorkIntegrity.Master.Polygraph;
using Mercurial.DomainEntities.WorkIntegrity.VM.BasicInformation_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.VM.Polygraph;
using Mercurial.DomainEntities.WorkIntegrity.work03Brasil;
using Mercurial.DomainEntities.WorkIntegrity.work180;
using Mercurial.DomainEntities.WorkIntegrity.work180plus;
using Mercurial.DomainEntities.WorkIntegrity.work270;
using Mercurial.DomainEntities.WorkIntegrity.work270plus;
using Mercurial.DomainEntities.WorkIntegrity.work360;
using Mercurial.DomainEntities.WorkIntegrity.work360plus;
using Mercurial.DomainEntities.WorkIntegrity.work90;
using Mercurial.DomainEntities.WorkIntegrity.work90plus;
using Mercurial.DomainEntities.WorkIntegrity.workbasic;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using static Mercurial.CrossCuting.Utilities.Template.TemplateEnum;

namespace Mercurial.Domain.Service.ServiceModule
{
    public class WorkService : IWorkService
    {
        private readonly string _ServicePrefix = "api/";
        private readonly string _UrlService;
        private LoginService _LoginService;

        public WorkService()
        {
            _LoginService = new LoginService();
            _UrlService = System.Configuration.ConfigurationManager.AppSettings["ServiceMercurial"].ToString();
        }

        public List<GetBranchOfficesIntegrity> getListBranchOfficeIntegrity(int IdEmpresa)
        {
            List<GetBranchOfficesIntegrity> ListBranchOffice = new List<GetBranchOfficesIntegrity>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlGetBranchOffices, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListBranchOffice = JsonConvert.DeserializeObject<List<GetBranchOfficesIntegrity>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListBranchOffice = null;
            }
            return ListBranchOffice;
        }

        public List<GetPayMethodWorkIntegrity> getListPayMethodIntegrity(int Pais)
        {
            List<GetPayMethodWorkIntegrity> ListPayMethod = new List<GetPayMethodWorkIntegrity>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlGetPayMenthod, Pais),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListPayMethod = JsonConvert.DeserializeObject<List<GetPayMethodWorkIntegrity>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListPayMethod = null;
            }
            return ListPayMethod;
        }
        public List<StatusRequestIntegrity> GetListStatusIntegrity(int Pais)
        {
            List<StatusRequestIntegrity> ListStatus = new List<StatusRequestIntegrity>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlGetListStatus, Pais),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListStatus = JsonConvert.DeserializeObject<List<StatusRequestIntegrity>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListStatus = null;
            }
            return ListStatus;
        }
        public List<DocumentType> GetListTypeDocument(int Pais)
        {
            List<DocumentType> ListType = new List<DocumentType>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlGetDocumentType, Pais),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListType = JsonConvert.DeserializeObject<List<DocumentType>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListType = null;
            }
            return ListType;
        }

        public List<GetZodiacSignRsl> GetListZodiacSignRsl(int Pais)
        {
            List<GetZodiacSignRsl> ListType = new List<GetZodiacSignRsl>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlGetZodiacSign, Pais),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListType = JsonConvert.DeserializeObject<List<GetZodiacSignRsl>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListType = null;
            }
            return ListType;
        }

        public List<GetServicesWorkIntegrity> getListWorkIntegrity(int Pais)
        {
            List<GetServicesWorkIntegrity> ListWork = new List<GetServicesWorkIntegrity>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlGetWorkIntegrity, Pais),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListWork = JsonConvert.DeserializeObject<List<GetServicesWorkIntegrity>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListWork = null;
            }
            return ListWork;
        }

        public SaveWorkIntegrityResponse SaveWorkIntegrity(SaveWorkIntegrity saveWorkIntegrity, List<HttpPostedFile> files)
        {
            SaveWorkIntegrityResponse response = new SaveWorkIntegrityResponse();
            ApiResponse apiResponse;
            try
            {

                string folder = Settings.GetKey(Settings.KEY.templateGen);

                if (files != null && files.Count > 0)
                {
                    foreach (var row in saveWorkIntegrity.ListHabeasData)
                    {
                        row.RutaArchivo = folder;
                    }

                    foreach (var row in saveWorkIntegrity.ListVoucher)
                    {
                        row.RutaArchivo = folder;
                    }

                    //saveWorkIntegrity.Voucher.RutaArchivo = folder;
                    //saveWorkIntegrity.HabeasData.RutaArchivo = folder;
                }


                var _JsonRequest = JsonConvert.SerializeObject(saveWorkIntegrity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlSaveWorkIntegrity),
                    _LoginService.GetToken());




                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);
                if (apiResponse.status.Equals("OK"))
                {
                    response = JsonConvert.DeserializeObject<SaveWorkIntegrityResponse>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });


                    try
                    {
                        //Send Mail when create a request
                        SendMail mail = new SendMail();
                        MailWorkIntegrity mailWorkIntegrity = new MailWorkIntegrity()
                        {
                            Correo = response.Email,
                            Empresa = response.DescripcionEmpresa,
                            keyBody = "NameFileSolicitud",
                            keySubject = "SubjectSolicitud",
                            Telefono = response.Telefono,
                            Usuario = response.NombreUsuario,
                            EstadoSol = response.DescripcionStatus,
                            NroSolicitud = response.CodigoIntegridad,
                            SubjectText = new string[1] { response.CodigoIntegridad }
                        };
                        List<Message> MailSend = mail.ComposeMail(new List<MailWorkIntegrity> { mailWorkIntegrity });
                        var itemSend = MailSend[0];
                        mail.SendMailAll(itemSend.Address, itemSend.Subject, itemSend.Body, null);
                    }
                    catch (Exception ex)
                    {

                    }
                }

                response.Status = apiResponse.status;
                response.Message = apiResponse.msg;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public List<RequestWorksIntegrity> ConsultRequestIntegrity(ConsultsRequestIntegrity Request)
        {
            List<RequestWorksIntegrity> ListRequest = new List<RequestWorksIntegrity>();
            ApiResponse apiResponse;
            try
            {
                var _JsonRequest = JsonConvert.SerializeObject(Request, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    UrlService.UrlGetListWorkIntegrity,
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListRequest = JsonConvert.DeserializeObject<List<RequestWorksIntegrity>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListRequest = null;
            }
            return ListRequest;
        }
        public List<CollaboratorWorkVM> GetListWorkIntegrityDetail(string IdIntegridad)
        {
            List<CollaboratorWorkVM> ListRequest = new List<CollaboratorWorkVM>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetListWorkIntegrityDetail, IdIntegridad),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListRequest = JsonConvert.DeserializeObject<List<CollaboratorWorkVM>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListRequest = null;
            }
            return ListRequest;
        }

        public GetWorkIntegrityVm GetWorkIntegrity(long IdIntegridad)
        {
            GetWorkIntegrityVm Request = new GetWorkIntegrityVm();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetWorkIntegrity2, IdIntegridad),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    Request = JsonConvert.DeserializeObject<GetWorkIntegrityVm>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                Request = null;
            }
            return Request;
        }

        public List<StatusCivil> GetListStatusCivil(int Pais)
        {
            List<StatusCivil> ListType = new List<StatusCivil>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlGetStatusCivil, Pais),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListType = JsonConvert.DeserializeObject<List<StatusCivil>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListType = null;
            }
            return ListType;
        }


        public List<ResponseExcelCollaborator> ValidateWorkIntegrityExcel(List<CollaboratorWork> Request)
        {
            List<ResponseExcelCollaborator> ListRequest = new List<ResponseExcelCollaborator>();
            ApiResponse apiResponse;
            try
            {
                var _JsonRequest = JsonConvert.SerializeObject(Request, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    UrlService.UrlGetValidateWorkIntegrity,
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListRequest = JsonConvert.DeserializeObject<List<ResponseExcelCollaborator>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListRequest = null;
            }
            return ListRequest;
        }

        private bool ExistFolder(string path)
        {
            try
            {
                if (!Directory.Exists(path)) Directory.CreateDirectory(path);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public string CreateFolder(TypeFolder typeFolder, long IdIntegridad, int ItemIntegridadDet)
        {
            string folder = Settings.GetKey(Settings.KEY.templateGen);
            folder = Path.Combine(folder, typeFolder.ToString());
            if (typeFolder == TypeFolder.generated)
            {

                string FolderId = Path.Combine(folder, IdIntegridad.ToString());
                if (ItemIntegridadDet == 0)
                {
                    return (ExistFolder(FolderId)) ? FolderId : string.Empty;
                }
                else
                {
                    string FolderItem = Path.Combine(FolderId, ItemIntegridadDet.ToString());
                    return (ExistFolder(FolderId) && ExistFolder(FolderItem)) ? FolderItem : string.Empty;
                }

            }
            else
            {
                return folder;
            }
        }

        public ApiResponse SaveRiskAnalysisFormat90Peru(string stringJson, List<HttpPostedFile> files)
        {


            ApiResponse response = new ApiResponse("Ok", string.Empty);
            var templateGen = Settings.KEY.templateGen;
            try
            {

                MasterEntity90Peru saveEntity = JsonConvert.DeserializeObject<MasterEntity90Peru>(stringJson);

                long? idIntegridad = saveEntity.oPersonalDataEvaluatedFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oPersonalDataEvaluatedFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oAssessmentEvaluatorFlt.Firma = SaveFiles(saveEntity.oAssessmentEvaluatorFlt.Firma, files, idIntegridad, itemItengridadDet);

                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina, files, idIntegridad, itemItengridadDet);

                    for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    {
                        if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                        {
                            saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                        }
                    }
                }


                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat90Peru),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient90PeruVM GetRiskAnalysisFormat90Peru(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient90PeruVM request = new MasterClient90PeruVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat90Peru, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient90PeruVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveRiskAnalysisFormatBasicPeru(string stringJson, List<HttpPostedFile> files)
        {


            ApiResponse response = new ApiResponse("Ok", string.Empty);
            var templateGen = Settings.KEY.templateGen;
            try
            {

                MasterEntityBasicPeru saveEntity = JsonConvert.DeserializeObject<MasterEntityBasicPeru>(stringJson);

                long? idIntegridad = saveEntity.oPersonalDataEvaluatedFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oPersonalDataEvaluatedFlt.ItemIntegridadDet;

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormatBasicPeru),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClientBasicPeruVM GetRiskAnalysisFormatBasicPeru(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClientBasicPeruVM request = new MasterClientBasicPeruVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormatBasicPeru, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClientBasicPeruVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveRiskAnalysisFormat90PlusPeru(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            var templateGen = Settings.KEY.templateGen;
            try
            {

                MasterEntity90PlusPeru saveEntity = JsonConvert.DeserializeObject<MasterEntity90PlusPeru>(stringJson);

                long? idIntegridad = saveEntity.oPersonalDataEvaluatedFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oPersonalDataEvaluatedFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oAssessmentEvaluatorFlt.Firma = SaveFiles(saveEntity.oAssessmentEvaluatorFlt.Firma, files, idIntegridad, itemItengridadDet);

                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina, files, idIntegridad, itemItengridadDet);

                    for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    {
                        if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                        {
                            saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                        }
                    }
                }


                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat90PlusPeru),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient90PlusPeruVM GetRiskAnalysisFormat90PlusPeru(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient90PlusPeruVM request = new MasterClient90PlusPeruVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat90PlusPeru, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient90PlusPeruVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveRiskAnalysisFormat180Peru(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            var templateGen = Settings.KEY.templateGen;
            try
            {

                MasterEntity180Peru saveEntity = JsonConvert.DeserializeObject<MasterEntity180Peru>(stringJson);

                long? idIntegridad = saveEntity.oPersonalDataEvaluatedFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oPersonalDataEvaluatedFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    {
                        if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                        {
                            saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                        }
                    }
                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat180Peru),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient180PeruVM GetRiskAnalysisFormat180Peru(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient180PeruVM request = new MasterClient180PeruVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat180Peru, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient180PeruVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveRiskAnalysisFormat180PlusPeru(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;
            var templateGen = Settings.KEY.templateGen;
            try
            {

                MasterEntity180PlusPeru saveEntity = JsonConvert.DeserializeObject<MasterEntity180PlusPeru>(stringJson);

                long? idIntegridad = saveEntity.oPersonalDataEvaluatedFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oPersonalDataEvaluatedFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    {
                        if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                        {
                            saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                        }
                    }
                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat180PlusPeru),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient180PlusPeruVM GetRiskAnalysisFormat180PlusPeru(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient180PlusPeruVM request = new MasterClient180PlusPeruVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat180PlusPeru, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient180PlusPeruVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }
        private string rExtension(object value)
        {
            try
            {
                string val = value.ToString();
                return val.Split('.', (char)2, (char)StringSplitOptions.RemoveEmptyEntries)[0].ToString();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void DeleteFile(string Fold, string NameFile)
        {
            DirectoryInfo folder = new DirectoryInfo(Fold);
            foreach (var file in folder.GetFiles())
            {
                if (rExtension(file.Name) == rExtension(NameFile))
                {
                    if (File.Exists(file.FullName)) File.Delete(file.FullName);
                }
            }
        }

        public ApiResponse SaveWorkIntegrityWork270(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            try
            {
                MasterEntity270 saveEntity = JsonConvert.DeserializeObject<MasterEntity270>(stringJson);


                long? idIntegridad = saveEntity.oPersonalDataEvaluatedFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oPersonalDataEvaluatedFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);




                    for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    {
                        if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                        {
                            saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                        }
                    }
                }
                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat270Peru),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient270VM GetRiskAnalysisFormat270Peru(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient270VM request = new MasterClient270VM();
            ApiResponse apiResponse = new ApiResponse("OK", string.Empty);
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat270Peru, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient270VM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }


        private Archive SaveFiles(Archive archives, List<HttpPostedFile> files, long? idIntegridad, int? idIntegridadDetail)
        {
            if (files != null && files.Count > 0)
            {
                string FolderGenerate = CreateFolder(TypeFolder.generated, (long)idIntegridad, (int)idIntegridadDetail);
                foreach (var archivos in files)
                {
                    string routeFile = string.Format("{0}\\{1}", FolderGenerate, archivos.FileName);

                    if (archives != null)
                    {
                        if (rExtension(archives.NombreArchivo).ToUpper() == rExtension(archivos.FileName).ToUpper())
                        {
                            archives.RutaArchivo = routeFile;
                        }
                    }
                }
            }
            return archives;
        }

        public ApiResponse SaveRiskAnalysisFormat270PlusPeru(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            try
            {

                MasterEntity270PlusPeru saveEntity = JsonConvert.DeserializeObject<MasterEntity270PlusPeru>(stringJson);
                if (files != null && files.Count > 0)
                {
                    var idIntegridad = saveEntity.oPersonalDataEvaluatedFlt.IdIntegridad;
                    var itemItengridadDet = saveEntity.oPersonalDataEvaluatedFlt.ItemIntegridadDet;
                    string FolderGenerate = CreateFolder(TypeFolder.generated, idIntegridad, itemItengridadDet);

                    if (files != null)
                    {
                        DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                        saveEntity.oAssessmentEvaluatorFlt.Firma = SaveFiles(saveEntity.oAssessmentEvaluatorFlt.Firma, files, idIntegridad, itemItengridadDet);

                        saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio, files, idIntegridad, itemItengridadDet);
                        saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial, files, idIntegridad, itemItengridadDet);
                        saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones, files, idIntegridad, itemItengridadDet);
                        saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina, files, idIntegridad, itemItengridadDet);

                        for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                        {
                            if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                            {
                                saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                            }
                        }
                    }
                }


                //ApiResponse responseP = GenerateDocumentFinale(saveEntity.oBasicCandidateInformation.IdIntegridad, saveEntity.oBasicCandidateInformation.ItemIntegridadDet, 0);

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat270PlusPeru),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient270PlusPeruVM GetRiskAnalysisFormat270PlusPeru(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient270PlusPeruVM request = new MasterClient270PlusPeruVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat270PlusPeru, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient270PlusPeruVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveRiskAnalysisFormat360Peru(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            try
            {

                MasterEntity360Peru saveEntity = JsonConvert.DeserializeObject<MasterEntity360Peru>(stringJson);

                long? idIntegridad = saveEntity.oPersonalDataEvaluatedFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oPersonalDataEvaluatedFlt.ItemIntegridadDet;


                string FolderGenerate = CreateFolder(TypeFolder.generated, (int)idIntegridad, (int)itemItengridadDet);

                //if(files != null) { 
                //    foreach (var archivos in files)
                //    {
                //        string routeFile = string.Format("{0}\\{1}", FolderGenerate, archivos.FileName);

                //        DeleteFile(FolderGenerate, archivos.FileName);

                //        archivos.SaveAs(routeFile);
                //    }
                //}
                //saveEntity.oSheetReniecFlt.FotoAdjunta = SaveFiles(saveEntity.oSheetReniecFlt.FotoAdjunta, files, idIntegridad, itemItengridadDet);
                //saveEntity.oEsSaludVerificationFlt.ArchivoEsSalud = SaveFiles(saveEntity.oEsSaludVerificationFlt.ArchivoEsSalud, files, idIntegridad, itemItengridadDet);
                //saveEntity.oSunatVerificationFlt.ArchivoSunat = SaveFiles(saveEntity.oSunatVerificationFlt.ArchivoSunat, files, idIntegridad, itemItengridadDet);
                //saveEntity.oDriverRecordCheckFlt.ArchivoRecordConductor = SaveFiles(saveEntity.oDriverRecordCheckFlt.ArchivoRecordConductor, files, idIntegridad, itemItengridadDet);
                //saveEntity.oDarkFactorFlt.ArchivoAdjunto = SaveFiles(saveEntity.oDarkFactorFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oAssessmentEvaluatorFlt.Firma = SaveFiles(saveEntity.oAssessmentEvaluatorFlt.Firma, files, idIntegridad, itemItengridadDet);

                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina, files, idIntegridad, itemItengridadDet);
                    saveEntity.oAssessmentEvaluatorFlt.Firma = SaveFiles(saveEntity.oAssessmentEvaluatorFlt.Firma, files, idIntegridad, itemItengridadDet);


                    for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    {
                        if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                        {
                            saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                        }
                    }
                }


                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat360Peru),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient360PeruVM GetRiskAnalysisFormat360Peru(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient360PeruVM request = new MasterClient360PeruVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat360Peru, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient360PeruVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveRiskAnalysisFormat360PlusPeru(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            var templateGen = Settings.KEY.templateGen;
            try
            {

                MasterEntity360PlusPeru saveEntity = JsonConvert.DeserializeObject<MasterEntity360PlusPeru>(stringJson);


                long? idIntegridad = saveEntity.oPersonalDataEvaluatedFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oPersonalDataEvaluatedFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oAssessmentEvaluatorFlt.Firma = SaveFiles(saveEntity.oAssessmentEvaluatorFlt.Firma, files, idIntegridad, itemItengridadDet);

                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina, files, idIntegridad, itemItengridadDet);

                    for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    {
                        if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                        {
                            saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                        }
                    }
                }


                //ApiResponse responseP = GenerateDocumentFinale(saveEntity.oBasicCandidateInformation.IdIntegridad, saveEntity.oBasicCandidateInformation.ItemIntegridadDet, 0);

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat360PlusPeru),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient360PlusPeruVM GetRiskAnalysisFormat360PlusPeru(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient360PlusPeruVM request = new MasterClient360PlusPeruVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat360PlusPeru, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient360PlusPeruVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveFormatPolygraphPeru(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            var templateGen = Settings.KEY.templateGen;
            try
            {

                PolygraphCandidate saveEntity = JsonConvert.DeserializeObject<PolygraphCandidate>(stringJson);

                //ApiResponse responseP = GenerateDocumentFinale(saveEntity.oBasicCandidateInformation.IdIntegridad, saveEntity.oBasicCandidateInformation.ItemIntegridadDet, 0);

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveFormatPolygraphPeru),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public PolygraphCandidateVM GetFormatPolygraphPeru(string IdIntegridad, string ItemIntegridadDet)
        {
            PolygraphCandidateVM request = new PolygraphCandidateVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetFormatPolygraphPeru, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<PolygraphCandidateVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        //Colombia
        public ApiResponse SaveRiskAnalysisFormat180Colombia(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            var templateGen = Settings.KEY.templateGen;
            try
            {
                MasterEntity180Colombia saveEntity = JsonConvert.DeserializeObject<MasterEntity180Colombia>(stringJson);

                long? idIntegridad = saveEntity.oBasicDataFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oBasicDataFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecFiscal = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecFiscal, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoSIMIT = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoSIMIT, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoRUNT = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoRUNT, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional, files, idIntegridad, itemItengridadDet);

                    saveEntity.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar = SaveFiles(saveEntity.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar, files, idIntegridad, itemItengridadDet);
                    saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero = SaveFiles(saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero, files, idIntegridad, itemItengridadDet);

                    //for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    //{
                    //    if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                    //    {
                    //        saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                    //    }
                    //}

                    //saveEntity.oDarkFactorFlt.ArchivoAdjunto = SaveFiles(saveEntity.oDarkFactorFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);
                    //saveEntity.oAssessmentEvaluatorFlt.Firma = SaveFiles(saveEntity.oAssessmentEvaluatorFlt.Firma, files, idIntegridad, itemItengridadDet);
                    //saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial, files, idIntegridad, itemItengridadDet);
                    //saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina, files, idIntegridad, itemItengridadDet);
                    //saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio, files, idIntegridad, itemItengridadDet);
                    //saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones, files, idIntegridad, itemItengridadDet);
                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat180Colombia),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient180ColombiaVM GetRiskAnalysisFormat180Colombia(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient180ColombiaVM request = new MasterClient180ColombiaVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat180Colombia, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient180ColombiaVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveRiskAnalysisFormat180PlusColombia(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;
            var templateGen = Settings.KEY.templateGen;
            try
            {

                MasterEntity180PlusColombia saveEntity = JsonConvert.DeserializeObject<MasterEntity180PlusColombia>(stringJson);

                long? idIntegridad = saveEntity.oBasicDataFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oBasicDataFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecFiscal = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecFiscal, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoSIMIT = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoSIMIT, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoRUNT = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoRUNT, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional, files, idIntegridad, itemItengridadDet);

                    saveEntity.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar = SaveFiles(saveEntity.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar, files, idIntegridad, itemItengridadDet);
                    saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero = SaveFiles(saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero, files, idIntegridad, itemItengridadDet);

                    saveEntity.oAssessmentEvaluatorFlt.Firma = SaveFiles(saveEntity.oAssessmentEvaluatorFlt.Firma, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones, files, idIntegridad, itemItengridadDet);

                    saveEntity.oReliabilityTestFlt.ArchivoAdjunto = SaveFiles(saveEntity.oReliabilityTestFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);
                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat180PlusColombia),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient180PlusColombiaVM GetRiskAnalysisFormat180PlusColombia(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient180PlusColombiaVM request = new MasterClient180PlusColombiaVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat180PlusColombia, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient180PlusColombiaVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveWorkIntegrityWork270Colombia(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            try
            {

                MasterEntity270Colombia saveEntity = JsonConvert.DeserializeObject<MasterEntity270Colombia>(stringJson);

                long? idIntegridad = saveEntity.oBasicDataFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oBasicDataFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecFiscal = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecFiscal, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoSIMIT = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoSIMIT, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoRUNT = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoRUNT, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional, files, idIntegridad, itemItengridadDet);

                    saveEntity.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar = SaveFiles(saveEntity.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar, files, idIntegridad, itemItengridadDet);
                    saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero = SaveFiles(saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero, files, idIntegridad, itemItengridadDet);

                    for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    {
                        if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                        {
                            saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                        }
                    }

                    saveEntity.oDarkFactorFlt.ArchivoAdjunto = SaveFiles(saveEntity.oDarkFactorFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);
                    saveEntity.oAssessmentEvaluatorFlt.Firma = SaveFiles(saveEntity.oAssessmentEvaluatorFlt.Firma, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones, files, idIntegridad, itemItengridadDet);
                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat270Colombia),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        private void DeleteOrSaveFiles(ref List<HttpPostedFile> files, long? idIntegridad, int? itemItengridadDet)
        {

            string FolderGenerate = CreateFolder(TypeFolder.generated, (long)idIntegridad, (int)itemItengridadDet);
            if (files != null)
            {
                foreach (var archivos in files)
                {
                    string routeFile = string.Format("{0}\\{1}", FolderGenerate, archivos.FileName);

                    DeleteFile(FolderGenerate, archivos.FileName);

                    archivos.SaveAs(routeFile);
                }
            }
        }

        public MasterClient270ColombiaVM GetRiskAnalysisFormat270Colombia(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient270ColombiaVM request = new MasterClient270ColombiaVM();
            ApiResponse apiResponse = new ApiResponse("OK", string.Empty);
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat270Colombia, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient270ColombiaVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveRiskAnalysisFormat270PlusColombia(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            try
            {

                MasterEntity270PlusColombia saveEntity = JsonConvert.DeserializeObject<MasterEntity270PlusColombia>(stringJson);

                long? idIntegridad = saveEntity.oBasicDataFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oBasicDataFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecFiscal = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecFiscal, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoSIMIT = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoSIMIT, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoRUNT = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoRUNT, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional, files, idIntegridad, itemItengridadDet);

                    saveEntity.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar = SaveFiles(saveEntity.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar, files, idIntegridad, itemItengridadDet);
                    saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero = SaveFiles(saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero, files, idIntegridad, itemItengridadDet);

                    for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    {
                        if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                        {
                            saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                        }
                    }

                    saveEntity.oAssessmentEvaluatorFlt.Firma = SaveFiles(saveEntity.oAssessmentEvaluatorFlt.Firma, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones, files, idIntegridad, itemItengridadDet);

                    saveEntity.oReliabilityTestFlt.ArchivoAdjunto = SaveFiles(saveEntity.oReliabilityTestFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);
                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat270PlusColombia),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient270PlusColombiaVM GetRiskAnalysisFormat270PlusColombia(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient270PlusColombiaVM request = new MasterClient270PlusColombiaVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat270PlusColombia, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient270PlusColombiaVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveRiskAnalysisFormat360Colombia(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            var templateGen = Settings.KEY.templateGen;
            try
            {

                MasterEntity360Colombia saveEntity = JsonConvert.DeserializeObject<MasterEntity360Colombia>(stringJson);

                long? idIntegridad = saveEntity.oBasicDataFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oBasicDataFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecFiscal = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecFiscal, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoSIMIT = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoSIMIT, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoRUNT = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoRUNT, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional, files, idIntegridad, itemItengridadDet);

                    saveEntity.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar = SaveFiles(saveEntity.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar, files, idIntegridad, itemItengridadDet);
                    saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero = SaveFiles(saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero, files, idIntegridad, itemItengridadDet);

                    for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    {
                        if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                        {
                            saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                        }
                    }

                    saveEntity.oDarkFactorFlt.ArchivoAdjunto = SaveFiles(saveEntity.oDarkFactorFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);
                }

                //ApiResponse responseP = GenerateDocumentFinale(saveEntity.oBasicCandidateInformation.IdIntegridad, saveEntity.oBasicCandidateInformation.ItemIntegridadDet, 0);

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat360Colombia),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient360ColombiaVM GetRiskAnalysisFormat360Colombia(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient360ColombiaVM request = new MasterClient360ColombiaVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat360Colombia, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient360ColombiaVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveRiskAnalysisFormat360PlusColombia(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            try
            {

                MasterEntity360PlusColombia saveEntity = JsonConvert.DeserializeObject<MasterEntity360PlusColombia>(stringJson);


                long? idIntegridad = saveEntity.oBasicDataFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oBasicDataFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecFiscal = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecFiscal, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoSIMIT = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoSIMIT, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoRUNT = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoRUNT, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional = SaveFiles(saveEntity.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional, files, idIntegridad, itemItengridadDet);

                    saveEntity.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar = SaveFiles(saveEntity.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar, files, idIntegridad, itemItengridadDet);
                    saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero = SaveFiles(saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero, files, idIntegridad, itemItengridadDet);

                    for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    {
                        if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                        {
                            saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                        }
                    }

                    saveEntity.oDarkFactorFlt.ArchivoAdjunto = SaveFiles(saveEntity.oDarkFactorFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);
                    saveEntity.oAssessmentEvaluatorFlt.Firma = SaveFiles(saveEntity.oAssessmentEvaluatorFlt.Firma, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Cocina, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones = SaveFiles(saveEntity.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones, files, idIntegridad, itemItengridadDet);
                }

                //ApiResponse responseP = GenerateDocumentFinale(saveEntity.oBasicCandidateInformation.IdIntegridad, saveEntity.oBasicCandidateInformation.ItemIntegridadDet, 0);

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat360PlusColombia),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


                //
                //  response.Status = apiResponse.Status;
                // response.Message = apiResponse.Message;
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient360PlusColombiaVM GetRiskAnalysisFormat360PlusColombia(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient360PlusColombiaVM request = new MasterClient360PlusColombiaVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat360PlusColombia, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient360PlusColombiaVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }


        private enum ConditionalValue
        {
            Sem = 0,
            nao = 1,
            libre = 2,
            radio = 3
        }
        private Boolean isNotVacio(string dato)
        {
            Boolean valor = false;
            if (dato != string.Empty && dato.Trim().Length > 0)
            {
                valor = true;
            }
            return valor;
        }
        private string NorS(string dato, string valor1, string valor2)
        {
            if (isNotVacio(dato) && dato == "S")
            {
                return valor1;
            }
            else if (isNotVacio(dato) && dato == "N")
            {
                return valor2;
            }
            else
            {
                return string.Empty;
            }
        }



        private string LogicFormatCSV(string value, ConditionalValue conditional)
        {
            string stringReturn = string.Empty;
            switch (conditional)
            {
                case ConditionalValue.Sem:
                    stringReturn = NorS(value, "REGISTRO", "SEM CONCIDÊNCIAS");
                    break;
                case ConditionalValue.nao:
                    stringReturn = NorS(value, "REGISTRO", "ÑAO CONSTA");
                    break;
                case ConditionalValue.libre:
                    stringReturn = (!isNotVacio(value)) ? "ÑAO CONSTA" : value;
                    break;
                case ConditionalValue.radio:
                    stringReturn = NorS(value, "2", "1");
                    break;

            }

            return stringReturn;
        }

        public ApiResponse GetDataCSVBrasil(HttpPostedFile files)
        {

            ApiResponse response = new ApiResponse("Ok", string.Empty);
            DataTable data = ConvertCSVtoDataTable(files);
            MasterEntity03BrasilVM Entidad = new MasterEntity03BrasilVM();
            Entidad.oBasicDataVm = new DomainEntities.WorkIntegrity.VM.BasicData.BasicDataCandidateVM();
            Entidad.oPersonalDataEvaluatedVm = new DomainEntities.WorkIntegrity.VM.PersonalDataEvaluated.PersonalDataEvaluatedCandidateVM();
            Entidad.oInternationalRestrictiveLists_BrasilVm = new DomainEntities.WorkIntegrity.VM.InternationalRestrictiveLists_Brasil.InternationalRestrictiveLists_BrasilCandidateVM();
            Entidad.oNationalRestrictiveLists_BrasilVm = new DomainEntities.WorkIntegrity.VM.NationalRestrictiveLists_Brasil.NationalRestrictiveLists_BrasilCandidateVM();

            foreach (DataRow row in data.Rows)
            {
                Entidad.oPersonalDataEvaluatedVm.NroDocumento = row[1].ToString();
                Entidad.oPersonalDataEvaluatedVm.NombresApellidos = row[2].ToString();
                Entidad.oPersonalDataEvaluatedVm.LugarNacimiento = row[3].ToString() + (row[4].ToString() != string.Empty ? ' ' + row[4].ToString() : string.Empty);
                Entidad.oPersonalDataEvaluatedVm.FechaNacimiento = row[5].ToString();
                Entidad.oBasicDataVm.RegistroGeneral = row[6].ToString();
                Entidad.oPersonalDataEvaluatedVm.Nacionalidad = row[7].ToString();
                Entidad.oPersonalDataEvaluatedVm.Edad = (row[8].ToString() == string.Empty ? 0 : Int32.Parse(row[8].ToString()));
                Entidad.oPersonalDataEvaluatedVm.DesEstadoCivil = row[9].ToString();

                Entidad.oInternationalRestrictiveLists_BrasilVm.OFAC = LogicFormatCSV(row[10].ToString(), ConditionalValue.Sem);
                Entidad.oInternationalRestrictiveLists_BrasilVm.INTERPOL = LogicFormatCSV(row[11].ToString(), ConditionalValue.Sem);
                Entidad.oInternationalRestrictiveLists_BrasilVm.ONU = LogicFormatCSV(row[12].ToString(), ConditionalValue.Sem);


                Entidad.oNationalRestrictiveLists_BrasilVm.IdPoderJuridicoCivil = (LogicFormatCSV(row[13].ToString(), ConditionalValue.radio) != string.Empty ? Int32.Parse(LogicFormatCSV(row[13].ToString(), ConditionalValue.radio)) : 1);
                Entidad.oNationalRestrictiveLists_BrasilVm.IdPoderJuridicoFederal = (LogicFormatCSV(row[13].ToString(), ConditionalValue.radio) != string.Empty ? Int32.Parse(LogicFormatCSV(row[13].ToString(), ConditionalValue.radio)) : 1);

                Entidad.oNationalRestrictiveLists_BrasilVm.PoderEjecutivo_CVM = LogicFormatCSV(row[14].ToString(), ConditionalValue.nao);
                Entidad.oNationalRestrictiveLists_BrasilVm.InfoAdicional_MEI = LogicFormatCSV(row[15].ToString(), ConditionalValue.libre);
                Entidad.oNationalRestrictiveLists_BrasilVm.InfoAdicional_PEP = LogicFormatCSV(row[16].ToString(), ConditionalValue.nao);
                Entidad.oNationalRestrictiveLists_BrasilVm.InfoAdicional_FuncPublico = LogicFormatCSV(row[17].ToString(), ConditionalValue.libre);



            }
            response.data = Entidad;



            return response;
        }


        private string ValConBrasil(string value)
        {
            string valor = "";
            if (value != "" && value.Trim().Length > 0)
            {
                if (value == "N")
                {
                    valor = "SEM CONCIDÊNCIAS";
                }
            }
            return valor;
        }

        public static DataTable ConvertCSVtoDataTable(HttpPostedFile postedFile)
        {
            DataTable dt = new DataTable();
            //var str = new StreamReader(postedFile.InputStream).ReadToEnd();
            using (StreamReader sr = new StreamReader(postedFile.InputStream))
            {
                string[] headers = sr.ReadLine().Split(';');
                foreach (string header in headers)
                {
                    dt.Columns.Add(header);
                }
                while (!sr.EndOfStream)
                {
                    string[] rows = sr.ReadLine().Split(';');
                    DataRow dr = dt.NewRow();
                    for (int i = 0; i < headers.Length; i++)
                    {
                        dr[i] = rows[i];
                    }
                    dt.Rows.Add(dr);
                }

            }


            return dt;
        }





        public ApiResponse SaveRiskAnalysisFormat03Brasil(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            try
            {
                MasterEntity03Brasil saveEntity = JsonConvert.DeserializeObject<MasterEntity03Brasil>(stringJson);

                long? idIntegridad = saveEntity.oBasicDataFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oBasicDataFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_PoderJudicial_MandadoPrision = SaveFiles(saveEntity.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_PoderJudicial_MandadoPrision, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_PoderJudicial_LavaJato = SaveFiles(saveEntity.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_PoderJudicial_LavaJato, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_PoderEjecutivo_CVM = SaveFiles(saveEntity.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_PoderEjecutivo_CVM, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_InfoAdicional_PEP = SaveFiles(saveEntity.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_InfoAdicional_PEP, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_InfoAdicional_MEI = SaveFiles(saveEntity.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_InfoAdicional_MEI, files, idIntegridad, itemItengridadDet);
                    saveEntity.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_InfoAdicional_FuncPublico = SaveFiles(saveEntity.oNationalRestrictiveLists_BrasilFlt.ArchivoAdjunto_InfoAdicional_FuncPublico, files, idIntegridad, itemItengridadDet);

                    saveEntity.oReliabilityTestFlt.ArchivoAdjunto = SaveFiles(saveEntity.oReliabilityTestFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);

                    for (int i = 0; i < saveEntity.oAnexosFlt.ListAnexosDetFlt.Count; i++)
                    {
                        if (saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo != null)
                        {
                            saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo = SaveFiles(saveEntity.oAnexosFlt.ListAnexosDetFlt[i].ArchivoAdjuntoAnexo, files, idIntegridad, itemItengridadDet);
                        }
                    }
                }


                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat03Brasil),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterEntity03BrasilVM GetRiskAnalysisFormat03Brasil(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterEntity03BrasilVM request = new MasterEntity03BrasilVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat03Brasil, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterEntity03BrasilVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }


        public ApiResponse SaveRiskAnalysisFormat270Brasil(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            try
            {
                MasterEntity270Brasil saveEntity = JsonConvert.DeserializeObject<MasterEntity270Brasil>(stringJson);

                long? idIntegridad = saveEntity.oBasicInformation_BrasilFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oBasicInformation_BrasilFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oReliabilityTestFlt.ArchivoAdjunto = SaveFiles(saveEntity.oReliabilityTestFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);

                }


                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat270Brasil),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient270BrasilVM GetRiskAnalysisFormat270Brasil(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient270BrasilVM request = new MasterClient270BrasilVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat270Brasil, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient270BrasilVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public ApiResponse SaveRiskAnalysisFormat360Brasil(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            try
            {

                MasterEntity360Brasil saveEntity = JsonConvert.DeserializeObject<MasterEntity360Brasil>(stringJson);

                long? idIntegridad = saveEntity.oBasicInformation_BrasilFlt.IdIntegridad;
                int? itemItengridadDet = saveEntity.oBasicInformation_BrasilFlt.ItemIntegridadDet;

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.oReliabilityTestFlt.ArchivoAdjunto = SaveFiles(saveEntity.oReliabilityTestFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);
                    saveEntity.oCriminalRecordFlt.ArchivoAdjunto = SaveFiles(saveEntity.oCriminalRecordFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);
                    saveEntity.oPsychologicalTestAnalysisFlt.ArchivoAdjunto = SaveFiles(saveEntity.oPsychologicalTestAnalysisFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);
                    saveEntity.oRegistrationData_ResumeFlt.ArchivoAdjunto = SaveFiles(saveEntity.oRegistrationData_ResumeFlt.ArchivoAdjunto, files, idIntegridad, itemItengridadDet);
                    saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero = SaveFiles(saveEntity.oFinancialBehaviorFlt.ArchivoCompFinanciero, files, idIntegridad, itemItengridadDet);


                }


                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveRiskAnalysisFormat360Brasil),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);


            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public MasterClient360BrasilVM GetRiskAnalysisFormat360Brasil(string IdIntegridad, string ItemIntegridadDet)
        {
            MasterClient360BrasilVM request = new MasterClient360BrasilVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetRiskAnaysisFormat360Brasil, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<MasterClient360BrasilVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });

                    if (request.oBasicInformation_BrasilVm != null)
                    {
                        request.bI_BraVm = Convert_BasicInformation_BrasilCandidateVM_To_BasicInformation_BrasilCandidateVM(request.oBasicInformation_BrasilVm);
                    }
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public BI_BraVm Convert_BasicInformation_BrasilCandidateVM_To_BasicInformation_BrasilCandidateVM(BasicInformation_BrasilCandidateVM oBasicInformation_BrasilVm)
        {
            BI_BraVm oBI_BraVm = new BI_BraVm();
            oBI_BraVm.idInfoBasica = oBasicInformation_BrasilVm.idInfoBasica;
            oBI_BraVm.IdIntegridad = oBasicInformation_BrasilVm.IdIntegridad;
            oBI_BraVm.ItemIntegridadDet = oBasicInformation_BrasilVm.ItemIntegridadDet;
            oBI_BraVm.Nombre = oBasicInformation_BrasilVm.Nombre;
            oBI_BraVm.RG = oBasicInformation_BrasilVm.RG;
            oBI_BraVm.CPF = oBasicInformation_BrasilVm.CPF;
            oBI_BraVm.Sit_CPF = oBasicInformation_BrasilVm.Situacion_CPF_RF;
            oBI_BraVm.IdSexo = oBasicInformation_BrasilVm.IdSexo;
            oBI_BraVm.DesSe = oBasicInformation_BrasilVm.DesSexo;
            oBI_BraVm.FecNac = oBasicInformation_BrasilVm.FechaNacimiento;
            oBI_BraVm.IdSignoZodiaco = oBasicInformation_BrasilVm.IdSignoZodiaco;
            oBI_BraVm.DesSigZod = oBasicInformation_BrasilVm.DesSignoZodiaco;
            oBI_BraVm.Edad = oBasicInformation_BrasilVm.Edad;
            oBI_BraVm.Nacionali = oBasicInformation_BrasilVm.Nacionalidad;
            oBI_BraVm.ControlFraude = oBasicInformation_BrasilVm.ControlFraude;
            oBI_BraVm.PIS = oBasicInformation_BrasilVm.PIS;
            oBI_BraVm.TituloElector = oBasicInformation_BrasilVm.TituloElector;
            oBI_BraVm.IdEstadoCivil = oBasicInformation_BrasilVm.IdEstadoCivil;
            oBI_BraVm.DesEstadoCivil = oBasicInformation_BrasilVm.DesEstadoCivil;
            oBI_BraVm.HouseHold = oBasicInformation_BrasilVm.HouseHold;
            oBI_BraVm.Obito = oBasicInformation_BrasilVm.Obito;
            oBI_BraVm.Direccion = oBasicInformation_BrasilVm.Direccion;
            oBI_BraVm.Distrito = oBasicInformation_BrasilVm.Distrito;
            oBI_BraVm.Ciudad = oBasicInformation_BrasilVm.Ciudad;
            oBI_BraVm.Estado = oBasicInformation_BrasilVm.Estado;
            oBI_BraVm.CEP = oBasicInformation_BrasilVm.CEP;
            oBI_BraVm.Telefono = oBasicInformation_BrasilVm.Telefono;
            oBI_BraVm.Email = oBasicInformation_BrasilVm.Email;
            oBI_BraVm.Colegio = oBasicInformation_BrasilVm.Colegio;
            oBI_BraVm.Profesion = oBasicInformation_BrasilVm.Profesion;
            oBI_BraVm.RangoIngrPres = oBasicInformation_BrasilVm.RangoIngresosPresumidos;
            oBI_BraVm.Puntaje = oBasicInformation_BrasilVm.Puntaje;
            oBI_BraVm.SocAdmin = oBasicInformation_BrasilVm.SocioAdministrador;
            oBI_BraVm.CPNJ = oBasicInformation_BrasilVm.CPNJ;
            oBI_BraVm.TamanoEmp = oBasicInformation_BrasilVm.TamanoEmpresa;
            oBI_BraVm.RaSoc = oBasicInformation_BrasilVm.RazonSocial;
            oBI_BraVm.Endereco = oBasicInformation_BrasilVm.Endereco;
            oBI_BraVm.CNP = oBasicInformation_BrasilVm.CNP;
            return oBI_BraVm;
        }

        public ApiResponse SaveFormatPolygraphColombia(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);
            try
            {

                PolygraphCandidate saveEntity = JsonConvert.DeserializeObject<PolygraphCandidate>(stringJson);


                long? idIntegridad = saveEntity.IdIntegridad;
                int? itemItengridadDet = Convert.ToInt32(saveEntity.ItemIntegridadDet);

                if (files != null)
                {
                    DeleteOrSaveFiles(ref files, idIntegridad, itemItengridadDet);

                    saveEntity.FotoAdjunta = SaveFiles(saveEntity.FotoAdjunta, files, idIntegridad, itemItengridadDet);

                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveFormatPolygraphColombia),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);
            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public PolygraphCandidateVM GetFormatPolygraphColombia(string IdIntegridad, string ItemIntegridadDet)
        {
            PolygraphCandidateVM request = new PolygraphCandidateVM();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlgetFormatPolygraphColombia, IdIntegridad, ItemIntegridadDet),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.data != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<PolygraphCandidateVM>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }
        public dynamic UppercaseObject(dynamic data)
        {

            dynamic Data = data;
            if (Data.oPersonalDataEvaluatedVm.NombresApellidos != "" && Data.oPersonalDataEvaluatedVm.NombresApellidos != null) { Data.oPersonalDataEvaluatedVm.NombresApellidos= Data.oPersonalDataEvaluatedVm.NombresApellidos.ToUpper(); }
            if (Data.oPersonalDataEvaluatedVm.Direccion != "" && Data.oPersonalDataEvaluatedVm.Direccion != null) { Data.oPersonalDataEvaluatedVm.Direccion= Data.oPersonalDataEvaluatedVm.Direccion.ToUpper(); }
            if (Data.oPersonalDataEvaluatedVm.LugarNacimiento != "" && Data.oPersonalDataEvaluatedVm.LugarNacimiento != null) { Data.oPersonalDataEvaluatedVm.LugarNacimiento= Data.oPersonalDataEvaluatedVm.LugarNacimiento.ToUpper(); }
            if (Data.oPersonalDataEvaluatedVm.Nacionalidad != "" && Data.oPersonalDataEvaluatedVm.Nacionalidad != null) { Data.oPersonalDataEvaluatedVm.Nacionalidad= Data.oPersonalDataEvaluatedVm.Nacionalidad.ToUpper(); }
            if (Data.oPersonalDataEvaluatedVm.DesEstadoCivil != "" && Data.oPersonalDataEvaluatedVm.DesEstadoCivil != null) { Data.oPersonalDataEvaluatedVm.DesEstadoCivil = Data.oPersonalDataEvaluatedVm.DesEstadoCivil.ToUpper(); }
            if (Data.oPersonalDataEvaluatedVm.GradoInstruccion != "" && Data.oPersonalDataEvaluatedVm.GradoInstruccion != null) { Data.oPersonalDataEvaluatedVm.GradoInstruccion.ToUpper(); }
            if (Data.oPersonalDataEvaluatedVm.Estatura != "" && Data.oPersonalDataEvaluatedVm.Estatura != null) { Data.oPersonalDataEvaluatedVm.Estatura = Data.oPersonalDataEvaluatedVm.Estatura.ToUpper(); }
            if (Data.oPersonalDataEvaluatedVm.NombreMadre != "" && Data.oPersonalDataEvaluatedVm.NombreMadre != null) { Data.oPersonalDataEvaluatedVm.NombreMadre = Data.oPersonalDataEvaluatedVm.NombreMadre.ToUpper(); }
            if (Data.oPersonalDataEvaluatedVm.NombrePadre != "" && Data.oPersonalDataEvaluatedVm.NombrePadre != null) { Data.oPersonalDataEvaluatedVm.NombrePadre = Data.oPersonalDataEvaluatedVm.NombrePadre.ToUpper(); }
            return Data;
        }
        public List<Int32> TablesDelete(dynamic Data, string tipoDoc)
        {
            List<Int32> ListTablesDelete = new List<Int32>();
            if (tipoDoc.Equals("90PeruPlus"))
            {
                if (Data.oEndResultVm.EscalaSinceridad == 0 && Data.oEndResultVm.NivelRiesgo == 0) { ListTablesDelete.Add(3); }
                if (Data.oPremiumPersonalHistoryVm.Analisis == "") { ListTablesDelete.Add(4); }
                if (Data.oFamilyEnvironmentVm.RptaCasoSerCandidato == "") { ListTablesDelete.Add(13); }
                if (Data.oAssessmentEvaluatorVm.Conclusion == "") { ListTablesDelete.Add(19); }
                if (Data.oConclusionVm.Conclusion == "") { ListTablesDelete.Add(22); }
            }
            if (tipoDoc.Equals("90Peru"))
            {
                if (Data.oEndResultVm.EscalaSinceridad == 0 && Data.oEndResultVm.NivelRiesgo == 0) { ListTablesDelete.Add(3); }
                if (Data.oPremiumPersonalHistoryVm.Analisis == "") { ListTablesDelete.Add(4); }
                if (Data.oFinancialRecordsAnalysisVm.CompFinancieroSentienel == "") { ListTablesDelete.Add(5); }
                if (Data.oFamilyEnvironmentVm.RptaCasoSerCandidato == "") { ListTablesDelete.Add(10); }
                if (Data.oAssessmentEvaluatorVm.Conclusion == "") { ListTablesDelete.Add(16); }
                if (Data.oConclusionVm.Conclusion == "") { ListTablesDelete.Add(19); }  
            }
            if (tipoDoc.Equals("180Peru"))
            {
                if (Data.oEndResultVm.EscalaSinceridad == 0 && Data.oEndResultVm.NivelRiesgo == 0) { ListTablesDelete.Add(3); }
                if (Data.oPremiumPersonalHistoryVm.Analisis == "") { ListTablesDelete.Add(4); }
                if (Data.oFinancialRecordsAnalysisVm.CompFinancieroSentienel == "") { ListTablesDelete.Add(5); }
                if (Data.oConclusionVm.Conclusion == "") { ListTablesDelete.Add(6); }
                if (Data.oAnalysisReliabilityTestVm.Analisis == "") { ListTablesDelete.Add(7); }
            }
            if (tipoDoc.Equals("180PeruPlus"))
            {
                if (Data.oEndResultVm.EscalaSinceridad == 0 && Data.oEndResultVm.NivelRiesgo == 0) { ListTablesDelete.Add(3); }
                if (Data.oPremiumPersonalHistoryVm.Analisis == "") { ListTablesDelete.Add(4); }
                if (Data.oFinancialRecordsAnalysisVm.CompFinancieroSentienel == "") { ListTablesDelete.Add(5); }
                if (Data.oConclusionVm.Conclusion == "") { ListTablesDelete.Add(6); }
                if (Data.oAnalysisTestDarkFactorVm.Analisis == "") { ListTablesDelete.Add(7); }
            }
            if (tipoDoc.Equals("270Peru"))
            {
                if (Data.oEndResultVm.EscalaSinceridad == 0 && Data.oEndResultVm.NivelRiesgo == 0) { ListTablesDelete.Add(3); }
                if (Data.oPremiumPersonalHistoryVm.Analisis == "") { ListTablesDelete.Add(4); }
                if (Data.oAnalysisReliabilityTestVm.Analisis == "") { ListTablesDelete.Add(8); }
                if (Data.oConclusionVm.Conclusion == "") { ListTablesDelete.Add(9); }
            }
            if (tipoDoc.Equals("270PeruPlus"))
            {
                if (Data.oEndResultVm.EscalaSinceridad == 0 && Data.oEndResultVm.NivelRiesgo == 0) { ListTablesDelete.Add(3); }
                if (Data.oPremiumPersonalHistoryVm.Analisis == "") { ListTablesDelete.Add(4); }
                if (Data.oAnalysisTestDarkFactorVm.Analisis == "") { ListTablesDelete.Add(8); }
                if (Data.oFamilyEnvironmentVm.RptaCasoSerCandidato == "") { ListTablesDelete.Add(13); }
                if (Data.oAssessmentEvaluatorVm.Conclusion == "") { ListTablesDelete.Add(19); }
                if (Data.oConclusionVm.Conclusion == "") { ListTablesDelete.Add(22); }
            }
            if (tipoDoc.Equals("360Peru"))
            {
                if (Data.oEndResultVm.EscalaSinceridad == 0 && Data.oEndResultVm.NivelRiesgo == 0) { ListTablesDelete.Add(3); }
                if (Data.oPremiumPersonalHistoryVm.Analisis == "") { ListTablesDelete.Add(4); }
                if (Data.oAnalysisTestDarkFactorVm.Analisis == "") { ListTablesDelete.Add(8); }
                if (Data.oFamilyEnvironmentVm.RptaCasoSerCandidato == "") { ListTablesDelete.Add(13); }
                if (Data.oAssessmentEvaluatorVm.Conclusion == "") { ListTablesDelete.Add(19); }
                if (Data.oConclusionVm.Conclusion == "") { ListTablesDelete.Add(22); }
            }
            if (tipoDoc.Equals("360PeruPlus"))
            {
                if (Data.oEndResultVm.EscalaSinceridad == 0 && Data.oEndResultVm.NivelRiesgo == 0) { ListTablesDelete.Add(3); }
                if (Data.oPremiumPersonalHistoryVm.Analisis == "") { ListTablesDelete.Add(4); }
                if (Data.oAnalysisTestDarkFactorVm.Analisis == "") { ListTablesDelete.Add(8); }
                if (Data.oFamilyEnvironmentVm.RptaCasoSerCandidato == "") { ListTablesDelete.Add(13); }
                if (Data.oAssessmentEvaluatorVm.Conclusion == "") { ListTablesDelete.Add(19); }
                if (Data.oConclusionVm.Conclusion == "") { ListTablesDelete.Add(22); }
            }
            return ListTablesDelete;
        }

        public ApiResponse GenerateDocumentFinale(int IdIntegridad, int ItemIntegridadDet, int idFileDocument)
        {

            ApiResponse response = new ApiResponse("0", string.Empty);

            MovementType movement = (MovementType)idFileDocument;

            List<Int32> ListTablesDelete = new List<Int32>();


            try
            {
                string folderTemplate = CreateFolder(TypeFolder.templates, IdIntegridad, ItemIntegridadDet);
                string FileTemplate = Path.Combine(folderTemplate, movement.ToString() + ".docx");
                string FolderGenerate = CreateFolder(TypeFolder.generated, IdIntegridad, ItemIntegridadDet);


                dynamic Data = null;

                List<Archive> ListArchive = new List<Archive>();

                if (idFileDocument == (int)MovementType.BrasilTemplate03)
                {
                    Data = this.GetRiskAnalysisFormat03Brasil(IdIntegridad.ToString(), ItemIntegridadDet.ToString());

                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderJudicial_MandadoPrision, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderJudicial_LavaJato, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_PoderEjecutivo_CVM, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_MEI, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_PEP, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveLists_BrasilVm.ArchivoAdjunto_InfoAdicional_FuncPublico, 0, TypeAdjunte.pdf);



                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }

                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }


                    AddImageRoute(ref ListArchive, Data.oReliabilityTestVm.ArchivoAdjunto, 0, TypeAdjunte.pdf);


                }


                if (idFileDocument == (int)MovementType.PeruTemplate90)
                {
                    Data = this.GetRiskAnalysisFormat90Peru(IdIntegridad.ToString(), ItemIntegridadDet.ToString());
                    ListTablesDelete = TablesDelete(Data, "90Peru");
                    
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Cocina);
                    AddImageRoute(ref ListArchive, Data.oAssessmentEvaluatorVm.Firma);


                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }
                    else
                    {
                        ListTablesDelete.Add(3);
                    }
                    if (ListArchive.Where(x => x.typeAdjunte == TypeAdjunte.pdf).Count() == 0)
                    {
                        ListTablesDelete.Add(20);
                    }

                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }

                }
                else if (idFileDocument == (int)MovementType.PeruTemplate90Plus)
                {
                    
                    Data = this.GetRiskAnalysisFormat90PlusPeru(IdIntegridad.ToString(), ItemIntegridadDet.ToString());
                    ListTablesDelete = TablesDelete(Data, "90PeruPlus");
                    
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Cocina);
                    AddImageRoute(ref ListArchive, Data.oAssessmentEvaluatorVm.Firma);


                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }
                    else
                    {
                        ListTablesDelete.Add(3);
                    }
                    if (ListArchive.Where(x => x.typeAdjunte == TypeAdjunte.pdf).Count() == 0)
                    {
                        ListTablesDelete.Add(23);
                    }

                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }

                }

                if (idFileDocument == (int)MovementType.PeruTemplate270)
                {
                    Data = this.GetRiskAnalysisFormat270Peru(IdIntegridad.ToString(), ItemIntegridadDet.ToString());
                    ListTablesDelete = TablesDelete(Data, "270Peru"); 
                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }

                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }

                }
                if (idFileDocument == (int)MovementType.PeruTemplate270Plus)
                {
                    Data = this.GetRiskAnalysisFormat270PlusPeru(IdIntegridad.ToString(), ItemIntegridadDet.ToString());
                    ListTablesDelete = TablesDelete(Data, "270PeruPlus");
                    
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Cocina);
                    AddImageRoute(ref ListArchive, Data.oAssessmentEvaluatorVm.Firma);



                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }
                    else
                    {
                        ListTablesDelete.Add(3);
                    }
                    if (ListArchive.Where(x => x.typeAdjunte == TypeAdjunte.pdf).Count() == 0)
                    {
                        ListTablesDelete.Add(23);
                    }

                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }

                }

                else if (idFileDocument == (int)MovementType.PeruTemplate180)
                {


                    Data = this.GetRiskAnalysisFormat180Peru(IdIntegridad.ToString(), ItemIntegridadDet.ToString());
                    ListTablesDelete = TablesDelete(Data, "180Peru");
                    //if (Data.oPremiumPersonalHistoryVm.valor == string.Empty)
                    //{
                    //    ListTablesDelete.Add(4);

                    //}

                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }
                    else
                    {
                        ListTablesDelete.Add(3);
                    }
                    if (ListArchive.Where(x => x.typeAdjunte == TypeAdjunte.pdf).Count() == 0)
                    {
                        ListTablesDelete.Add(8);
                    }
                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }
                }
                else if (idFileDocument == (int)MovementType.PeruTemplate180Plus)
                {
                    Data = this.GetRiskAnalysisFormat180PlusPeru(IdIntegridad.ToString(), ItemIntegridadDet.ToString());
                    ListTablesDelete = TablesDelete(Data, "180PeruPlus"); 
                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }
                    else
                    {
                        ListTablesDelete.Add(3);
                    }
                    if (ListArchive.Where(x => x.typeAdjunte == TypeAdjunte.pdf).Count() == 0)
                    {
                        ListTablesDelete.Add(8);
                    }

                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }
                }
                else if (idFileDocument == (int)MovementType.PeruTemplate360)
                {

                    Data = this.GetRiskAnalysisFormat360Peru(IdIntegridad.ToString(), ItemIntegridadDet.ToString());
                    ListTablesDelete = TablesDelete(Data, "360Peru");
                    
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Cocina);
                    AddImageRoute(ref ListArchive, Data.oAssessmentEvaluatorVm.Firma);


                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }
                    else
                    {
                        ListTablesDelete.Add(3);
                    }
                    if (ListArchive.Where(x => x.typeAdjunte == TypeAdjunte.pdf).Count() == 0)
                    {
                        ListTablesDelete.Add(23);
                    }

                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }

                }
                else if (idFileDocument == (int)MovementType.PeruTemplate360Plus)
                {

                    Data = this.GetRiskAnalysisFormat360PlusPeru(IdIntegridad.ToString(), ItemIntegridadDet.ToString());
                    ListTablesDelete = TablesDelete(Data, "360PeruPlus");
                    
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Cocina);
                    AddImageRoute(ref ListArchive, Data.oAssessmentEvaluatorVm.Firma);


                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }
                    else
                    {
                        ListTablesDelete.Add(3);
                    }
                    if (ListArchive.Where(x => x.typeAdjunte == TypeAdjunte.pdf).Count() == 0)
                    {
                        ListTablesDelete.Add(23);
                    }

                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }
                }
                else if (idFileDocument == (int)MovementType.ColombiaPoligrafo)
                {
                    Data = this.GetFormatPolygraphColombia(IdIntegridad.ToString(), ItemIntegridadDet.ToString());
                    Data.FotoAdjunta.widthImage = 130;
                    Data.FotoAdjunta.HeightImage = 140;

                    AddImageRoute(ref ListArchive, Data.FotoAdjunta);

                }
                else if (idFileDocument == (int)MovementType.ColombiaTemplate270)
                {

                    Data = this.GetRiskAnalysisFormat270Colombia(IdIntegridad.ToString(), ItemIntegridadDet.ToString());

                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Cocina);
                    AddImageRoute(ref ListArchive, Data.oAssessmentEvaluatorVm.Firma);

                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoAntecFiscal, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoAntecDisciplinario, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoSIMIT, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoRUNT, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoConsulAfiliadosBDUA, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoPersoExpuestaPoliticamente, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoPoliciaNacional, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oDefinitionMilitarySituationVm.ArchivoDefSituacionMilitar, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oFinancialBehaviorVm.ArchivoCompFinanciero, 0, TypeAdjunte.pdf);


                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }


                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }

                    AddImageRoute(ref ListArchive, Data.oDarkFactorVm.ArchivoAdjunto, 0, TypeAdjunte.pdf);

                }
                else if (idFileDocument == (int)MovementType.ColombiaTemplate270Plus)
                {
                    Data = this.GetRiskAnalysisFormat270PlusColombia(IdIntegridad.ToString(), ItemIntegridadDet.ToString());

                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Cocina);
                    AddImageRoute(ref ListArchive, Data.oAssessmentEvaluatorVm.Firma);

                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoAntecFiscal, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoAntecDisciplinario, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoSIMIT, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoRUNT, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoConsulAfiliadosBDUA, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoPersoExpuestaPoliticamente, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoPoliciaNacional, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oDefinitionMilitarySituationVm.ArchivoDefSituacionMilitar, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oFinancialBehaviorVm.ArchivoCompFinanciero, 0, TypeAdjunte.pdf);

                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }

                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }
                    AddImageRoute(ref ListArchive, Data.oReliabilityTestVm.ArchivoAdjunto, 0, TypeAdjunte.pdf);
                }

                else if (idFileDocument == (int)MovementType.ColombiaTemplate180)
                {
                    Data = this.GetRiskAnalysisFormat180Colombia(IdIntegridad.ToString(), ItemIntegridadDet.ToString());

                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoAntecFiscal, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoAntecDisciplinario, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoSIMIT, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoRUNT, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoConsulAfiliadosBDUA, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoPersoExpuestaPoliticamente, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoPoliciaNacional, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oDefinitionMilitarySituationVm.ArchivoDefSituacionMilitar, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oFinancialBehaviorVm.ArchivoCompFinanciero, 0, TypeAdjunte.pdf);

                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }

                    //foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    //{
                    //    AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    //}

                    AddImageRoute(ref ListArchive, Data.oReliabilityTestVm.ArchivoAdjunto, 0, TypeAdjunte.pdf);
                }

                else if (idFileDocument == (int)MovementType.ColombiaTemplate180Plus)
                {
                    Data = this.GetRiskAnalysisFormat180PlusColombia(IdIntegridad.ToString(), ItemIntegridadDet.ToString());


                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Cocina);

                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoAntecFiscal, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoAntecDisciplinario, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoSIMIT, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoRUNT, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoConsulAfiliadosBDUA, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoPersoExpuestaPoliticamente, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoPoliciaNacional, 0, TypeAdjunte.pdf);

                    AddImageRoute(ref ListArchive, Data.oDefinitionMilitarySituationVm.ArchivoDefSituacionMilitar, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oFinancialBehaviorVm.ArchivoCompFinanciero, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oAssessmentEvaluatorVm.Firma);


                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }

                    //foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    //{
                    //    AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    //}
                    AddImageRoute(ref ListArchive, Data.oReliabilityTestVm.ArchivoAdjunto, 0, TypeAdjunte.pdf);

                }

                else if (idFileDocument == (int)MovementType.ColombiaTemplate360)
                {
                    Data = this.GetRiskAnalysisFormat360Colombia(IdIntegridad.ToString(), ItemIntegridadDet.ToString());


                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }


                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }
                    AddImageRoute(ref ListArchive, Data.oDarkFactorVm.ArchivoAdjunto, 0, TypeAdjunte.pdf);
                }

                else if (idFileDocument == (int)MovementType.ColombiaTemplate360Plus)
                {
                    Data = this.GetRiskAnalysisFormat360PlusColombia(IdIntegridad.ToString(), ItemIntegridadDet.ToString());


                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones);
                    AddImageRoute(ref ListArchive, Data.oPhotographicRecordVm.ArchivoAdjunto_Cocina);
                    AddImageRoute(ref ListArchive, Data.oAssessmentEvaluatorVm.Firma);


                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoAntecFiscal, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoAntecDisciplinario, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoSIMIT, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoRUNT, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoConsulAfiliadosBDUA, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoPersoExpuestaPoliticamente, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oNationalRestrictiveListsVm.ArchivoPoliciaNacional, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oDefinitionMilitarySituationVm.ArchivoDefSituacionMilitar, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oFinancialBehaviorVm.ArchivoCompFinanciero, 0, TypeAdjunte.pdf);


                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }


                    foreach (var item in Data.oAnexosVm.ListAnexosDetailVm)
                    {
                        AddImageRoute(ref ListArchive, item.ArchivoAdjuntoAnexo, 0, TypeAdjunte.pdf);
                    }

                    AddImageRoute(ref ListArchive, Data.oDarkFactorVm.ArchivoAdjunto, 0, TypeAdjunte.pdf);

                }

                else if (idFileDocument == (int)MovementType.ColombiaTemplate270)
                {

                    Data = this.GetRiskAnalysisFormat270Colombia(IdIntegridad.ToString(), ItemIntegridadDet.ToString());

                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 250;
                        Archive.HeightImage = 170;
                        AddImageRoute(ref ListArchive, Archive);
                    }

                    if (Data.oDarkFactorVm != null)
                    {
                        AddImageRoute(ref ListArchive, Data.oDarkFactorVm.ArchivoAdjunto, 0, TypeAdjunte.pdf);
                    }

                }
                else if (idFileDocument == (int)MovementType.BrasilTemplate270)
                {
                    Data = this.GetRiskAnalysisFormat270Brasil(IdIntegridad.ToString(), ItemIntegridadDet.ToString());

                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 190;
                        Archive.HeightImage = 130;
                        AddImageRoute(ref ListArchive, Archive);
                    }

                    AddImageRoute(ref ListArchive, Data.oReliabilityTestVm.ArchivoAdjunto, 0, TypeAdjunte.pdf);

                }
                else if (idFileDocument == (int)MovementType.BrasilTemplate360)
                {
                    Data = this.GetRiskAnalysisFormat360Brasil(IdIntegridad.ToString(), ItemIntegridadDet.ToString());
                    //Cambiando de sexo

                    //if (Data.oBasicInformation_BrasilVm.Sexo.Equals("M"))
                    //{
                    //    Data.oBasicInformation_BrasilVm.Sexo = "Masculino";
                    //}
                    //if (Data.oBasicInformation_BrasilVm.Sexo.Equals("F"))
                    //{
                    //    Data.oBasicInformation_BrasilVm.Sexo = "Feminino";
                    //}
                    string RouterGrafico = FolderGenerate + "\\FotoGrafico.png";
                    if (File.Exists(RouterGrafico))
                    {
                        Archive Archive = new Archive() { RutaArchivo = RouterGrafico, NombreArchivo = "FotoGrafico.png" };
                        Archive.widthImage = 190;
                        Archive.HeightImage = 130;
                        AddImageRoute(ref ListArchive, Archive);
                    }

                    AddImageRoute(ref ListArchive, Data.oReliabilityTestVm.ArchivoAdjunto, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oCriminalRecordVM.ArchivoAdjunto, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oPsychologicalTestAnalysisVm.ArchivoAdjunto, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oRegistrationData_ResumeVm.ArchivoAdjunto, 0, TypeAdjunte.pdf);
                    AddImageRoute(ref ListArchive, Data.oFinancialBehaviorVm.ArchivoCompFinanciero, 0, TypeAdjunte.pdf);
                }


                
                if (Data != null)
                {

                    Data = UppercaseObject(Data);

                    TemplateParameters parameters = new TemplateParameters()
                    {
                        generic = (Object)Data,
                        idIntegridad = IdIntegridad,
                        idIntegridadDet = ItemIntegridadDet,
                        movementType = movement,
                        pathFile = FileTemplate,
                        pathOut = FolderGenerate
                    };
                    parameters.ImagesRoute = ListArchive;

                    response = new WorkTemplate().CreateDocumentWord(parameters, ListTablesDelete);
                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception ex)
            {
                response.status = "1";
                response.msg = ex.Message;
            }
            return response;
        }

        private void AddImageRoute(ref List<Archive> list, Archive archive, int order = 0, TypeAdjunte tadjunte = TypeAdjunte.image)
        {
            if (archive != null)
            {
                if (tadjunte == TypeAdjunte.pdf)
                {
                    archive.order = (order == 0 ? list.Where(y => y.typeAdjunte == TypeAdjunte.pdf).Count() + 1 : order);
                }

                archive.NameTypeFile = rExtension(archive.NombreArchivo);
                archive.typeAdjunte = tadjunte;
                list.Add(archive);
            }
        }


    }
}