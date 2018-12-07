using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using ERPSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using System.Web.Http;
using System.Web.Http.Tracing;

using iTextSharp.text.pdf;
using iTextSharp.text;
using iTextSharp.tool.xml;
using HtmlAgilityPack;
using System.Web;
using System.Text.RegularExpressions;

namespace ERPSystem.Controllers
{

    public class itextEvents : IPdfPageEvent
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
            iTextSharp.text.Image imgPDF = iTextSharp.text.Image.GetInstance(HttpContext.Current.Server.MapPath(@"\UI\images\ees-logo.jpg"));

            //Create PdfTable object
            PdfPTable pdfTab = new PdfPTable(2);

            //We will have to create separate cells to include image logo and 2 separate strings
            PdfPCell pdfCell1 = new PdfPCell(imgPDF);
            pdfCell1.Border = 0;
            pdfCell1.FixedHeight = 50f;
            pdfCell1.VerticalAlignment = Element.ALIGN_TOP;
            pdfCell1.Rowspan = 3;

            BaseFont bfHelvetica = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
            Font times = new Font(bfHelvetica, 14, Font.BOLD, BaseColor.BLACK);

            PdfPCell pdfCell2 = new PdfPCell(new Phrase("WORK ORDER", times));
            pdfCell2.HorizontalAlignment = Element.ALIGN_CENTER;
            pdfCell2.Rowspan = 1;
            pdfCell2.Border = 0;

            PdfPCell pdfCell4 = new PdfPCell(new Phrase("", times));
            pdfCell4.HorizontalAlignment = Element.ALIGN_CENTER;
            pdfCell2.Rowspan = 3;
            pdfCell4.Border = 0;

            Font times6 = new Font(bfHelvetica, 8, Font.BOLD, BaseColor.DARK_GRAY);
            PdfPCell pdfCell3 = new PdfPCell(new Phrase("1016 QCP Park Drive Broussard La. 70518 (337) 837-5600 Fax (337) 837-5608", times6));
            pdfCell3.HorizontalAlignment = Element.ALIGN_LEFT;
            pdfCell3.PaddingRight = 40f;
            pdfCell3.Border = 0;

            //add all three cells into PdfTable
            pdfTab.AddCell(pdfCell1);
            pdfTab.AddCell(pdfCell2);


            pdfTab.AddCell(pdfCell3);
            pdfTab.AddCell(pdfCell4);

            pdfTab.TotalWidth = document.PageSize.Width - 20;
            //call WriteSelectedRows of PdfTable. This writes rows from PdfWriter in PdfTable
            //first param is start row. -1 indicates there is no end row and all the rows to be included to write
            //Third and fourth param is x and y position to start writing
            pdfTab.WriteSelectedRows(0, -1, 10, document.PageSize.Height - 15, writer.DirectContent);
            //set pdfContent value
            pdfContent = writer.DirectContent;
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

    public class AssetController : ApiController
    {



        [HttpGet]
        [Route("api/Asset/GetAssetspaging")]
        public DataSet GetAssetspaging(int modelId, int locationId, int curpage, int maxrows, int statusid, int locked)
        {
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetspaging";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@modelId", SqlDbType.Int);
                mid.Value = modelId;
                cmd.Parameters.Add(mid);

                SqlParameter lid = new SqlParameter("@locationId", SqlDbType.Int);
                lid.Value = locationId;
                cmd.Parameters.Add(lid);

                SqlParameter cpage = new SqlParameter();
                cpage.ParameterName = "@curpage";
                cpage.SqlDbType = SqlDbType.Int;
                cpage.Value = curpage;
                cmd.Parameters.Add(cpage);

                SqlParameter mrows = new SqlParameter();
                mrows.ParameterName = "@maxrows";
                mrows.SqlDbType = SqlDbType.Int;
                mrows.Value = maxrows;
                cmd.Parameters.Add(mrows);

                SqlParameter st = new SqlParameter("@StatusId", SqlDbType.Int);
                st.Value = statusid;
                cmd.Parameters.Add(st);


                SqlParameter lok = new SqlParameter("@Locked", SqlDbType.Int);
                lok.Value = locked;
                cmd.Parameters.Add(lok);


                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                //Tbl = ds.Tables[0];

                //Logger.Trace(LogCategory.WebApp, "DataTable in GetAssets() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAssets() procedure", LogLevel.Error, null);
            }
            return ds;
        }

        [HttpGet]
        [Route("api/Asset/GetAssetHierarchy2")]
        public AssetHierarchy GetAssetHierarchy2(int assetId)
        {
            AssetHierarchy hier = new AssetHierarchy();
            DataTable Tbl = new DataTable();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetHierarchy";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@RootAssetId", SqlDbType.Int);
                mid.Value = assetId;
                cmd.Parameters.Add(mid);

                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "Data Table in GetAssetHierarchy() is loaded", LogLevel.Information, null);

                DataTable tbl1 = Tbl.Clone();
                tbl1.Rows.Add(Tbl.Select("ParentId=null"));



                var a1 = from product in Tbl.AsEnumerable()
                         where (product["ParentId"] == DBNull.Value)
                         select product;

                Asset a = FormAsset(a1.First());

                AddChilds(a, Tbl);
                hier.Asset = a;

                //fill the asset history
                List<AssetHistory> assetHistory = new List<AssetHistory>();
                foreach (DataRow dr in ds.Tables[1].Rows)
                {
                    AssetHistory am = new AssetHistory();
                    am.FieldValue = dr["FieldValue"].ToString();
                    am.category = dr["category"].ToString();
                    am.subcategory = dr["subcategory"].ToString();
                    am.Comment = dr["Comment"].ToString();
                    am.Date = dr["Date"].ToString();
                    am.ChangedBy = dr["ChangedBy"].ToString();
                    am.ChangedType = dr["ChangedType"].ToString();
                    //am.AssetId = dr["AssetId"].ToString();
                    am.Id = Convert.ToInt32(dr["Id"]);
                    assetHistory.Add(am);
                }
                hier.AssetHistory = assetHistory;
                //Logger.Trace(LogCategory.WebApp, "AssetHierarchy object is set in GetAssetHierarchy() is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAssetHierarchy() procedure", LogLevel.Error, null);
            }

            return hier;
        }

        [HttpGet]
        [Route("api/Asset/GetAssetHierarchy")]
        public DataSet GetAssetHierarchy(int assetId)
        {
            AssetHierarchy hier = new AssetHierarchy();
            DataTable Tbl = new DataTable();
            DataSet ds1 = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetHierarchy";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@RootAssetId", SqlDbType.Int);
                mid.Value = assetId;
                cmd.Parameters.Add(mid);

                DataSet ds = new DataSet();

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "Data Table in GetAssetHierarchy() is loaded", LogLevel.Information, null);

                DataTable tbl1 = Tbl.Clone();

                DataColumn col = new DataColumn();
                col.ColumnName = "IsLastItem";
                col.DefaultValue = 0;
                col.DataType = typeof(int);
                tbl1.Columns.Add(col);

                DataRow[] r = Tbl.Select("ParentId is null");
                DataRow rr = tbl1.NewRow();
                rr.ItemArray = r[0].ItemArray;
                tbl1.Rows.Add(rr);


                GetRecursiveTable(Convert.ToInt32(tbl1.Rows[0]["Id"]), ref tbl1, ref Tbl);


                ds1.Tables.Add(tbl1);
                ds1.Tables.Add(ds.Tables[1].Copy());
                ds1.Tables.Add(ds.Tables[2].Copy());
                ds1.Tables.Add(ds.Tables[3].Copy());



                //Logger.Trace(LogCategory.WebApp, "AssetHierarchy object is set in GetAssetHierarchy() is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAssetHierarchy() procedure", LogLevel.Error, null);
            }

            return ds1;
        }

        private DataTable GetRecursiveTable(int pid, ref DataTable tbl1, ref DataTable Tbl)
        {
            DataRow[] dr = Tbl.Select("ParentId=" + pid, "OrderNo");

            if (dr.Length == 0)
                return tbl1;
            int count = 0;
            foreach (DataRow r in dr)
            {
                count++;
                DataRow rr = tbl1.NewRow();
                rr.ItemArray = r.ItemArray;

                if (count == dr.Length)
                    rr["IsLastItem"] = 1;

                tbl1.Rows.Add(rr);

                GetRecursiveTable(Convert.ToInt32(r["Id"]), ref tbl1, ref Tbl);
            }

            return tbl1;
        }

        [HttpGet]
        [Route("api/Asset/GetAssetHierarchy1")]
        public DataSet GetAssetHierarchy1(int assetId)
        {
            //  AssetHierarchy hier = new AssetHierarchy();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetHierarchy";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@RootAssetId", SqlDbType.Int);
                mid.Value = assetId;
                cmd.Parameters.Add(mid);


                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);

                //Logger.Trace(LogCategory.WebApp, "Data Table in GetAssetHierarchy() is loaded", LogLevel.Information, null);

                #region old

                ////List<Asset> faList = new List<Asset>();
                ////List<Asset> daList = new List<Asset>();
                ////foreach (DataRow fr in ds.Tables[1].Rows)
                ////{

                ////    faList.Add(FormAsset(fr));
                ////}
                ////foreach (DataRow dr in ds.Tables[2].Rows)
                ////{                
                ////    daList.Add(FormAsset(dr));
                ////}
                ////hier.FieldAssetsList = faList;
                ////hier.DocAssetsList = daList;

                //var a1 = from product in Tbl.AsEnumerable()
                //         where (product["ParentId"] == DBNull.Value)
                //         select product;

                //Asset a = FormAsset(a1.First());

                //AddChilds(a, Tbl);
                //hier.Asset = a;

                ////fill the asset history
                //List<AssetHistory> assetHistory = new List<AssetHistory>();
                //foreach (DataRow dr in ds.Tables[1].Rows)
                //{
                //    AssetHistory am = new AssetHistory();
                //    am.FieldValue = dr["FieldValue"].ToString();
                //    am.category = dr["category"].ToString();
                //    am.subcategory = dr["subcategory"].ToString();
                //    am.Comment = dr["Comment"].ToString();
                //    am.Date = dr["Date"].ToString();
                //    am.ChangedBy = dr["ChangedBy"].ToString();
                //    am.ChangedType = dr["ChangedType"].ToString();
                //    //am.AssetId = dr["AssetId"].ToString();
                //    am.Id = Convert.ToInt32(dr["Id"]);
                //    assetHistory.Add(am);
                //}
                //hier.AssetHistory = assetHistory;
                #endregion old
                // //Logger.Trace(LogCategory.WebApp, "AssetHierarchy object is set in GetAssetHierarchy() is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAssetHierarchy() procedure", LogLevel.Error, null);
            }

            return ds;
        }

        private Asset FormAsset(DataRow dr)
        {
            Asset a = new Asset();
            try
            {
                a.Id = Convert.ToInt32(dr["ID"]);
                a.Name = dr["Name"].ToString();
                a.Description = dr["Description"].ToString();
                a.AssetType = dr["AssetType"].ToString();
                a.AssetTypeId = Convert.ToInt32(dr["AssetTypeId"]);

                if ((dr["ParentID"] != DBNull.Value))
                    a.ParentID = Convert.ToInt32(dr["ParentID"]);

                a.RootAssetID = Convert.ToInt32(dr["RootAssetID"]);

                //a.Active = Convert.ToInt32(dr[""]);
                a.AsstMDLHierarID = Convert.ToInt32(dr["AsstMDLHierarID"]);

                a.AssetModelId = Convert.ToInt32(dr["AssetModelId"]);
                a.DataTypeId = Convert.ToInt32(dr["DataTypeId"]);
                a.DataType = dr["DataType"].ToString();

                //dr.Table.Columns["t"]
                if (dr.Table.Columns["FieldValue"] != null)
                {
                    if ((dr["FieldValue"] != DBNull.Value))
                        a.FieldValue = dr["FieldValue"].ToString();
                }

                //dr.Table.Columns["t"]
                if (dr.Table.Columns["docTypeId"] != null)
                {
                    if ((dr["docTypeId"] != DBNull.Value))
                        a.DocTypeId = Convert.ToInt32(dr["docTypeId"]);
                }

                //Logger.Trace(LogCategory.WebApp, "Asset object is set in FormAsset() procedure", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in FormAsset() procedure", LogLevel.Error, null);
            }
            return a;
        }

        private Asset AddChilds(Asset p, DataTable Tbl)
        {
            DataRow[] dr = Tbl.Select("ParentId=" + p.Id);
            if (dr.Length == 0)
                return p;
            foreach (DataRow r in dr)
            {
                Asset c = FormAsset(r);
                p.__children__.Add(c);
                AddChilds(c, Tbl);
            }

            return p;
        }



        [HttpGet]
        [Route("api/Asset/GetAssets")]
        public DataTable GetAssets(int modelId, int locationId)
        {
            DataTable Tbl = new DataTable();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssets";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@modelId", SqlDbType.Int);
                mid.Value = modelId;
                cmd.Parameters.Add(mid);

                SqlParameter lid = new SqlParameter("@locationId", SqlDbType.Int);
                lid.Value = locationId;
                cmd.Parameters.Add(lid);

                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);

                db.Fill(ds);
                Tbl = ds.Tables[0];

                //Logger.Trace(LogCategory.WebApp, "DataTable in GetAssets() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAssets() procedure", LogLevel.Error, null);
            }
            // int found = 0;
            return Tbl;
        }

        [HttpPost]
        [Route("api/Asset/SaveAsset")]
        public HttpResponseMessage SaveAsset(Asset a)
        {
            //connect to database
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelEESAsset";
                cmd.Connection = conn;
                conn.Open();
                //  @name varchar(50),@desc varchar(250)=null,@assettypeid int,@parentid int=null
                //  ,@rootassetid int=-1,@change char(1),@id int=null,@assetModelId int

                SqlParameter Gid = new SqlParameter("@name", SqlDbType.VarChar, 50);
                Gid.Value = a.Name;
                cmd.Parameters.Add(Gid);

                SqlParameter desc = new SqlParameter("@desc", SqlDbType.VarChar, 250);
                desc.Value = a.Description;
                cmd.Parameters.Add(desc);

                SqlParameter assettypeid = new SqlParameter("@assettypeid", SqlDbType.Int);
                assettypeid.Value = a.AssetTypeId;
                cmd.Parameters.Add(assettypeid);

                SqlParameter rootassetid = new SqlParameter("@rootassetid", SqlDbType.Int);
                rootassetid.Value = a.RootAssetID;
                cmd.Parameters.Add(rootassetid);

                SqlParameter AsstMDLHierarID = new SqlParameter("@AsstMDLHierarID", SqlDbType.Int);
                AsstMDLHierarID.Value = a.AsstMDLHierarID;
                cmd.Parameters.Add(AsstMDLHierarID);

                SqlParameter assetModelId = new SqlParameter("@assetModelId", SqlDbType.Int);
                assetModelId.Value = a.AssetModelId;
                cmd.Parameters.Add(assetModelId);


                SqlParameter LocationId = new SqlParameter("@LocationId", SqlDbType.Int);
                LocationId.Value = a.LocationId;
                cmd.Parameters.Add(LocationId);


                SqlParameter CurrLocation = new SqlParameter("@CurrLocation", SqlDbType.Int);
                CurrLocation.Value = a.CurrLocation;
                cmd.Parameters.Add(CurrLocation);

                SqlParameter mid = new SqlParameter("@ManufacturerId", SqlDbType.Int);
                mid.Value = a.ManufactureId;
                cmd.Parameters.Add(mid);

                SqlParameter dt3 = new SqlParameter("@DateofPurchase", SqlDbType.DateTime);
                dt3.Value = a.DatePurchased;
                cmd.Parameters.Add(dt3);

                SqlParameter upr = new SqlParameter("@Unitprice", SqlDbType.Decimal);
                upr.Value = a.UnitPrice;
                cmd.Parameters.Add(upr);


                //SqlParameter JobRate = new SqlParameter("@JobRate", SqlDbType.Decimal);
                //JobRate.Value = a.JobRate;
                //cmd.Parameters.Add(JobRate);

                //SqlParameter Jobid = new SqlParameter("@JobId", SqlDbType.Int);
                //Jobid.Value = a.JobId;
                //cmd.Parameters.Add(Jobid);

                SqlParameter Rental = new SqlParameter("@Rental", SqlDbType.Int);
                Rental.Value = a.Rental;
                cmd.Parameters.Add(Rental);

                SqlParameter rentalday = new SqlParameter("@RentalDayRate", SqlDbType.Decimal);
                rentalday.Value = a.RentalDayRate;
                cmd.Parameters.Add(rentalday);

                SqlParameter AdditionalDayRate = new SqlParameter("@AdditionalDayRate", SqlDbType.Decimal);
                AdditionalDayRate.Value = a.AdditionalDayRate;
                cmd.Parameters.Add(AdditionalDayRate);

                SqlParameter DayRate = new SqlParameter("@DayRate", SqlDbType.Decimal);
                DayRate.Value = a.DayRate;
                cmd.Parameters.Add(DayRate);

                SqlParameter PerWeekStbyCharge = new SqlParameter("@PerWeekStandbyCharge", SqlDbType.Decimal);
                PerWeekStbyCharge.Value = a.PerWeekStbyCharge;
                cmd.Parameters.Add(PerWeekStbyCharge);

                SqlParameter Redr = new SqlParameter("@RedressCost", SqlDbType.Decimal);
                Redr.Value = a.RedressCost;
                cmd.Parameters.Add(Redr);

                SqlParameter DateSold = new SqlParameter("@DateOfSold", SqlDbType.DateTime);
                DateSold.Value = a.DateSold;
                cmd.Parameters.Add(DateSold);


                SqlParameter LostDamaged = new SqlParameter("@Lost", SqlDbType.DateTime);
                LostDamaged.Value = a.LostDamaged;
                cmd.Parameters.Add(LostDamaged);

                SqlParameter Price = new SqlParameter("@Price", SqlDbType.Decimal);
                Price.Value = a.Price;
                cmd.Parameters.Add(Price);

                SqlParameter CycleCountDate = new SqlParameter("@CycleCountOfDate", SqlDbType.DateTime);
                CycleCountDate.Value = a.CycleCountDate;
                cmd.Parameters.Add(CycleCountDate);

                SqlParameter stat = new SqlParameter("@StatusId", SqlDbType.Int);
                stat.Value = a.StatusId;
                cmd.Parameters.Add(stat);

                SqlParameter Inspection = new SqlParameter("@InspectionVendor", SqlDbType.Int);
                Inspection.Value = a.InspectionVendorId;
                cmd.Parameters.Add(Inspection);

                SqlParameter Maintenance = new SqlParameter("@MaintenanceVendor", SqlDbType.Int);
                Maintenance.Value = a.MaintenanceVendorId;
                cmd.Parameters.Add(Maintenance);

                SqlParameter stid = new SqlParameter("@Condition", SqlDbType.Int);
                stid.Value = a.Condition;
                cmd.Parameters.Add(stid);

                SqlParameter sid = new SqlParameter("@Material", SqlDbType.Int);
                sid.Value = a.Material;
                cmd.Parameters.Add(sid);

                SqlParameter pcci = new SqlParameter("@PurchaseCost", SqlDbType.Decimal);
                pcci.Value = a.PurchaseCost;
                cmd.Parameters.Add(pcci);

                SqlParameter crt = new SqlParameter("@Customer", SqlDbType.Int);
                crt.Value = a.Customer;
                cmd.Parameters.Add(crt);

                SqlParameter ldt = new SqlParameter("@LostLIHDamaged", SqlDbType.VarChar, 250);
                ldt.Value = a.LostLIHDamaged;
                cmd.Parameters.Add(ldt);

                SqlParameter ldtt = new SqlParameter("@LocationDate", SqlDbType.Date);
                ldtt.Value = a.LocationDate;
                cmd.Parameters.Add(ldtt);

                SqlParameter nng = new SqlParameter("@Notes", SqlDbType.VarChar, 250);
                nng.Value = a.Notes;
                cmd.Parameters.Add(nng);

                if (a.ParentID != 0)
                {
                    SqlParameter parentid = new SqlParameter("@parentid", SqlDbType.Int);
                    parentid.Value = a.ParentID;
                    cmd.Parameters.Add(parentid);
                }

                SqlParameter loggedinUserId = new SqlParameter("@loggedinUserId", SqlDbType.Int);
                loggedinUserId.Value = a.changedById;
                cmd.Parameters.Add(loggedinUserId);

                SqlParameter id = new SqlParameter("@id", SqlDbType.Int);
                id.Value = a.Id;
                cmd.Parameters.Add(id);

                SqlParameter Active = new SqlParameter("@Active", SqlDbType.Int);
                Active.Value = a.Active;
                cmd.Parameters.Add(Active);

                SqlParameter flag = new SqlParameter("@change", SqlDbType.VarChar);
                flag.Value = a.insupddelflag;
                cmd.Parameters.Add(flag);

                SqlParameter Position = new SqlParameter("@IncPosition", SqlDbType.Int);
                Position.Value = a.IncPosition;
                cmd.Parameters.Add(Position);

                SqlParameter lok = new SqlParameter("@Locked", SqlDbType.Int);
                lok.Value = a.Locked;
                cmd.Parameters.Add(lok);

                cmd.ExecuteScalar();
                conn.Close();
                //Logger.Trace(LogCategory.WebApp, "InsUpdDelAsset() procedure is executed successfully in SaveAsset() procedure is loaded", LogLevel.Information, null);
                return new HttpResponseMessage(HttpStatusCode.OK);

            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                //throw ex;
                //string str = ex.Message;
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveAsset() procedure", LogLevel.Error, null);

                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }

        [Route("api/Asset/GetAssetConfig")]
        public DataSet GetAssetConfig()
        {
            DataSet Tbl = new DataSet();
            try
            {

                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetConfig";
                cmd.Connection = conn;


                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);

                //Logger.Trace(LogCategory.WebApp, "DataTable in GetAssetConfig() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAssetConfig() procedure", LogLevel.Error, null);
            }
            return Tbl;
        }


        [HttpGet]
        [Route("api/Asset/GetAssetDetails")]
        public AssetHierarchy GetAssetDetails(int assetId)
        {
            AssetHierarchy hier = new AssetHierarchy();
            DataTable Tbl = new DataTable();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetDetails";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@assetId", SqlDbType.Int);
                mid.Value = assetId;
                cmd.Parameters.Add(mid);

                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);

                List<Asset> faList = new List<Asset>();
                List<Asset> daList = new List<Asset>();
                List<AssetDocuments> acaTypes = new List<AssetDocuments>();
                //  List<AssetHistory> assetHistory = new List<AssetHistory>();
                foreach (DataRow fr in ds.Tables[0].Rows)
                {

                    faList.Add(FormAsset(fr));
                }
                foreach (DataRow dr in ds.Tables[1].Rows)
                {
                    daList.Add(FormAsset(dr));
                }

                foreach (DataRow dr in ds.Tables[2].Rows)
                {
                    AssetDocuments am = new AssetDocuments();
                    am.AssetId = Convert.ToInt32(dr["AssetId"].ToString());
                    am.docName = dr["FileName"].ToString();
                    am.Id = Convert.ToInt32(dr["Id"]);
                    am.docType = dr["DocType"].ToString();
                    am.docTypeId = Convert.ToInt32(dr["DocTypeId"]);
                    am.docCatId = Convert.ToInt32(dr["DocCategoryId"]);
                    if (dr["ExpiryDate"] != DBNull.Value)
                        am.expiryDate = Convert.ToDateTime(dr["ExpiryDate"]);
                    if (dr["DueDate"] != DBNull.Value)
                        am.dueDate = Convert.ToDateTime(dr["DueDate"]);
                    am.IsExpired = Convert.ToInt32(dr["IsExpired"]);
                    acaTypes.Add(am);
                }

                //foreach (DataRow dr in ds.Tables[3].Rows)
                //{
                //    AssetHistory am = new AssetHistory();
                //    am.Field = dr["Field"].ToString();
                //    am.SubItem = dr["SubItem"].ToString();
                //    am.Comment = dr["Comment"].ToString();
                //    am.Date = dr["Date"].ToString();
                //    am.ChangedBy = dr["ChangedBy"].ToString();
                //    am.ChangedType = dr["ChangedType"].ToString();
                //    //am.AssetId = dr["AssetId"].ToString();
                //    am.Id = Convert.ToInt32(dr["Id"]);
                //    assetHistory.Add(am);
                //}

                hier.FieldAssetsList = faList;
                hier.DocAssetsList = daList;
                hier.AssetDocuments = acaTypes;
                //  hier.AssetHistory = assetHistory;            
                //Logger.Trace(LogCategory.WebApp, "AssetHierachy object is set in GetAssetHierarchy() procedure", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAssetHierarchy() procedure", LogLevel.Error, null);
            }
            return hier;
        }

        [HttpGet]
        [Route("api/Asset/GetAllowedChildAssetTypes")]
        public AssetHierarchy GetAllowedChildAssetTypes(int assetId)
        {
            AssetHierarchy hier = new AssetHierarchy();
            DataTable Tbl = new DataTable();

            try
            {

                //connect to database
                SqlConnection conn = new SqlConnection();
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAllowedChildAssetTypes";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@assetId", SqlDbType.Int);
                mid.Value = assetId;
                cmd.Parameters.Add(mid);

                //  DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);

                List<AssetModelDetail> acaTypes = new List<AssetModelDetail>();

                foreach (DataRow dr in Tbl.Rows)
                {
                    AssetModelDetail am = new AssetModelDetail();
                    am.ObjTypeName = dr["Name"].ToString();
                    am.Id = Convert.ToInt32(dr["Id"]);
                    am.ObjTypeId = Convert.ToInt32(dr["ObjTypeId"]);
                    acaTypes.Add(am);
                }

                //hier.FieldAssetsList = faList;
                //hier.DocAssetsList = daList;
                hier.AllowedChildAssetTypes = acaTypes;

                //Logger.Trace(LogCategory.WebApp, "AssetHierachy object is set in GetAllowedChildAssetTypes() procedure", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAllowedChildAssetTypes() procedure", LogLevel.Error, null);
            }
            return hier;
        }

        [HttpPost]
        [Route("api/Asset/SaveAssetDoc")]
        public DataSet SaveAssetDoc(AssetDocuments a)
        {
            //connect to database
            SqlConnection conn = new SqlConnection();
            DataSet ds = new DataSet();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelAssetDocs";
                cmd.Connection = conn;

                SqlParameter id = new SqlParameter("@Id", SqlDbType.Int);
                id.Value = a.Id;
                cmd.Parameters.Add(id);

                SqlParameter AssetId = new SqlParameter("@AssetId", SqlDbType.Int);
                AssetId.Value = a.AssetId;
                cmd.Parameters.Add(AssetId);

                SqlParameter Gid = new SqlParameter("@FileName", SqlDbType.VarChar, 100);
                Gid.Value = a.docName;
                cmd.Parameters.Add(Gid);

                SqlParameter assettypeid = new SqlParameter("@DocCategoryId", SqlDbType.Int);
                assettypeid.Value = a.docCatId;
                cmd.Parameters.Add(assettypeid);

                SqlParameter rootassetid = new SqlParameter("@DocTypeId", SqlDbType.Int);
                rootassetid.Value = a.docTypeId;
                cmd.Parameters.Add(rootassetid);

                SqlParameter AsstMDLHierarID = new SqlParameter("@UpdatedById", SqlDbType.Int);
                AsstMDLHierarID.Value = a.UpdatedById;
                cmd.Parameters.Add(AsstMDLHierarID);

                SqlParameter assetModelId = new SqlParameter("@ExpiryDate", SqlDbType.Date);
                assetModelId.Value = a.expiryDate;
                cmd.Parameters.Add(assetModelId);


                SqlParameter LocationId = new SqlParameter("@DueDate", SqlDbType.Date);
                LocationId.Value = a.dueDate;
                cmd.Parameters.Add(LocationId);

                SqlParameter parentid = new SqlParameter("@FileContent", SqlDbType.VarChar);
                parentid.Value = a.docContent;
                cmd.Parameters.Add(parentid);

                SqlParameter flag = new SqlParameter("@change", SqlDbType.VarChar);
                flag.Value = a.insupddelflag;
                cmd.Parameters.Add(flag);

                SqlParameter loggedinUserId1 = new SqlParameter("@loggedinUserId", SqlDbType.Int);
                loggedinUserId1.Value = a.UpdatedById;
                cmd.Parameters.Add(loggedinUserId1);

                SqlParameter Position = new SqlParameter("@IncPosition", SqlDbType.Int);
                Position.Value = a.IncPosition;
                cmd.Parameters.Add(Position);

                SqlParameter OrderNo = new SqlParameter("@OrderNo", SqlDbType.Int);
                OrderNo.Value = a.OrderNo;
                cmd.Parameters.Add(OrderNo);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(ds);

                //Logger.Trace(LogCategory.WebApp, "InsUpdDelAssetDocs is executed successfully in SaveAssetDocs() procedure", LogLevel.Information, null);
                return ds;
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveAssetDocs() procedure", LogLevel.Error, null);
                return ds;
            }
        }

        [HttpGet]
        public DataTable GetAssetFileContent(int docId)
        {

            DataTable Tbl = new DataTable();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetFileContent";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@fileID", SqlDbType.Int);
                mid.Value = docId;
                cmd.Parameters.Add(mid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetAssetFileContent() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAssetFileContent() procedure", LogLevel.Error, null);
            }

            return Tbl;
        }


        [HttpPost]
        [Route("api/Asset/SaveAssetDetails")]
        public HttpResponseMessage SaveAssetDetails(AssetHierarchy adetails)
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
                cmd.CommandText = "InsUpdDelAssetFieldValues";
                cmd.Connection = conn;

                conn.Open();
                transaction = conn.BeginTransaction();
                cmd.Transaction = transaction;
                if (adetails.FieldAssetsList.Count > 0)
                {
                    foreach (Asset a in adetails.FieldAssetsList)
                    {
                        SqlParameter id = new SqlParameter("@Id", SqlDbType.Int);
                        id.Value = a.Id;
                        cmd.Parameters.Add(id);

                        SqlParameter AssetId = new SqlParameter("@ChildAssetIId", SqlDbType.Int);
                        AssetId.Value = a.Id;
                        cmd.Parameters.Add(AssetId);

                        SqlParameter Gid = new SqlParameter("@Value", SqlDbType.VarChar, 250);
                        Gid.Value = a.FieldValue;
                        cmd.Parameters.Add(Gid);

                        SqlParameter mid = new SqlParameter("@AssetModelHId", SqlDbType.VarChar, 250);
                        mid.Value = a.AsstMDLHierarID;
                        cmd.Parameters.Add(mid);

                        SqlParameter loggedinUserId = new SqlParameter("@loggedinUserId", SqlDbType.Int);
                        loggedinUserId.Value = adetails.ChangedById;
                        cmd.Parameters.Add(loggedinUserId);


                        cmd.ExecuteScalar();
                        cmd.Parameters.Clear();
                    }
                }


                transaction.Commit();
                // conn.Close();                
                //Logger.Trace(LogCategory.WebApp, "SaveAssetDetails() procedure execution is completed", LogLevel.Information, null);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }

            catch (SqlException sqlEx)
            {
                transaction.Rollback();
                //Logger.Error(LogCategory.WebApp, sqlEx.Message.ToString() + ". An error occured in SaveAssetDetails() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, sqlEx);

            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveAssetDetails() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public static byte[] GetBytes(string str)
        {
            byte[] bytes = new byte[str.Length * sizeof(char)];
            System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
            return bytes;
        }

        [HttpGet]
        [Route("api/Asset/GetAssetHistoryDetails")]
        public DataTable GetAssetHistoryDetails(int ehId)
        {

            DataTable Tbl = new DataTable();
            try
            {

                //connect to database
                SqlConnection conn = new SqlConnection();
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetDetailedAssetEditHistory";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@ehId", SqlDbType.Int);
                mid.Value = ehId;
                cmd.Parameters.Add(mid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);

                //Logger.Trace(LogCategory.WebApp, "DataTable in GetAssetHistoryDetails() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)

            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAssetHistoryDetails() procedure", LogLevel.Error, null);
            }
            return Tbl;
        }

        public static Stream GenerateStreamFromString(string s)
        {
            return new MemoryStream(Encoding.ASCII.GetBytes(s));
        }

        [HttpGet]
        [Route("api/Asset/GetAllAssetsWithDocs")]
        public DataTable GetAllAssetsWithDocs(int modelId, int locationId)
        {
            DataTable Tbl = new DataTable();
            try
            {

                //connect to database
                SqlConnection conn = new SqlConnection();

                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetsWithDocs";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@modelId", SqlDbType.Int);
                mid.Value = modelId;
                cmd.Parameters.Add(mid);

                SqlParameter lid = new SqlParameter("@locationId", SqlDbType.Int);
                lid.Value = locationId;
                cmd.Parameters.Add(lid);
                SqlDataAdapter db = new SqlDataAdapter(cmd);

                db.Fill(Tbl);

                //Logger.Trace(LogCategory.WebApp, "DataTable in GetAllAssetsWithDocs() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAllAssetsWithDocs() procedure", LogLevel.Error, null);
            }
            // int found = 0;
            return Tbl;
        }


        [HttpGet]
        [Route("api/Asset/DocsPaging")]
        public DataSet DocsPaging(int modelId, int locationId, int curpage, int maxrows)
        {
            //DataTable Tbl = new DataTable();
            DataSet tbl = new DataSet();

            try
            {

                //connect to database
                SqlConnection conn = new SqlConnection();

                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetsWithDocsPaging";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@modelId", SqlDbType.Int);
                mid.Value = modelId;
                cmd.Parameters.Add(mid);

                SqlParameter lid = new SqlParameter("@locationId", SqlDbType.Int);
                lid.Value = locationId;
                cmd.Parameters.Add(lid);

                SqlParameter cur = new SqlParameter("@curpage", SqlDbType.Int);
                cur.Value = curpage;
                cmd.Parameters.Add(cur);

                SqlParameter max = new SqlParameter("@maxrows", SqlDbType.Int);
                max.Value = maxrows;
                cmd.Parameters.Add(max);


                SqlDataAdapter db = new SqlDataAdapter(cmd);

                db.Fill(tbl);

                //Logger.Trace(LogCategory.WebApp, "DataTable in GetAllAssetsWithDocs() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAllAssetsWithDocs() procedure", LogLevel.Error, null);
            }
            // int found = 0;
            return tbl;
        }

        [HttpGet]
        [Route("api/Asset/GetAllJobs")]
        public DataTable GetJobsList(int assetId)
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
                cmd.CommandText = "GetAllJobs";
                cmd.Connection = conn;

                SqlParameter aId = new SqlParameter();
                aId.ParameterName = "@AssetID";
                aId.SqlDbType = SqlDbType.Int;
                aId.Value = assetId;
                cmd.Parameters.Add(aId);

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
        [Route("api/Asset/GetWorkOrderStatus")]
        public DataSet TypesByGroupId(int groupid)
        {
            DataTable Tbl = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetWorkOrderStatus";
                cmd.Connection = conn;

                SqlParameter Gid = new SqlParameter();
                Gid.ParameterName = "@typegrpid";
                Gid.SqlDbType = SqlDbType.Int;
                Gid.Value = groupid;
                cmd.Parameters.Add(Gid);
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetWorkOrderStatus] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetWorkOrderStatus]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return ds;
        }

        [HttpGet]
        [Route("api/Asset/GetWorkOrderTypes")]
        public DataSet GetWorkOrderTypes()
        {
            DataTable Tbl = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetWorkOrderTypes";
                cmd.Connection = conn;

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetWorkOrderTypes] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetWorkOrderTypes]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return ds;
        }

        [HttpGet]
        [Route("api/Asset/GetVendorDetails")]
        public DataSet GetVendorByWorkOrderTypeId(int workOrderTypeId, int assetId)
        {
            DataTable Tbl = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetVendorByWorkOrderTypeId";
                cmd.Connection = conn;

                SqlParameter typeId = new SqlParameter();
                typeId.ParameterName = "@WorkOrderTypeId";
                typeId.SqlDbType = SqlDbType.Int;
                typeId.Value = workOrderTypeId;
                cmd.Parameters.Add(typeId);

                SqlParameter assId = new SqlParameter();
                assId.ParameterName = "@AssetID";
                assId.SqlDbType = SqlDbType.Int;
                assId.Value = assetId;
                cmd.Parameters.Add(assId);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetVendorByWorkOrderTypeId] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetVendorByWorkOrderTypeId]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return ds;
        }

        [HttpGet]
        [Route("api/Asset/GetAssetModels")]
        public DataSet GetAssetModels()
        {
            DataTable Tbl = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetModels";
                cmd.Connection = conn;

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetAssetModels] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetAssetModels]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return ds;
        }

        [HttpGet]
        [Route("api/Asset/GetObjectTypes")]
        public DataSet GetObjectTypes(int assetModelId)
        {
            DataTable Tbl = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetModelDetail";
                cmd.Connection = conn;

                SqlParameter modelId = new SqlParameter();
                modelId.ParameterName = "@assetmodelID";
                modelId.SqlDbType = SqlDbType.Int;
                modelId.Value = assetModelId;
                cmd.Parameters.Add(modelId);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetObjectTypes] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetObjectTypes]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return ds;
        }

        [HttpGet]
        [Route("api/Asset/GetCompanies")]
        public DataSet GetCompanys()
        {
            DataTable Tbl = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetCompanies";
                cmd.Connection = conn;

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetCompanies] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetCompanies]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return ds;
        }

        [HttpPost]
        [Route("api/Asset/SaveWorkOrder")]
        public HttpResponseMessage SaveWorkOrderDetails(WorkOrder j)
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
                cmd.CommandText = "InsUpdDelWorkOrder";
                cmd.Connection = conn;
                conn.Open();

                transaction = conn.BeginTransaction();
                cmd.Transaction = transaction;

                #region save job details
                SqlParameter ID = new SqlParameter("@ID", SqlDbType.Int);
                ID.Value = Convert.ToString(j.ID);
                cmd.Parameters.Add(ID);

                SqlParameter JobID = new SqlParameter("@JobID", SqlDbType.NVarChar);
                JobID.Value = (j.JobID != 0) ? j.JobID.ToString() : null;
                cmd.Parameters.Add(JobID);

                SqlParameter workOrderID = new SqlParameter("@WorkOrderID", SqlDbType.NVarChar, 50);
                workOrderID.Value = j.WorkOrderID;
                cmd.Parameters.Add(workOrderID);

                SqlParameter asset = new SqlParameter("@Asset", SqlDbType.Int);
                asset.Value = j.Asset;
                cmd.Parameters.Add(asset);

                SqlParameter Status = new SqlParameter("@Status", SqlDbType.Int);
                Status.Value = j.Status;
                cmd.Parameters.Add(Status);

                SqlParameter Vendor = new SqlParameter("@Vendor", SqlDbType.NVarChar, 50);
                Vendor.Value = j.Vendor;
                cmd.Parameters.Add(Vendor);

                SqlParameter EquipmentType = new SqlParameter("@EquipmentType", SqlDbType.Int);
                EquipmentType.Value = j.EquipmentType;
                cmd.Parameters.Add(EquipmentType);

                SqlParameter ObjectType = new SqlParameter("@ObjectType", SqlDbType.Int);
                ObjectType.Value = j.ObjectType;
                cmd.Parameters.Add(ObjectType);

                SqlParameter Date = new SqlParameter("@Date", SqlDbType.Date);
                Date.Value = j.Date;
                cmd.Parameters.Add(Date);

                SqlParameter PO = new SqlParameter("@PO", SqlDbType.NVarChar, 50);
                PO.Value = j.PO;
                cmd.Parameters.Add(PO);

                SqlParameter DT = new SqlParameter("@DT", SqlDbType.NVarChar, 50);
                DT.Value = j.DT;
                cmd.Parameters.Add(DT);

                SqlParameter Company = new SqlParameter("@Company", SqlDbType.Int);
                Company.Value = j.Company;
                cmd.Parameters.Add(Company);

                SqlParameter DateNeeded = new SqlParameter("@DateNeeded", SqlDbType.NVarChar, 50);
                DateNeeded.Value = j.DateNeeded;
                cmd.Parameters.Add(DateNeeded);

                SqlParameter OrderedBy = new SqlParameter("@OrderedBy", SqlDbType.NVarChar, 50);
                OrderedBy.Value = j.OrderedBy;
                cmd.Parameters.Add(OrderedBy);

                SqlParameter WorkOrderType = new SqlParameter("@WorkOrderType", SqlDbType.Int);
                WorkOrderType.Value = j.WorkOrderType;
                cmd.Parameters.Add(WorkOrderType);

                SqlParameter SN = new SqlParameter("@SN", SqlDbType.NVarChar, 50);
                SN.Value = j.SN;
                cmd.Parameters.Add(SN);

                SqlParameter ToolDescription = new SqlParameter("@ToolDescription", SqlDbType.NVarChar, 500);
                ToolDescription.Value = j.ToolDescription;
                cmd.Parameters.Add(ToolDescription);

                SqlParameter WorkInstructions = new SqlParameter("@WorkInstructions", SqlDbType.NVarChar, 500);
                WorkInstructions.Value = j.WorkInstructions;
                cmd.Parameters.Add(WorkInstructions);

                SqlParameter Cost = new SqlParameter("@Cost", SqlDbType.NVarChar, 50);
                Cost.Value = j.Cost;
                cmd.Parameters.Add(Cost);

                SqlParameter Comments = new SqlParameter("@Comments", SqlDbType.NVarChar, 500);
                Comments.Value = j.Comments;
                cmd.Parameters.Add(Comments);

                SqlParameter flag = new SqlParameter("@insupdflag", SqlDbType.VarChar);
                flag.Value = j.insupddelflag;
                cmd.Parameters.Add(flag);

                SqlParameter loggedinUserId = new SqlParameter("@loggedinUserId", SqlDbType.Int);
                loggedinUserId.Value = j.changedById;
                cmd.Parameters.Add(loggedinUserId);

                object workOrderId = cmd.ExecuteScalar();

                #endregion save work order details

                transaction.Commit();
                // conn.Close();
                //Logger.Trace(LogCategory.WebApp, "DataTable in SaveWorkOrder() procedure is loaded", LogLevel.Information, null);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (SqlException sqlEx)
            {
                transaction.Rollback();
                //Logger.Error(sqlEx, LogCategory.WebApp, "An error occured in SaveWorkOrder() procedure", LogLevel.Error, null);
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

        [HttpGet]
        [Route("api/Asset/GetWorkOrderDetails")]
        public DataSet GetWorkOrderDetails(int assetID)
        {
            DataTable Tbl = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetWorkOrderDetails";
                cmd.Connection = conn;

                SqlParameter assetId = new SqlParameter();
                assetId.ParameterName = "@assetId";
                assetId.SqlDbType = SqlDbType.Int;
                assetId.Value = assetID;
                cmd.Parameters.Add(assetId);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetWorkOrderDetails] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetWorkOrderDetails]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return ds;
        }
        [HttpGet]
        [Route("api/Asset/GetNewWorkOrderID")]
        public DataSet GetNewWorkOrderID()
        {
            DataTable Tbl = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetNewWorkOrderID";
                cmd.Connection = conn;

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetNewWorkOrderID] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetNewWorkOrderID]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return ds;
        }


        [HttpPost]
        [Route("api/Asset/UpdateStatus")]
        public DataSet UpdateStatus(UpdateStatuss a)
        {
            //connect to database
            DataSet ds = new DataSet();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelUpdateStatus";
                cmd.Connection = conn;
                conn.Open();
                //  @name varchar(50),@desc varchar(250)=null,@assettypeid int,@parentid int=null
                //  ,@rootassetid int=-1,@change char(1),@id int=null,@assetModelId int

                SqlParameter Gid = new SqlParameter("@Name", SqlDbType.VarChar, 50);
                Gid.Value = a.Name;
                cmd.Parameters.Add(Gid);

                SqlParameter sid = new SqlParameter("@StatusId", SqlDbType.Int);
                sid.Value = a.StatusId;
                cmd.Parameters.Add(sid);

                SqlParameter chan = new SqlParameter("@change", SqlDbType.VarChar, 50);
                chan.Value = a.change;
                cmd.Parameters.Add(chan);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);

                conn.Close();
                //Logger.Trace(LogCategory.WebApp, "InsUpdDelAsset() procedure is executed successfully in SaveAsset() procedure is loaded", LogLevel.Information, null);
                //return new HttpResponseMessage(HttpStatusCode.OK);

            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                // throw ex;
                //string str = ex.Message;
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveAsset() procedure", LogLevel.Error, null);

                //return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            return ds;
        }

        [HttpGet]
        [Route("api/Asset/GetWorkOrdersByVendorID")]
        public DataSet GetWorkOrdersByVendorID(int vendorID, int jobID)
        {
            DataTable Tbl = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetWorkOrdersByVendor";
                cmd.Connection = conn;

                SqlParameter assetId = new SqlParameter();
                assetId.ParameterName = "@VendorID";
                assetId.SqlDbType = SqlDbType.Int;
                assetId.Value = vendorID;
                cmd.Parameters.Add(assetId);

                SqlParameter jobId = new SqlParameter();
                jobId.ParameterName = "@JobID";
                jobId.SqlDbType = SqlDbType.Int;
                jobId.Value = jobID;
                cmd.Parameters.Add(jobId);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetWorkOrdersByVendorID] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetWorkOrdersByVendorID]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return ds;
        }

        [HttpGet]
        [Route("api/Asset/GetDeliveryTicketId")]
        public DataSet GetDeliveryTicketId(int jId, int sequence)
        {
            DataTable Tbl = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetDeliveryTicketId";
                cmd.Connection = conn;

                SqlParameter jobId = new SqlParameter();
                jobId.ParameterName = "@JobID";
                jobId.SqlDbType = SqlDbType.Int;
                jobId.Value = jId;
                cmd.Parameters.Add(jobId);

                SqlParameter sequenceId = new SqlParameter();
                sequenceId.ParameterName = "@Sequence";
                sequenceId.SqlDbType = SqlDbType.Int;
                sequenceId.Value = sequence;
                cmd.Parameters.Add(sequenceId);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetDeliveryTicketId] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetDeliveryTicketId]() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return ds;
        }

        [HttpGet]
        [Route("api/Asset/GetWorkOrdersByVendor")]
        public byte[] GetWorkOrdersByVendor(int vendorID, int jobID)
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
                cmd.CommandText = "GetWorkOrdersByVendor";
                cmd.Connection = conn;

                SqlParameter assetId = new SqlParameter();
                assetId.ParameterName = "@VendorID";
                assetId.SqlDbType = SqlDbType.Int;
                assetId.Value = vendorID;
                cmd.Parameters.Add(assetId);

                SqlParameter jobId = new SqlParameter();
                jobId.ParameterName = "@JobID";
                jobId.SqlDbType = SqlDbType.Int;
                jobId.Value = jobID;
                cmd.Parameters.Add(jobId);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                result = GeneratePDF(ds);
                //Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "[GetWorkOrdersByVendor] Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //error = ex.ToString();
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in [GetWorkOrdersByVendor]() procedure", LogLevel.Error, null);
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
                htmlDocument.Load(@"" + HttpContext.Current.Server.MapPath("/UI/Content/WorkOrder.html"));
                //relplace all column values

                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    string pattern = @"\{\{Vendor\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["VendorName"] + "");

                    pattern = @"\{\{ToolName\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["SN"] + "");

                    pattern = @"\{\{WorkOrderID\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["WorkOrderID"] + "");

                    string date = (ds.Tables[0].Rows[0]["Date"] != null) ? Convert.ToDateTime(ds.Tables[0].Rows[0]["Date"]).ToString("dd/MM/yyyy") : "";
                    pattern = @"\{\{Date\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, date);

                    pattern = @"\{\{P.O.\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["P.O."] + "");

                    List<String> dtValues = new List<string>();
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        string dt = ds.Tables[0].Rows[i]["DT"] + "";
                        if (!string.IsNullOrEmpty(dt) && !dtValues.Contains(dt))
                            dtValues.Add(dt);
                    }
                    pattern = @"\{\{D.T.#\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, (dtValues.Count > 0) ? String.Join(",", dtValues) : "");

                    pattern = @"\{\{Company\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["CompanyName"] + "");

                    pattern = @"\{\{DateNeeded\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["DateNeeded"] + "");

                    pattern = @"\{\{OrderedBy\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["OrderedBy"] + "");

                    pattern = @"\{\{Comments\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["Comments"] + "");

                    pattern = @"\{\{DocumentControl\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, ds.Tables[0].Rows[0]["DocumentControl"] + "");

                    string initialDate = (ds.Tables[0].Rows[0]["InitialDate"] != null) ? Convert.ToDateTime(ds.Tables[0].Rows[0]["InitialDate"]).ToString("dd/MM/yyyy") : "";
                    pattern = @"\{\{InitialDate\}\}";
                    htmlDocument.DocumentNode.InnerHtml = Regex.Replace(htmlDocument.DocumentNode.InnerHtml, pattern, initialDate);

                    HtmlNode row = htmlDocument.GetElementbyId("workorder-row");
                    for (int count = 0; count < ds.Tables[0].Rows.Count; count++)
                    {
                        row.InnerHtml += "<tr><td>" + ds.Tables[0].Rows[count]["SN"] + "" + "</td><td>" + ds.Tables[0].Rows[count]["ToolDescription"] + "" + "</td><td>" + ds.Tables[0].Rows[count]["WorkInstructions"] + "" + "</td><td>" + ds.Tables[0].Rows[count]["QTY"] + "" + "</td><td>" + ds.Tables[0].Rows[count]["Cost"] + "" + "</td></tr>";
                    }
                    Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 60f, 10f);
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);

                    writer.PageEvent = new itextEvents();
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

    }
}
