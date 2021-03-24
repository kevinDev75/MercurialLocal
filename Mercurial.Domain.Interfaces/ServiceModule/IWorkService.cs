using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Master;
using Mercurial.DomainEntities.Work;
using Mercurial.DomainEntities.Work.VM;
using Mercurial.DomainEntities.WorkIntegrity.VM.Polygraph;
using Mercurial.DomainEntities.WorkIntegrity.work03Brasil;
using Mercurial.DomainEntities.WorkIntegrity.work180;
using Mercurial.DomainEntities.WorkIntegrity.work180plus;
using Mercurial.DomainEntities.WorkIntegrity.work270;
using Mercurial.DomainEntities.WorkIntegrity.work270plus;
using Mercurial.DomainEntities.WorkIntegrity.work360;
using Mercurial.DomainEntities.WorkIntegrity.work360plus;
using Mercurial.DomainEntities.WorkIntegrity.work90;
using Mercurial.DomainEntities.WorkIntegrity.work90plus;
using Mercurial.DomainEntities.WorkIntegrity.workbasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static Mercurial.CrossCuting.Utilities.Template.TemplateEnum;

namespace Mercurial.Domain.Interfaces.ServiceModule
{
    public interface IWorkService
    {
        List<DocumentType> GetListTypeDocument(int Pais);
        List<StatusCivil> GetListStatusCivil(int Pais);
        string CreateFolder(TypeFolder typeFolder, long IdIntegridad, int ItemIntegridadDet);
        List<GetServicesWorkIntegrity> getListWorkIntegrity(int Pais);
        List<GetPayMethodWorkIntegrity> getListPayMethodIntegrity(int Pais);
        List<GetBranchOfficesIntegrity> getListBranchOfficeIntegrity(int IdEmpresa);
        SaveWorkIntegrityResponse SaveWorkIntegrity (SaveWorkIntegrity saveWorkIntegrity, List<HttpPostedFile> files);
        List<RequestWorksIntegrity> ConsultRequestIntegrity(ConsultsRequestIntegrity Request);
        List<StatusRequestIntegrity> GetListStatusIntegrity(int Pais);
        List<CollaboratorWorkVM> GetListWorkIntegrityDetail(string IdIntegridad);
        GetWorkIntegrityVm GetWorkIntegrity(long IdIntegridad);
        List<ResponseExcelCollaborator> ValidateWorkIntegrityExcel(List<CollaboratorWork> Request);
        ApiResponse SaveRiskAnalysisFormat90Peru(string stringJson, List<HttpPostedFile> files);
        ApiResponse SaveRiskAnalysisFormatBasicPeru(string stringJson, List<HttpPostedFile> files);
        MasterClientBasicPeruVM GetRiskAnalysisFormatBasicPeru(string IdIntegridad, string ItemIntegridadDet);
        MasterClient90PeruVM GetRiskAnalysisFormat90Peru(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat90PlusPeru(string stringJson, List<HttpPostedFile> files);
        MasterClient90PlusPeruVM GetRiskAnalysisFormat90PlusPeru(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat180Peru(string stringJson, List<HttpPostedFile> files);
        MasterClient180PeruVM GetRiskAnalysisFormat180Peru(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat180PlusPeru(string stringJson, List<HttpPostedFile> files);
        MasterClient180PlusPeruVM GetRiskAnalysisFormat180PlusPeru(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveWorkIntegrityWork270(string stringJson, List<HttpPostedFile> files);
        MasterClient270VM GetRiskAnalysisFormat270Peru(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat270PlusPeru(string stringJson, List<HttpPostedFile> files);
        MasterClient270PlusPeruVM GetRiskAnalysisFormat270PlusPeru(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat360Peru(string stringJson, List<HttpPostedFile> files);
        MasterClient360PeruVM GetRiskAnalysisFormat360Peru(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat360PlusPeru(string stringJson, List<HttpPostedFile> files);
        MasterClient360PlusPeruVM GetRiskAnalysisFormat360PlusPeru(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveFormatPolygraphPeru(string stringJson, List<HttpPostedFile> files);
        PolygraphCandidateVM GetFormatPolygraphPeru(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse GenerateDocumentFinale(int IdIntegridad, int ItemIntegridadDet,int idFileDocument);

        ApiResponse GetDataCSVBrasil(HttpPostedFile files);

        //Colombia
        ApiResponse SaveRiskAnalysisFormat180Colombia(string stringJson, List<HttpPostedFile> files);
        MasterClient180ColombiaVM GetRiskAnalysisFormat180Colombia(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat180PlusColombia(string stringJson, List<HttpPostedFile> files);
        MasterClient180PlusColombiaVM GetRiskAnalysisFormat180PlusColombia(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveWorkIntegrityWork270Colombia(string stringJson, List<HttpPostedFile> files);
        MasterClient270ColombiaVM GetRiskAnalysisFormat270Colombia(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat270PlusColombia(string stringJson, List<HttpPostedFile> files);
        MasterClient270PlusColombiaVM GetRiskAnalysisFormat270PlusColombia(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat360Colombia(string stringJson, List<HttpPostedFile> files);
        MasterClient360ColombiaVM GetRiskAnalysisFormat360Colombia(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat360PlusColombia(string stringJson, List<HttpPostedFile> files);
        MasterClient360PlusColombiaVM GetRiskAnalysisFormat360PlusColombia(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveFormatPolygraphColombia(string stringJson, List<HttpPostedFile> files);
        PolygraphCandidateVM GetFormatPolygraphColombia(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat03Brasil(string stringJson, List<HttpPostedFile> files);
        MasterEntity03BrasilVM GetRiskAnalysisFormat03Brasil(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat270Brasil(string stringJson, List<HttpPostedFile> files);
        MasterClient270BrasilVM GetRiskAnalysisFormat270Brasil(string IdIntegridad, string ItemIntegridadDet);
        ApiResponse SaveRiskAnalysisFormat360Brasil(string stringJson, List<HttpPostedFile> files);
        MasterClient360BrasilVM GetRiskAnalysisFormat360Brasil(string IdIntegridad, string ItemIntegridadDet);
    }
        
  }

