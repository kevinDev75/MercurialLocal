using AppMercurial.Tags;
using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.Cibersecurity;
using Mercurial.Domain.Interfaces.Company;
using Mercurial.Domain.Service.Cibersecurity;
using Mercurial.Domain.Service.Company;
using Mercurial.DomainEntities.Cibersecurity.FLT;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static Mercurial.CrossCuting.Utilities.Template.TemplateEnum;

namespace AppMercurial.Controllers
{
    public class CibersecurityController : Controller
    {
        public readonly ICibersecurityService _ICibersecurityService;
        public readonly ICompanyService _ICompanyService;

        public CibersecurityController()
        {
            _ICibersecurityService = new CibersecurityService();
            _ICompanyService = new CompanyService();
        }

        [HttpGet]
        public JsonResult GetListHackeoEtico(string FechaInicio, string FechaFin)
        {
            var Data = _ICibersecurityService.GetListHackeoEtico(FechaInicio, FechaFin);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveOrUpdateHackeoEtico(SaveHackeoEticoFlt oSaveHackeoEticoFlt)
        {
            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();
            
            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _ICibersecurityService.SaveHackeoEtico(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult UpdateStatusHackeoEtico(long IdHackeoEtico, bool Flg_Estado)
        {
            var response = _ICibersecurityService.UpdateStatusHackeoEtico(IdHackeoEtico, Flg_Estado);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListOsint(string FechaInicio, string FechaFin)
        {
            var Data = _ICibersecurityService.GetListOsint(FechaInicio, FechaFin);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveOrUpdateOsint(SaveHackeoEticoFlt oSaveHackeoEticoFlt)
        {
            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _ICibersecurityService.SaveOsint(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult UpdateStatusOsint(long IdOSINT, bool Flg_Estado)
        {
            var response = _ICibersecurityService.UpdateStatusOsint(IdOSINT, Flg_Estado);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListPentesting(string FechaInicio, string FechaFin)
        {
            var Data = _ICibersecurityService.GetListPentesting(FechaInicio, FechaFin);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveOrUpdatePentesting(SaveHackeoEticoFlt oSaveHackeoEticoFlt)
        {
            var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

            List<HttpPostedFile> adjuntoList = null;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                adjuntoList = new List<HttpPostedFile>(System.Web.HttpContext.Current.Request.Files.GetMultiple("dataFile"));
            }

            var response = _ICibersecurityService.SavePentesting(DataString, adjuntoList);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult UpdateStatusPentesting(long IdPentesting, bool Flg_Estado)
        {
            var response = _ICibersecurityService.UpdateStatusPentesting(IdPentesting, Flg_Estado);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [Autenticado]
        [ValidatePage]
        public ActionResult Ciberseguridad()
        {
            var Data = _ICompanyService.GetListCompanies(null, true);
            ViewData["IdRol"] = SessionHelper.GetValueSession(Settings.Session.IdRol);
            return View(Data);
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