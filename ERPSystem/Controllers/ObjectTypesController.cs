using ERPSystem;
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

namespace ERPSystem.Controllers
{
    public class ObjectTypesController : ApiController
    {
         [HttpGet]
        public DataTable getObjectTypes()
        {
            DataTable Tbl = new DataTable();
            try
            {
                
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetObjectTypeDetails";
                cmd.Connection = conn;
                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetObjectTypeDetails() procedure is loaded.", LogLevel.Information, null);
                
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetObjectTypeDetails() procedure", LogLevel.Error, null);
            }
            // int found = 0;
            return Tbl;
        }
          [HttpPost]
         public HttpResponseMessage saveObjectTypes(ObjectTypes b)
        {

            //connect to database
            SqlConnection conn = new SqlConnection();
              try
              { 
            //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();
          
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "InsUpdDelobjTypes";
            cmd.Connection = conn;
            conn.Open();
         

            SqlParameter Gid = new SqlParameter();
            Gid.ParameterName = "@Name";
            Gid.SqlDbType = SqlDbType.VarChar;
            Gid.Value = b.Name;
            cmd.Parameters.Add(Gid);

            SqlParameter Gim = new SqlParameter();
            Gim.ParameterName = "@Id";
            Gim.SqlDbType = SqlDbType.Int;
            Gim.Value = Convert.ToString(b.Id);
            cmd.Parameters.Add(Gim);

            SqlParameter pid = new SqlParameter();
            pid.ParameterName = "@desc";
            pid.SqlDbType = SqlDbType.VarChar;
            pid.Value = b.Description;
            cmd.Parameters.Add(pid);

            SqlParameter llid = new SqlParameter();
            llid.ParameterName = "@Active";
            llid.SqlDbType = SqlDbType.Int;
            llid.Value = b.Active;
            cmd.Parameters.Add(llid);

            SqlParameter flag = new SqlParameter();
            flag.ParameterName = "@change";
            flag.SqlDbType = SqlDbType.VarChar;
            flag.Value = b.insupddelflag;
            cmd.Parameters.Add(flag);
           
            SqlParameter dtid = new SqlParameter();
            dtid.ParameterName = "@datatypeid";
            dtid.SqlDbType = SqlDbType.Int;
            dtid.Value = Convert.ToString(b.DataTypeId);
            cmd.Parameters.Add(dtid);
                              
            cmd.ExecuteScalar();
            conn.Close();
            
                //Logger.Trace(LogCategory.WebApp, "saveObjectTypes() procedure is executed successfully.", LogLevel.Information, null);
                return new HttpResponseMessage(HttpStatusCode.OK);
              }
              catch (Exception ex)
              {
                  if (conn != null && conn.State == ConnectionState.Open)
                  {
                      conn.Close();
                  }
                  string str = ex.Message;

                  
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in saveObjectTypes() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
              }
        }
        public void Options() { }

    }
    }

