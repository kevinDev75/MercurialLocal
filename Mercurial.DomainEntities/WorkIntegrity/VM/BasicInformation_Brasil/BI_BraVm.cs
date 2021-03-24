using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.BasicInformation_Brasil
{
    public class BI_BraVm
    {
        public long idInfoBasica { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string Nombre { get; set; }
        public string RG { get; set; }
        public string CPF { get; set; }
        public string Sit_CPF { get; set; }
        public int IdSexo { get; set; }
        public string DesSe { get; set; }
        public string FecNac { get; set; }
        public int IdSignoZodiaco { get; set; }
        public string DesSigZod { get; set; }
        public int Edad { get; set; }
        public string Nacionali { get; set; }
        public string ControlFraude { get; set; }
        public string PIS { get; set; }
        public string TituloElector { get; set; }
        public int IdEstadoCivil { get; set; }
        public string DesEstadoCivil { get; set; }
        public string HouseHold { get; set; }
        public string Obito { get; set; }
        public string Direccion { get; set; }
        public string Distrito { get; set; }
        public string Ciudad { get; set; }
        public string Estado { get; set; }
        public string CEP { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public string Colegio { get; set; }
        public string Profesion { get; set; }
        public string RangoIngrPres { get; set; }
        public string Puntaje { get; set; }
        public string SocAdmin { get; set; }
        public string CPNJ { get; set; }
        public string TamanoEmp { get; set; }
        public string RaSoc { get; set; }
        public string Endereco { get; set; }
        public string CNP { get; set; }
    }
}
