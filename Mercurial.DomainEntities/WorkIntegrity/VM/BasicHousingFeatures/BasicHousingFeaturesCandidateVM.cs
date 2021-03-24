using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.BasicHousingFeatures
{
    public class BasicHousingFeaturesCandidateVM
    {
        public int IdCaracteristicaBas { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string EstratoSocial { get; set; }
        public string Ubicacion { get; set; }
        public string TiempoResidencia { get; set; }
        public string Tipo { get; set; }
        public string ApreciacionInterna { get; set; }
        public string ApreciacionExterna { get; set; }
        public string ListServiciosPublicos { get; set; }
        public string ListDesServiciosPublicos { get; set; }
        public string ListServiciosInstalados { get; set; }
        public string ListDesServiciosInstalados { get; set; }
        public string Estado { get; set; }
        public string ServAlcantarillado { get; set; }
        public string UbicacionVivienda { get; set; }
        public int NroAlcobas { get; set; }
        public int NroBanos { get; set; }
        public int NroCocinas { get; set; }
        public string AmbienteSector { get; set; }
        public string ViasAcceso { get; set; }
        public string Propiedad { get; set; }
        public string Concepto { get; set; }
        public List<CommunityRelationShipDetailVM> ListCommunityRelationShipVm { get; set; }
    }
}
