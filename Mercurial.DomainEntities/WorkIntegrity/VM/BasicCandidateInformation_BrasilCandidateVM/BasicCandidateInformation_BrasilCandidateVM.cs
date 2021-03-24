using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.BasicCandidateInformation_BrasilCandidateVM
{
    public class BasicCandidateInformation_BrasilCandidateVM
    {
        public long IdInfoBasicaCand { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string NombresApellidos { get; set; }
        public string NumDocIdentidad { get; set; }
        public string Direccion { get; set; }
        public string CiudadNacimiento { get; set; }
        public string Nacionalidad { get; set; }
        public string FechaNacimiento { get; set; }
        public int IdSignoZodiaco { get; set; }
        public string IdSexo { get; set; }
        public string DesSexo { get; set; }
        public int Edad { get; set; }
        public string IdEstadoCivil { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
    }
}
