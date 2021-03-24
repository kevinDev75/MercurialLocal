using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.BasicCandidateInformation
{
    public class BasicCandidateInformationCandidateVM
    {
        public long IdInfoBasicaCand { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string NombresApellidos { get; set; }
        public int IdTipoDocIdentidad { get; set; }
        public string DesTipoDocIdentidad { get; set; }
        public string NumDocIdentidad { get; set; }
        public string Lugar_FecNacimiento { get; set; }
        public int Edad { get; set; }
        public int EstadoCivil { get; set; }
        public string DesEstadoCivil { get; set; }
        public string Direccion { get; set; }
        public string Telefonos { get; set; }
        public string LibretaMilitar { get; set; }
        public string Clase { get; set; }
        public string Email { get; set; }
        public string EPS { get; set; }
        public string FondoPensiones { get; set; }
        public string FondoCesantias { get; set; }
        public string NivelEducativo { get; set; }
        public string CargoAplica { get; set; }
        public bool ViajadoExterior { get; set; }
        public string Motivo { get; set; }
    }
}
