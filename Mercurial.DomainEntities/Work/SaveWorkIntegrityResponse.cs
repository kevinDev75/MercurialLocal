using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Work
{
    public class SaveWorkIntegrityResponse
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public long IdIntegridad { get; set; }
        public string CodigoIntegridad { get; set; }
        public string NombreUsuario { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public string DescripcionStatus { get; set; }
        public string DescripcionEmpresa { get; set; }
        public string DescripcionSucursal { get; set; }
    }
}
