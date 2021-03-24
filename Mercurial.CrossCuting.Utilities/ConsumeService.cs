using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Home;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using static Mercurial.CrossCuting.Utilities.Enums;

namespace Mercurial.CrossCuting.Utilities
{
    public class ConsumeService
    {
        private readonly static string _ServicePrefix = "api/";
        private readonly static string _UrlService = System.Configuration.ConfigurationManager.AppSettings["ServiceMercurial"].ToString();

        public static string ConsumirAPI(string request, string BaseURL, string servicePrefix, string controller)
        {
            var error = "";
            try
            {

                System.Net.ServicePointManager.ServerCertificateValidationCallback +=
                (se, cert, chain, sslerror) =>
                {
                    return true;
                };

                var ruta = string.Format("{0}{1}{2}", BaseURL, servicePrefix, controller);
                error += "ruta en ConsumirAPI: " + ruta + Environment.NewLine;
                using (var client = new WebClient())
                {
                    client.Headers[HttpRequestHeader.ContentType] = "application/json; charset=utf-8";
                    string respuesta = client.UploadString(ruta, "POST", request);
                    error += "respuesta en ConsumirAPI: " + respuesta + Environment.NewLine;
                    return respuesta;
                }

            }
            catch(Exception ex)
            {
               // var excepcion = (HttpWebResponse)ex.Message;
                error += "excepcion en ConsumirAPI: " + ex.Message + Environment.NewLine;
                return error;
            }
        }


        public static string ConsumirAPIConToken(Enums.Method method, string request, string BaseURL, string servicePrefix, string controller,string Token = "")
        {
            try
            {
                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                string response;
                var ruta = string.Format("{0}{1}{2}", BaseURL, servicePrefix, controller);
                using (var client = new WebClient())
                {
                    client.Encoding = System.Text.Encoding.UTF8;

                    client.Headers[HttpRequestHeader.ContentType] = "application/json; charset=utf-8";

                    if(Token != "")
                    {
                    client.Headers[HttpRequestHeader.Authorization] = "Bearer " + Token;
                    }
                    if (method == Enums.Method.POST)
                    {
                         response = client.UploadString(ruta, method.ToString(), request);
                    }
                    else
                    {
                         response = client.DownloadString(ruta);
                    }
                    
                    /// Y LA 'RETORNAMOS'
                    return response;
                }

            }
            catch (WebException ex)
            {
                var excepcion = (HttpWebResponse)ex.Response;
                if (excepcion != null && excepcion.StatusCode.Equals(HttpStatusCode.Unauthorized))
                {
                    string respuesta;
                    try
                    {
                        var ruta = string.Format("{0}{1}{2}", BaseURL, servicePrefix, controller);
                        
                        using (var client = new WebClient())
                        {
                            client.Encoding = System.Text.Encoding.UTF8;
                            client.Headers[HttpRequestHeader.ContentType] = "application/json; charset=utf-8";
                            client.Headers[HttpRequestHeader.Authorization] = "Bearer " + GetToken();
                            if (method == Enums.Method.POST)
                            {
                                respuesta = client.UploadString(ruta, method.ToString(), request);
                            }
                            else
                            {
                                respuesta = client.DownloadString(ruta);
                            }

                            /// Y LA 'RETORNAMOS'
                            return respuesta;
                        }
                    }
                    catch (Exception ex2) { }
                }
                return null;
            }
            catch
            {
                return null;
            }
        }

        private static string GetToken()
        {
            string token = string.Empty;
            LoginRequest user = new LoginRequest()
            {
                username = Settings.GetKey(Settings.KEY.Username),
                password = Settings.GetKey(Settings.KEY.Password)
            };

            var ResponseLogin = Authenticate(user);
            User UserResponse = JsonConvert.DeserializeObject<User>(ResponseLogin.data.ToString());
            if (UserResponse != null)
            {
                token = UserResponse.Token;
                HttpCookie cookie = new HttpCookie(Settings.Cokkies.TokenServiceMercurial.ToString())
                {
                    Value = token,
                    Expires = DateTime.Now.AddHours(Int32.Parse(Settings.GetKey(Settings.KEY.timeCookies)))
                };
                HttpContext.Current.Response.Cookies.Add(cookie);
            }
            return token;
        }

        private static ApiResponse Authenticate(LoginRequest loginRequest)
        {
            ApiResponse apiResponse;
            try
            {
                var _request = JsonConvert.SerializeObject(loginRequest, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPI(_request, _UrlService, _ServicePrefix, UrlService.UrlAuthenticate);
                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);
            }
            catch (Exception ex)
            {
                apiResponse = new ApiResponse("ERROR", Constant.error_server);
            }
            return apiResponse;
        }

    }
}
