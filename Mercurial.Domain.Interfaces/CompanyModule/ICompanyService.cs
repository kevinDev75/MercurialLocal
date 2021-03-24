using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Company;
using Mercurial.DomainEntities.Work;
using System.Collections.Generic;

namespace Mercurial.Domain.Interfaces.Company
{
    public interface ICompanyService
    {
        List<GetCompanyRsl> GetListCompanies(int? IdPais, bool? Flg_Estado);
        ApiResponse SaveCompany(string stringJson);
        List<GetBranchOfficesIntegrity> getListBranchOffice(int IdEmpresa);
    }
}
