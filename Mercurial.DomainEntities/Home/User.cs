using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Home
{
    public class User
    {
        public string IdUser { get; set; }
        public int idRol { get; set; }
        public List<Rol> ListRoles { get; set; }
        public string Username { get; set; }
        public int    Country { get; set; }
        public string Token { get; set; }
        public string idIdioma { get; set; }
        public int IdEmpresa { get; set; }
        public int IdSucursal { get; set; }
    }
}
