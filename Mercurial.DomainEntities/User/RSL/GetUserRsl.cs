using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.User.RSL
{
    public class GetUserRsl
    {
        public int IdUsuario { get; set; }
        public int IdPais { get; set; }
        public int IdEmpresa { get; set; }
        public int IdSucursal { get; set; }
        public string NombreUsuario { get; set; }
        public string PassUsuario { get; set; }
        public bool EstadoUsuario { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public int IdTipoDocIdentidad { get; set; }
        public string DesTipoDocIdentidad { get; set; }
        public string NumDocIdentidad { get; set; }
        public string Telefono { get; set; }
        public int IdRol { get; set; }
    }
}
