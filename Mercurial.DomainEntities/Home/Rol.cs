using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Home
{
    public class Rol
    {
        public string IdRol { get; set; }
        public string Description { get; set; }
    }

    public class RolAccesoRsl
    {
        public int IdRol { get; set; }
        public int IdAcceso { get; set; }
        public string NombreAcceso { get; set; }
        public string Descripcion { get; set; }
        public int NumNivel { get; set; }
        public int EstadoAcceso { get; set; }
        public int IndSubMenu { get; set; }
        public string Control { get; set; }
        public string View { get; set; }
        public int Orden { get; set; }
        public string Icon { get; set; }
    }
}
