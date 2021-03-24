using Mercurial.DomainEntities.Mail;
using Mercurial.DomainEntities.WorkIntegrity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.CrossCuting.Utilities
{
    public class SendMail
    {
        public enum MailCompose{
            NewSolicitud = 0,
            ChangeStatusSoli = 1,
            recoverPassword = 2
        }
      
        public List<Message> ComposeMail(List<MailWorkIntegrity> mailList, MailCompose  mailCompose =MailCompose.NewSolicitud)
        {
            List<Message> list = new List<Message>();

            string subject = string.Empty;
            string keySubject = string.Empty;
            string body = string.Empty;
            string keyBody = string.Empty;
            string cliente = string.Empty;

            try
            {
                foreach (MailWorkIntegrity item in mailList)
                {
                    keySubject = item.keySubject;
                    keyBody = item.keyBody;

                    cliente = item.Usuario;
                    if(mailCompose == MailCompose.NewSolicitud) { 
                    subject = ComposeSubject(keySubject,item.SubjectText);
                    body = ComposeBody(keyBody, cliente,item.NroSolicitud,item.EstadoSol,item.Telefono,item.Empresa);
                    }
                    else if( mailCompose == MailCompose.ChangeStatusSoli)
                    {
                        subject = ComposeSubject(keySubject, item.SubjectText);
                        body = ComposeBodyChangeSol(keyBody, cliente, item.NroSolicitud, item.EstadoSol, item.Telefono, item.Empresa,item.DesServicio);
                    }
                    else if (mailCompose == MailCompose.recoverPassword)
                    {
                        subject = ComposeSubject(keySubject, item.SubjectText);
                        body = ComposeBodyRecoverPassword(keyBody,item.enlace);
                    }

                    list.Add(new Message
                    {
                        Address = item.Correo,
                        Subject = subject,
                        Body = body
                    });
                }
            }
            catch (Exception ex)
            {
            }

            return list;
        }
        private string ComposeSubject(string key, string[] value)
        {
            return string.Format(GetValueConfig(key),value);
        }
        private string ComposeBody(string key, string nombre,  string nroSolicitud, string estadoSol,string telefono,string empresa)
        {
            string path = string.Format("{0}{1}", GetValueConfig("Templates"), GetValueConfig(key));

            string readText = File.ReadAllText(path);
            
            return readText
                .Replace("[username]", nombre)
                .Replace("[Empresa]", empresa)
                .Replace("[EstadoSol]", estadoSol)
                .Replace("[NroSolicitud]", nroSolicitud)
                .Replace("[Telefono]", telefono);
        }
        private string ComposeBodyChangeSol(string key, string nombre, string nroSolicitud, string estadoSol, string telefono, string empresa,string DesServ)
        {
            string path = string.Format("{0}{1}", GetValueConfig("Templates"), GetValueConfig(key));

            string readText = File.ReadAllText(path);

            return readText
                .Replace("[username]", nombre)
                .Replace("[Empresa]", empresa)
                .Replace("[EstadoSol]", estadoSol)
                .Replace("[NroSolicitud]", nroSolicitud)
                .Replace("[Telefono]", telefono)
                .Replace("[DesServicios]", DesServ);
        }

        private string ComposeBodyRecoverPassword(string key, string enlace)
        {
            string path = string.Format("{0}{1}", GetValueConfig("Templates"), GetValueConfig(key));

            string readText = File.ReadAllText(path);

            return readText
                .Replace("[enlace]", enlace);
        }

        private string ComposeBodySolicitud(string key, string nombre, string documento, string aplicativo)
        {
            string path = string.Format("{0}{1}", GetValueConfig("Templates"), GetValueConfig(key));



            string readText = File.ReadAllText(path);

            return readText
                .Replace("[Nombre]", nombre)
                .Replace("[Documento]", string.Format("<br /><strong>{0}</strong>", documento))
                .Replace("[Aplicativo]", string.Format("<br /><strong>{0}</strong>", aplicativo));
        }



        public void SendMailAll(string address, string subject, string body, string[] fileEntries = null)
        {
            var message = new MailMessage();

            string AddressCopy = GetValueConfig("CopyAddress");
            
            message.To.Add(new MailAddress(address));
            if (AddressCopy != string.Empty) message.To.Add(new MailAddress(AddressCopy));
            message.Subject = subject;
            message.IsBodyHtml = true;

            string fileName = string.Format("{0}{1}", GetValueConfig("Templates"), "logo.png");

            AlternateView av = AlternateView.CreateAlternateViewFromString(body, null, MediaTypeNames.Text.Html);
            LinkedResource lr = new LinkedResource(fileName, MediaTypeNames.Image.Jpeg);

            lr.ContentId = "Logo";
            av.LinkedResources.Add(lr);

            message.AlternateViews.Add(av);
            message.Body = body;

            if (fileEntries != null)
            {
                foreach (string file in fileEntries)
                {
                    Attachment data = new Attachment(file, MediaTypeNames.Application.Octet);
                    ContentDisposition disposition = data.ContentDisposition;
                    disposition.CreationDate = File.GetCreationTime(file);
                    disposition.ModificationDate = File.GetLastWriteTime(file);
                    disposition.ReadDate = File.GetLastAccessTime(file);
                    message.Attachments.Add(data);
                }
            }

            try
            {
                using (var smtp = new SmtpClient())
                {
                    smtp.Send(message);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private string GetValueConfig(string key)
        {
            return ConfigurationManager.AppSettings[key];
        }

    }
}
