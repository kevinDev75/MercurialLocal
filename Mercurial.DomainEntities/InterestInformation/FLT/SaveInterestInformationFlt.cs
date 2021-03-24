using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.InterestInformation.FLT
{
    public class SaveInterestInformationFlt
    {
        public long IdInfoInteres { get; set; }
        public string NombreArchivo { get; set; }
        public string RutaArchivo { get; set; }
        public string ExtensionArchivo { get; set; }
        public int IdUsuarioRegistro { get; set; }
        public int IdEmpresa { get; set; }
        public string Asunto { get; set; }
    }
}
