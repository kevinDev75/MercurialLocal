using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.UbigeoModule;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Ubigeo;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.Domain.Service.UbigeoModule
{
    public class UbigeoService: IUbigeoService
    {
        private readonly string _ServicePrefix = "api/";
        private readonly string _UrlService;
        private LoginService _LoginService;

        public UbigeoService()
        {
            _LoginService = new LoginService();
            _UrlService = System.Configuration.ConfigurationManager.AppSettings["ServiceMercurial"].ToString();
        }

        public List<UbigeoPeruDepartmentRsl> GetListDepartments()
        {
            List<UbigeoPeruDepartmentRsl> request = new List<UbigeoPeruDepartmentRsl>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetListDepartments),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<UbigeoPeruDepartmentRsl>>(
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

        public List<UbigeoPeruProvinceRsl> GetListProvinces(string departamento)
        {
            List<UbigeoPeruProvinceRsl> request = new List<UbigeoPeruProvinceRsl>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetListProvinces, departamento),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<UbigeoPeruProvinceRsl>>(
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

        public List<UbigeoPeruDistrictRsl> GetListDistricts(string departamento, string provincia)
        {
            List<UbigeoPeruDistrictRsl> request = new List<UbigeoPeruDistrictRsl>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetListDistricts, departamento, provincia),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<UbigeoPeruDistrictRsl>>(
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


    }
}
