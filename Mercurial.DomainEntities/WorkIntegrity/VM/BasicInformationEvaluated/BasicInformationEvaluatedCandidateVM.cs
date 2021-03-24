using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.BasicInformationEvaluated
{
    public class BasicInformationEvaluatedCandidateVM
    {
        public long IdInfoBasicaEvaluado { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string NombresApellidos { get; set; }
        public int IdTipoDocIdentidad { get; set; }
        public string DesTipoDocIdentidad { get; set; }
        public string NumDocIdentidad { get; set; }
        public string Lugar_FecNacimiento { get; set; }
        public int Edad { get; set; }
        public string Direccion { get; set; }
        public string Telefonos { get; set; }
        public string email { get; set; }
        public int IdEstadoCivil { get; set; }
        public string DesEstadoCivil { get; set; }
        public string NivelEducativo { get; set; }
        public string CargoAplica { get; set; }
        public string FechaVisita { get; set; }
        public string PersonasPresentesVisita { get; set; }
        public int IdTipoEvaluado { get; set; }
        public string DesTipoEvaluado { get; set; }
        public string ActividadesHobbie { get; set; }
        public string ProyectosProyecciones { get; set; }
        public string RptaProblemasJusticia { get; set; }
        public string RptaConsumidoEstupefacientes { get; set; }
    }
}
