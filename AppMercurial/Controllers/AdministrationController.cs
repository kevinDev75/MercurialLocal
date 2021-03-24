using AppMercurial.Tags;
using Mercurial.Domain.Interfaces.Company;
using Mercurial.Domain.Interfaces.UserModule;
using Mercurial.Domain.Service.Company;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.Domain.Service.UserModule;
using Mercurial.DomainEntities.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppMercurial.Controllers
{
    public class AdministrationController : Controller
    {
        public readonly ICompanyService _ICompanyService;
        public readonly IUserServices _IUserServices;

        public AdministrationController()
        {
            _ICompanyService = new CompanyService();
            _IUserServices = new UserServices();
        }

        // GET: Administration
        [Autenticado]
        [ValidatePage]
        public ActionResult Companys()
        {
            return View();
        }


        [HttpGet]
        public JsonResult GetDocumentType(int IdPais, int Opcion)
        {
            var Data = _IUserServices.GetListTypeDocument(IdPais, Opcion);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCompanys()
        {
            var Data = _ICompanyService.GetListCompanies(null, null);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult getListBranchOffice(int IdEmpresa)
        {
            var Data = _ICompanyService.getListBranchOffice(IdEmpresa);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveOrUpdateCompany(CompanyFlt oCompanyFlt)
        {
            //var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();
            var DataString = Newtonsoft.Json.JsonConvert.SerializeObject(oCompanyFlt, Newtonsoft.Json.Formatting.Indented);
            var Data = _ICompanyService.SaveCompany(DataString);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }



    }
}