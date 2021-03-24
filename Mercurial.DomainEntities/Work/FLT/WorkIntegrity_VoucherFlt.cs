using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Work.FLT
{
    public class WorkIntegrity_VoucherFlt
    {
        public long IdIntegridad { get; set; }
        public int ItemIntegridadVoucher { get; set; }
        public string NombreArchivo { get; set; }
        public string RutaArchivo { get; set; }
        public string ExtensionArchivo { get; set; }
        public string FecRegistro { get; set; }
        public int IdUsuarioRegistro { get; set; }
    }
}
