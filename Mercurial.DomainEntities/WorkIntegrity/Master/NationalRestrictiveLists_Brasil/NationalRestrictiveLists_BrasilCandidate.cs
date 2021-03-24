using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.NationalRestrictiveLists_Brasil
{
    public class NationalRestrictiveLists_BrasilCandidate
    {
        public long IdListaRestrictivaNacionalBra { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public int IdPoderJuridicoCivil { get; set; }
        public Archive ArchivoAdjunto_PoderJudicial_MandadoPrision { get; set; }
        public int IdPoderJuridicoFederal { get; set; }
        public Archive ArchivoAdjunto_PoderJudicial_LavaJato { get; set; }
        public string PoderEjecutivo_CVM { get; set; }
        public Archive ArchivoAdjunto_PoderEjecutivo_CVM { get; set; }
        public string InfoAdicional_MEI { get; set; }
        public Archive ArchivoAdjunto_InfoAdicional_MEI { get; set; }
        public string InfoAdicional_PEP { get; set; }
        public Archive ArchivoAdjunto_InfoAdicional_PEP { get; set; }
        public string InfoAdicional_FuncPublico { get; set; }
        public Archive ArchivoAdjunto_InfoAdicional_FuncPublico { get; set; }
    }
}
