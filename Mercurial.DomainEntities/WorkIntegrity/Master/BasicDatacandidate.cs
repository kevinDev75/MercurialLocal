using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master
{
    public class BasicDatacandidate
    {
        public BasicDatacandidate()
        {
            this.DesSexo = string.Empty;
            this.Direccion = string.Empty;
        }

        public long? IdDatoBasico { get; set; }
        public long? IdIntegridad { get; set; }
        public int? ItemIntegridadDet { get; set; }
        public string Nombre { get; set; }
        public string Identificacion { get; set; }
        public string LugarNacimiento { get; set; }
        public string Nacionalidad { get; set; }
        public string FechaNacimiento { get; set; }
        public string Edad { get; set; }
        public int IdSignoZodiaco { get; set; }
        public int IdSexo { get; set; }
        public string DesSexo { get; set; }
        public int IdEstadoCivil { get; set; }
        //public string DesEstadoCivil { get; set; }
        public string RegistroGeneral { get; set; }
        public string Direccion { get; set; }
    }
}
