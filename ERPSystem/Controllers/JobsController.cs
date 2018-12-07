using ERPSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Tracing;

using System.IO;
using System.Text;
using HtmlAgilityPack;
using System.Web;
using System.Text.RegularExpressions;
using iTextSharp.text.pdf;
using iTextSharp.text;
using iTextSharp.tool.xml;

namespace ERPSystem.Controllers
{

    public class ityextEvents : IPdfPageEvent
    {

        //Create object of PdfContentByte
        PdfContentByte pdfContent;

        public void OnChapter(PdfWriter writer, Document document, float paragraphPosition, Paragraph title)
        {
            throw new NotImplementedException();
        }

        public void OnChapterEnd(PdfWriter writer, Document document, float paragraphPosition)
        {
            throw new NotImplementedException();
        }

        public void OnCloseDocument(PdfWriter writer, Document document)
        {
            //throw new NotImplementedException();
        }

        public void OnEndPage(iTextSharp.text.pdf.PdfWriter writer, iTextSharp.text.Document document)
        {

            //create iTextSharp.text Image object using local image path
            //iTextSharp.text.Image imgPDF = iTextSharp.text.Image.GetInstance(HttpContext.Current.Server.MapPath(@"\UI\images\ees-logo.jpg"));

            //Create PdfTable object
            //PdfPTable pdfTab = new PdfPTable(2);

            //We will have to create separate cells to include image logo and 2 separate strings
            //PdfPCell pdfCell1 = new PdfPCell(imgPDF);
            //pdfCell1.Border = 0;
            //pdfCell1.FixedHeight = 50f;
            //pdfCell1.VerticalAlignment = Element.ALIGN_TOP;
            //pdfCell1.Rowspan = 3;
            //BaseFont bfHelvetica = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
            //PdfPTable pdfTab = new PdfPTable(3);
            //PdfPCell cell = new PdfPCell(new Phrase("Extreme Energy Services",new Font(bfHelvetica,20,Font.ITALIC,BaseColor.BLACK)));
            //cell.Colspan = 3;
            //cell.HorizontalAlignment = Element.ALIGN_CENTER;
            //cell.Border = 0;
            //pdfTab.AddCell(cell);

            //PdfPCell cell1 = new PdfPCell(new Phrase("Thru Tubing Fishing & Milling ", new Font(bfHelvetica, 12, Font.ITALIC, BaseColor.BLACK)));
            //cell1.Colspan = 3;
            //cell1.HorizontalAlignment = Element.ALIGN_CENTER;
            //cell1.Border = 0;
            //pdfTab.AddCell(cell1);

            //PdfPCell cell2 = new PdfPCell(new Phrase("1016 QCP Park Dr.  Broussard, La 70518", new Font(bfHelvetica, 12, Font.ITALIC, BaseColor.BLACK)));
            //cell2.Colspan = 3;
            //cell2.HorizontalAlignment = Element.ALIGN_CENTER;
            //cell2.Border = 0;
            //pdfTab.AddCell(cell2);

            //PdfPCell cell4 = new PdfPCell(new Phrase("Phone # 1-337-837-5600 / Fax # 1-337-837-5608", new Font(bfHelvetica, 12, Font.NORMAL, BaseColor.BLACK)));
            //cell4.Colspan = 3;
            //cell4.HorizontalAlignment = Element.ALIGN_CENTER;
            //cell4.Border = 0;
            //pdfTab.AddCell(cell4);

            //PdfPCell blankCell = new PdfPCell(new Phrase(Chunk.NEWLINE));
            //blankCell.Border = PdfPCell.NO_BORDER;
            //pdfTab.AddCell(blankCell);

            //BaseFont bfHelvetica = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
            //Font times = new Font(bfHelvetica, 14, Font.BOLD, BaseColor.BLACK);

            //PdfPCell pdfCell2 = new PdfPCell(new Phrase("Delivery Ticket", times));
            //pdfCell2.HorizontalAlignment = Element.ALIGN_CENTER;
            //pdfCell2.Rowspan = 1;
            //pdfCell2.Border = 0;

            //PdfPCell pdfCell4 = new PdfPCell(new Phrase("", times));
            //pdfCell4.HorizontalAlignment = Element.ALIGN_CENTER;
            //pdfCell2.Rowspan = 3;
            //pdfCell4.Border = 0;

            //Font times6 = new Font(bfHelvetica, 8, Font.BOLD, BaseColor.DARK_GRAY);
            //PdfPCell pdfCell3 = new PdfPCell(new Phrase("1016 QCP Park Drive Broussard La. 70518 (337) 837-5600 Fax (337) 837-5608", times6));
            //pdfCell3.HorizontalAlignment = Element.ALIGN_LEFT;
            //pdfCell3.PaddingRight = 40f;
            //pdfCell3.Border = 0;

            //add all three cells into PdfTable
            //pdfTab.AddCell(pdfCell1);
            //pdfTab.AddCell(pdfCell2);
            //pdfTab.AddCell(pdfCell3);
            //pdfTab.AddCell(pdfCell4);

            //pdfTab.TotalWidth = document.PageSize.Width - 20;
            //call WriteSelectedRows of PdfTable. This writes rows from PdfWriter in PdfTable
            //first param is start row. -1 indicates there is no end row and all the rows to be included to write
            //Third and fourth param is x and y position to start writing
           //pdfTab.WriteSelectedRows(0, -1, document.Left, document.PageSize.Height - 15, writer.DirectContent);

            //pdfTab.WriteSelectedRows(0, -1, document.Left, 820,writer.DirectContent);
            //set pdfContent value
            //pdfContent = writer.DirectContent;
            //Move the pointer and draw line to separate header section from rest of page

        }

        public void OnGenericTag(PdfWriter writer, Document document, Rectangle rect, string text)
        {
            throw new NotImplementedException();
        }

        public void OnOpenDocument(PdfWriter writer, Document document)
        {
            //throw new NotImplementedException();
        }

        public void OnParagraph(PdfWriter writer, Document document, float paragraphPosition)
        {
            //throw new NotImplementedException();
        }

        public void OnParagraphEnd(PdfWriter writer, Document document, float paragraphPosition)
        {
            //throw new NotImplementedException();
        }

        public void OnSection(PdfWriter writer, Document document, float paragraphPosition, int depth, Paragraph title)
        {
            throw new NotImplementedException();
        }

        public void OnSectionEnd(PdfWriter writer, Document document, float paragraphPosition)
        {
            throw new NotImplementedException();
        }

        public void OnStartPage(PdfWriter writer, Document document)
        {
            //throw new NotImplementedException();
        }
    }

    public class itytrextEvents : IPdfPageEvent
    {

        //Create object of PdfContentByte
        PdfContentByte pdfContent;

        public void OnChapter(PdfWriter writer, Document document, float paragraphPosition, Paragraph title)
        {
            throw new NotImplementedException();
        }

        public void OnChapterEnd(PdfWriter writer, Document document, float paragraphPosition)
        {
            throw new NotImplementedException();
        }

        public void OnCloseDocument(PdfWriter writer, Document document)
        {
            //throw new NotImplementedException();
        }

        public void OnEndPage(iTextSharp.text.pdf.PdfWriter writer, iTextSharp.text.Document document)
        {

            //create iTextSharp.text Image object using local image path
            //iTextSharp.text.Image imgPDF = iTextSharp.text.Image.GetInstance(HttpContext.Current.Server.MapPath(@"\UI\images\ees-logo.jpg"));

            //Create PdfTable object
            //PdfPTable pdfTab = new PdfPTable(2);

            //We will have to create separate cells to include image logo and 2 separate strings
            //PdfPCell pdfCell1 = new PdfPCell(imgPDF);
            //pdfCell1.Border = 0;
            //pdfCell1.FixedHeight = 50f;
            //pdfCell1.VerticalAlignment = Element.ALIGN_TOP;
            //pdfCell1.Rowspan = 3;
            //BaseFont bfHelvetica = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
            //PdfPTable pdfTab = new PdfPTable(3);

            //PdfPCell blankCell3 = new PdfPCell(new Phrase(Chunk.NEWLINE));
            //blankCell3.Colspan = 3;
            //blankCell3.Border = PdfPCell.NO_BORDER;
            //pdfTab.AddCell(blankCell3);

            //PdfPCell cellt = new PdfPCell(new Phrase("Check-In Sheet", new Font(bfHelvetica, 20, Font.ITALIC, BaseColor.BLACK)));
            //cellt.Colspan = 3;
            //cellt.HorizontalAlignment = Element.ALIGN_CENTER;
            //cellt.Border = 0;
            //pdfTab.AddCell(cellt);

            //PdfPCell cell = new PdfPCell(new Phrase("Extreme Energy Services", new Font(bfHelvetica, 19, Font.ITALIC, BaseColor.BLACK)));
            //cell.Colspan = 3;
            //cell.HorizontalAlignment = Element.ALIGN_CENTER;
            //cell.Border = 0;
            //pdfTab.AddCell(cell);

            //PdfPCell cell1 = new PdfPCell(new Phrase("Thru Tubing Fishing & Milling ", new Font(bfHelvetica, 12, Font.ITALIC, BaseColor.BLACK)));
            //cell1.Colspan = 3;
            //cell1.HorizontalAlignment = Element.ALIGN_CENTER;
            //cell1.Border = 0;
            //pdfTab.AddCell(cell1);

            //PdfPCell cell2 = new PdfPCell(new Phrase("1016 QCP Park Dr.  Broussard, La 70518", new Font(bfHelvetica, 12, Font.ITALIC, BaseColor.BLACK)));
            //cell2.Colspan = 3;
            //cell2.HorizontalAlignment = Element.ALIGN_CENTER;
            //cell2.Border = 0;
            //pdfTab.AddCell(cell2);

            //PdfPCell cell4 = new PdfPCell(new Phrase("Phone # 1-337-837-5600 / Fax # 1-337-837-5608", new Font(bfHelvetica, 12, Font.NORMAL, BaseColor.BLACK)));
            //cell4.Colspan = 3;
            //cell4.HorizontalAlignment = Element.ALIGN_CENTER;
            //cell4.Border = 0;
            //pdfTab.AddCell(cell4);

            //PdfPCell blankCell = new PdfPCell(new Phrase(Chunk.NEWLINE));
            //blankCell.Border = PdfPCell.NO_BORDER;
            //pdfTab.AddCell(blankCell);

            //PdfPCell blankCell1 = new PdfPCell(new Phrase(Chunk.NEWLINE));
            //blankCell1.Colspan = 3;
            //blankCell1.Border = PdfPCell.NO_BORDER;
            //pdfTab.AddCell(blankCell1);

            //BaseFont bfHelvetica = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
            //Font times = new Font(bfHelvetica, 14, Font.BOLD, BaseColor.BLACK);

            //PdfPCell pdfCell2 = new PdfPCell(new Phrase("Delivery Ticket", times));
            //pdfCell2.HorizontalAlignment = Element.ALIGN_CENTER;
            //pdfCell2.Rowspan = 1;
            //pdfCell2.Border = 0;

            //PdfPCell pdfCell4 = new PdfPCell(new Phrase("", times));
            //pdfCell4.HorizontalAlignment = Element.ALIGN_CENTER;
            //pdfCell2.Rowspan = 3;
            //pdfCell4.Border = 0;

            //Font times6 = new Font(bfHelvetica, 8, Font.BOLD, BaseColor.DARK_GRAY);
            //PdfPCell pdfCell3 = new PdfPCell(new Phrase("1016 QCP Park Drive Broussard La. 70518 (337) 837-5600 Fax (337) 837-5608", times6));
            //pdfCell3.HorizontalAlignment = Element.ALIGN_LEFT;
            //pdfCell3.PaddingRight = 40f;
            //pdfCell3.Border = 0;

            //add all three cells into PdfTable
            //pdfTab.AddCell(pdfCell1);
            //pdfTab.AddCell(pdfCell2);
            //pdfTab.AddCell(pdfCell3);
            //pdfTab.AddCell(pdfCell4);

            //pdfTab.TotalWidth = document.PageSize.Width - 20;
            //call WriteSelectedRows of PdfTable. This writes rows from PdfWriter in PdfTable
            //first param is start row. -1 indicates there is no end row and all the rows to be included to write
            //Third and fourth param is x and y position to start writing
            //pdfTab.WriteSelectedRows(0, -1, document.Left, document.PageSize.Height - 15, writer.DirectContent);

            //pdfTab.WriteSelectedRows(0, -1, document.Left, 820,writer.DirectContent);
            //set pdfContent value
            //pdfContent = writer.DirectContent;
            //Move the pointer and draw line to separate header section from rest of page

        }

        public void OnGenericTag(PdfWriter writer, Document document, Rectangle rect, string text)
        {
            throw new NotImplementedException();
        }

        public void OnOpenDocument(PdfWriter writer, Document document)
        {
            //throw new NotImplementedException();
        }

        public void OnParagraph(PdfWriter writer, Document document, float paragraphPosition)
        {
            //throw new NotImplementedException();
        }

        public void OnParagraphEnd(PdfWriter writer, Document document, float paragraphPosition)
        {
            //throw new NotImplementedException();
        }

        public void OnSection(PdfWriter writer, Document document, float paragraphPosition, int depth, Paragraph title)
        {
            throw new NotImplementedException();
        }

        public void OnSectionEnd(PdfWriter writer, Document document, float paragraphPosition)
        {
            throw new NotImplementedException();
        }

        public void OnStartPage(PdfWriter writer, Document document)
        {
            //throw new NotImplementedException();
        }
    }
    public class JobsController : ApiController
    {

        [HttpPost]
        [Route("api/Jobs/SaveDeliveryTicket")]
        public DataTable SaveDeliveryTicket(DeliveryTicket j)

        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpDelDeliveryTicket";
                cmd.Connection = conn;
                conn.Open();

                SqlParameter id = new SqlParameter("@Id ", SqlDbType.Int);
                id.Value = j.Id;
                cmd.Parameters.Add(id);

                SqlParameter DID = new SqlParameter("@DeliveryTicketId ", SqlDbType.VarChar, 50);
                DID.Value = j.DeliveryTicketId;
                cmd.Parameters.Add(DID);


                SqlParameter sno = new SqlParameter("@SequenceNo", SqlDbType.Int);
                sno.Value = j.SequenceNo;
                cmd.Parameters.Add(sno);


                SqlParameter Deld = new SqlParameter("@DeliveryDate", SqlDbType.DateTime);
                Deld.Value = j.DeliveryDate;
                cmd.Parameters.Add(Deld);

                SqlParameter rd = new SqlParameter("@ReturnDate", SqlDbType.DateTime);
                rd.Value = j.ReturnDate;
                cmd.Parameters.Add(rd);


                //SqlParameter ds = new SqlParameter("@Dates", SqlDbType.DateTime);
                //ds.Value = j.Dates;
                //cmd.Parameters.Add(ds);


                SqlParameter JobID = new SqlParameter("@JobID", SqlDbType.Int);
                JobID.Value = j.JobID;
                cmd.Parameters.Add(JobID);

                //SqlParameter aid = new SqlParameter("@AID", SqlDbType.Int);
                //aid.Value = j.AssetId;
                //cmd.Parameters.Add(aid);

                SqlParameter CoMan = new SqlParameter("@CoMan", SqlDbType.VarChar);
                CoMan.Value = j.CoMan;
                cmd.Parameters.Add(CoMan);

                SqlParameter PhoneNo = new SqlParameter("@PhoneNo", SqlDbType.VarChar);
                PhoneNo.Value = j.PhoneNo;
                cmd.Parameters.Add(PhoneNo);

                SqlParameter OrderBy = new SqlParameter("@OrderedBy", SqlDbType.VarChar,50);
                OrderBy.Value = j.Orderedby;
                cmd.Parameters.Add(OrderBy);

                SqlParameter ShipVia = new SqlParameter("@ShipVia", SqlDbType.VarChar);
                ShipVia.Value = j.ShipVia;
                cmd.Parameters.Add(ShipVia);

                SqlParameter ShipTo = new SqlParameter("@ShipTo", SqlDbType.VarChar);
                ShipTo.Value = j.ShipTo;
                cmd.Parameters.Add(ShipTo);


                SqlParameter dtty = new SqlParameter("@DTType", SqlDbType.Int);
                dtty.Value = j.DTtype;
                cmd.Parameters.Add(dtty);

                SqlParameter vv = new SqlParameter("@isVoId", SqlDbType.Int);
                vv.Value = j.IsVoid;
                cmd.Parameters.Add(vv);

                SqlParameter loggedinUserId = new SqlParameter("@loggedinUserId", SqlDbType.Int);
                loggedinUserId.Value = j.changedById;
                cmd.Parameters.Add(loggedinUserId);

                SqlParameter flg = new SqlParameter("@flag", SqlDbType.VarChar);
                flg.Value = j.insupddelflag;
                cmd.Parameters.Add(flg);

                object dtId = cmd.ExecuteScalar();

                if (j.DTItems.Count > 0)
                {
                    SqlCommand cmd1 = new SqlCommand();
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.CommandText = "InsUpDelDeliveryTicketItems";
                    cmd1.Connection = conn;

                    foreach (DeliveryTickeItems a in j.DTItems)
                    {

                        SqlParameter Gid1 = new SqlParameter("@UsageDate", SqlDbType.DateTime);
                        Gid1.Value = a.usageDate;
                        cmd1.Parameters.Add(Gid1);

                        SqlParameter mid1 = new SqlParameter("@EquipmentId", SqlDbType.Int);
                        mid1.Value = a.AssetId;
                        cmd1.Parameters.Add(mid1);

                        SqlParameter Gid2 = new SqlParameter("@DTId", SqlDbType.Int);
                        Gid2.Value = dtId;
                        cmd1.Parameters.Add(Gid2);

                        SqlParameter ljj = new SqlParameter("@loguserId", SqlDbType.Int);
                        ljj.Value = a.changedById;
                        cmd.Parameters.Add(ljj);

                        SqlParameter mid2 = new SqlParameter("@flag", SqlDbType.Char);
                        mid2.Value = a.insupddelflag;
                        cmd1.Parameters.Add(mid2);

                        cmd1.ExecuteScalar();
                        cmd1.Parameters.Clear();
                    }
                }
                if (j.DTpersonnel.Count>0)
                {
                    SqlCommand cmd2 = new SqlCommand();
                    cmd2.CommandType = CommandType.StoredProcedure;
                    cmd2.CommandText = "InsUpdDelDTPersonnel";
                    cmd2.Connection = conn;
                    foreach(DeliveryTickeItemss d in j.DTpersonnel)
                    {

                        SqlParameter Gid1 = new SqlParameter("@Personnelid", SqlDbType.VarChar,50);
                        Gid1.Value = d.Personnelid;
                        cmd2.Parameters.Add(Gid1);

                        SqlParameter mid1 = new SqlParameter("@SequenceNo", SqlDbType.Int);
                        mid1.Value = d.SequenceNo;
                        cmd2.Parameters.Add(mid1);

                        SqlParameter Gid2 = new SqlParameter("@DTId", SqlDbType.Int);
                        Gid2.Value = dtId;
                        cmd2.Parameters.Add(Gid2);

                        SqlParameter hjg = new SqlParameter("@JobId", SqlDbType.Int);
                        hjg.Value = d.JobID;
                        cmd2.Parameters.Add(hjg);

                        SqlParameter mid2 = new SqlParameter("@flag", SqlDbType.VarChar);
                        mid2.Value = d.insupddelflag;
                        cmd2.Parameters.Add(mid2);

                        cmd2.ExecuteScalar();
                        cmd2.Parameters.Clear();
                    }
                }

                
                conn.Close();
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;

                //traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveMandUserDocs:" + ex.Message);
                throw ex;
            }
            return dt;
        }

        [HttpGet]
        [Route("api/Jobs/GetDeliveryTicketEquipment")]
        public DataSet GetDeliveryTicketEquipment(int DtId, int JobId)
        {
            DataSet dt = new DataSet();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetDeliveryTicketEquipment";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@DtId", SqlDbType.Int);
                mid.Value = DtId;
                cmd.Parameters.Add(mid);

                SqlParameter jid = new SqlParameter("@JobId", SqlDbType.Int);
                jid.Value = JobId;
                cmd.Parameters.Add(jid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetUsersForJob() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetUsersForJob() procedure", LogLevel.Error, null);
                throw ex;
            }
        }


        //[HttpPost]
        //[Route("api/Jobs/SaveDeliveryTicket")]
        //public HttpResponseMessage SaveDeliveryTicket(DeliveryTicket j)

        //{
        //    DataTable dt = new DataTable();
        //    //connect to database
        //    SqlConnection conn = new SqlConnection();
        //    try
        //    {
        //        //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
        //        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

        //        SqlCommand cmd = new SqlCommand();
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.CommandText = "InsUpDelDeliveryTicket";
        //        cmd.Connection = conn;
        //        conn.Open();

        //        SqlParameter DID = new SqlParameter("@DeliveryTicketId ", SqlDbType.VarChar, 50);
        //        DID.Value = j.DeliveryTicketId;
        //        cmd.Parameters.Add(DID);


        //        SqlParameter sno = new SqlParameter("@SequenceNo", SqlDbType.Int);
        //        sno.Value = j.SequenceNo;
        //        cmd.Parameters.Add(sno);


        //        SqlParameter Deld = new SqlParameter("@DeliveryDate", SqlDbType.DateTime);
        //        Deld.Value = j.DeliveryDate;
        //        cmd.Parameters.Add(Deld);

        //        SqlParameter rd = new SqlParameter("@ReturnDate", SqlDbType.DateTime);
        //        rd.Value = j.ReturnDate;
        //        cmd.Parameters.Add(rd);

        //        SqlParameter JobID = new SqlParameter("@JobID", SqlDbType.Int);
        //        JobID.Value = j.JobID;
        //        cmd.Parameters.Add(JobID);

        //        //SqlParameter aid = new SqlParameter("@AID", SqlDbType.Int);
        //        //aid.Value = j.AssetId;
        //        //cmd.Parameters.Add(aid);

        //        SqlParameter CoMan = new SqlParameter("@CoMan", SqlDbType.VarChar);
        //        CoMan.Value = j.CoMan;
        //        cmd.Parameters.Add(CoMan);

        //        SqlParameter PhoneNo = new SqlParameter("@PhoneNo", SqlDbType.VarChar);
        //        PhoneNo.Value = j.PhoneNo;
        //        cmd.Parameters.Add(PhoneNo);

        //        SqlParameter OrderBy = new SqlParameter("@OrderedBy", SqlDbType.VarChar);
        //        OrderBy.Value = j.Orderedby;
        //        cmd.Parameters.Add(OrderBy);

        //        SqlParameter ShipVia = new SqlParameter("@ShipVia", SqlDbType.VarChar);
        //        ShipVia.Value = j.ShipVia;
        //        cmd.Parameters.Add(ShipVia);

        //        SqlParameter ShipTo = new SqlParameter("@ShipTo", SqlDbType.VarChar);
        //        ShipTo.Value = j.ShipTo;
        //        cmd.Parameters.Add(ShipTo);


        //        SqlParameter loggedinUserId = new SqlParameter("@loggedinUserId", SqlDbType.Int);
        //        loggedinUserId.Value = j.changedById;
        //        cmd.Parameters.Add(loggedinUserId);

        //        SqlParameter flag = new SqlParameter("@flag", SqlDbType.VarChar);
        //        flag.Value = j.insupddelflag;
        //        cmd.Parameters.Add(flag);


        //        SqlDataAdapter da = new SqlDataAdapter(cmd);
        //        da.Fill(dt);

        //        conn.Close();
        //        //Logger.Trace(LogCategory.WebApp, "DataTable in SaveDeliveryTicket() procedure is loaded", LogLevel.Information, null);
        //        return new HttpResponseMessage(HttpStatusCode.OK);
        //    }
        //    catch (Exception ex)
        //    {
        //        if (conn != null && conn.State == ConnectionState.Open)
        //        {
        //            conn.Close();
        //        }
        //        string str = ex.Message;

        //        //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveDeliveryTicket) procedure", LogLevel.Error, null);
        //        return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
        //    }

        //}

        [HttpGet]
        [Route("api/Jobs/GetDeliveryDetails")]
        public DataTable GetDeliveryDetails(string jobId)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetDeliveryTicketDetails";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@JId", SqlDbType.Int);
                mid.Value = jobId;
                cmd.Parameters.Add(mid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetUsersForJob() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetUsersForJob() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetJobDetailsEquipment")]
        public DataTable GetJobDetailsEquipment( int jobId)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobDetailsEquipment";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@id", SqlDbType.Int);
                mid.Value = jobId;
                cmd.Parameters.Add(mid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetUsersForJob() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetUsersForJob() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetJobDetailsJobUsers")]
        public DataTable GetJobDetailsJobUsers(int jobId)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobDetailsJobUsers";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@id", SqlDbType.Int);
                mid.Value = jobId;
                cmd.Parameters.Add(mid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetUsersForJob() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetUsersForJob() procedure", LogLevel.Error, null);
                throw ex;
            }
        }


        [HttpGet]
        [Route("api/Jobs/GetJobDetailsjobtpresources")]
        public DataTable GetJobDetailsjobtpresources(int jobId)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobDetailsjobtpresources";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@id", SqlDbType.Int);
                mid.Value = jobId;
                cmd.Parameters.Add(mid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetUsersForJob() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetUsersForJob() procedure", LogLevel.Error, null);
                throw ex;
            }
        }


        [HttpGet]
        [Route("api/Jobs/GetJobDetailsJobDocuments")]
        public DataTable GetJobDetailsJobDocuments(int jobId)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobDetailsJobDocuments";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@id", SqlDbType.Int);
                mid.Value = jobId;
                cmd.Parameters.Add(mid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetUsersForJob() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetUsersForJob() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetJobDetailsJobHistory")]
        public DataTable GetJobDetailsJobHistory(int jobId)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobDetailsJobHistory";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@id", SqlDbType.Int);
                mid.Value = jobId;
                cmd.Parameters.Add(mid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetUsersForJob() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetUsersForJob() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetJobDetailsJob")]
        public DataTable GetJobDetailsJob(int jobId)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobDetailsJob";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@id", SqlDbType.Int);
                mid.Value = jobId;
                cmd.Parameters.Add(mid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetUsersForJob() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetUsersForJob() procedure", LogLevel.Error, null);
                throw ex;
            }
        }



        [HttpGet]
        [Route("api/Jobs/GetJobsList")]
        public DataTable GetJobsList()
        {
            try
            {
                DataTable Tbl = new DataTable();

                //connect to database
                SqlConnection conn = new SqlConnection();
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobsByStatus";
                cmd.Connection = conn;
                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetJobsList() procedure is loaded", LogLevel.Information, null);
                return Tbl;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetJobsList() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpPost]
        [Route("api/Jobs/SaveJobDetails")]
        public HttpResponseMessage SaveJobDetails(Job j)
        {
            SqlTransaction transaction = null;

            //connect to database
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelJobs";
                cmd.Connection = conn;
                conn.Open();

                transaction = conn.BeginTransaction();
                cmd.Transaction = transaction;

                #region save job details
                SqlParameter Gim = new SqlParameter("@Id", SqlDbType.Int);
                Gim.Value = Convert.ToString(j.Id);
                cmd.Parameters.Add(Gim);

                SqlParameter Gid = new SqlParameter("@Name", SqlDbType.VarChar, 50);
                Gid.Value = j.Name;
                cmd.Parameters.Add(Gid);

                SqlParameter JobID = new SqlParameter("@JobID", SqlDbType.VarChar, 50);
                JobID.Value = j.JobID;
                cmd.Parameters.Add(JobID);

                SqlParameter WellNo = new SqlParameter("@WellNo", SqlDbType.VarChar, 50);
                WellNo.Value = j.WellNo;
                cmd.Parameters.Add(WellNo);

                SqlParameter AFE = new SqlParameter("@AFE", SqlDbType.VarChar, 50);
                AFE.Value = j.AFE;
                cmd.Parameters.Add(AFE);

                //SqlParameter trucking = new SqlParameter("@Trucking", SqlDbType.VarChar, 50);
                //trucking.Value = j.Trucking;
                //cmd.Parameters.Add(trucking);

                //SqlParameter dock = new SqlParameter("@Dock", SqlDbType.VarChar, 50);
                //dock.Value = j.Dock;
                //cmd.Parameters.Add(dock);

                //SqlParameter custpoc = new SqlParameter("@CustPOC", SqlDbType.VarChar, 50);
                //custpoc.Value = j.CustPOC;
                //cmd.Parameters.Add(custpoc);

                SqlParameter lid = new SqlParameter("@LocationID", SqlDbType.Int);
                lid.Value = j.LocationID;
                cmd.Parameters.Add(lid);

                SqlParameter esdt = new SqlParameter("@EstStartDt", SqlDbType.Date);
                esdt.Value = j.EstStartDt;
                cmd.Parameters.Add(esdt);

                SqlParameter eedt = new SqlParameter("@EstEndDt", SqlDbType.Date);
                eedt.Value = j.EstEndDt;
                cmd.Parameters.Add(eedt);

                SqlParameter projdesc = new SqlParameter("@ProjDesc", SqlDbType.VarChar, 250);
                projdesc.Value = j.ProjDesc;
                cmd.Parameters.Add(projdesc);

                //SqlParameter bid = new SqlParameter("@Bid", SqlDbType.VarChar, 50);
                //bid.Value = j.Bid;
                //cmd.Parameters.Add(bid);

                SqlParameter custId = new SqlParameter("@CustomerID", SqlDbType.Int);
                custId.Value = j.CustomerID;
                cmd.Parameters.Add(custId);


                SqlParameter ocsg = new SqlParameter("@OCSG", SqlDbType.VarChar, 50);
                ocsg.Value = j.OCSG;
                cmd.Parameters.Add(ocsg);

                SqlParameter rig = new SqlParameter("@RIG", SqlDbType.VarChar, 50);
                rig.Value = j.RIG;
                cmd.Parameters.Add(rig);

                //SqlParameter pocph = new SqlParameter("@POCPh", SqlDbType.VarChar, 50);
                //pocph.Value = j.POCPh;
                //cmd.Parameters.Add(pocph);

                //SqlParameter jt = new SqlParameter("@JobType", SqlDbType.VarChar, 50);
                //jt.Value = j.JobType;
                //cmd.Parameters.Add(jt);

                SqlParameter aedt = new SqlParameter("@ActualEndDt", SqlDbType.Date);
                aedt.Value = j.ActualEndDt;
                cmd.Parameters.Add(aedt);

                SqlParameter asdt = new SqlParameter("@ActualStartDt", SqlDbType.Date);
                asdt.Value = j.ActualStartDt;
                cmd.Parameters.Add(asdt);


                SqlParameter StatusId = new SqlParameter("@StatusId", SqlDbType.Int);
                StatusId.Value = j.StatusId;
                cmd.Parameters.Add(StatusId);

                SqlParameter Supervisor = new SqlParameter("@Supervisor", SqlDbType.VarChar);
                Supervisor.Value = j.Supervisor;
                cmd.Parameters.Add(Supervisor);

                SqlParameter CoMan = new SqlParameter("@CoMan", SqlDbType.VarChar);
                CoMan.Value = j.CoMan;
                cmd.Parameters.Add(CoMan);

                SqlParameter PhoneNo = new SqlParameter("@PhoneNo", SqlDbType.VarChar);
                PhoneNo.Value = j.PhoneNo;
                cmd.Parameters.Add(PhoneNo);

                SqlParameter RigName = new SqlParameter("@RigName", SqlDbType.VarChar);
                RigName.Value = j.RigName;
                cmd.Parameters.Add(RigName);

                SqlParameter OrderBy = new SqlParameter("@OrderBy", SqlDbType.VarChar);
                OrderBy.Value = j.OrderBy;
                cmd.Parameters.Add(OrderBy);

                SqlParameter ShipVia = new SqlParameter("@ShipVia", SqlDbType.VarChar);
                ShipVia.Value = j.ShipVia;
                cmd.Parameters.Add(ShipVia);

                SqlParameter ShipTo = new SqlParameter("@ShipTo", SqlDbType.VarChar);
                ShipTo.Value = j.ShipTo;
                cmd.Parameters.Add(ShipTo);

                SqlParameter Field = new SqlParameter("@Field", SqlDbType.VarChar);
                Field.Value = j.Field;
                cmd.Parameters.Add(Field);

                SqlParameter Lease = new SqlParameter("@Lease", SqlDbType.VarChar);
                Lease.Value = j.Lease;
                cmd.Parameters.Add(Lease);

                SqlParameter County = new SqlParameter("@County", SqlDbType.Int);
                County.Value = j.County;
                cmd.Parameters.Add(County);

                SqlParameter flag = new SqlParameter("@insupdflag", SqlDbType.VarChar);
                flag.Value = j.insupddelflag;
                cmd.Parameters.Add(flag);

                SqlParameter st = new SqlParameter("@States", SqlDbType.Int);
                st.Value = j.States;
                cmd.Parameters.Add(st);

                SqlParameter jtyp = new SqlParameter("@JobTypeId", SqlDbType.Int);
                jtyp.Value = j.JobTypeId;
                cmd.Parameters.Add(jtyp);

                SqlParameter loggedinUserId = new SqlParameter("@loggedinUserId", SqlDbType.Int);
                loggedinUserId.Value = j.changedById;
                cmd.Parameters.Add(loggedinUserId);

                object jobid = cmd.ExecuteScalar();

                #endregion save job details
               
                transaction.Commit();
                // conn.Close();
                //Logger.Trace(LogCategory.WebApp, "DataTable in SaveJobsList() procedure is loaded", LogLevel.Information, null);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (SqlException sqlEx)
            {
                transaction.Rollback();
                //Logger.Error(sqlEx, LogCategory.WebApp, "An error occured in SavejobsList() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, sqlEx);

            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;

                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SavejobsList() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }


        [HttpPost]
        [Route("api/Jobs/SaveJobDocs")]
        public DataSet SaveJobDocs(JobDocuments  jdoc)
        {          
            //connect to database
            SqlConnection conn = new SqlConnection();
            DataSet dt = new DataSet();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelJobDocuments";
                cmd.Connection = conn;
               // conn.Open();              

                #region save job docs
                SqlParameter id = new SqlParameter("@Id", SqlDbType.Int);
                id.Value = (jdoc.Id == 0)? -1 : jdoc.Id;
                cmd.Parameters.Add(id);

                SqlParameter AssetId = new SqlParameter("@JobId", SqlDbType.Int);
                AssetId.Value = jdoc.JobId;
                cmd.Parameters.Add(AssetId);

                SqlParameter Gid1 = new SqlParameter("@DocTypeId", SqlDbType.Int);
                Gid1.Value = jdoc.docTypeId;
                cmd.Parameters.Add(Gid1);

                SqlParameter assettypeid = new SqlParameter("@DocName", SqlDbType.VarChar, 100);
                assettypeid.Value = jdoc.docName;
                cmd.Parameters.Add(assettypeid);

                SqlParameter rootassetid = new SqlParameter("@CreatedBy", SqlDbType.Int);
                rootassetid.Value = jdoc.createdById;
                cmd.Parameters.Add(rootassetid);

                SqlParameter AsstMDLHierarID = new SqlParameter("@UpdatedBy", SqlDbType.Int);
                AsstMDLHierarID.Value = jdoc.UpdatedById;
                cmd.Parameters.Add(AsstMDLHierarID);

                SqlParameter assetModelId = new SqlParameter("@ExpiryDate", SqlDbType.Date);
                assetModelId.Value = jdoc.expiryDate;
                cmd.Parameters.Add(assetModelId);


                SqlParameter LocationId = new SqlParameter("@DueDate", SqlDbType.Date);
                LocationId.Value = jdoc.dueDate;
                cmd.Parameters.Add(LocationId);

                SqlParameter parentid = new SqlParameter("@DocContent", SqlDbType.VarChar);
                parentid.Value = jdoc.docContent;
                cmd.Parameters.Add(parentid);

                SqlParameter flag1 = new SqlParameter("@insupdflag", SqlDbType.VarChar);
                flag1.Value = jdoc.insupddelflag;
                cmd.Parameters.Add(flag1);

                SqlParameter loggedinUserId1 = new SqlParameter("@loggedinUserId", SqlDbType.Int);
                loggedinUserId1.Value = jdoc.UpdatedById;
                cmd.Parameters.Add(loggedinUserId1);

               
                //cmd.ExecuteScalar();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);

                #endregion save job details

              
                // conn.Close();
                //Logger.Trace(LogCategory.WebApp, "DataTable in SaveJobDocs() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (SqlException sqlEx)
            {
                //Logger.Error(sqlEx, LogCategory.WebApp, "An error occured in SaveJobDocs() procedure", LogLevel.Error, null);
                return dt;

            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;

                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveJobDocs() procedure", LogLevel.Error, null);
                return dt;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        [HttpPost]
        [Route("api/Jobs/SaveJobEquipment")]
        public DataSet SaveJobEquipement(JobResouces jres)
        {
            //connect to database
            SqlConnection conn = new SqlConnection();
            DataSet dt = new DataSet();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelJobResources";
                cmd.Connection = conn;
                conn.Open();

                #region save job equipment
                //@Id int,@JobId int,@UserId int,@CreatedBy int,@UpdatedBy int,@FromDate date = null, @ToDate date = null,@insupdflag varchar(1)
                SqlParameter ba = new SqlParameter("@Id", SqlDbType.Int);
                ba.Value = jres.Id;
                cmd.Parameters.Add(ba);

                SqlParameter jid = new SqlParameter("@JobId", SqlDbType.Int);
                jid.Value = jres.JobId;
                cmd.Parameters.Add(jid);

                SqlParameter sid = new SqlParameter("@Sequence", SqlDbType.Int);
                sid.Value = jres.Sequence;
                cmd.Parameters.Add(sid);


                SqlParameter bb = new SqlParameter("@AssetId", SqlDbType.Int);
                bb.Value = jres.AssetId;
                cmd.Parameters.Add(bb);

                SqlParameter bd = new SqlParameter("@CreatedBy", SqlDbType.Int);
                bd.Value = jres.createdById;
                cmd.Parameters.Add(bd);


                SqlParameter bf = new SqlParameter("@UpdatedBy", SqlDbType.Int);
                bf.Value = jres.UpdatedById;
                cmd.Parameters.Add(bf);

                SqlParameter bh = new SqlParameter("@FromDate", SqlDbType.Date);
                bh.Value = jres.FromDate;
                cmd.Parameters.Add(bh);

                SqlParameter ipconfig = new SqlParameter("@ToDate", SqlDbType.Date);
                ipconfig.Value = jres.ToDate;
                cmd.Parameters.Add(ipconfig);

                SqlParameter insupdflag = new SqlParameter("@insupdflag", SqlDbType.VarChar, 1);
                insupdflag.Value = (jres.insupddelflag == null) ? "" : jres.insupddelflag;
                cmd.Parameters.Add(insupdflag); 

                

                SqlParameter loggedinUserId1 = new SqlParameter("@loggedinUserId", SqlDbType.Int);
                loggedinUserId1.Value = jres.UpdatedById;
                cmd.Parameters.Add(loggedinUserId1);


                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);

                #endregion save job equipment


                // conn.Close();
                //Logger.Trace(LogCategory.WebApp, "DataTable in SaveJobEquipement() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (SqlException sqlEx)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                //Logger.Error(sqlEx, LogCategory.WebApp, "An error occured in SaveJobEquipement() procedure", LogLevel.Error, null);
                // return dt;
                throw sqlEx;
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;

                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SavejobsList() procedure", LogLevel.Error, null);
                throw ex;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        [HttpPost]
        [Route("api/Jobs/SaveJobUsers")]
        public DataSet SaveJobUsers(JobUsers u)
        {
            //connect to database
            SqlConnection conn = new SqlConnection();
            DataSet dt = new DataSet();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelJobUsers";
                cmd.Connection = conn;
                conn.Open();

                #region save job users
                //@Id int,@JobId int,@UserId int,@CreatedBy int,@UpdatedBy int,@FromDate date = null, @ToDate date = null,@insupdflag varchar(1)
                SqlParameter ba = new SqlParameter("@Id", SqlDbType.Int);
                ba.Value = u.Id;
                cmd.Parameters.Add(ba);

                SqlParameter jid = new SqlParameter("@JobId", SqlDbType.Int);
                jid.Value = u.JobId;
                cmd.Parameters.Add(jid);

                SqlParameter bb = new SqlParameter("@UserId", SqlDbType.Int);
                bb.Value = u.UserId;
                cmd.Parameters.Add(bb);

                SqlParameter bd = new SqlParameter("@CreatedBy", SqlDbType.Int);
                bd.Value = u.CreatedById;
                cmd.Parameters.Add(bd);


                SqlParameter bf = new SqlParameter("@UpdatedBy", SqlDbType.Int);
                bf.Value = u.UpdatedById;
                cmd.Parameters.Add(bf);

                SqlParameter bh = new SqlParameter("@FromDate", SqlDbType.Date);
                bh.Value = u.FromDate;
                cmd.Parameters.Add(bh);

                SqlParameter ipconfig = new SqlParameter("@ToDate", SqlDbType.Date);
                ipconfig.Value = u.ToDate;
                cmd.Parameters.Add(ipconfig);

                SqlParameter sj = new SqlParameter("@Sequence", SqlDbType.Int);
                sj.Value = u.Sequence;
                cmd.Parameters.Add(sj);

                SqlParameter insupdflag = new SqlParameter("@insupdflag", SqlDbType.VarChar, 1);
                insupdflag.Value = (u.insupddelflag == null) ? "" : u.insupddelflag;
                cmd.Parameters.Add(insupdflag);

                SqlParameter loggedinUserId1 = new SqlParameter("@loggedinUserId", SqlDbType.Int);
                loggedinUserId1.Value = u.UpdatedById;
                cmd.Parameters.Add(loggedinUserId1);                          

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);


                #endregion save job details


                // conn.Close();
                //Logger.Trace(LogCategory.WebApp, "DataTable in SaveJobUsers() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (SqlException sqlEx)
                {
                //Logger.Error(sqlEx, LogCategory.WebApp, "An error occured in SaveJobUsers() procedure", LogLevel.Error, null);
                return dt;

            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;

                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveJobUsers() procedure", LogLevel.Error, null);
                return dt;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        [HttpPost]
        [Route("api/Jobs/SaveJobTPResource")]
        public DataSet SaveJobTPResource(JobTPResources u)
        {
            //connect to database
            SqlConnection conn = new SqlConnection();
            DataSet dt = new DataSet();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelJobTPResources";
                cmd.Connection = conn;
                conn.Open();

                #region save job 3rd party resources
                //@Id int,@JobId int,@resourceName varchar(50) = null, @vendorName varchar(50) = null,@TPResourceId int,@CreatedBy int,@UpdatedBy int,@FromDate date = null, @ToDate date = null,@insupdflag varchar(1)

                SqlParameter ba = new SqlParameter("@Id", SqlDbType.Int);
                ba.Value = u.Id;
                cmd.Parameters.Add(ba);

                SqlParameter jid = new SqlParameter("@JobId", SqlDbType.Int);
                jid.Value = u.JobId;
                cmd.Parameters.Add(jid);

                SqlParameter rn = new SqlParameter("@resourceName", SqlDbType.VarChar, 50);
                rn.Value = u.Name;
                cmd.Parameters.Add(rn);

                SqlParameter vn = new SqlParameter("@vendorName", SqlDbType.VarChar, 50);
                vn.Value = u.VName;
                cmd.Parameters.Add(vn);

                SqlParameter bb = new SqlParameter("@TPResourceId", SqlDbType.Int);
                bb.Value = u.TPResourceId;
                cmd.Parameters.Add(bb);

                SqlParameter bd = new SqlParameter("@CreatedBy", SqlDbType.Int);
                bd.Value = u.createdById;
                cmd.Parameters.Add(bd);


                SqlParameter bf = new SqlParameter("@UpdatedBy", SqlDbType.Int);
                bf.Value = u.UpdatedById;
                cmd.Parameters.Add(bf);

                SqlParameter bh = new SqlParameter("@FromDate", SqlDbType.Date);
                bh.Value = u.FromDate;
                cmd.Parameters.Add(bh);

                SqlParameter ipconfig = new SqlParameter("@ToDate", SqlDbType.Date);
                ipconfig.Value = u.ToDate;
                cmd.Parameters.Add(ipconfig);

                SqlParameter insupdflag = new SqlParameter("@insupdflag", SqlDbType.VarChar, 1);
                insupdflag.Value = (u.insupddelflag == null) ? "" : u.insupddelflag;// u.insupddelflag;
                cmd.Parameters.Add(insupdflag);

                SqlParameter loggedinUserId1 = new SqlParameter("@loggedinUserId", SqlDbType.Int);
                loggedinUserId1.Value = u.UpdatedById;
                cmd.Parameters.Add(loggedinUserId1);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);

                #endregion save job 3rd party resources


                // conn.Close();
                //Logger.Trace(LogCategory.WebApp, "DataTable in SaveJobTPResource() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (SqlException sqlEx)
            {
                //Logger.Error(sqlEx, LogCategory.WebApp, "An error occured in SaveJobTPResource() procedure", LogLevel.Error, null);
                return dt;

            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SavejobsList() procedure", LogLevel.Error, null);
                return dt;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        [HttpGet]
        public DataSet GetJobDetails(int jobId)
        {
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobDetails";
                cmd.Connection = conn;

                SqlParameter Gim = new SqlParameter("@id", SqlDbType.Int);
                Gim.Value = Convert.ToString(jobId);
                cmd.Parameters.Add(Gim);

                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);

                //Logger.Trace(LogCategory.WebApp, "DataTable in GetjobsDetails() procedure is loaded", LogLevel.Information, null);
                // int found = 0;
                return ds;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetJobsList() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetJobsByStatus")]
        public DataSet GetJobsList(int statusId, int locationId, int customerId)
        {
            DataSet Tbl = new DataSet();

            //connect to database
            SqlConnection conn = new SqlConnection();
            try
            {

                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobsByStatus";
                cmd.Connection = conn;

                SqlParameter Gim = new SqlParameter("@statusId", SqlDbType.Int);
                Gim.Value = statusId;
                cmd.Parameters.Add(Gim);

                SqlParameter Gid = new SqlParameter("@locationId", SqlDbType.Int);
                Gid.Value = locationId;
                cmd.Parameters.Add(Gid);

                SqlParameter JobID = new SqlParameter("@custId", SqlDbType.Int);
                JobID.Value = customerId;
                cmd.Parameters.Add(JobID);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);

                //Logger.Trace(LogCategory.WebApp, "DataTable in GetJobsList() procedure is loaded", LogLevel.Information, null);
                // int found = 0;
                return Tbl;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetJobsList() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        public DataTable GetJobFileContent(int docId)
        {

            DataTable Tbl = new DataTable();

            //connect to database
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobFileContent";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@fileID", SqlDbType.Int);
                mid.Value = docId;
                cmd.Parameters.Add(mid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetJobFileContent() procedure is loaded", LogLevel.Information, null);
                return Tbl;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetJobFileContent() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        public DataTable GetThirdPartyResources()
        {
            DataTable Tbl = new DataTable();

            //connect to database
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetThirdPartyResources";
                cmd.Connection = conn;
                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetThirdPartyResources() procedure is loaded", LogLevel.Information, null);
                // int found = 0;
                return Tbl;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetThirdPartyResources() procedure", LogLevel.Error, null);
                throw ex;
            }
        }


        [HttpGet]
        [Route("api/Jobs/GetJobHistoryDetails")]
        public DataTable GetJobHistoryDetails(int ehId)
        {

            DataTable Tbl = new DataTable();

            //connect to database
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetDetailedJobEditHistory";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@ehId", SqlDbType.Int);
                mid.Value = ehId;
                cmd.Parameters.Add(mid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetJobHistoryDetails() procedure is loaded", LogLevel.Information, null);
                return Tbl;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetJobHistoryDetails() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetJobDocuments")]
        public DataTable GetJobDocuments(int locationId, int statusId, int customerId)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobDocuments";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@locationId", SqlDbType.Int);
                mid.Value = locationId;
                cmd.Parameters.Add(mid);

                SqlParameter lid = new SqlParameter("@statusId", SqlDbType.Int);
                lid.Value = statusId;
                cmd.Parameters.Add(lid);

                SqlParameter custId = new SqlParameter("@custId", SqlDbType.Int);
                custId.Value = customerId;
                cmd.Parameters.Add(custId);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetJobDocuments() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetJobDocuments() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetJobEquipment")]
        public DataTable GetJobEquipment(int locationId, int statusId, int customerId, int AssetModelId)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobEquipment";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@locationId", SqlDbType.Int);
                mid.Value = locationId;
                cmd.Parameters.Add(mid);

                SqlParameter lid = new SqlParameter("@statusId", SqlDbType.Int);
                lid.Value = statusId;
                cmd.Parameters.Add(lid);

                SqlParameter custId = new SqlParameter("@custId", SqlDbType.Int);
                custId.Value = customerId;
                cmd.Parameters.Add(custId);

                SqlParameter amId = new SqlParameter("@assetModelId", SqlDbType.Int);
                amId.Value = AssetModelId;
                cmd.Parameters.Add(amId);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetJobEquipment() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetJobEquipment() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetJobPersonnel")]
        public DataTable GetJobPersonnel(int locationId, int statusId, int customerId)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobPersonnel";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@locationId", SqlDbType.Int);
                mid.Value = locationId;
                cmd.Parameters.Add(mid);

                SqlParameter lid = new SqlParameter("@statusId", SqlDbType.Int);
                lid.Value = statusId;
                cmd.Parameters.Add(lid);

                SqlParameter custId = new SqlParameter("@custId", SqlDbType.Int);
                custId.Value = customerId;
                cmd.Parameters.Add(custId);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetJobPersonnel() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetJobPersonnel() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetUsersForJob")]
        public DataTable GetUsersForJob(int jobId)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetUsersForJob";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@jobId", SqlDbType.Int);
                mid.Value = jobId;
                cmd.Parameters.Add(mid);
               
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetUsersForJob() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetUsersForJob() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetEquipmentForJob")]
        public DataTable GetEquipmentForJob(int modelId, int locationId, int jobId)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetEquipmentForJob";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@modelId", SqlDbType.Int);
                mid.Value = modelId;
                cmd.Parameters.Add(mid);

                SqlParameter lid = new SqlParameter("@locationId", SqlDbType.Int);
                lid.Value = locationId;
                cmd.Parameters.Add(lid);


                SqlParameter jid = new SqlParameter("@jobId", SqlDbType.Int);
                jid.Value = jobId;
                cmd.Parameters.Add(jid);


                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetEquipmentForJob() procedure is loaded", LogLevel.Information, null);
                return dt;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetEquipmentForJob() procedure", LogLevel.Error, null);
                throw ex;
            }
        }
        public void Options() { }

        //[HttpGet]
        //[Route("api/Jobs/GetPrintTicket")]
        //public DataTable GetPrintTicket(int Id)
        //{
        //    DataTable dt = new DataTable();
        //    SqlConnection conn = new SqlConnection();
        //    try
        //    {

        //        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

        //        SqlCommand cmd = new SqlCommand();
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.CommandText = "GetPrintDeliveryTicket";
        //        cmd.Connection = conn;

        //        SqlParameter mid = new SqlParameter("@Id", SqlDbType.Int);
        //        mid.Value = Id;
        //        cmd.Parameters.Add(mid);

        //        SqlDataAdapter db = new SqlDataAdapter(cmd);
        //        db.Fill(dt);
        //        //Logger.Trace(LogCategory.WebApp, "DataTable in GetPrintTicket() procedure is loaded", LogLevel.Information, null);
        //        return dt;
        //    }
        //    catch (Exception ex)
        //    {
        //        //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetPrintTicket() procedure", LogLevel.Error, null);
        //        throw ex;
        //    }
        //}
        [HttpGet]
        [Route("api/Jobs/GetDeliveryTicketPrintByid")]
        public byte[] GetDeliveryTicketPrintByid(int Id, int Dttype)
        {
            byte[] result = null;
            DataTable Tbl = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetPrintDeliveryTicket";
                cmd.Connection = conn;

                SqlParameter assetId = new SqlParameter();
                assetId.ParameterName = "@DTId";
                assetId.SqlDbType = SqlDbType.Int;
                assetId.Value = Id;
                cmd.Parameters.Add(assetId);

                SqlParameter dtype = new SqlParameter();
                dtype.ParameterName = "@DTType";
                dtype.SqlDbType = SqlDbType.Int;
                dtype.Value = Dttype;
                cmd.Parameters.Add(dtype);



                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                if (Dttype == 1)
                    result = GeneratePDF(ds);
                else
                    result = GeneratePDF1(ds);                
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetDeliveryTicketPrintByid] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //error = ex.ToString();
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetDeliveryTicketPrintByid]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return result;
        }

        private byte[] GeneratePDF(DataSet ds)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                StringBuilder sb = new StringBuilder();
                HtmlDocument htmlDocument = new HtmlDocument();
                byte[] bytes = null; 
                htmlDocument.Load(@"" + HttpContext.Current.Server.MapPath("/UI/Content/DeliverTicket1.html"));
                //relplace all column values

                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                     string pattern= @"\{\{DeliveryTicketId\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["DeliveryTicketId"] + "");
                   
                    pattern = @"\{\{DeliveryDate\}\}";

                    if (string.IsNullOrEmpty(ds.Tables[0].Rows[0]["DeliveryDate"].ToString()))
                    {
                        htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["DeliveryDate"] + "");
                    }
                    else
                    {
                        htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern,ds.Tables[0].Rows[0]["DeliveryDate"].ToString().Replace("/","-") + "");
                    }

                    //htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, Convert.ToDateTime(ds.Tables[0].Rows[0]["DeliveryDate"].ToString(),DateTime.).ToString("MM-dd-yyyy") + "");

                    pattern = @"\{\{ReturnDate\}\}";
                    if (string.IsNullOrEmpty(ds.Tables[0].Rows[0]["ReturnDate"].ToString()))
                    {
                        htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["ReturnDate"] + "");
                    }
                    else
                    {
                        htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["ReturnDate"].ToString().Replace("/", "-") + "");
                    }

                    pattern = @"\{\{CoMan\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["CoMan"] + "");

                    pattern = @"\{\{PhoneNo\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["PhoneNo"] + "");

                    pattern = @"\{\{OrderedBy\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["OrderedBy"] + "");

                    pattern = @"\{\{ShipVia\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["ShipVia"] + "");

                    pattern = @"\{\{ShipTo\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["ShipTo"] + "");

                    pattern = @"\{\{Field\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["Field"] + "");

                    pattern = @"\{\{AFE\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["AFE"] + "");

                    pattern = @"\{\{PhoneNo\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["PhoneNo"] + "");

                    pattern = @"\{\{RIG\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["RIG"] + "");

                    pattern = @"\{\{OrderedBy\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["OrderedBy"] + "");

                    pattern = @"\{\{WellNO\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["WellNO"] + "");

                    pattern = @"\{\{OCSG\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["OCSG"] + "");

                    pattern = @"\{\{Customer\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["Customer"] + "");

                    pattern = @"\{\{County\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["County"] + "");

                    pattern = @"\{\{State\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["State"] + "");

                    pattern = @"\{\{Lease\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["Lease"] + "");

                    HtmlNode tblBody = htmlDocument.GetElementbyId("DeliveryTicket-body");
                    int daysUsed = Convert.ToInt32(ds.Tables[0].Rows[0]["dayscount"]);

                    int noOfRows = daysUsed / 20;
                    int noOfCols = daysUsed % 20;

                    noOfRows = (noOfCols == 0) ? noOfRows : noOfRows + 1;                   

                        for (int count = 0; count < ds.Tables[1].Rows.Count; count++)
                        {                           
                            tblBody.InnerHtml += "<tr><td colspan = \"20\" style=\"border-bottom:1px solid black;margin-top:10px;padding-bottom:10px;\"></td></tr>";

                        tblBody.InnerHtml += "<tr style=\"margin-top:5px;padding-bottom:5px;padding-top:5px;font-family:Arial;font-size:12px;\"><td colspan=\"2\">1</td><td colspan=\"11\" style=\"text-align:center;font-family:Arial;font-size:12px;padding-bottom:5px;padding-top:8px;\"> Description" + ds.Tables[1].Rows[count]["description"] + "</td><td  colspan=\"4\" align=\"center\" style=\"font-size:12px;\" > " + ds.Tables[1].Rows[count]["RentalDayRate"] + "</td><td colspan=\"2\" align=\"center\">0.0</td></tr>";
                        
                        tblBody.InnerHtml += "<tr><td colspan = \"2\"></td><td colspan = \"4\" style=\"font-family:Arial;font-size:12px;\"> Serial # " + ds.Tables[1].Rows[count]["serialnumber"] + "</td><td colspan = \"12\" align=\"right\" style=\"font-family:Arial;text-align:right;font-size:12px;\">Per Wk Stby:</td><td colspan = \"4\" style=\"font-size:12px;\">$" + ds.Tables[1].Rows[count]["PerWeekStbyCharge"] + "</td></tr>";
                        
                        tblBody.InnerHtml += "<tr><td colspan = \"6\"></td><td colspan = \"12\" style=\"font-family:Arial;text-align:right;font-size:12px;\"> Add'l:</td><td colspan = \"4\" style=\"font-size:12px;\"> $" + ds.Tables[1].Rows[count]["AdditionalDayRate"] + "</td></tr>";
                            tblBody.InnerHtml += "<tr><td colspan = \"6\" ></td><td colspan = \"12\"align=\"right\" style=\"font-family:Arial;text-align:right;font-size:12px;\"> Redress:</td><td colspan = \"4\" style=\"font-size:12px;padding-bottom:5px;\">$" + ds.Tables[1].Rows[count]["RedressCost"] + "</td></tr>";
                        
                        //get the list of days used for the equipment                        
                        //get the dates for each equipment and if matching then highlight
                        var daysUsedRows1 = new DataRow[0];
                        var daysUsedRows = (ds.Tables[1].Rows[count]["did"] == DBNull.Value) ? daysUsedRows1 : ds.Tables[2].Select("DTItemsId=" + ds.Tables[1].Rows[count]["did"]);

                            int dayCount = 0;
                            int dcount = 0;
                            var trBuilder = string.Empty;
                            for (int nr = 0; nr < noOfRows; nr++)
                            {
                                trBuilder = "<tr>";
                                var cols = 20;
                                if ((nr == noOfRows - 1) && noOfCols != 0)
                                {
                                    cols = noOfCols;
                                }
                                for (int col = 0; col < cols; col++)
                                {
                                    dcount++;
                                    dayCount++;
                                    bool found = false;
                                    for (int dC = 0; dC < daysUsedRows.Length; dC++)
                                    {

                                        if (daysUsedRows[dC]["dayused"].ToString() == dayCount.ToString())
                                        {
                                            found = true;
                                            break;
                                        }
                                    }
                                var lastrowpadding = (nr == noOfRows - 1) ? "padding-bottom:8px;": ""; 
                                    if (found)
                                    {
                                        trBuilder += "<td width = \"5%\" height=\"10\" style = \"background-color:#2F5497;color:white;text-align:center;font-size:12px;"+ lastrowpadding + "\">" + dcount + "</td>";
                                    }
                                    else
                                    {
                                        trBuilder += "<td width = \"5%\" height=\"10\" style=\"text-align:center;font-size:12px;"+ lastrowpadding + "\"> " + dcount + " </td>";
                                    }
                                }

                                tblBody.InnerHtml += trBuilder;
                            }                           
                        }
                    

                    Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 15f, 10f);
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);

                    writer.PageEvent = new ityextEvents();
                    // open the document for writing  
                    pdfDoc.Open();
                    // read html data to StringReader  
                    using (var html = new StringReader(htmlDocument.DocumentNode.InnerHtml.ToString()))
                    {
                        XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDoc, html);
                    }

                    // close document  
                    pdfDoc.Close();

                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }
                return bytes;
            }
        }
        //For personnel to generate Pdf file
        private byte[] GeneratePDF1(DataSet ds)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                StringBuilder sb = new StringBuilder();
                HtmlDocument htmlDocument = new HtmlDocument();
                byte[] bytes = null;
                htmlDocument.Load(@"" + HttpContext.Current.Server.MapPath("/UI/Content/JobPersonnel.html"));
                //relplace all column values

                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    string pattern = @"\{\{DeliveryTicketId\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["DeliveryTicketId"] + "");

                    pattern = @"\{\{DeliveryDate\}\}";

                    if (string.IsNullOrEmpty(ds.Tables[0].Rows[0]["DeliveryDate"].ToString()))
                    {
                        htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["DeliveryDate"] + "");
                    }
                    else
                    {
                        htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["DeliveryDate"].ToString().Replace("/", "-") + "");
                    }

                    //htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, Convert.ToDateTime(ds.Tables[0].Rows[0]["DeliveryDate"].ToString(),DateTime.).ToString("MM-dd-yyyy") + "");

                    pattern = @"\{\{ReturnDate\}\}";
                    if (string.IsNullOrEmpty(ds.Tables[0].Rows[0]["ReturnDate"].ToString()))
                    {
                        htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["ReturnDate"] + "");
                    }
                    else
                    {
                        htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["ReturnDate"].ToString().Replace("/", "-") + "");
                    }

                    pattern = @"\{\{CoMan\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["CoMan"] + "");

                    pattern = @"\{\{PhoneNo\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["PhoneNo"] + "");

                    pattern = @"\{\{OrderedBy\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["OrderedBy"] + "");

                    pattern = @"\{\{ShipVia\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["ShipVia"] + "");

                    pattern = @"\{\{ShipTo\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["ShipTo"] + "");

                    pattern = @"\{\{Field\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["Field"] + "");

                    pattern = @"\{\{AFE\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["AFE"] + "");

                    pattern = @"\{\{PhoneNo\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["PhoneNo"] + "");

                    pattern = @"\{\{RIG\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["RIG"] + "");

                    pattern = @"\{\{OrderedBy\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["OrderedBy"] + "");

                    pattern = @"\{\{WellNO\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["WellNO"] + "");

                    pattern = @"\{\{OCSG\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["OCSG"] + "");

                    pattern = @"\{\{Customer\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["Customer"] + "");

                    pattern = @"\{\{County\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["County"] + "");

                    pattern = @"\{\{State\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["State"] + "");

                    pattern = @"\{\{Lease\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["Lease"] + "");


                    HtmlNode tblBody = htmlDocument.GetElementbyId("Personnel-body");                    

                    //  var hrRow = "<tr><td colspan = \"10\"><hr/></td></tr>";

                    for (int count = 0; count < ds.Tables[1].Rows.Count; count++)
                    {
                        tblBody.InnerHtml += "<tr style=\"margin-top:20px;padding-bottom:20px;border-bottom:1px solid black;\"><td align=\"left\">" + (count + 1) + "</td><td style=\"text-align:left;\">" + ds.Tables[1].Rows[count]["Name"] + "</td></tr>";
                        tblBody.InnerHtml += "<tr><td colspan = \"10\" style=\"border-bottom:1px solid black;\"></td></tr>";                       
                    }

                    Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 25f, 10f);
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);

                    writer.PageEvent = new ityextEvents();
                    // open the document for writing  
                    pdfDoc.Open();
                    // read html data to StringReader  
                    using (var html = new StringReader(htmlDocument.DocumentNode.InnerHtml.ToString()))
                    {
                        XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDoc, html);
                    }

                    // close document  
                    pdfDoc.Close();

                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }
                return bytes;
            }
        }

        private byte[] GeneratePDFCheckin(DataSet ds)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                StringBuilder sb = new StringBuilder();
                HtmlDocument htmlDocument = new HtmlDocument();
                byte[] bytes = null;
                htmlDocument.Load(@"" + HttpContext.Current.Server.MapPath("/UI/Content/PrintCheckIn.html"));
                //relplace all column values

                if (ds.Tables[0].Rows.Count > 0)
                {
                    #region header
                    string pattern = @"\{\{CoMan\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["CoMan"] + "");

                    pattern = @"\{\{JobID\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["JobID"] + "");

                    pattern = @"\{\{PhoneNo\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["PhoneNo"] + "");

                    pattern = @"\{\{Field\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["Field"] + "");

                    pattern = @"\{\{AFE\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["AFE"] + "");

                    pattern = @"\{\{PhoneNo\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["PhoneNo"] + "");

                    pattern = @"\{\{RIG\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["RIG"] + "");


                    pattern = @"\{\{WellNO\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["WellNO"] + "");

                    pattern = @"\{\{OCSG\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["OCSG"] + "");

                    pattern = @"\{\{Customer\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["Customer"] + "");

                    pattern = @"\{\{County\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["County"] + "");

                    pattern = @"\{\{State\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["State"] + "");

                    pattern = @"\{\{Lease\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["Lease"] + "");
                    #endregion header
                    HtmlNode tblBody = htmlDocument.GetElementbyId("checklist-body");
                    int daysUsed = Convert.ToInt32(ds.Tables[0].Rows[0]["dayscount"]);

                    int noOfRows = daysUsed / 20;
                    int noOfCols = daysUsed % 20;

                    noOfRows = (noOfCols == 0) ? noOfRows : noOfRows + 1;

                    for (int count = 0; count < ds.Tables[1].Rows.Count; count++)
                    {
                        //tblBody.InnerHtml += "<tr><td colspan = \"20\" style=\"border-bottom:1px solid black;margin-top:10px;padding-bottom:10px;\"></td></tr>";

                        tblBody.InnerHtml += "<tr><td colspan = \"20\" style=\"border-bottom:1px solid black;margin-top:20px;padding-bottom:10px;\"></td></tr>";
                            //tblBody.InnerHtml += "<tr style =\"height:2px !important;background-color:#FFFFFF;\"><td colspan =\"12\">&nbsp;</td></tr>";

                            tblBody.InnerHtml += "<tr style=\"margin-top:10px;padding-bottom:5px;padding-top:5px;font-family:Arial;font-size:12px;\"><td colspan=\"1\">1</td><td colspan=\"11\" style=\"text-align:center;font-family:Arial;font-size:12px;padding-bottom:5px;padding-top:8px;\"> Description" + ds.Tables[1].Rows[count]["description"] + "</td><td  colspan=\"4\" align=\"center\" style=\"font-size:12px;\">" + ds.Tables[1].Rows[count]["RentalDayRate"] + "</td><td colspan=\"4\" align=\"center\">0.0</td></tr>";
                            //tblBody.InnerHtml += "<tr style =\"height:5px !important;background-color:#FFFFFF;\"><td colspan =\"12\">&nbsp;</td></tr>";
                            tblBody.InnerHtml += "<tr><td colspan = \"2\"></td><td colspan = \"4\" style=\"font-family:Arial;font-size:12px;\"> Serial # " + ds.Tables[1].Rows[count]["serialnumber"] + "</td><td colspan = \"12\" align=\"right\" style=\"font-family:Arial;font-size:12px;\">Per Wk Stby:</td><td colspan = \"4\" style=\"font-size:12px;\">$" + ds.Tables[1].Rows[count]["PerWeekStbyCharge"] + "</td></tr>";

                            tblBody.InnerHtml += "<tr><td colspan = \"6\"></td><td colspan = \"12\" align=\"right\" style=\"font-family:Arial;font-size:12px;\"> Add'l:</td><td colspan = \"4\" style=\"font-size:12px;\"> $" + ds.Tables[1].Rows[count]["AdditionalDayRate"] + "</td></tr>";
                            tblBody.InnerHtml += "<tr><td colspan = \"6\" ></td><td colspan = \"12\"align=\"right\" style=\"font-family:Arial;font-size:12px;\"> Redress:</td><td colspan = \"4\" style=\"font-size:12px;padding-bottom:5px;\">$" + ds.Tables[1].Rows[count]["RedressCost"] + "</td></tr>";

                        var daysUsedRows1 = new DataRow[0];
                        var daysUsedRows = (ds.Tables[1].Rows[count]["did"] == DBNull.Value) ? daysUsedRows1 : ds.Tables[2].Select("DTItemsId=" + ds.Tables[1].Rows[count]["did"]); 

                        int dayCount = 0;
                        int dcount = 0;
                        var trBuilder = string.Empty;
                        for (int nr = 0; nr < noOfRows; nr++)
                        {
                            trBuilder = "<tr>";
                            var cols = 20;
                            if ((nr == noOfRows - 1) && noOfCols != 0)
                            {
                                cols = noOfCols;
                            }
                            for (int col = 0; col < cols; col++)
                            {
                                dcount++;
                                dayCount++;
                                bool found = false;
                                for (int dC = 0; dC < daysUsedRows.Length; dC++)
                                {

                                    if (daysUsedRows[dC]["dayused"].ToString() == dayCount.ToString())
                                    {
                                        found = true;
                                        break;
                                    }
                                }
                                var lastrowpadding = (nr == noOfRows - 1) ? "padding-bottom:8px;" : "";
                                if (found)
                                {
                                    trBuilder += "<td width = \"5%\" height=\"10\" style = \"background-color:#2F5497;color:white;text-align:center;font-size:12px;" + lastrowpadding + "\">" + dcount + "</td>";
                                }
                                else
                                {
                                    trBuilder += "<td width = \"5%\" height=\"10\" style=\"text-align:center;font-size:12px;" + lastrowpadding + "\"> " + dcount + " </td>";
                                }
                            }

                            tblBody.InnerHtml += trBuilder;
                        }

                    }

                        Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 15f, 10f);
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);

                    writer.PageEvent = new itytrextEvents();
                    // open the document for writing  
                    pdfDoc.Open();
                    // read html data to StringReader  
                    using (var html = new StringReader(htmlDocument.DocumentNode.InnerHtml.ToString()))
                    {
                        XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDoc, html);
                    }

                    // close document  
                    pdfDoc.Close();

                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                    //}
                    
                }
                return bytes;
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetDeliveryTCheckin")]
        public byte[] GetDeliveryTCheckin(int Id)
        {
            byte[] result = null;
            DataTable Tbl = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetPrintCheckInTicket";
                cmd.Connection = conn;

                SqlParameter jbid = new SqlParameter();
                jbid.ParameterName = "@jobId";
                jbid.SqlDbType = SqlDbType.Int;
                jbid.Value = Id;
                cmd.Parameters.Add(jbid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                result = GeneratePDFCheckin(ds);
                //Logger.Trace(LogCategory.WebApp, "[GetDeliveryTicketPrintByid] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //error = ex.ToString();
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetDeliveryTicketPrintByid]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return result;
        }

        [HttpGet]
        [Route("api/Jobs/GetDeliveryTDetails")]
        public DataSet GetDeliveryTDetails(int Id, int Dttype)
        {
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "getdtdetails";
                cmd.Connection = conn;

                SqlParameter assetId = new SqlParameter();
                assetId.ParameterName = "@DTId";
                assetId.SqlDbType = SqlDbType.Int;
                assetId.Value = Id;
                cmd.Parameters.Add(assetId);

                SqlParameter dtype = new SqlParameter();
                dtype.ParameterName = "@DTType";
                dtype.SqlDbType = SqlDbType.Int;
                dtype.Value = Dttype;
                cmd.Parameters.Add(dtype);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);              
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetDeliveryTDetails] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //error = ex.ToString();
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetDeliveryTDetails]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return ds;
        }

        [HttpPost]
        [Route("api/Jobs/DeliveryTVoid")]
        public DataTable DeliveryTVoid(DeliveryTicket j)
        {
            SqlConnection conn = new SqlConnection();
            try
            {
                //connect to database             
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDeliverTicketVoid";
                cmd.Connection = conn;

                SqlParameter assetId = new SqlParameter();
                assetId.ParameterName = "@DTId";
                assetId.SqlDbType = SqlDbType.Int;
                assetId.Value = j.Id;
                cmd.Parameters.Add(assetId);

                SqlParameter dtype = new SqlParameter();
                dtype.ParameterName = "@DTType";
                dtype.SqlDbType = SqlDbType.Int;
                dtype.Value = j.DTtype;
                cmd.Parameters.Add(dtype);

                SqlParameter vo = new SqlParameter();
                vo.ParameterName = "@IsVoid";
                vo.SqlDbType = SqlDbType.Int;
                vo.Value = j.IsVoid;
                cmd.Parameters.Add(vo);

                SqlParameter jj = new SqlParameter();
                jj.ParameterName = "@JobId";
                jj.SqlDbType = SqlDbType.Int;
                jj.Value = j.JobID;
                cmd.Parameters.Add(jj);

                SqlParameter ud = new SqlParameter();
                ud.ParameterName = "@loggedInUserId";
                ud.SqlDbType = SqlDbType.Int;
                ud.Value = j.changedById;
                cmd.Parameters.Add(ud);

                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();

                //Logger.Trace(LogCategory.WebApp, "[GetDeliveryTDetails] Credentials completed.", LogLevel.Information, null);

                return GetDeliveryDetails(j.JobID.ToString());              
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                //error = ex.ToString();
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetDeliveryTDetails]() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetJobStatus")]
        public DataTable GetJobStatus()
        {
            DataTable dt = new DataTable();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobStatus";
                cmd.Connection = conn;

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(dt);
                //Logger.Trace(LogCategory.WebApp, "[GetJobStatus] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //error = ex.ToString();
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetJobStatus]() procedure", LogLevel.Error, null);
            }

            return dt;
        }
    }
}
