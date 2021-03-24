using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.InterestInformation.RSL
{
    public class InterestInformationRsl
    {
        public long IdInfoInteres { get; set; }
        public string NombreArchivo { get; set; }
        public string RutaArchivo { get; set; }
        public string ExtensionArchivo { get; set; }
        public string FecRegistro { get; set; }
        public string FecModificacion { get; set; }
        public int IdUsuarioRegistro { get; set; }
        public string UsuarioEnvio { get; set; }
        public int IdEmpresa { get; set; }
        public string Empresa { get; set; }
        public string Asunto { get; set; }
        public int IdPais { get; set; }
        public string Pais { get; set; }
    }
}
