using Mercurial.Domain.Interfaces.UbigeoModule;
using Mercurial.Domain.Service.UbigeoModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppMercurial.Controllers
{
    public class UbigeoController : Controller
    {
        public readonly IUbigeoService _IUbigeoService;

        public UbigeoController()
        {
            _IUbigeoService = new UbigeoService();
        }

        [HttpGet]
        public JsonResult GetListDepartments()
        {
            var Data = _IUbigeoService.GetListDepartments();

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListProvinces(string departamento)
        {
            var Data = _IUbigeoService.GetListProvinces(departamento);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListDistricts(string departamento, string provincia)
        {
            var Data = _IUbigeoService.GetListDistricts(departamento, provincia);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }


    }
}