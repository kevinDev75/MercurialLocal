using AppMercurial.Tags;
using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.HomeModule;
using Mercurial.Domain.Service;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Home;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace AppMercurial.Controllers
{
    public class LoginController : Controller
    {

        public readonly ILoginService _ILoginService;
        private static Random random = new Random();

        public LoginController()
        {
            _ILoginService = new LoginService();
        }

        [HttpPost]
        public ActionResult Login(LoginRequest loginRequest)
        {
            var apiResponse = new ApiResponse("", "");
            var error = "";
            try
            {
                var encrypted_text = Encryptor.Encrypt(loginRequest.password);
                error += encrypted_text + Environment.NewLine;
                //var decrypted_text = Encryptor.Decrypt("PRL6/Sbwq8g=");
                loginRequest.password = encrypted_text;
                apiResponse = _ILoginService.Authenticate(loginRequest);

                if (apiResponse.data != null)
                {
                    User UserResponse = JsonConvert.DeserializeObject<User>(apiResponse.data.ToString());

                    if (UserResponse != null)

                        SessionHelper.AddUserToSession(
                            UserResponse.IdUser,
                            UserResponse.ListRoles[0].IdRol,
                            UserResponse.Country.ToString(),
                            UserResponse.idIdioma,
                            UserResponse.IdEmpresa.ToString(),
                            UserResponse.IdSucursal.ToString());
                }
                
            }
            catch(Exception ex)
            {
                apiResponse.status = "ERROR";
                apiResponse.msg = ex.Message;
            }
            return Json(apiResponse);
        }
        public string RandomString(int length)
        {

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public string DecodeBase64ToString(string valor)
        {
            byte[] myBase64ret = Convert.FromBase64String(valor);
            string myStr = System.Text.Encoding.UTF8.GetString(myBase64ret);
            return myStr;
        }


        //[HttpPost]
        //public ActionResult RecoverPassword(LoginRequest loginRequest)
        //{
        //    var apiResponse = new ApiResponse("", "");
        //    var error = "";
        //    try
        //    {
        //        apiResponse = _ILoginService.getIdUserxEmail(loginRequest.email);

        //        string ramdon = RandomString(8);
        //        int IdUsuario = 0;
        //        if (apiResponse.data.ToString() != "0")
        //        {
        //            IdUsuario = Int32.Parse(apiResponse.data.ToString());
        //            string agg = string.Format("{0}|{1}", ramdon, apiResponse.data.ToString());

        //            string url = System.Web.HttpContext.Current.Request.Url.Authority;

        //            string rutaBase64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(agg));
        //            url = "https://" + url + "/login/RecoverPassword?code=" + rutaBase64;
        //            apiResponse = _ILoginService.SendMailRecover(loginRequest.email, url);

        //            if (apiResponse.status.ToUpper() == "OK") {
        //                apiResponse = _ILoginService.sendCodeRecover(ramdon, IdUsuario);
        //                if (apiResponse.status.ToUpper() == "OK")
        //                {
        //                    apiResponse.status = "OK";
        //                    apiResponse.msg = "Se envio correctamente el correo";
        //                }
        //                else
        //                {
        //                    apiResponse.status = "ERROR";
        //                    apiResponse.msg = apiResponse.msg;
        //                }
        //            } else
        //            {
        //                apiResponse.status = "ERROR";
        //                apiResponse.msg = "error al enviar el correo";
        //            }
        //        }
        //        else
        //        {
        //            apiResponse.msg = "El correo ingresado no existe";
        //            apiResponse.status = "ERROR";
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        apiResponse.status = "ERROR";
        //        apiResponse.msg = ex.Message;
        //    }
        //    return Json(apiResponse);
        //}

        [HttpGet]
        public JsonResult Captcha()
        {
            const string _Chars = "abcdfghijklmnopqrstuvwxyz0123456789";
            Random _Random = new Random();
            string _Captcha = new string(Enumerable.Repeat(_Chars, 5).Select(s => s[_Random.Next(s.Length)]).ToArray());

            return Json(new
            {
                Captcha = _Captcha
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SingOut()
        {
            SessionHelper.DestroyUserSession();
            //return RedirectToAction("Index", "Home");
            return Json(new { 
            
            },
                JsonRequestBehavior.AllowGet);

        }
        [HttpGet]
        public JsonResult GetValueSession()
        {
            SessionValue values = new SessionValue()
            {
                IdIdioma = SessionHelper.GetValueSession(Settings.Session.Ididioma).ToString(),
                IdPais = SessionHelper.GetValueSession(Settings.Session.IdPais).ToString(),
                IdRol = SessionHelper.GetValueSession(Settings.Session.IdRol).ToString(),
                IdUsuario = SessionHelper.GetUser().ToString()
            };
            return Json(new
            {
                values
            }, JsonRequestBehavior.AllowGet);
        }




        //[HttpPost]
        //[Route("PasswordChange")]
        //public ActionResult PasswordChange(UpdatePassword update)
        //{
        //    var apiResponse = new ApiResponse("OK", "");

        //    try
        //    {
        //        var encrypted_text = Encryptor.Encrypt(update.Password);
                
        //        //var decrypted_text = Encryptor.Decrypt("PRL6/Sbwq8g=");
        //        update.Password = encrypted_text;

        //        apiResponse = _ILoginService.ChangePassword(update);
        //    }
        //    catch(Exception ex)
        //    {
        //        apiResponse.msg = ex.Message;
        //        apiResponse.status = "Error";
        //    }
        //    return Json(new
        //    {
        //        apiResponse
        //    }, JsonRequestBehavior.AllowGet);

        //}


        //    [NoCache]
        //[NoLogin]
        //[HttpGet]
        //[Route("RecoverPassword")]
        //public ActionResult RecoverPassword(string code)
        //{
        //    var apiResponse = new ApiResponse("OK", "");

        //    string inputStr = Encoding.UTF8.GetString(Convert.FromBase64String(code));

        //    string[] arrayDato = inputStr.Split('|');

        //    string codeVerificate = arrayDato[0];
        //    string idUsuario = arrayDato[1];



        //    try
        //    {
        //        apiResponse = _ILoginService.getCodexIdUsuario(Int32.Parse(idUsuario));
        //        if(apiResponse.status.ToUpper() == "OK")
        //        {
        //            RequestCodexUsuario responseCode = new RequestCodexUsuario();
        //            responseCode = JsonConvert.DeserializeObject<RequestCodexUsuario>(apiResponse.data.ToString());

        //            if(responseCode.CodigoCambioPassword == codeVerificate) 
        //            {
        //                responseCode.flgActiveLink = true;
        //                responseCode.idUsuario = idUsuario;
        //            }
        //            else
        //            {
        //                responseCode.flgActiveLink = false;
        //            }
                    

        //            ViewData["Datos"] = responseCode;
        //        }
        //        else
        //        {

        //        }

        //    }
        //    catch(Exception ex)
        //    {

        //    }
        //        return View();
        //}



        [HttpGet]
        public JsonResult GetAccess()
        {
            var IdRol = SessionHelper.GetValueSession(Settings.Session.IdRol).ToString();
            ApiResponse apiResponse = _ILoginService.GetAccess(int.Parse(IdRol));
            List<RolAccesoRsl> RolAcceso = JsonConvert.DeserializeObject<List<RolAccesoRsl>>(apiResponse.data.ToString());

            return Json(new
            {
                RolAcceso
            }, JsonRequestBehavior.AllowGet);
        }
    }

    public class SessionValue
    {
        public string IdPais { get; set; }
        public string IdUsuario { get; set; }
        public string IdRol { get; set; }
        public string IdIdioma { get; set; }
    }
}