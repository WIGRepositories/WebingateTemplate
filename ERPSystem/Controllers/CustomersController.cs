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
   public class CustomersController : ApiController
    {
       [Route("api/Customers/getCustomers")]
       [HttpGet]
       public DataTable getCustomers()
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
               cmd.CommandText = "getCustomers";
               cmd.Connection = conn;
               DataSet ds = new DataSet();
               SqlDataAdapter db = new SqlDataAdapter(cmd);
               db.Fill(ds);
               Tbl = ds.Tables[0];


               //Logger.Trace(LogCategory.WebApp, "DataTable in getCustomers() procedure is loaded", LogLevel.Information, null);
           }
           catch (Exception ex)
           {
               //Logger.Error(ex, LogCategory.WebApp, "An error occured in getCustomers() procedure", LogLevel.Error, null);
           }
           // int found = 0;
           return Tbl;
       }
       [HttpPost]
       [Route("api/Customers/SaveCustomers")]
       public HttpResponseMessage SaveCustomers(Customers cus)
       {

           //connect to database
           SqlConnection conn = new SqlConnection();
           try
           {
               //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
               conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();
               //@Client varchar(150),@Contact varchar(100),@Email varchar(50),@PhoneNo varchar(15),@Active int,@ContactRole varchar(100),@ServiceDescription varchar(100)
               //,@PTSPOCId int,@flag char,@ID int=null

               SqlCommand cmd = new SqlCommand();
               cmd.CommandType = CommandType.StoredProcedure;
               cmd.CommandText = "InsUpdCustomer";
               cmd.Connection = conn;
               conn.Open();


               SqlParameter Gid = new SqlParameter("@Client",SqlDbType.VarChar,150);
               Gid.Value = cus.Client;
               cmd.Parameters.Add(Gid);

               SqlParameter Gid1 = new SqlParameter("@Contact", SqlDbType.VarChar, 100);
               Gid1.Value = cus.Contact;
               cmd.Parameters.Add(Gid1);

               SqlParameter Gid2 = new SqlParameter("@Email", SqlDbType.VarChar, 50);
               Gid2.Value = cus.Email;
               cmd.Parameters.Add(Gid2);

               SqlParameter phone = new SqlParameter("@PhoneNo",SqlDbType.VarChar,15);
               phone.Value = cus.PhoneNo;
               cmd.Parameters.Add(phone);

               SqlParameter llid = new SqlParameter("@Active",SqlDbType.Int);
               llid.Value =  cus.Active;
               cmd.Parameters.Add(llid);

               SqlParameter Gid3 = new SqlParameter("@ContactRole", SqlDbType.VarChar, 100);
               Gid3.Value = cus.ContactRole;
               cmd.Parameters.Add(Gid3);

               SqlParameter Gid4 = new SqlParameter("@ServiceDescription", SqlDbType.VarChar, 100);
               Gid4.Value = cus.ServiceDesc;
               cmd.Parameters.Add(Gid4);
               
               SqlParameter uid = new SqlParameter("@PTSPOCId", SqlDbType.Int);
               uid.Value = cus.PTSPOCId;
               cmd.Parameters.Add(uid);

               SqlParameter flag = new SqlParameter("@flag",SqlDbType.VarChar);
               flag.Value = cus.insupddelflag;
               cmd.Parameters.Add(flag);

               SqlParameter uid1 = new SqlParameter("@ID", SqlDbType.Int);
               uid1.Value = Convert.ToString(cus.ID);
               cmd.Parameters.Add(uid1);
            
               cmd.ExecuteScalar();
               conn.Close();

               //Logger.Trace(LogCategory.WebApp, "InsUpdCustomer stored procedure is executed successfully", LogLevel.Information, null);

               return new HttpResponseMessage(HttpStatusCode.OK);
           }
           catch (Exception ex)
           {
               if (conn != null && conn.State == ConnectionState.Open)
               {
                   conn.Close();
               }
               string str = ex.Message;
               //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveCustomers() procedure", LogLevel.Error, null);
               return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
           }
       }
        public void Options() { }
    }
}
