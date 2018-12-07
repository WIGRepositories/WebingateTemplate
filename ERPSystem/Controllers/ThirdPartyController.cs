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
   public class ThirdPartyController : ApiController
    {
       [Route("api/ThirdParty/GetThirdPartyResources")]
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
       [HttpPost]
       [Route("api/ThirdParty/SaveTPResource")]
       public HttpResponseMessage SaveTPResource(TPResource cus)
       {

           //connect to database
           SqlConnection conn = new SqlConnection();
           try
           {
               //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
               conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

               SqlCommand cmd = new SqlCommand();
               cmd.CommandType = CommandType.StoredProcedure;
               cmd.CommandText = "InsUpdDelThirdPartyResources";
               cmd.Connection = conn;
               conn.Open();


               SqlParameter uid = new SqlParameter("@Id",SqlDbType.Int);
               uid.Value = Convert.ToString(cus.Id);
               cmd.Parameters.Add(uid);

               SqlParameter Gid = new SqlParameter("@ResourceName", SqlDbType.VarChar, 50);
               Gid.Value = cus.ResourceName;
               cmd.Parameters.Add(Gid);

               SqlParameter Gim = new SqlParameter("@VendorName", SqlDbType.VarChar, 50);
               Gim.Value = Convert.ToString(cus.VendorName);
               cmd.Parameters.Add(Gim);

               SqlParameter pid = new SqlParameter("@ResouceType", SqlDbType.VarChar, 50);
               pid.Value = cus.ResourceType;
               cmd.Parameters.Add(pid);

               SqlParameter loc = new SqlParameter("@Description", SqlDbType.VarChar, 250);
               loc.Value = cus.Description;
               cmd.Parameters.Add(loc);


               SqlParameter flag = new SqlParameter("@insupddelflag", SqlDbType.VarChar);
               flag.Value = cus.insupddelflag;
               cmd.Parameters.Add(flag);

             
               cmd.ExecuteScalar();
               conn.Close();

               //Logger.Trace(LogCategory.WebApp, "InsUpdDelThirdPartyResources stored procedure is executed successfully", LogLevel.Information, null);

               return new HttpResponseMessage(HttpStatusCode.OK);
           }
           catch (Exception ex)
           {
               if (conn != null && conn.State == ConnectionState.Open)
               {
                   conn.Close();
               }
               string str = ex.Message;
               //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveTPResource() procedure", LogLevel.Error, null);
               return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
           }
       }
        public void Options() { }
    }
}
