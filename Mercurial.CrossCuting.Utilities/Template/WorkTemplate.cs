using Mercurial.DomainEntities;
using Mercurial.DomainEntities.WorkIntegrity.work270;
using SautinSoft.Document;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Office.Interop.Word;
using System.Web;
using System.Runtime.InteropServices;
using System.Web.Hosting;
using System.Web.UI.WebControls;
using System.Web.Routing;
using Mercurial.DomainEntities.WorkIntegrity.Master;
using iTextSharp.text.pdf;
using iTextSharp.text;
using Document = Microsoft.Office.Interop.Word.Document;
using Mercurial.DomainEntities.WorkIntegrity.work360;
using Mercurial.DomainEntities.WorkIntegrity.work180;
using Mercurial.DomainEntities.WorkIntegrity.work180plus;
using Mercurial.DomainEntities.WorkIntegrity.work360plus;
using Mercurial.DomainEntities.WorkIntegrity.work270plus;
using Mercurial.DomainEntities.WorkIntegrity.work90;
using Mercurial.DomainEntities.WorkIntegrity.work90plus;
using Mercurial.DomainEntities.WorkIntegrity.work03Brasil;
using Mercurial.DomainEntities.WorkIntegrity.VM.Polygraph;

namespace Mercurial.CrossCuting.Utilities.Template
{
    public class WorkTemplate
    {

        public ApiResponse CreateDocumentWord(TemplateParameters parameters,List<Int32> ListDeleteTables)
        {
            ApiResponse response = new ApiResponse("0", string.Empty);
            try {
                string typeFile = ".docx";

                string NameFileOut = parameters.pathOut + "\\" +
                                    string.Format("{0}_{1}", parameters.idIntegridad, parameters.idIntegridadDet);

                //(Odio usar archivos temporales pero no tuve de otra)
                string pathFileOut = string.Format("{0}.pdf", NameFileOut);
                string pathFileOutTemp = string.Format("{0}.docx", NameFileOut);

                MemoryStream ms = new MemoryStream();

                using (FileStream fs = new FileStream(parameters.pathFile, FileMode.Open, FileAccess.Read))
                {
                    fs.CopyTo(ms);
                }

                byte[] OutByte;
                using (MemoryStream memoryOut = new MemoryStream())
                {
                    using (var factory = NGS.Templater.Configuration.Factory.Open(ms, memoryOut, typeFile))
                    {

                        if (parameters.movementType == TemplateEnum.MovementType.PeruTemplate90)
                        {
                            GenericTemplateIntegrity90Peru genericTemplate = new GenericTemplateIntegrity90Peru();
                            genericTemplate.Data = new ObservableCollection<MasterClient90PeruVM> { (MasterClient90PeruVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }
                        if (parameters.movementType == TemplateEnum.MovementType.PeruTemplate90Plus)
                        {
                            GenericTemplateIntegrity90PlusPeru genericTemplate = new GenericTemplateIntegrity90PlusPeru();
                            genericTemplate.Data = new ObservableCollection<MasterClient90PlusPeruVM> { (MasterClient90PlusPeruVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }

                        if (parameters.movementType == TemplateEnum.MovementType.PeruTemplate270)
                        {
                            GenericTemplateIntegrity270 genericTemplate = new GenericTemplateIntegrity270();
                            genericTemplate.Data = new ObservableCollection<MasterClient270VM> { (MasterClient270VM)parameters.generic };
                            factory.Process(genericTemplate);
                        }
                        if (parameters.movementType == TemplateEnum.MovementType.PeruTemplate270Plus)
                        {
                            GenericTemplateIntegrity270PlusPeru genericTemplate = new GenericTemplateIntegrity270PlusPeru();
                            genericTemplate.Data = new ObservableCollection<MasterClient270PlusPeruVM> { (MasterClient270PlusPeruVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }
                        if (parameters.movementType == TemplateEnum.MovementType.PeruTemplate180)
                        {
                            GenericTemplateIntegrity180Peru genericTemplate = new GenericTemplateIntegrity180Peru();
                            genericTemplate.Data = new ObservableCollection<MasterClient180PeruVM> { (MasterClient180PeruVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }
                        if (parameters.movementType == TemplateEnum.MovementType.PeruTemplate180Plus)
                        {
                            GenericTemplateIntegrity180PlusPeru genericTemplate = new GenericTemplateIntegrity180PlusPeru();
                            genericTemplate.Data = new ObservableCollection<MasterClient180PlusPeruVM> { (MasterClient180PlusPeruVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }

                        if (parameters.movementType == TemplateEnum.MovementType.PeruTemplate360)
                        {
                            GenericTemplateIntegrity360Peru genericTemplate = new GenericTemplateIntegrity360Peru();
                            genericTemplate.Data = new ObservableCollection<MasterClient360PeruVM> { (MasterClient360PeruVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }
                        if (parameters.movementType == TemplateEnum.MovementType.PeruTemplate360Plus)
                        {
                            GenericTemplateIntegrity360PlusPeru genericTemplate = new GenericTemplateIntegrity360PlusPeru();
                            genericTemplate.Data = new ObservableCollection<MasterClient360PlusPeruVM> { (MasterClient360PlusPeruVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }
                        if (parameters.movementType == TemplateEnum.MovementType.ColombiaTemplate270)
                        {
                            GenericTemplateIntegrity270Colombia genericTemplate = new GenericTemplateIntegrity270Colombia();
                            genericTemplate.Data = new ObservableCollection<MasterClient270ColombiaVM> { (MasterClient270ColombiaVM)parameters.generic};
                            factory.Process(genericTemplate);
                        }
                        if (parameters.movementType == TemplateEnum.MovementType.ColombiaTemplate270Plus)
                        {
                            GenericTemplateIntegrity270PlusColombia genericTemplate = new GenericTemplateIntegrity270PlusColombia();
                            genericTemplate.Data = new ObservableCollection<MasterClient270PlusColombiaVM> { (MasterClient270PlusColombiaVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }

                        if (parameters.movementType == TemplateEnum.MovementType.ColombiaTemplate180)
                        {
                            GenericTemplateIntegrity180Colombia genericTemplate = new GenericTemplateIntegrity180Colombia();
                            genericTemplate.Data = new ObservableCollection<MasterClient180ColombiaVM> { (MasterClient180ColombiaVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }

                        if (parameters.movementType == TemplateEnum.MovementType.ColombiaTemplate180Plus)
                        {
                            GenericTemplateIntegrity180PlusColombia genericTemplate = new GenericTemplateIntegrity180PlusColombia();
                            genericTemplate.Data = new ObservableCollection<MasterClient180PlusColombiaVM> { (MasterClient180PlusColombiaVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }

                        if (parameters.movementType == TemplateEnum.MovementType.ColombiaTemplate360)
                        {
                            GenericTemplateIntegrity360Colombia genericTemplate = new GenericTemplateIntegrity360Colombia();
                            genericTemplate.Data = new ObservableCollection<MasterClient360ColombiaVM> { (MasterClient360ColombiaVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }

                        if (parameters.movementType == TemplateEnum.MovementType.ColombiaTemplate360Plus)
                        {
                            GenericTemplateIntegrity360PlusColombia genericTemplate = new GenericTemplateIntegrity360PlusColombia();
                            genericTemplate.Data = new ObservableCollection<MasterClient360PlusColombiaVM> { (MasterClient360PlusColombiaVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }
                        if (parameters.movementType == TemplateEnum.MovementType.ColombiaPoligrafo)
                        {
                            GenericTemplatePoligraphColombia genericTemplate = new GenericTemplatePoligraphColombia();
                            genericTemplate.Data = new ObservableCollection<PolygraphCandidateVM> { (PolygraphCandidateVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }
                        if (parameters.movementType == TemplateEnum.MovementType.BrasilTemplate03)
                        {

                            GenericTemplateIntegrity93Brasil genericTemplate = new GenericTemplateIntegrity93Brasil();

                            genericTemplate.Data = new ObservableCollection<MasterEntity03BrasilVM> { (MasterEntity03BrasilVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }
                        if (parameters.movementType == TemplateEnum.MovementType.BrasilTemplate270)
                        {

                            GenerateTemplateIntegrity270Brasil genericTemplate = new GenerateTemplateIntegrity270Brasil();

                            genericTemplate.Data = new ObservableCollection<MasterClient270BrasilVM> { (MasterClient270BrasilVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }
                        if (parameters.movementType == TemplateEnum.MovementType.BrasilTemplate360)
                        {

                            GenericTemplateIntegrity360Brasil genericTemplate = new GenericTemplateIntegrity360Brasil();

                            genericTemplate.Da = new ObservableCollection<MasterClient360BrasilVM> { (MasterClient360BrasilVM)parameters.generic };
                            factory.Process(genericTemplate);
                        }



                    }

                    OutByte = memoryOut.ToArray();
                    memoryOut.Close();

                    //var inputAsString = Convert.ToBase64String(memoryOut.ToArray(), 0, memoryOut.ToArray().Length);
                    //if (File.Exists(pathFileOut)) File.Delete(pathFileOut);
                    //File.WriteAllBytes(pathFileOut, Convert.FromBase64String(inputAsString));


                }

                ConvertDocumentToPDF(OutByte, pathFileOut, pathFileOutTemp, parameters.ImagesRoute, ListDeleteTables);

            } catch (Exception ex)
            {
                response.status = "1";
                response.msg = ex.Message;
                //InserLog
            }
            return response;
        }                         


        private void ReplaceTextFormat(string value, string valueReplace, ref Application app)
        {
            object matchCase = false;
            object matchWholeWord = true;
            object matchWildCards = false;
            object matchSoundsLike = false;
            object matchAllWordForms = false;
            object forward = true;
            object format = false;
            object matchKashida = false;
            object matchDiacritics = false;
            object matchAlefHamza = false;
            object matchControl = false;
            object read_only = false;
            object visible = true;
            object replace = 2;
            object wrap = 1;

            object v1 = (object)value;
            object vReplace = (object)valueReplace;
            app.Selection.Find.Execute(ref v1, ref matchCase, ref matchWholeWord,
                  ref matchWildCards, ref matchSoundsLike, ref matchAllWordForms, ref forward, ref wrap, ref format, ref vReplace, ref replace,
                  ref matchKashida, ref matchDiacritics, ref matchAlefHamza, ref matchControl);
        }

        private void TextFormat(string value, ref Application app,WdColor wdColor)
        {
            object matchCase = false;
            object matchWholeWord = true;
            object matchWildCards = false;
            object matchSoundsLike = false;
            object matchAllWordForms = false;
            object forward = true;
            object format = false;
            object matchKashida = false;
            object matchDiacritics = false;
            object matchAlefHamza = false;
            object matchControl = false;
            object read_only = false;
            object visible = true;
            object replace = 2;
            object wrap = 1;

            object v1 = (object)value;
            app.Selection.Find.Execute(value);
            Range range = app.Selection.Range;
            range.Font.Color = wdColor;

           // app.Selection.Find.Execute(ref v1, ref matchCase, ref matchWholeWord,
            //      ref matchWildCards, ref matchSoundsLike, ref matchAllWordForms, ref forward, ref wrap, ref format, ref vReplace, ref replace,
             //     ref matchKashida, ref matchDiacritics, ref matchAlefHamza, ref matchControl);
        }



        private void IncrustingImage(string routeFile ,List<Archive> ImageRoutes,string RoutePDF, List<Int32> ListDeleteTables)
        {
            object oMissing = System.Reflection.Missing.Value;

            object outputFile = (object)routeFile;

            Application wordApp = new Application();
            Document doc = wordApp.Documents.Open(ref outputFile, ref oMissing,
                                  ref oMissing, ref oMissing, ref oMissing, ref oMissing, ref oMissing,
                                  ref oMissing, ref oMissing, ref oMissing, ref oMissing, ref oMissing,
                                  ref oMissing, ref oMissing, ref oMissing, ref oMissing);
           try { 

                doc.Activate();


                var rangText = doc.Content;
                if (rangText.Find.Execute("Unlicensed version. Please register @ templater.info"))
                {
                    rangText.Expand(Microsoft.Office.Interop.Word.WdUnits.wdParagraph);
                    rangText.Delete();
                }
                object matchCase = false;
                object matchWholeWord = true;
                object matchWildCards = false;
                object matchSoundsLike = false;
                object matchAllWordForms = false;
                object forward = true;
                object format = false;
                object matchKashida = false;
                object matchDiacritics = false;
                object matchAlefHamza = false;
                object matchControl = false;
                object read_only = false;
                object visible = true;
                object replace = 2;
                object wrap = 1;

                //execute find and replace
                ReplaceTextFormat("True", "SI",ref wordApp);
                ReplaceTextFormat("False", "NO", ref wordApp);

                TextFormat("[[Medio]]", ref wordApp,WdColor.wdColorYellow);
                ReplaceTextFormat("[[Medio]]", "Medio", ref wordApp);

                TextFormat("[[Alto]]", ref wordApp, WdColor.wdColorRed);
                ReplaceTextFormat("[[Alto]]", "Alto", ref wordApp);

                TextFormat("[[Bajo]]", ref wordApp, WdColor.wdColorGreen);
                ReplaceTextFormat("[[Bajo]]", "Bajo", ref wordApp);

                TextFormat("[[Baixo]]", ref wordApp, WdColor.wdColorGreen);
                ReplaceTextFormat("[[Baixo]]", "Baixo", ref wordApp);
                //Replace Masculino
                //ReplaceTextFormat("[[Data.oBasicInformation_BrasilVm.Sexo]]", "Alto", ref wordApp);


                int contador = 1;

                foreach(Microsoft.Office.Interop.Word.Table tbl in doc.Tables)
                {
                    if (ListDeleteTables.Contains(contador))
                    {
                        tbl.Delete();
                    }
                    contador++;
                }


                foreach (var image in ImageRoutes.Where(x=> x.typeAdjunte == TypeAdjunte.image))
                {
                    Find fnd = wordApp.ActiveWindow.Selection.Find;
                    fnd.ClearFormatting();
                    fnd.Replacement.ClearFormatting();
                    fnd.Forward = true;
                    fnd.Wrap = WdFindWrap.wdFindContinue;

                    string imagePath = image.RutaArchivo;
                    var keyword =  "[[" + image.NameTypeFile + "]]";
                    var sel = wordApp.Selection;
                    // = string.Format("{{0}}", keyword);
                    sel.Find.Text = keyword;
                    wordApp.Selection.Find.Execute(keyword);
                    Range range = wordApp.Selection.Range;
                    if (range.Text != null && range.Text.Contains(keyword))
                    {
                        Range temprange = doc.Range(range.End - keyword.Length, range.End);  //keyword is of 4 charecter range.End - 4
                        temprange.Select();
                        Selection currentSelection = wordApp.Selection;
                        sel.Find.Execute(Replace: WdReplace.wdReplaceOne);
                        sel.Range.Select();
                        var imagePath1 = Path.GetFullPath(string.Format(imagePath, keyword));
                        InlineShape shape = sel.InlineShapes.AddPicture(FileName: imagePath1, LinkToFile: false, SaveWithDocument: true);
                        Shape sh = shape.ConvertToShape();
                        sh.Width = image.widthImage;
                        sh.Height= image.HeightImage;
                        //shape.ConvertToShape();
                        sh.WrapFormat.Type = WdWrapType.wdWrapSquare;
                        sh.Top = (float)Microsoft.Office.Interop.Word.WdShapePosition.wdShapeCenter;
                        sh.Left = (float)Microsoft.Office.Interop.Word.WdShapePosition.wdShapeCenter;
                    }
                }

                string[] ListRetir = new string[] { "FotoGrafico", "Firma", "FotoEntradaDomicilio", "FotoAmbienteSocial", "FotoHabitaciones", "FotoCocina" };


                foreach(string i in ListRetir)
                {
                    int exist = ImageRoutes.Where(x => x.NameTypeFile == i).Count();
                    if (exist == 0)
                    {

                        ReplaceTextFormat("[[" + i+ "]]", "", ref wordApp);
                    }
                }
                



                object outputFileName = RoutePDF;
                object fileFormat = WdSaveFormat.wdFormatPDF;

                doc.SaveAs(ref outputFileName,
                  ref fileFormat, ref oMissing, ref oMissing,
                  ref oMissing, ref oMissing, ref oMissing, ref oMissing,
                  ref oMissing, ref oMissing, ref oMissing, ref oMissing,
                  ref oMissing, ref oMissing, ref oMissing, ref oMissing);

                object saveChanges = WdSaveOptions.wdDoNotSaveChanges;

            }
            catch(Exception ex)
            {
                throw ex;
                //Elog.Save(ex.message);
            }
            finally
            {
                if (doc != null)
                {
                    ((_Document)doc).Close(ref oMissing, ref oMissing, ref oMissing);
                    Marshal.FinalReleaseComObject(doc);
                }
                if (wordApp != null)
                {
                    ((_Application)wordApp).Quit();
                    Marshal.FinalReleaseComObject(wordApp);
                }
            }

        }

        private void DeleteFile(string routeFile)
        {
            if (File.Exists(routeFile)) File.Delete(routeFile);
        }

        public void ConvertDocumentToPDF(byte[] bytes, string pathFileOut, string pathFileOutTemp, List<Archive> ImageRoutes, List<Int32> ListDeleteTables)
        {
            try
            {
                var inputAsString = Convert.ToBase64String(bytes.ToArray(), 0, bytes.ToArray().Length);
                File.WriteAllBytes(pathFileOutTemp, Convert.FromBase64String(inputAsString));

                DeleteFile(pathFileOut);
                //Incrustando Imagenes 
                IncrustingImage(pathFileOutTemp, ImageRoutes, pathFileOut,ListDeleteTables);

                if (ImageRoutes.Where(x => x.typeAdjunte == TypeAdjunte.pdf).Count() > 0)
                {
                    List<byte[]> listByte = new List<byte[]>();

                    Dictionary<int, byte[]> keyValues = new Dictionary<int, byte[]>();


                    using (MemoryStream PDFGenerate = new MemoryStream(File.ReadAllBytes(pathFileOut)))
                    {
                        keyValues = new Dictionary<int, byte[]> { { 0, PDFGenerate.ToArray() } };
                        //listByte.Add(PDFGenerate.ToArray());
                    } 

                    foreach (var file in ImageRoutes.Where(x => x.typeAdjunte == TypeAdjunte.pdf))
                    {
                        byte[] PdfBype = null;
                        if (File.Exists(file.RutaArchivo))
                        {
                            PdfBype = System.IO.File.ReadAllBytes(file.RutaArchivo);
                            if (PdfBype != null)
                            {
                                keyValues.Add(file.order,PdfBype);
                                //listByte.Add(PdfBype);
                            }
                        }
                    }
                    // byte[] PdfFinale = MergeFiles(listByte);
                    byte[] PdfFinale = MergeFiles(keyValues);
                    var inputFinale = Convert.ToBase64String(PdfFinale.ToArray(), 0, PdfFinale.ToArray().Length);
                    DeleteFile(pathFileOut);
                    File.WriteAllBytes(pathFileOut, Convert.FromBase64String(inputFinale));
                }

                File.Delete(pathFileOutTemp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        //public void ConvertDocumentToPDF(byte[] bytes, string pathFileOut,string pathFileOutTemp,List<Archive> ImageRoutes)
        //{

        //    try {

        //        var inputAsString = Convert.ToBase64String(bytes.ToArray(), 0, bytes.ToArray().Length);
        //        File.WriteAllBytes(pathFileOutTemp, Convert.FromBase64String(inputAsString));

        //        //Incrustando Imagenes 
        //        IncrustingImage(pathFileOutTemp, ImageRoutes,pathFileOut);
        //        //if (ImageRoutes != null && ImageRoutes.Count > 0)

        //        string textDelete = "Unlicensed version. Please register @ templater.info";

        //        DocumentCore document = DocumentCore.Load(pathFileOutTemp, new DocxLoadOptions());
        //        int countDel = 0;
        //        foreach (ContentRange cr in document.Content.Find(textDelete).Reverse())
        //        {
        //            cr.Delete();
        //            countDel++;
        //        }

        //        if (File.Exists(pathFileOut)) File.Delete(pathFileOut);

        //            if (ImageRoutes.Where(x=>x.typeAdjunte == TypeAdjunte.pdf).Count() > 0)
        //            {
        //                List<byte[]> listByte = new List<byte[]>();

        //                using (MemoryStream PDFGenerate = new MemoryStream())
        //                {
        //                    document.Save(PDFGenerate, SaveOptions.PdfDefault);
        //                    listByte.Add(PDFGenerate.ToArray());
        //                }

        //                foreach (var file in ImageRoutes.Where(x => x.typeAdjunte == TypeAdjunte.pdf))
        //                {
        //                   byte[] PdfBype = null;
        //                    if (File.Exists(file.RutaArchivo))
        //                    {
        //                        PdfBype = System.IO.File.ReadAllBytes(file.RutaArchivo);
        //                        if (PdfBype != null)
        //                        {
        //                            listByte.Add(PdfBype);
        //                        }
        //                    }
        //                }

        //                byte[] PdfFinale = MergeFiles(listByte);
        //                var inputFinale = Convert.ToBase64String(PdfFinale.ToArray(), 0, PdfFinale.ToArray().Length);
        //                File.WriteAllBytes(pathFileOut, Convert.FromBase64String(inputFinale));
        //            }

        //            else
        //            {
        //                document.Save(pathFileOut); 
        //            }


        //        File.Delete(pathFileOutTemp);
        //    }
        //    catch(Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public static byte[] MergeFiles(Dictionary<int,byte[]> sourceFiles)
        {
            iTextSharp.text.Document document = new iTextSharp.text.Document();
            using (MemoryStream ms = new MemoryStream())
            {
                PdfCopy copy = new PdfCopy(document, ms);
                document.Open();
                int documentPageCounter = 0;

                sourceFiles = sourceFiles.OrderBy(x => x.Key).ToDictionary(x => x.Key, x => x.Value);


                // Iterate through all pdf documents

                foreach (KeyValuePair<int,byte[]> pair in sourceFiles)
                {
                    // Create pdf reader
                    PdfReader reader = new PdfReader(pair.Value);
                    int numberOfPages = reader.NumberOfPages;

                    // Iterate through all pages
                    for (int currentPageIndex = 1; currentPageIndex <= numberOfPages; currentPageIndex++)
                    {
                        documentPageCounter++;
                        PdfImportedPage importedPage = copy.GetImportedPage(reader, currentPageIndex);
                        PdfCopy.PageStamp pageStamp = copy.CreatePageStamp(importedPage);

                        // Write header
                        ColumnText.ShowTextAligned(pageStamp.GetOverContent(), iTextSharp.text.Element.ALIGN_CENTER,
                            new Phrase(""), importedPage.Width / 2, importedPage.Height - 30,
                            importedPage.Width < importedPage.Height ? 0 : 1);

                        // Write footer
                        ColumnText.ShowTextAligned(pageStamp.GetOverContent(), iTextSharp.text.Element.ALIGN_CENTER,
                            new Phrase(String.Format("", documentPageCounter)), importedPage.Width / 2, 30,
                            importedPage.Width < importedPage.Height ? 0 : 1);

                        pageStamp.AlterContents();

                        copy.AddPage(importedPage);
                    }

                    copy.FreeReader(reader);
                    reader.Close();
                }

                document.Close();
                return ms.GetBuffer();
            }
        }



    }
}
