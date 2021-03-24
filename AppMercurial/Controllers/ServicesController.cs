using AppMercurial.Tags;
using ExcelDataReader;
using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.HomeModule;
using Mercurial.Domain.Interfaces.ServiceModule;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.Domain.Service.ServiceModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Home;
using Mercurial.DomainEntities.Work;
using Mercurial.DomainEntities.WorkIntegrity.Master.Polygraph;
using Mercurial.DomainEntities.WorkIntegrity.work180;
using Mercurial.DomainEntities.WorkIntegrity.work180plus;
using Mercurial.DomainEntities.WorkIntegrity.work270;
using Mercurial.DomainEntities.WorkIntegrity.work270plus;
using Mercurial.DomainEntities.WorkIntegrity.work360;
using Mercurial.DomainEntities.WorkIntegrity.work360plus;
using Mercurial.DomainEntities.WorkIntegrity.work90;
using Mercurial.DomainEntities.WorkIntegrity.work90plus;
using Mercurial.DomainEntities.WorkIntegrity.workbasic;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static Mercurial.CrossCuting.Utilities.Template.TemplateEnum;

namespace AppMercurial.Controllers
{
    public class ServicesController : Controller
    {
        public readonly IWorkService _IworkService;
        public readonly ILoginService _ILoginService;

        public ServicesController()
        {
            _IworkService = new WorkService();
            _ILoginService = new LoginService();
        }


        [HttpGet]
        public JsonResult GetDocumentType(int IdPais)
        {
            if (IdPais == 0)
            {
                IdPais = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdPais).ToString());
            }
            var Data = _IworkService.GetListTypeDocument(IdPais);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult getStatusCivil(int IdPais)
        {
            //int IdPais = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdPais).ToString());
            var Data = _IworkService.GetListStatusCivil(IdPais);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetStatusIntegrity()
        {
            int IdPais = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdPais).ToString());
            var Data = _IworkService.GetListStatusIntegrity(IdPais);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetWorkIntegrity()
        {
            int IdPais = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdPais).ToString());
            var Data = _IworkService.getListWorkIntegrity(IdPais);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetPayMethod()
        {
            int IdPais = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdPais).ToString());
            var Data = _IworkService.getListPayMethodIntegrity(IdPais);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetBranchOffices()
        {
            int IdEmpresa = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString());
            var Data = _IworkService.getListBranchOfficeIntegrity(IdEmpresa);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        private string getExtesion(string path)
        {
            return System.IO.Path.GetExtension(path);
        }
        [HttpPost]
        public JsonResult SaveWorkIntegrity()
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

            SaveWorkIntegrity saveWorkIntegrity = JsonConvert.DeserializeObject<SaveWorkIntegrity>(DataString);

            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }


            string IdEmpresa = SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString();
            int IdPais = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdPais).ToString());
            saveWorkIntegrity.IdEmpresa = IdEmpresa;
            saveWorkIntegrity.IdUsuario = SessionHelper.GetUser().ToString();
            saveWorkIntegrity.IdPais = IdPais;





            var Data = _IworkService.SaveWorkIntegrity(saveWorkIntegrity, adjuntoList);



            if(adjuntoList != null && adjuntoList.Count > 0)
            {
                string FolderGenerate = _IworkService.CreateFolder(TypeFolder.generated, (long)Data.IdIntegridad, 0);
                foreach(HttpPostedFile file in adjuntoList)
                {
                    string routeFile = string.Format("{0}\\{1}", FolderGenerate, $"{rExtension(file.FileName)}_{Data.IdIntegridad}{getExtesion(file.FileName)}");
                    //adjuntoList[0].SaveAs(routeFile);
                    file.SaveAs(routeFile);
                }
            }
            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ConsultRequestIntegrity(ConsultsRequestIntegrity ConsultRequest)
        {
            string IdEmpresa = SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString();
            string IdUser = SessionHelper.GetUser().ToString();
            ConsultRequest.IdEmpresa = IdEmpresa;
            ConsultRequest.IdUser = IdUser;
            CultureInfo myCI = new CultureInfo("es-PE", false);

            ConsultRequest.FechaInicio = Convert.ToDateTime(ConsultRequest.FechaInicio,myCI).ToString("yyyy-MM-dd");
            ConsultRequest.FechaFin = Convert.ToDateTime(ConsultRequest.FechaFin, myCI).ToString("yyyy-MM-dd");


            var Data = _IworkService.ConsultRequestIntegrity(ConsultRequest);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrityBasicPeru(MasterEntityBasicPeru request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormatBasicPeru(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormatBasicPeru(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormatBasicPeru(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity90Peru(MasterEntity90Peru request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat90Peru(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat90Peru(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat90Peru(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity90PlusPeru(MasterEntity90PlusPeru request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat90PlusPeru(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat90PlusPeru(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat90PlusPeru(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity180Peru(MasterEntity180Peru request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat180Peru(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat180Peru(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat180Peru(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity180PlusPeru(MasterEntity180PlusPeru request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat180PlusPeru(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat180PlusPeru(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat180PlusPeru(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity270(MasterEntity270 request)
        {
            
            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveWorkIntegrityWork270(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat270Peru(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat270Peru(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity270PlusPeru(MasterEntity270PlusPeru request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat270PlusPeru(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat270PlusPeru(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat270PlusPeru(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity360Peru(MasterEntity360Peru request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat360Peru(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat360Peru(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat360Peru(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity360PlusPeru(MasterEntity360PlusPeru request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat360PlusPeru(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat360PlusPeru(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat360PlusPeru(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateFormatPolygraphPeru(PolygraphCandidate request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveFormatPolygraphPeru(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult GetFormatPolygraphPeru(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetFormatPolygraphPeru(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }


        //COLOMBIA
        [HttpPost]
        public JsonResult SaveorUpdateIntegrity180Colombia(MasterEntity180Colombia request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat180Colombia(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat180Colombia(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat180Colombia(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity180PlusColombia(MasterEntity180PlusColombia request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat180PlusColombia(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat180PlusColombia(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat180PlusColombia(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity270Colombia(MasterEntity270Colombia request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveWorkIntegrityWork270Colombia(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat270Colombia(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat270Colombia(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity270PlusColombia(MasterEntity270PlusColombia request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            
            var response = _IworkService.SaveRiskAnalysisFormat270PlusColombia(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat270PlusColombia(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat270PlusColombia(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity360Colombia(MasterEntity360Colombia request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat360Colombia(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat360Colombia(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat360Colombia(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity360PlusColombia(MasterEntity360PlusColombia request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat360PlusColombia(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat360PlusColombia(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat360PlusColombia(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult SaveorUpdateFormatPolygraphColombia(PolygraphCandidate request)
        {

            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveFormatPolygraphColombia(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetFormatPolygraphColombia(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetFormatPolygraphColombia(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity03Brasil(string IdIntegridad, string ItemIntegridadDet)
        {
            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat03Brasil(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat03Brasil(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat03Brasil(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity270Brasil(string IdIntegridad, string ItemIntegridadDet)
        {
            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();


            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat270Brasil(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat270Brasil(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat270Brasil(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveorUpdateIntegrity360Brasil(MasterEntity360Brasil oMasterEntity360Brasil)
        {
            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IworkService.SaveRiskAnalysisFormat360Brasil(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRiskAnalysisFormat360Brasil(string IdIntegridad, string ItemIntegridadDet)
        {
            var Data = _IworkService.GetRiskAnalysisFormat360Brasil(IdIntegridad, ItemIntegridadDet);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListWorkIntegrityDetail(string IdIntegridad)
        {
            var Data = _IworkService.GetListWorkIntegrityDetail(IdIntegridad);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GetDataCSVBrasil()
        {

            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }


            var Data = _IworkService.GetDataCSVBrasil(adjuntoList[0]);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);

        }


        [HttpGet]
        public JsonResult GenerateDocumentFinale(int IdIntegridad, int ItemIntegridadDet, int idDocumentFile)
        {
            var Data = _IworkService.GenerateDocumentFinale(IdIntegridad, ItemIntegridadDet, idDocumentFile);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);

        }



        [HttpPost]
        public JsonResult ProcesarTramaCollaborator()
        {
            int Country = Int16.Parse(SessionHelper.GetValueSession(Settings.Session.IdPais).ToString());

            List<CollaboratorWork> request = new List<CollaboratorWork>();
            List<ResponseExcelCollaborator> response = new List<ResponseExcelCollaborator>();
            try
            {
                HttpPostedFileBase upload = Request.Files["dataFile"];

                if (upload != null && upload.ContentLength > 0)
                {
                    Stream stream = upload.InputStream;
                    IExcelDataReader reader = null;

                    reader = (upload.FileName.EndsWith(".xls")) ? ExcelReaderFactory.CreateBinaryReader(stream) : ExcelReaderFactory.CreateOpenXmlReader(stream);

                    if (reader != null)
                    {
                        DataSet result = reader.AsDataSet();
                        reader.Close();

                        if (result.Tables[0].Rows.Count > 1)
                        {
                            Int32 rows = 1;
                            String IdUsuario = SessionHelper.GetUser().ToString();
                            String v_proceso = IdUsuario + GenerarCodigo() + DateTime.Now.ToString("yyyyMMddHHmmss");

                            while (rows < result.Tables[0].Rows.Count)
                            {

                                if(result.Tables[0].Rows[rows][0].ToString() != "")
                                {

                                
                                CollaboratorWork Collaborator = new CollaboratorWork();
                                if (Country == 1)
                                {

                                    Collaborator.Item = result.Tables[0].Rows[rows][0].ToString();
                                    Collaborator.DesTipoDocIdentidad = result.Tables[0].Rows[rows][1].ToString();
                                    Collaborator.NroDocumento = result.Tables[0].Rows[rows][2].ToString();
                                    Collaborator.NombreCompleto = result.Tables[0].Rows[rows][3].ToString();
                                    try
                                    {
                                        Collaborator.FechaNacimiento =  DateTime.ParseExact(result.Tables[0].Rows[rows][4].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture);
                                    }
                                        catch (Exception ex)
                                        {
                                        Collaborator.FechaNacimiento = null;
                                    }
                                    Collaborator.LugarNacimiento= result.Tables[0].Rows[rows][5].ToString();
                                    Collaborator.Telefono = result.Tables[0].Rows[rows][6].ToString();
                                    Collaborator.Celular= result.Tables[0].Rows[rows][7].ToString();
                                    Collaborator.Departamento= result.Tables[0].Rows[rows][8].ToString();
                                    Collaborator.Distrito= result.Tables[0].Rows[rows][9].ToString();
                                    Collaborator.Direccion= result.Tables[0].Rows[rows][10].ToString();
                                    Collaborator.Email = result.Tables[0].Rows[rows][11].ToString();
                                    Collaborator.DescripcionServicio = result.Tables[0].Rows[rows][12].ToString();
                                    Collaborator.IdPais = Country.ToString();
                                    
                                    
                                }
                                    else if (Country == 2)
                                    {
                                        Collaborator.Item = result.Tables[0].Rows[rows][0].ToString();
                                        Collaborator.DesTipoDocIdentidad = result.Tables[0].Rows[rows][1].ToString();
                                        Collaborator.NroDocumento = result.Tables[0].Rows[rows][2].ToString();
                                        Collaborator.NombreCompleto = result.Tables[0].Rows[rows][3].ToString();
                                        Collaborator.Email = result.Tables[0].Rows[rows][4].ToString();
                                        Collaborator.Celular = result.Tables[0].Rows[rows][5].ToString();
                                        Collaborator.Departamento = result.Tables[0].Rows[rows][6].ToString();
                                        Collaborator.Distrito = result.Tables[0].Rows[rows][7].ToString();
                                        Collaborator.Direccion = result.Tables[0].Rows[rows][8].ToString();
                                        Collaborator.DescripcionServicio = result.Tables[0].Rows[rows][9].ToString();
                                        Collaborator.IdPais = Country.ToString();
                                    }
                                else
                                {
                                   
                                    Collaborator.Item = result.Tables[0].Rows[rows][0].ToString();
                                    Collaborator.DesTipoDocIdentidad = result.Tables[0].Rows[rows][1].ToString();
                                    Collaborator.NroDocumento = result.Tables[0].Rows[rows][2].ToString();
                                        //Collaborator.Email = result.Tables[0].Rows[rows][3].ToString();
                                        Collaborator.Telefono = result.Tables[0].Rows[rows][3].ToString();
                                    Collaborator.Celular = result.Tables[0].Rows[rows][4].ToString();
                                    Collaborator.Departamento = result.Tables[0].Rows[rows][5].ToString();
                                    Collaborator.Distrito = result.Tables[0].Rows[rows][6].ToString();
                                    Collaborator.Direccion = result.Tables[0].Rows[rows][7].ToString();
                                    Collaborator.IdPais = Country.ToString();
                                        Collaborator.Email = result.Tables[0].Rows[rows][8].ToString();
                                        Collaborator.DescripcionServicio = result.Tables[0].Rows[rows][9].ToString();
                                    }

                                    request.Add(Collaborator);
                                }

                                rows++;

                            }
                            response = _IworkService.ValidateWorkIntegrityExcel(request);
                     
                        }
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        public string GenerarCodigo()
        {
            int longitud = 7;
            const string alfabeto = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder token = new StringBuilder();
            Random rnd = new Random();

            for (int i = 0; i < longitud; i++)
            {
                int indice = rnd.Next(alfabeto.Length);
                token.Append(alfabeto[indice]);
            }
            return token.ToString();
        }


        [HttpGet]
        public ActionResult ValidateFile(int id, int detail, string doc)
        {
            bool validado = false;
            string DataBase = string.Empty;
            if (id != 0 && detail != 0)
            {
                string folder = Settings.GetKey(Settings.KEY.templateGen);
                folder = Path.Combine(folder, TypeFolder.generated.ToString());
                string FolderId = Path.Combine(folder, id.ToString());
                string FolderItem = Path.Combine(FolderId, detail.ToString());
                string route = Path.Combine(FolderItem, $"{id}_{detail}.pdf");
                if (System.IO.File.Exists(route))
                {
                    validado = true;
                }

            }
            return new JsonResult() { Data = validado, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
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
        [HttpGet]
        public JsonResult GetWorkIntegrity2(long IdIntegridad)
        {
            //Retorna Solo con un parametro de idintegridad ,todos los datos relacionados
            var Data = _IworkService.GetWorkIntegrity(IdIntegridad);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetDniApi(string dni)
        {
            //Retorna Solo con un parametro de idintegridad ,todos los datos relacionados
            var web = new WebClient();
            var url = "https://api.reniec.cloud/dni/"+dni;
            var responseString = web.DownloadString(url);
            return Json(new
            {
                responseString
            }, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult GetFileDonwloadExcel(int id, string nameTypeFile)
        {
            string DataBase = string.Empty;
            if (id != 0 )
            {

                string folder = Settings.GetKey(Settings.KEY.templateGen);
                folder = Path.Combine(folder, TypeFolder.generated.ToString());
                string FolderId = Path.Combine(folder, id.ToString());


                DirectoryInfo fol = new DirectoryInfo(FolderId);

                string nameFile = "";

                foreach (FileInfo subdir in fol.GetFiles())
                {
                    if (rExtension(subdir.Name) == $"{nameTypeFile}_{id}")
                    {
                        nameFile = subdir.Name;
                    }
                 }

                  string route = Path.Combine(FolderId, nameFile);
                if (System.IO.File.Exists(route))
                {
                    byte[] bytes = System.IO.File.ReadAllBytes(route);
                    return File(new MemoryStream(bytes, 0, bytes.Length), System.Net.Mime.MediaTypeNames.Application.Octet, nameFile);
                }
                else
                {
                    return null;
                }

            }
            else
            {
                return null;
            }
            //return Json(new
            //{
            //    DataBase
            //}, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ValidateFileExcel(int id,string nameTypeFile)
        {

            bool validado = false;
            string DataBase = string.Empty;
            if (id != 0 )
            {
                try
                {
                string folder = Settings.GetKey(Settings.KEY.templateGen);
                folder = Path.Combine(folder, TypeFolder.generated.ToString());
                string FolderId = Path.Combine(folder, id.ToString());
                DirectoryInfo fol = new DirectoryInfo(FolderId);
                foreach (FileInfo subdir in fol.GetFiles())
                {
                        if (rExtension(subdir.Name) == $"{nameTypeFile}_{id}")
                        {
                        validado = true;
                    }
                }
                }
                catch (Exception ex)
                {
                    validado = false;
                }
                //string route = Path.Combine(FolderId, $"ExcelLoad_{id}.pdf");
                // if (System.IO.File.Exists(route))
                // {
                //    validado = true;
                //}

            }
            return new JsonResult() { Data = validado, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


        [HttpGet]
        public ActionResult GetFileDonwload(int id, int detail,string doc)
        {
            string DataBase = string.Empty;
            if (id != 0 && detail != 0)
            {

                string folder = Settings.GetKey(Settings.KEY.templateGen);
                folder = Path.Combine(folder, TypeFolder.generated.ToString());
                string FolderId = Path.Combine(folder, id.ToString());
                string FolderItem = Path.Combine(FolderId, detail.ToString());
                string route = Path.Combine(FolderItem, $"{id}_{detail}.pdf");
                if (System.IO.File.Exists(route))
                {
                    byte[] bytes = System.IO.File.ReadAllBytes(route);
                    return File(bytes, System.Net.Mime.MediaTypeNames.Application.Pdf, $"{id}_{doc}.pdf");
                }
                else
                {
                    return null;
                }
                
            }
            else
            {
                return null;
            }
            //return Json(new
            //{
            //    DataBase
            //}, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetFileDownload(string ruta)
        {
            string DataBase = string.Empty;
            try
            {
                if (System.IO.File.Exists(ruta))
                {
                    string route = ruta;
                    byte[] bytes = System.IO.File.ReadAllBytes(route);
                    DataBase = Convert.ToBase64String(bytes);
                }
                else
                {
                    return null;
                }
            }
            catch
            {

            }

            var serializer = new JavaScriptSerializer { MaxJsonLength = Int32.MaxValue, RecursionLimit = 100 };
            return new ContentResult()
            {
                Content = serializer.Serialize(DataBase),
                ContentType = "application/json",
            };
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        [HttpPost]
        public ContentResult GetPreviewFileBase64(string route)
        {
            string DataBase = string.Empty;
            try
            {             
                string FileImage = Base64Decode(route);
                byte[] bytes =   System.IO.File.ReadAllBytes(FileImage);
                DataBase = Convert.ToBase64String(bytes);
            }
            catch(Exception ex)
            {
                DataBase = string.Empty;
            }

            var serializer = new JavaScriptSerializer { MaxJsonLength = Int32.MaxValue, RecursionLimit = 100 };
            return new ContentResult()
            {
                Content = serializer.Serialize(DataBase),
                ContentType = "application/json",
            };
        }

        [Autenticado]
        [ValidatePage]
        public ActionResult WorkIntegrity()
        {
            return View();
        }
        [Autenticado]
        public ActionResult WorkIntegrityDetail(long IdIntegridad)
        {
            var IdRol = SessionHelper.GetValueSession(Settings.Session.IdRol).ToString();
            ApiResponse apiResponse = _ILoginService.GetAccess(int.Parse(IdRol));
            List<RolAccesoRsl> RolAcceso = JsonConvert.DeserializeObject<List<RolAccesoRsl>>(apiResponse.data.ToString());
            var OpcionVerVoucher = RolAcceso.Where(x => x.IdAcceso == 36).FirstOrDefault();
            var OpcionDescargarHabeasData = RolAcceso.Where(x => x.IdAcceso == 37).FirstOrDefault();
            if(OpcionVerVoucher != null)
            {
                ViewData["OpcionVerVoucher"] = true;
            }
            else
            {
                ViewData["OpcionVerVoucher"] = false;
            }

            if (OpcionDescargarHabeasData != null)
            {
                ViewData["OpcionDescargarHabeasData"] = true;
            }
            else
            {
                ViewData["OpcionDescargarHabeasData"] = false;
            }

            if(OpcionVerVoucher != null || OpcionDescargarHabeasData != null)
            {
                ViewData["WorkIntegrity"] = _IworkService.GetWorkIntegrity(IdIntegridad);
            }
            
            return View();
        }

        // -- Redireccionar los formatos a otra carpeta
        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo270Peru()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo360Peru()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo180Peru()
        {
            return View();
        }
        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo180PlusPeru()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo360PlusPeru()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo270PlusPeru()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoPoligrafoPeru()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo360PlusColombia()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo360Colombia()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo270PlusColombia()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo270Colombia()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo180PlusColombia()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo180Colombia()
        {
            return View();
        }


        [Autenticado]
        public ActionResult FormatoPoligrafoColombia()
        {
            return View();
        }


        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo03Brasil()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo270Brasil()
        {
            return View();
        }
        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo360Brasil()
        {
            return View();
        }
        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo270PlusBrasil()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo90Peru()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgo90PlusPeru()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgoBasicoPeru()
        {
            return View();
        }

        [Autenticado]
        public ActionResult FormatoAnalisisRiesgoPremiumPeru()
        {
            return View();
        }
    }

}
