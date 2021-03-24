using Mercurial.DomainEntities.WorkIntegrity.Master;

namespace Mercurial.DomainEntities.RiskManagement.FLT
{
    public class SaveRiskManagementFlt
    {
        public long IdGestionRiesgos { get; set; }
        public int IdEmpresa { get; set; }
        public int IdSucursal { get; set; }
        public string Nombre { get; set; }
        public string Link { get; set; }
        public int IdTipoAlerta { get; set; }
        public int IdUsuarioEnvio { get; set; }
        public Archive ArchivoAdjunto1 { get; set; }
        public Archive ArchivoAdjunto2 { get; set; }
        public bool FlgEstado { get; set; }
    }
}

