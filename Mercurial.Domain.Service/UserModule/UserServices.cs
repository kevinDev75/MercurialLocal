using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.UserModule;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Company;
using Mercurial.DomainEntities.Home;
using Mercurial.DomainEntities.User.FLT;
using Mercurial.DomainEntities.User.RSL;
using Mercurial.DomainEntities.Work;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.Domain.Service.UserModule
{
    public class UserServices : IUserServices
    {
        private readonly string _ServicePrefix = "api/";
        private readonly string _UrlService;
        private LoginService _LoginService;

        public UserServices()
        {
            _LoginService = new LoginService();
            _UrlService = System.Configuration.ConfigurationManager.AppSettings["ServiceMercurial"].ToString();
        }

        public ApiResponse SaveUser(string stringJson)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                SaveUserFlt saveEntity = JsonConvert.DeserializeObject<SaveUserFlt>(stringJson);
                saveEntity.UsuarioAccion = IdUsuario;

                if (string.IsNullOrEmpty(saveEntity.Email))
                {
                    saveEntity.Email = string.Empty;
                }

                if (string.IsNullOrEmpty(saveEntity.Telefono))
                {
                    saveEntity.Telefono = string.Empty;
                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlSaveUser),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public List<GetUserRsl> GetUsers(int? IdUsuario)
        {
            List<GetUserRsl> request = new List<GetUserRsl>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetUsers, IdUsuario),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<GetUserRsl>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public List<GetUsers_RolRsl> GetUsers_Rol(int IdRol)
        {
            List<GetUsers_RolRsl> request = new List<GetUsers_RolRsl>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetUsers_Rol, IdRol),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<GetUsers_RolRsl>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public List<CountryRsl> GetCountries()
        {
            List<CountryRsl> request = new List<CountryRsl>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetCountries),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<CountryRsl>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public List<Rol> GetRoles()
        {
            List<Rol> request = new List<Rol>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetRoles),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<Rol>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public List<DocumentType> GetListTypeDocument(int Pais, int Opcion)
        {
            List<DocumentType> ListType = new List<DocumentType>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlGetDocumentType2, Pais, Opcion),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListType = JsonConvert.DeserializeObject<List<DocumentType>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListType = null;
            }
            return ListType;
        }

        public List<GetZodiacSignRsl> GetListZodiacSign(int Pais)
        {
            List<GetZodiacSignRsl> ListType = new List<GetZodiacSignRsl>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlGetZodiacSign, Pais),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListType = JsonConvert.DeserializeObject<List<GetZodiacSignRsl>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListType = null;
            }
            return ListType;
        }


    }
}
