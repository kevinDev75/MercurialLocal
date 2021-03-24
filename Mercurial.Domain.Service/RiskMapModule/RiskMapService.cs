using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.RiskMapModule;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.RiskMap.FLT;
using Mercurial.DomainEntities.RiskMap.VM;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static Mercurial.CrossCuting.Utilities.Template.TemplateEnum;

namespace Mercurial.Domain.Service.RiskMapModule
{
    public class RiskMapService: IRiskMapService
    {
        private readonly string _ServicePrefix = "api/";
        private readonly string _UrlService;
        private LoginService _LoginService;

        public RiskMapService()
        {
            _LoginService = new LoginService();
            _UrlService = System.Configuration.ConfigurationManager.AppSettings["ServiceMercurial"].ToString();
        }

        public ApiResponse SaveRiskMap(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                SaveRiskMapFlt saveEntity = JsonConvert.DeserializeObject<SaveRiskMapFlt>(stringJson);
                saveEntity.IdUsuarioEnvio = IdUsuario;
                string folder = Settings.GetKey(Settings.KEY.MapaRiesgos);
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
                    String.Format(UrlService.UrlSaveRiskMap),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public ApiResponse UpdateStatusRiskMap(long IdMapaRiesgo, bool FlgEstado)
        {
            ApiResponse response;

            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusRiskMap, IdMapaRiesgo, FlgEstado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public List<RiskMapVm> GetListRiskMap(string FechaInicio, string FechaFin)
        {
            List<RiskMapVm> request = new List<RiskMapVm>();
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
                    string.Format(UrlService.UrlGetListRiskMap, FechaInicio, FechaFin, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<RiskMapVm>>(
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



    }
}
