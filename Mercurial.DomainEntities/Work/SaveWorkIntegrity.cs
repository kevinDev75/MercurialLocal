using Mercurial.DomainEntities.Work.FLT;
using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Work
{
    public class SaveWorkIntegrity
    {
        public string IdEmpresa { get; set; }
        public int IdPais { get; set; }
        public string IdSucursal { get; set; }
        public string IdStatus { get; set; }
        public string IdFormaPago { get; set; }
        public string Progreso { get; set; }
        public string IdUsuario { get; set; }
        public string Comentario { get; set; }
        public List<WorkIntegrity_VoucherFlt> ListVoucher { get; set; }
        public List<WorkIntegrity_HabeasDataFlt> ListHabeasData { get; set; }
        public List<CollaboratorWork> ListInsertWorkIntegrityDetailRequest { get; set; }
         
    }
}
