using Mercurial.DomainEntities.Ubigeo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.Domain.Interfaces.UbigeoModule
{
    public interface IUbigeoService
    {
        List<UbigeoPeruDepartmentRsl> GetListDepartments();
        List<UbigeoPeruProvinceRsl> GetListProvinces(string departamento);
        List<UbigeoPeruDistrictRsl> GetListDistricts(string departamento, string provincia);
    }
}
