using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.BasicCandidateInformation_Brasil
{
    public class BasicCandidateInformation_BrasilCandidate
    {
        public long IdInfoBasicaCand { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string NombresApellidos { get; set; }
        public string NumDocIdentidad { get; set; }
        public string Direccion { get; set; }
        public string CiudadNacimiento { get; set; }
        public string Nacionalidad { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int IdSignoZodiaco { get; set; }
        public int IdSexo { get; set; }
        public string DesSexo { get; set; }
        public int Edad { get; set; }
        public string IdEstadoCivil { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
    }
}
