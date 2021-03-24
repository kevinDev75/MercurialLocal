using AppMercurial.Tags;
using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.Company;
using Mercurial.Domain.Interfaces.RiskMapModule;
using Mercurial.Domain.Service.Company;
using Mercurial.Domain.Service.RiskMapModule;
using Mercurial.DomainEntities.RiskMap.FLT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppMercurial.Controllers
{
    public class RiskMapController : Controller
    {
        public readonly IRiskMapService _IRiskMapService;
        public readonly ICompanyService _ICompanyService;
        public RiskMapController()
        {
            _IRiskMapService = new RiskMapService();
            _ICompanyService = new CompanyService();
        }

        [Autenticado]
        [ValidatePage]
        public ActionResult IndexMapaRiesgos()
        {
            var Data = _ICompanyService.GetListCompanies(null, true);
            ViewData["IdRol"] = SessionHelper.GetValueSession(Settings.Session.IdRol);
            return View(Data);
        }

        [HttpPost]
        public JsonResult SaveOrUpdateRiskMap(SaveRiskMapFlt oSaveRiskMapFlt)
        {
            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _IRiskMapService.SaveRiskMap(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult UpdateStatusRiskMap(long IdMapaRiesgo, bool Flg_Estado)
        {
            var response = _IRiskMapService.UpdateStatusRiskMap(IdMapaRiesgo, Flg_Estado);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListRiskMap(string FechaInicio, string FechaFin)
        {
            var Data = _IRiskMapService.GetListRiskMap(FechaInicio, FechaFin);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetFileDownload(string ruta)
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
            return Json(new
            {
                DataBase
            }, JsonRequestBehavior.AllowGet);
        }



    }
}