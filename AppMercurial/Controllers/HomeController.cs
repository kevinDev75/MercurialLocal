using AppMercurial.Tags;
using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.HomeModule;
using Mercurial.Domain.Interfaces.UserModule;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.Domain.Service.UserModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Home;
using Mercurial.DomainEntities.User.RSL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppMercurial.Controllers
{
    public class HomeController : Controller
    {
        public readonly ILoginService _ILoginService;
        public readonly IUserServices _IUserServices;

        public HomeController()
        {
            _ILoginService = new LoginService();
            _IUserServices = new UserServices();
        }
       
        //[Autenticado]
        public ActionResult MenuLayout()
        {
            User user = new User() {

                idRol = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdRol).ToString()),
                idIdioma = SessionHelper.GetValueSession(Settings.Session.Ididioma).ToString(),
                IdUser = SessionHelper.GetUser().ToString()
            };

            var response = _ILoginService.GetMenu(user);
            
            List<ModelMenu> data = new List<ModelMenu>();
            if (response.data != null)
            {
                data = JsonConvert.DeserializeObject<List<ModelMenu>>(response.data.ToString());
            }
            return PartialView("_MenuLayout", data);

        }

        [Autenticado]
        public ActionResult Main()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [NoCache]
        [NoLogin]
        public ActionResult Index()
        {
            return View();
        }




        [HttpGet]
        public JsonResult GetUser()
        {
            var IdUser = int.Parse(SessionHelper.GetUser().ToString());
            var Data = _IUserServices.GetUsers(IdUser);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult GetIdioma()
        {
            var IdIdioma = int.Parse(SessionHelper.GetValueSession(Settings.Session.Ididioma).ToString());

            return Json(new
            {
                IdIdioma
            }, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult SetIdioma(int IdIdioma)
        {
            SessionHelper.CreateValueSession(Settings.Session.Ididioma, IdIdioma.ToString());

            var apiResponse = new ApiResponse("OK", "Success");

            return Json(new
            {
                apiResponse
            }, JsonRequestBehavior.AllowGet);
        }

    }
}