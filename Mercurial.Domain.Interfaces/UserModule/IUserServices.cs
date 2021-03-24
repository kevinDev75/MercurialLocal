using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Home;
using Mercurial.DomainEntities.User.RSL;
using Mercurial.DomainEntities.Work;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.Domain.Interfaces.UserModule
{
    public interface IUserServices
    {
        ApiResponse SaveUser(string stringJson);
        List<GetUserRsl> GetUsers(int? IdUsuario);
        List<GetUsers_RolRsl> GetUsers_Rol(int IdRol);
        List<CountryRsl> GetCountries();
        List<Rol> GetRoles();
        List<DocumentType> GetListTypeDocument(int Pais, int Opcion);
        List<GetZodiacSignRsl> GetListZodiacSign(int Pais);
    }
}
