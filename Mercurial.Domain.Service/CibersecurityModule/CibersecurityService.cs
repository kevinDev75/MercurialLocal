using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.Cibersecurity;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Cibersecurity.FLT;
using Mercurial.DomainEntities.Cibersecurity.VM;
using Mercurial.DomainEntities.WorkIntegrity.work360plus;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static Mercurial.CrossCuting.Utilities.Template.TemplateEnum;

namespace Mercurial.Domain.Service.Cibersecurity
{
    public class CibersecurityService : ICibersecurityService
    {
        private readonly string _ServicePrefix = "api/";
        private readonly string _UrlService;
        private LoginService _LoginService;

        public CibersecurityService()
        {
            _LoginService = new LoginService();
            _UrlService = System.Configuration.ConfigurationManager.AppSettings["ServiceMercurial"].ToString();
        }

        public ApiResponse SaveHackeoEtico(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                SaveHackeoEticoFlt saveEntity = JsonConvert.DeserializeObject<SaveHackeoEticoFlt>(stringJson);
                saveEntity.IdUsuarioEnvio = IdUsuario;

                string folder = Settings.GetKey(Settings.KEY.HackeoEtico);
                string FolderGenerate = CreateFolder(TypeFolder.generated, folder);
                foreach (var archivos in files)
                {
                    string routeFile = string.Format("{0}\\{1}_{2}", FolderGenerate, DateTime.Now.ToString("HH:mm:ss").Replace(':', '_'), archivos.FileName);
                    if (File.Exists(routeFile)) File.Delete(routeFile);
                    archivos.SaveAs(routeFile);

                    if (saveEntity != null && saveEntity.ArchivoAdjunto1 != null)
                    {
                        saveEntity.ArchivoAdjunto1.RutaArchivo = routeFile;
                        saveEntity.ArchivoAdjunto1.IdUsuarioRegistro = IdUsuario;
                    }

                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveHackeoEtico),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public ApiResponse UpdateStatusHackeoEtico(long IdHackeoEtico, bool Flg_Estado)
        {
            ApiResponse response;

            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusHackeoEtico, IdHackeoEtico, Flg_Estado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public List<HackeoEticoVm> GetListHackeoEtico(string FechaInicio, string FechaFin)
        {
            List<HackeoEticoVm> request = new List<HackeoEticoVm>();
            ApiResponse apiResponse;
            try
            {
                int? IdEmpresa = null;
                int IdRol = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdRol).ToString());
                if(IdRol != 1 && IdRol != 2 && IdRol != 4)
                {
                    IdEmpresa = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString());
                }
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetListHackeoEtico, FechaInicio, FechaFin, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<HackeoEticoVm>>(
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

        public ApiResponse SaveOsint(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                SaveHackeoEticoFlt saveEntity = JsonConvert.DeserializeObject<SaveHackeoEticoFlt>(stringJson);
                saveEntity.IdUsuarioEnvio = IdUsuario;

                string folder = Settings.GetKey(Settings.KEY.OSINT);
                string FolderGenerate = CreateFolder(TypeFolder.generated, folder);
                foreach (var archivos in files)
                {
                    string routeFile = string.Format("{0}\\{1}_{2}", FolderGenerate, DateTime.Now.ToString("HH:mm:ss").Replace(':', '_'), archivos.FileName);
                    if (File.Exists(routeFile)) File.Delete(routeFile);
                    archivos.SaveAs(routeFile);

                    if (saveEntity != null && saveEntity.ArchivoAdjunto1 != null)
                    {
                        saveEntity.ArchivoAdjunto1.RutaArchivo = routeFile;
                        saveEntity.ArchivoAdjunto1.IdUsuarioRegistro = IdUsuario;
                    }

                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SaveOsint),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public ApiResponse UpdateStatusOsint(long IdOSINT, bool Flg_Estado)
        {
            ApiResponse response;

            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusOsint, IdOSINT, Flg_Estado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public List<OsintVm> GetListOsint(string FechaInicio, string FechaFin)
        {
            List<OsintVm> request = new List<OsintVm>();
            ApiResponse apiResponse;
            try
            {
                int? IdEmpresa = null;
                int IdRol = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdRol).ToString());
                if (IdRol != 1 && IdRol != 2 && IdRol != 4)
                {
                    IdEmpresa = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString());
                }
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetListOsint, FechaInicio, FechaFin, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<OsintVm>>(
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

        public ApiResponse SavePentesting(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                SavePentestingFlt saveEntity = JsonConvert.DeserializeObject<SavePentestingFlt>(stringJson);
                saveEntity.IdUsuarioEnvio = IdUsuario;

                string folder = Settings.GetKey(Settings.KEY.Pentesting);
                string FolderGenerate = CreateFolder(TypeFolder.generated, folder);
                foreach (var archivos in files)
                {
                    string routeFile = string.Format("{0}\\{1}_{2}", FolderGenerate, DateTime.Now.ToString("HH:mm:ss").Replace(':', '_'), archivos.FileName);
                    if (File.Exists(routeFile)) File.Delete(routeFile);
                    archivos.SaveAs(routeFile);

                    if (saveEntity != null && saveEntity.ArchivoAdjunto1 != null)
                    {
                        saveEntity.ArchivoAdjunto1.RutaArchivo = routeFile;
                        saveEntity.ArchivoAdjunto1.IdUsuarioRegistro = IdUsuario;
                    }

                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.SavePentesting),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public ApiResponse UpdateStatusPentesting(long IdPentesting, bool Flg_Estado)
        {
            ApiResponse response;

            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusPentesting, IdPentesting, Flg_Estado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public List<PentestingVm> GetListPentesting(string FechaInicio, string FechaFin)
        {
            List<PentestingVm> request = new List<PentestingVm>();
            ApiResponse apiResponse;
            try
            {
                int? IdEmpresa = null;
                int IdRol = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdRol).ToString());
                if (IdRol != 1 && IdRol != 2 && IdRol != 4)
                {
                    IdEmpresa = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString());
                }
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetListPentesting, FechaInicio, FechaFin, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<PentestingVm>>(
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

        private string CreateFolder(TypeFolder typeFolder, string folder)
        {
            folder = Path.Combine(folder, typeFolder.ToString());
            if (typeFolder == TypeFolder.generated)
            {
                //string FolderId = Path.Combine(folder, DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString("00"));
                string FolderId = Path.Combine(folder, DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString("00"), DateTime.Now.Day.ToString("00"));
                return (ExistFolder(FolderId)) ? FolderId : string.Empty;
            }
            else
            {
                return folder;
            }
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
                return string.Empty;
            }
        }


    }
}
