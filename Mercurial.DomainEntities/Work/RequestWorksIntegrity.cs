using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Work
{
    public class RequestWorksIntegrity
    {
        public long IdIntegridad { get; set; }
        public string CodigoIntegridad { get; set; }
        public string Servicios { get; set; }
        public int Progreso { get; set; }
        public int IdEmpresa { get; set; }
        public string DescripcionEmpresa { get; set; }
        public int IdSucursal { get; set; }
        public string DescripcionSucursal { get; set; }
        public string FechaHoraReg { get; set; }
        public int IdStatus { get; set; }
        public string Status { get; set; }
        public string Pais { get; set; }
        public int IdUsuario { get; set; }
        public string Usuario { get; set; }
    }
}
