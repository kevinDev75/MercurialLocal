using AppMercurial.Tags;
using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.Company;
using Mercurial.Domain.Interfaces.RiskManagementModule;
using Mercurial.Domain.Service.Company;
using Mercurial.Domain.Service.RiskManagementModule;
using Mercurial.DomainEntities.RiskManagement.FLT;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace AppMercurial.Controllers
{
    public class RiskManagementController : Controller
    {
        public readonly IRiskManagementService _IRiskManagementService;
        public readonly ICompanyService _ICompanyService;
        public RiskManagementController()
        {
            _IRiskManagementService = new RiskManagementService();
            _ICompanyService = new CompanyService();
        }

        [Autenticado]
        [ValidatePage]
        public ActionResult IndexGestionRiesgos()
        {
            var DataTypeAlert = _IRiskManagementService.GetTypeAlertRiskManagement();
            ViewData["TypeAlert"] = DataTypeAlert;
            var DataCompanys = _ICompanyService.GetListCompanies(null, true);
            ViewData["IdRol"] = SessionHelper.GetValueSession(Settings.Session.IdRol);
            return View(DataCompanys);
        }

        [HttpPost]
        public JsonResult SaveOrUpdateRiskManagement(SaveRiskManagementFlt oSaveRiskManagementFlt)
        {
            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IRiskManagementService.SaveRiskManagement(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult UpdateStatusRiskManagement(long IdGestionRiesgos, bool Flg_Estado)
        {
            var response = _IRiskManagementService.UpdateStatusRiskManagement(IdGestionRiesgos, Flg_Estado);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListRiskManagement(string FechaInicio, string FechaFin, int? IdTipoAlerta)
        {
            var Data = _IRiskManagementService.GetListRiskManagement(FechaInicio, FechaFin, IdTipoAlerta);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetFileDownload(string ruta)
        {
            string DataBase = string.Empty;
            try
            {
                if (!string.IsNullOrEmpty(ruta))
                {
                    string route = ruta;
                    byte[] bytes = System.IO.File.ReadAllBytes(route);
                    DataBase = Convert.ToBase64String(bytes);
                }
            }
            catch (Exception ex)
            {

            }

            var serializer = new JavaScriptSerializer { MaxJsonLength = Int32.MaxValue, RecursionLimit = 100 };
            return new ContentResult()
            {
                Content = serializer.Serialize(DataBase),
                ContentType = "application/json",
            };
        }


    }
}