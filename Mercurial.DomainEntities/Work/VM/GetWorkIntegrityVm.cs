using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Work.VM
{
    public class GetWorkIntegrityVm
    {
        public long IdIntegridad { get; set; }
        public string CodigoIntegridad { get; set; }
        public int IdEmpresa { get; set; }
        public int IdPais { get; set; }
        public int IdSucursal { get; set; }
        public int IdStatus { get; set; }
        public string FechaHoraReg { get; set; }
        public int IdFormaPago { get; set; }
        public int Progreso { get; set; }
        public int IdUsuario { get; set; }
        public string Comentario { get; set; }
        public List<WorkIntegrity_VoucherVm> ListVoucher { get; set; }
        public List<WorkIntegrity_HabeasDataVm> ListHabeasData { get; set; }
    }
}
