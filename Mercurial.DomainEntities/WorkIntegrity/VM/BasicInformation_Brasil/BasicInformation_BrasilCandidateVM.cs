using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.BasicInformation_Brasil
{
    public class BasicInformation_BrasilCandidateVM
    {
        public long idInfoBasica { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string Nombre { get; set; }
        public string RG { get; set; }
        public string CPF { get; set; }
        public string Situacion_CPF_RF { get; set; }
        public int IdSexo { get; set; }
        public string DesSexo { get; set; }
        public string FechaNacimiento { get; set; }
        public int IdSignoZodiaco { get; set; }
        public string DesSignoZodiaco { get; set; }
        public int Edad { get; set; }
        public string Nacionalidad { get; set; }
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
        public string RangoIngresosPresumidos { get; set; }
        public string Puntaje { get; set; }
        public string SocioAdministrador { get; set; }
        public string CPNJ { get; set; }
        public string TamanoEmpresa { get; set; }
        public string RazonSocial { get; set; }
        public string Endereco { get; set; }
        public string CNP { get; set; }

    }
}
