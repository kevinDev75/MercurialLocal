using AppMercurial.Tags;
using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.Company;
using Mercurial.Domain.Interfaces.SafetyModule;
using Mercurial.Domain.Service.Company;
using Mercurial.Domain.Service.SafetyModule;
using Mercurial.DomainEntities.InterestInformation.FLT;
using Mercurial.DomainEntities.SafetySecurity.FLT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppMercurial.Controllers
{
	public class SafeController : Controller
	{
		public readonly ISafeService _ISafeService;
		public readonly ICompanyService _ICompanyService;

		public SafeController()
		{
			_ISafeService = new SafeService();
			_ICompanyService = new CompanyService();
		}

		[Autenticado]
		[ValidatePage]
		public ActionResult SafetySecurity()
		{
			var Data = _ICompanyService.GetListCompanies(null, true);
			ViewData["IdRol"] = SessionHelper.GetValueSession(Settings.Session.IdRol);
			return View(Data);
		}

		[Autenticado]
		[ValidatePage]
		public ActionResult SafetyBarridoElectronico()
		{
			return View();
		}

		[Autenticado]
		public ActionResult AssetManager()
		{
			return View();
		}

		[HttpPost]
		public JsonResult SaveOrUpdateElectronicScanning(SaveElectronicScanningFlt oSaveElectronicScanningFlt)
		{
			var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

			List<HttpPostedFile> adjuntoList = null;
			if (System.Web.HttpContext.Current.Request.Files.Count > 0)
			{
				adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
			}

			var response = _ISafeService.SaveElectronicScanning(DataString, adjuntoList);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult UpdateStatusElectronicScanning(long IdBarridoElectronico, bool Flg_Estado)
		{
			var response = _ISafeService.UpdateStatusElectronicScanning(IdBarridoElectronico, Flg_Estado);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult GetListElectronicScanning(string FechaInicio, string FechaFin)
		{
			var Data = _ISafeService.GetListElectronicScanning(FechaInicio, FechaFin);

			return Json(new
			{
				Data
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult SaveOrUpdateAssetSecurity(SaveElectronicScanningFlt oSaveElectronicScanningFlt)
		{
			var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

			List<HttpPostedFile> adjuntoList = null;
			if (System.Web.HttpContext.Current.Request.Files.Count > 0)
			{
				adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
			}

			var response = _ISafeService.SaveAssetSecurity(DataString, adjuntoList);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult UpdateStatusAssetSecurity(long IdSeguridadPatrimonial, bool Flg_Estado)
		{
			var response = _ISafeService.UpdateStatusAssetSecurity(IdSeguridadPatrimonial, Flg_Estado);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult GetListAssetSecurity(string FechaInicio, string FechaFin)
		{
			var Data = _ISafeService.GetListAssetSecurity(FechaInicio, FechaFin);

			return Json(new
			{
				Data
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult SaveOrUpdateCorporateInvestigations(SaveCorporateInvestigationsFlt oSaveCorporateInvestigationsFlt)
		{
			var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

			List<HttpPostedFile> adjuntoList = null;
			if (System.Web.HttpContext.Current.Request.Files.Count > 0)
			{
				adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
			}

			var response = _ISafeService.SaveCorporateInvestigations(DataString, adjuntoList);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult UpdateStatusCorporateInvestigations(long IdInvestigacionCorporativa, bool Flg_Estado)
		{
			var response = _ISafeService.UpdateStatusCorporateInvestigations(IdInvestigacionCorporativa, Flg_Estado);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult GetListCorporateInvestigations(string FechaInicio, string FechaFin)
		{
			var Data = _ISafeService.GetListCorporateInvestigations(FechaInicio, FechaFin);

			return Json(new
			{
				Data
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult SaveOrUpdateInternalStaff(SaveInternalStaffFlt oSaveInternalStaffFlt)
		{
			var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

			List<HttpPostedFile> adjuntoList = null;
			if (System.Web.HttpContext.Current.Request.Files.Count > 0)
			{
				adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
			}

			var response = _ISafeService.SaveInternalStaff(DataString, adjuntoList);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult UpdateStatusInternalStaff(long IdPersInternoInfo, bool Flg_Estado)
		{
			var response = _ISafeService.UpdateStatusInternalStaff(IdPersInternoInfo, Flg_Estado);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult GetListInternalStaff(string FechaInicio, string FechaFin, string TipoReporte)
		{
			if (TipoReporte == "0") TipoReporte = null;
			var Data = _ISafeService.GetListInternalStaff(FechaInicio, FechaFin, TipoReporte);

			return Json(new
			{
				Data
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult SaveOrUpdatePhysicalSecurity(SavePhysicalSecurityFlt oSavePhysicalSecurityFlt)
		{
			var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

			List<HttpPostedFile> adjuntoList = null;
			if (System.Web.HttpContext.Current.Request.Files.Count > 0)
			{
				adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
			}

			var response = _ISafeService.SavePhysicalSecurity(DataString, adjuntoList);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult UpdateStatusPhysicalSecurity(long IdSeguridadFisica, bool Flg_Estado)
		{
			var response = _ISafeService.UpdateStatusPhysicalSecurity(IdSeguridadFisica, Flg_Estado);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult GetListPhysicalSecurity(string FechaInicio, string FechaFin)
		{
			var Data = _ISafeService.GetListPhysicalSecurity(FechaInicio, FechaFin);

			return Json(new
			{
				Data
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult SaveOrUpdateInterestInformation(SaveInterestInformationFlt oSaveInterestInformationFlt)
		{
			var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

			List<HttpPostedFile> adjuntoList = null;
			if (System.Web.HttpContext.Current.Request.Files.Count > 0)
			{
				adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
			}

			var response = _ISafeService.SaveInterestInformation(DataString, adjuntoList);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult UpdateStatusInterestInformation(long IdInfoInteres, bool Flg_Estado)
		{
			var response = _ISafeService.UpdateStatusInterestInformation(IdInfoInteres, Flg_Estado);

			return Json(new
			{
				response
			}, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult GetListInterestInformation(string FechaInicio, string FechaFin)
		{
			var Data = _ISafeService.GetListInterestInformation(FechaInicio, FechaFin);

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