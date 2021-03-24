using AppMercurial.Tags;
using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.Company;
using Mercurial.Domain.Interfaces.ServiceModule;
using Mercurial.Domain.Interfaces.UserModule;
using Mercurial.Domain.Service.Company;
using Mercurial.Domain.Service.ServiceModule;
using Mercurial.Domain.Service.UserModule;
using Mercurial.DomainEntities.User.FLT;
using Mercurial.DomainEntities.User.RSL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppMercurial.Controllers
{
    public class UsersController : Controller
    {
        public readonly ICompanyService _ICompanyService;
        public readonly IUserServices _IUserServices;
        public readonly IWorkService _IworkService;

        public UsersController()
        {
            _ICompanyService = new CompanyService();
            _IUserServices = new UserServices();
            _IworkService = new WorkService();
        }

        // GET: Users
        [Autenticado]
        [ValidatePage]
        public ActionResult Users()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetListCompanies(int? IdPais)
        {
            var Data = _ICompanyService.GetListCompanies(IdPais, true);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCountries()
        {
            var Data = _IUserServices.GetCountries();

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRoles()
        {
            var Data = _IUserServices.GetRoles();

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetDocumentType(int IdPais)
        {
            var Data = _IworkService.GetListTypeDocument(IdPais);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListZodiacSign(int IdPais)
        {
            var Data = _IUserServices.GetListZodiacSign(IdPais);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetUsers(int? IdUsuario)
        {
            var Data = _IUserServices.GetUsers(IdUsuario);

            try
            {
                foreach (GetUserRsl row in Data)
                {
                    row.PassUsuario = Encryptor.Decrypt(row.PassUsuario);
                }
            }
            catch
            {

            }

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetUsers_Rol(int IdRol)
        {
            var Data = _IUserServices.GetUsers_Rol(IdRol);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveUser(SaveUserFlt oSaveUserFlt)
        {
            var encrypted_text = Encryptor.Encrypt(oSaveUserFlt.PassUsuario);
            //var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();
            oSaveUserFlt.PassUsuario = encrypted_text;
            var DataString = Newtonsoft.Json.JsonConvert.SerializeObject(oSaveUserFlt, Newtonsoft.Json.Formatting.Indented);
            var Data = _IUserServices.SaveUser(DataString);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }



    }
}