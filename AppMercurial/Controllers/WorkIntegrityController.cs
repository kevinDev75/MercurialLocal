using Mercurial.Domain.Interfaces.ServiceModule;
using Mercurial.Domain.Interfaces.WorkIntegrityModule;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.Domain.Service.ServiceModule;
using Mercurial.Domain.Service.WorkIntegrityModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Work;
using Mercurial.DomainEntities.WorkIntegrity;
using Mercurial.DomainEntities.WorkIntegrity.work270;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppMercurial.Controllers
{
    public class WorkIntegrityController : Controller
    {
        // GET: WorkIntegrity
        public readonly IWorkIntegrityService _IWorkIntegrity;
        public readonly IWorkService _IWorkService;

        public WorkIntegrityController()
        {
            _IWorkIntegrity = new WorkIntegrityService();
            _IWorkService = new WorkService();
        }

        [HttpPost]
        public ActionResult GetTextControlls(int IdIdioma, String NombreVista)
        {
            // --
            ApiResponse apiResponse = _IWorkIntegrity.GetTextControlls(NombreVista);
            var data = JsonConvert.DeserializeObject<List<GetControlsWorkIntegrityRsl>>(apiResponse.data.ToString());
            apiResponse.data = data;
            return Json(apiResponse);
        }
        //[HttpGet]
        //public ActionResult GenerateZipReport(int id)
        //{
        //    ApiResponse apiResponse = _IWorkIntegrity.GenerateZipReport(id);
        //    return File((byte[])apiResponse.data, System.Net.Mime.MediaTypeNames.Application.Zip, $"GenerateFiles_{id}.zip");


        //}

        [HttpPost, ValidateInput(false)]
        public JsonResult UpdateStatusIntegrity(UpdateStatus datos)
        {
            // --
            ApiResponse apiResponse = _IWorkIntegrity.UpdateStatusIntegrity(datos);
            return Json(new
            {
                apiResponse
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GenerateZipSelect(datosFileDow  data)
        {
            ApiResponse apiResponse = _IWorkIntegrity.GenerateZipSelect(data);
            return Json(new
            {
                apiResponse
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult UpdateUserInWorkIntegrityDetail(long IdIntegridad, int ItemIntegridadDet, int IdUsuarioAsignado)
        {
            var Data = _IWorkIntegrity.UpdateUserInWorkIntegrityDetail(IdIntegridad, ItemIntegridadDet, IdUsuarioAsignado);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCommentaryWorkIntegrity(long IdIntegridad)
        {
            var Data = _IWorkService.GetWorkIntegrity(IdIntegridad);

            return Json(new
            {
                Data
            }, JsonRequestBehavior.AllowGet);
        }

 

    }
  
}