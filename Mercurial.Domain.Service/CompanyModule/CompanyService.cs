using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.Company;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Company;
using Mercurial.DomainEntities.Work;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Mercurial.Domain.Service.Company
{
    public class CompanyService: ICompanyService
    {
        private readonly string _ServicePrefix = "api/";
        private readonly string _UrlService;
        private LoginService _LoginService;

        public CompanyService()
        {
            _LoginService = new LoginService();
            _UrlService = System.Configuration.ConfigurationManager.AppSettings["ServiceMercurial"].ToString();
        }

        public List<GetCompanyRsl> GetListCompanies(int? IdPais, bool? Flg_Estado)
        {
            List<GetCompanyRsl> request = new List<GetCompanyRsl>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetCompanys, IdPais, Flg_Estado),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<GetCompanyRsl>>(
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

        public ApiResponse SaveCompany(string stringJson)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                //int IdEmpresa = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString());
                CompanyFlt saveEntity = JsonConvert.DeserializeObject<CompanyFlt>(stringJson);

                foreach (var item in saveEntity.ListBranchOfficeFlt)
                {
                    item.IdEmpresa = saveEntity.IdEmpresa;
                    item.IdPais = saveEntity.IdPais;
                    item.IdUsuarioAccion = IdUsuario;
                    item.IdUsuarioCreacion = IdUsuario;
                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlSaveCompany),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public List<GetBranchOfficesIntegrity> getListBranchOffice(int IdEmpresa)
        {
            List<GetBranchOfficesIntegrity> ListBranchOffice = new List<GetBranchOfficesIntegrity>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlGetBranchOffices, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse.status.Equals("OK"))
                {
                    ListBranchOffice = JsonConvert.DeserializeObject<List<GetBranchOfficesIntegrity>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                ListBranchOffice = null;
            }
            return ListBranchOffice;
        }


    }
}
