using System.Web;
using System.Web.Optimization;

namespace AppMercurial
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;

            #region JS

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                 "~/Scripts/bootstrap/bootstrap.bundle.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap-notify").Include(
                        "~/Scripts/bootstrap-notify/bootstrap-notify.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-ui").Include(
                        "~/Scripts/jquery-ui/datepicker.js"));

            bundles.Add(new ScriptBundle("~/bundles/perfect-scrollbar").Include(
                        "~/Scripts/perfect-scrollbar/perfect-scrollbar.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/moment").Include(
                        "~/Scripts/moment/min/moment.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/peity").Include(
                        "~/Scripts/peity/jquery.peity.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bracket").Include(
                        "~/Scripts/bracket/bracket.js"));

            bundles.Add(new ScriptBundle("~/bundles/timepicker").Include(
                        "~/Scripts/timepicker/jquery.timepicker.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables.net").Include(
                       "~/Scripts/datatables.net/jquery.dataTables.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables.net-dt").Include(
                       "~/Scripts/datatables.net-dt/dataTables.dataTables.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables.net-responsive").Include(
                       "~/Scripts/datatables.net-responsive/dataTables.responsive.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables.net-responsive-dt").Include(
                       "~/Scripts/datatables.net-responsive-dt/responsive.dataTables.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.steps").Include(
                        "~/Scripts/jquery.steps/jquery.steps.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/parsleyjs").Include(
                        "~/Scripts/parsleyjs/parsley.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/sweetalert").Include(
                        "~/Scripts/sweetalert/sweetalert2.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/main").Include(
                      "~/Scripts/main/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/layout").Include(
                      "~/Scripts/layout/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/config").Include(
                        "~/Scripts/config/index.js",
                        "~/Scripts/moment/moment.js",
                        "~/Scripts/function/master.js"));

            bundles.Add(new ScriptBundle("~/bundles/function").Include(
                        "~/Scripts/function/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/login").Include(
                        "~/Scripts/login/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/work-integrity").Include(
                       "~/Scripts/work-integrity/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/work-integrity-detail").Include(
                      "~/Scripts/work-integrity-detail/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/linq").Include(
                       "~/Scripts/linq.js/linq.js"));

            bundles.Add(new ScriptBundle("~/lib/select2").Include(
                       "~/lib/select2/js/select2.min.js"));

            bundles.Add(new ScriptBundle("~/lib/highlightjs").Include(
                       "~/lib/highlightjs/highlight.pack.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_90_peru").Include(
                      "~/Scripts/formats/analisis_riesgo_90_peru.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_90_plus_peru").Include(
                      "~/Scripts/formats/analisis_riesgo_90_plus_peru.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_180_peru").Include(
                      "~/Scripts/formats/analisis_riesgo_180_peru.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_270_peru").Include(
                       "~/Scripts/formats/analisis_riesgo_270_peru.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_360_peru").Include(
                      "~/Scripts/formats/analisis_riesgo_360_peru.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_180_plus_peru").Include(
                      "~/Scripts/formats/analisis_riesgo_180_plus_peru.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_270_plus_peru").Include(
                       "~/Scripts/formats/analisis_riesgo_270_plus_peru.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_360_plus_peru").Include(
                      "~/Scripts/formats/analisis_riesgo_360_plus_peru.js"));

            bundles.Add(new ScriptBundle("~/bundles/poligrafo_peru").Include(
                      "~/Scripts/formats/poligrafo_peru.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_360_plus_colombia").Include(
                      "~/Scripts/formats/analisis_riesgo_360_plus_colombia.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_360_colombia").Include(
                      "~/Scripts/formats/analisis_riesgo_360_colombia.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_270_plus_colombia").Include(
                      "~/Scripts/formats/analisis_riesgo_270_plus_colombia.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_270_colombia").Include(
                      "~/Scripts/formats/analisis_riesgo_270_colombia.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_180_plus_colombia").Include(
                      "~/Scripts/formats/analisis_riesgo_180_plus_colombia.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_180_colombia").Include(
                      "~/Scripts/formats/analisis_riesgo_180_colombia.js"));

            bundles.Add(new ScriptBundle("~/bundles/poligrafo_colombia").Include(
                      "~/Scripts/formats/poligrafo_colombia.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_03_brasil").Include(
                      "~/Scripts/formats/analisis_riesgo_03_brasil.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_270_brasil").Include(
                      "~/Scripts/formats/analisis_riesgo_270_brasil.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_360_brasil").Include(
                      "~/Scripts/formats/analisis_riesgo_360_brasil.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_270_plus_brasil").Include(
                      "~/Scripts/formats/analisis_riesgo_270_plus_brasil.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_basico_peru").Include(
                      "~/Scripts/formats/analisis_riesgo_basico_peru.js"));

            bundles.Add(new ScriptBundle("~/bundles/analisis_riesgo_premium_peru").Include(
                      "~/Scripts/formats/analisis_riesgo_premium_peru.js"));

            bundles.Add(new ScriptBundle("~/bundles/ciberseguridad").Include(
                      "~/Scripts/ciberseguridad/ciberseguridad.js"));

            bundles.Add(new ScriptBundle("~/bundles/safety").Include(
                      "~/Scripts/safety/safety.js"));

            bundles.Add(new ScriptBundle("~/bundles/users").Include(
                      "~/Scripts/users/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/companys").Include(
                      "~/Scripts/administration/companys.js"));

            bundles.Add(new ScriptBundle("~/bundles/asset-manager").Include(
                      "~/Scripts/asset-manager/asset-manager.js"));

            bundles.Add(new ScriptBundle("~/bundles/riskmap").Include(
                      "~/Scripts/riskmap/riskmap.js"));

            bundles.Add(new ScriptBundle("~/bundles/riskmanagement").Include(
                      "~/Scripts/riskmanagement/riskmanagement.js"));

            bundles.Add(new ScriptBundle("~/bundles/gestion-corporativa").Include(
                      "~/Scripts/corporate-services/gestion-corporativa.js"));

            bundles.Add(new ScriptBundle("~/bundles/mapas-sectoriales").Include(
                      "~/Scripts/corporate-services/mapas-sectoriales.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n").Include(
            "~/Scripts/jquery.i18n/jquery.i18n.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n.messagestore").Include(
                "~/Scripts/jquery.i18n/jquery.i18n.messagestore.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n.fallbacks").Include(
                "~/Scripts/jquery.i18n/jquery.i18n.fallbacks.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n.language").Include(
                "~/Scripts/jquery.i18n/jquery.i18n.language.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n.parser").Include(
                "~/Scripts/jquery.i18n/jquery.i18n.parser.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n.emitter").Include(
                "~/Scripts/jquery.i18n/jquery.i18n.emitter.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n.emitter.bidi").Include(
                "~/Scripts/jquery.i18n/jquery.i18n.emitter.bidi.js"));

            bundles.Add(new ScriptBundle("~/bundles/internationalization").Include(
                "~/Scripts/internationalization/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/pdf/jquery-ui").Include(
                "~/Scripts/pdf/jquery-ui.js"));

            bundles.Add(new ScriptBundle("~/bundles/pdf/pdf-min").Include(
                "~/Scripts/pdf/pdf.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/pdf/pdf-worker").Include(
                "~/Scripts/pdf/pdf.worker.js"));
            #endregion


            #region CSS

            bundles.Add(new StyleBundle("~/Content/fortawesome").Include(
                     "~/Content/fortawesome/all.min.css"));

            bundles.Add(new StyleBundle("~/Content/ionicons").Include(
                     "~/Content/ionicons/css/ionicons.min.css"));

            bundles.Add(new StyleBundle("~/lib/style-select2").Include(
                     "~/lib/select2/css/select2.min.css"));

            bundles.Add(new StyleBundle("~/lib/style-github").Include(
                     "~/lib/highlightjs/styles/github.css"));

            bundles.Add(new StyleBundle("~/Content/bracket").Include(
                     "~/Content/bracket.css"));

            bundles.Add(new StyleBundle("~/Content/timepicker").Include(
                     "~/Content/timepicker/jquery.timepicker.css"));

            bundles.Add(new StyleBundle("~/Content/datatables.net-dt").Include(
                     "~/Content/datatables.net-dt/css/jquery.dataTables.min.css"));

            bundles.Add(new StyleBundle("~/Content/datatables.net-responsive-dt").Include(
                     "~/Content/datatables.net-responsive-dt/responsive.dataTables.min.css"));

            bundles.Add(new StyleBundle("~/Content/sweetalert").Include(
                        "~/Content/sweetalert/sweetalert.css"));

            bundles.Add(new StyleBundle("~/Content/sweetalert-minimal").Include(
                        "~/Content/sweetalert/minimal.css"));

            bundles.Add(new StyleBundle("~/Content/Shared").Include(
                     "~/Content/Views/Shared/style.css"));

            bundles.Add(new StyleBundle("~/Content/Login").Include(
                     "~/Content/Views/Login/Index.css"));

            bundles.Add(new StyleBundle("~/Content/pdf/jquery-ui").Include(
                     "~/Content/pdf/jquery-ui.css"));

            #endregion

        }
    }
}
