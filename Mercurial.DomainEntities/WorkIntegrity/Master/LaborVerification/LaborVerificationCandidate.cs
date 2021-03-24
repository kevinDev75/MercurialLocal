using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.LaborVerification
{
    public class LaborVerificationCandidate
    {
        public long IdVerifLaboral { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string NombreEmpresa { get; set; }
        public string CargoDesempeñado { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaTerminacion { get; set; }
        public string MotivoRetiro { get; set; }
        public string TiempoExperiencia { get; set; }
        public string NombrePersonBrindaInfo { get; set; }
        public string Cargo { get; set; }
        public string Telefonos_Correo { get; set; }
        public string ExpTotalCargoPostula { get; set; }
        public string ExpEspecifica { get; set; }
        public string DescripcionDesempeño { get; set; }
        public string PreguntaVolveriaAContratar { get; set; }
        public string Observaciones { get; set; }
        public string Conclusion { get; set; }
    }
}
