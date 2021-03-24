using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.HomeModule;
using Mercurial.DomainEntities.Home;
using Mercurial.DomainEntities;
using System.Net;
using System.Web;
using System.Web.UI.WebControls;

namespace Mercurial.Domain.Service.HomeModule
{
    public class LoginService : ILoginService
    {

        private readonly string _ServicePrefix = "api/";
        private readonly string _UrlService;

        public LoginService()
        {
            _UrlService = System.Configuration.ConfigurationManager.AppSettings["ServiceMercurial"].ToString();
        }
        public ApiResponse Authenticate(LoginRequest loginRequest)
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
                apiResponse = new ApiResponse("ERROR", ex.Message);
            }
            return apiResponse;
        }

        public ApiResponse GetMenu(User user)
        {
            ApiResponse apiResponse;
            try {
                var _request = JsonConvert.SerializeObject(user, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(Enums.Method.POST,_request, _UrlService, _ServicePrefix, UrlService.UrlGetRol, GetToken());
                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);
            }
            catch (Exception ex)
            {
                apiResponse = new ApiResponse("ERROR", Constant.error_server);
            }
            return apiResponse;
        }

        public string GetToken()
        {
            string token = string.Empty;
            HttpCookie cookie = SessionHelper.GetToken();
            if (cookie == null)
            {
                LoginRequest user = new LoginRequest() {
                username = Settings.GetKey(Settings.KEY.Username),
                password = Settings.GetKey(Settings.KEY.Password)};

                var ResponseLogin = this.Authenticate(user);
                User UserResponse = JsonConvert.DeserializeObject<User>(ResponseLogin.data.ToString());
                if (UserResponse != null) { 
                token = UserResponse.Token;
                SessionHelper.CreateToken(UserResponse.Token);
                }
            }
            else
            {
                token = cookie.Value.ToString();
            }
            return token;
        }

        public ApiResponse GetAccess(int IdRol)
        {
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(Enums.Method.GET, string.Empty, _UrlService, _ServicePrefix, string.Format(UrlService.UrlGetAccess, IdRol), GetToken());
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
