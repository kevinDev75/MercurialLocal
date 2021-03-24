using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Home;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.Domain.Interfaces.HomeModule
{
    public interface ILoginService
    {
        ApiResponse Authenticate(LoginRequest loginRequest);
        ApiResponse GetMenu(User user);
        ApiResponse GetAccess(int IdRol);
        //ApiResponse getIdUserxEmail(string Email);
        //ApiResponse SendMailRecover(string correo, string enlace);
        //ApiResponse sendCodeRecover(string codigo, Int32 idUsuario);
        //ApiResponse getCodexIdUsuario(int IdUsuario);
        //ApiResponse ChangePassword(UpdatePassword entitie);
    }
}
