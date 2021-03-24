using AppMercurial.Tags;
using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.Company;
using Mercurial.Domain.Interfaces.CorporateServicesModule;
using Mercurial.Domain.Service.Company;
using Mercurial.Domain.Service.CorporateServicesModule;
using Mercurial.DomainEntities.CorporateServices.FLT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppMercurial.Controllers
{
    public class CorporateServicesController : Controller
    {
        public readonly ICompanyService _ICompanyService;
        public readonly ICorporateServices _ICorporateServices;

        public CorporateServicesController()
        {
            _ICompanyService = new CompanyService();
            _ICorporateServices = new CorporateServices();
        }

        [Autenticado]
		[ValidatePage]
		public ActionResult IndexGestionCorporativa()
        {
            var Data = _ICompanyService.GetListCompanies(null, true);
            ViewData["IdRol"] = SessionHelper.GetValueSession(Settings.Session.IdRol);
            return View(Data);
        }


        [Autenticado]
		[ValidatePage]
		public ActionResult IndexMapaSectorial()
        {
            var Data = _ICompanyService.GetListCompanies(null, true);
            ViewData["IdRol"] = SessionHelper.GetValueSession(Settings.Session.IdRol);
            return View(Data);
        }

		[HttpPost]
		public JsonResult SaveOrUpdateCorporateRiskManagement(SaveCorporateRiskManagementFlt oSaveCorporateRiskManagementFlt)
		{
			var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

			List<HttpPostedFile> adjuntoList = null;
			if (System.Web.HttpContext.Current.Request.Files.Count > 0)
			{
				adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
			}

			var response = _ICorporateServices.SaveCorporateRiskManagement(DataString, adjuntoList);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult UpdateStatusCorporateManagement(long IdGestionCorporativaRiesgo, bool Flg_Estado)
		{
			var response = _ICorporateServices.UpdateStatusCorporateManagement(IdGestionCorporativaRiesgo, Flg_Estado);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult GetListCorporateRiskManagement(string FechaInicio, string FechaFin)
		{
			var Data = _ICorporateServices.GetListCorporateRiskManagement(FechaInicio, FechaFin);

			return Json(new
			{
				Data
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult SaveOrUpdateSectoralMaps(SaveCorporateRiskManagementFlt oSaveCorporateRiskManagementFlt)
		{
			var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

			var response = _ICorporateServices.SaveSectoralMaps(DataString);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult GetListSectoralMaps(string FechaInicio, string FechaFin)
		{
			var Data = _ICorporateServices.GetListSectoralMaps(FechaInicio, FechaFin);

			return Json(new
			{
				Data
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult UpdateStatusSectoralMaps(long IdMapaSectorial, bool Flg_Estado)
		{
			var response = _ICorporateServices.UpdateStatusSectoralMaps(IdMapaSectorial, Flg_Estado);

			return Json(new
			{
				response
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
            catch
            {

            }
            return Json(new
            {
                DataBase
            }, JsonRequestBehavior.AllowGet);
        }


    }
}