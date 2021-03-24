using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.BasicInformationEvaluated
{
    public class BasicInformationEvaluatedCandidate
    {
        public long IdInfoBasicaEvaluado { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string NombresApellidos { get; set; }
        public int IdTipoDocIdentidad { get; set; }
        public string NumDocIdentidad { get; set; }
        public string Lugar_FecNacimiento { get; set; }
        public int Edad { get; set; }
        public string Direccion { get; set; }
        public string Telefonos { get; set; }
        public string email { get; set; }
        public int IdEstadoCivil { get; set; }
        public string NivelEducativo { get; set; }
        public string CargoAplica { get; set; }
        public DateTime? FechaVisita { get; set; }
        public string PersonasPresentesVisita { get; set; }
        public int IdTipoEvaluado { get; set; }
        public string ActividadesHobbie { get; set; }
        public string ProyectosProyecciones { get; set; }
        public string RptaProblemasJusticia { get; set; }
        public string RptaConsumidoEstupefacientes { get; set; }
    }
}
