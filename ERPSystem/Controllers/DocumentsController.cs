
using ERPSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ERPSystem.Controllers
{
    public class DocumentsController : ApiController
    {
        [HttpGet]
        [Route("api/Documents/GetDocsList")]
        public DataTable GetDocsList()
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
                cmd.CommandText = "GetDocsList";
                cmd.Connection = conn;
                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetDocsList() procedure is loaded", LogLevel.Information, null);
                return Tbl;
            }
            catch (Exception ex) {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetDocsList() procedure", LogLevel.Error, null);
                throw ex;
            }
        }

        [HttpPost]
        public HttpResponseMessage SaveDocsList(List<PPDocument> docs)
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
                cmd.CommandText = "InsUpdDelDocs";
                cmd.Connection = conn;
                conn.Open();

                transaction = conn.BeginTransaction();
                cmd.Transaction = transaction;
                //save job documents
                #region save documents
                if (docs != null)
                {

                    cmd.Parameters.Clear();
                 
                //   @FileName varchar(100) ,@DocTypeId int,@FileContent varchar(max),@createdDT date = null,@UpdatedDT date = null,@createdby int = null,@updatedby int = null,@LocationId int = null,@ExipryDate date = null,@EffectiveDate date = null,@Description varchar(500) = null,@flag char,@ID int=-1

                    foreach (PPDocument a in docs)
                    {
                        SqlParameter FileName = new SqlParameter("@FileName", SqlDbType.VarChar, 100);
                        FileName.Value = a.FileName;
                        cmd.Parameters.Add(FileName);

                        SqlParameter Gid1 = new SqlParameter("@DocTypeId", SqlDbType.Int);
                        Gid1.Value = a.docTypeId;
                        cmd.Parameters.Add(Gid1);

                        SqlParameter CreatedBy = new SqlParameter("@CreatedBy", SqlDbType.Int);
                        CreatedBy.Value = a.createdById;
                        cmd.Parameters.Add(CreatedBy);

                        SqlParameter UpdatedBy = new SqlParameter("@UpdatedBy", SqlDbType.Int);
                        UpdatedBy.Value = a.UpdatedById;
                        cmd.Parameters.Add(UpdatedBy);

                        SqlParameter LocationId = new SqlParameter("@LocationId", SqlDbType.Int);
                        LocationId.Value = a.LocationId;
                        cmd.Parameters.Add(LocationId);

                        SqlParameter ExpiryDate = new SqlParameter("@ExipryDate", SqlDbType.Date);
                        ExpiryDate.Value = a.exipryDate;
                        cmd.Parameters.Add(ExpiryDate);

                        SqlParameter effectiveDate = new SqlParameter("@EffectiveDate", SqlDbType.Date);
                        effectiveDate.Value = a.effectiveDate;
                        cmd.Parameters.Add(effectiveDate);

                        SqlParameter desc = new SqlParameter("@Description", SqlDbType.VarChar, 500);
                        desc.Value = a.Description;
                        cmd.Parameters.Add(desc);

                        SqlParameter parentid = new SqlParameter("@FileContent", SqlDbType.VarChar);
                        parentid.Value = a.FileContent;
                        cmd.Parameters.Add(parentid);

                        SqlParameter OrderNo = new SqlParameter("@OrderNo", SqlDbType.VarChar);
                        OrderNo.Value = a.OrderNo;
                        cmd.Parameters.Add(OrderNo);

                        SqlParameter id = new SqlParameter("@ID", SqlDbType.Int);
                        id.Value = a.ID;
                        cmd.Parameters.Add(id);

                        SqlParameter flag1 = new SqlParameter("@flag", SqlDbType.VarChar);
                        flag1.Value = a.insupddelflag;
                        cmd.Parameters.Add(flag1);

                        SqlParameter Position = new SqlParameter("@IncPosition", SqlDbType.Int);
                        Position.Value = a.IncPosition;
                        cmd.Parameters.Add(Position);

                        cmd.ExecuteScalar();
                        cmd.Parameters.Clear();
                    }
                }
                #endregion save job documents

                transaction.Commit();
                //Logger.Trace(LogCategory.WebApp, "SaveDocsList() procedure executed successfully", LogLevel.Information, null);      
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (SqlException sqlEx)
            {
                transaction.Rollback();
                //Logger.Error(sqlEx, LogCategory.WebApp, "An SQL error occured in SaveDocsList() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, sqlEx);

            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveDocsList() procedure", LogLevel.Error, null);

             return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        [HttpPost]
        [Route("api/Documents/FilteredDocsList")]
        public DataTable FilteredDocsList(PPDocument doc)
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
                cmd.CommandText = "GetDocsList";
                cmd.Connection = conn;
                conn.Open();

                SqlParameter FileName = new SqlParameter("@FileName", SqlDbType.VarChar, 100);
                FileName.Value = doc.FileName;
                cmd.Parameters.Add(FileName);

                SqlParameter Gid1 = new SqlParameter("@DocTypeId", SqlDbType.Int);
                Gid1.Value = doc.docTypeId;
                cmd.Parameters.Add(Gid1);

                SqlParameter LocationId = new SqlParameter("@LocationId", SqlDbType.Int);
                LocationId.Value = doc.LocationId;
                cmd.Parameters.Add(LocationId);

                DataTable Tbl = new DataTable();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);
                //Logger.Trace(LogCategory.WebApp, "DataTable in FilteredDocsList() procedure is loaded", LogLevel.Information, null);
                return Tbl;
            }
            catch (SqlException sqlEx)
            {
                transaction.Rollback();
                //Logger.Error(sqlEx, LogCategory.WebApp, "An SQL error occured in SaveDocsList() procedure", LogLevel.Error, null);
                return new DataTable();

            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveDocsList() procedure", LogLevel.Error, null);

                return new DataTable();
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        [HttpGet]
        public DataTable GetPPFileContent(int docId)
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
                cmd.CommandText = "GetPPFileContent";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@fileID", SqlDbType.Int);
                mid.Value = docId;
                cmd.Parameters.Add(mid);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetPPFileContent() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetPPFileContent() procedure", LogLevel.Error, null);
            }

            return Tbl;
        }
    }
}
