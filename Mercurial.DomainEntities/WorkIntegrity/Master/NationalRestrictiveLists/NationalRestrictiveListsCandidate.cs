using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.NationalRestrictiveLists
{
    public class NationalRestrictiveListsCandidate
    {
        public long IdListaRestrictivaNacional { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public Archive ArchivoAntecFiscal { get; set; }
        public string AntecFiscal { get; set; }
        public Archive ArchivoAntecDisciplinario { get; set; }
        public string AntecDisciplinario { get; set; }
        public Archive ArchivoSIMIT { get; set; }
        public string SIMIT { get; set; }
        public Archive ArchivoRUNT { get; set; }
        public string RUNT { get; set; }
        public Archive ArchivoConsulAfiliadosBDUA { get; set; }
        public string ConsulAfiliadosBDUA { get; set; }
        public Archive ArchivoPersoExpuestaPoliticamente { get; set; }
        public string PersoExpuestaPoliticamente { get; set; }
        public Archive ArchivoPoliciaNacional { get; set; }
        public string PoliciaNacional { get; set; }
    }
}
