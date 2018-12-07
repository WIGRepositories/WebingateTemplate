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
    public class LOGINController : ApiController
    {
        [HttpPost]
        [Route("api/LOGIN/ValidateCredentials")]
        public DataSet ValidateCredentials(UserLogin u)
        {
            DataSet Tbl = new DataSet();
            try
            {               

                string username = u.LoginInfo;
                string pwd = u.Passkey;                
                    //Logger.Trace(LogCategory.WebApp, "Validating credentials...", LogLevel.Information, null);

                //connect to database
                SqlConnection conn = new SqlConnection();

                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "dbo.ValidateCredentials";

                cmd.Connection = conn;

                SqlParameter lUserName = new SqlParameter("@logininfo", SqlDbType.VarChar, 50);
                lUserName.Value = username;
                lUserName.Direction = ParameterDirection.Input;
                cmd.Parameters.Add(lUserName);


                SqlParameter lPassword = new SqlParameter("@passkey", SqlDbType.VarChar, 50);
                lPassword.Value = pwd;
                lPassword.Direction = ParameterDirection.Input;
                cmd.Parameters.Add(lPassword);
                //System.Threading.Thread.Sleep(10000);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(Tbl);

                
                //Logger.Trace(LogCategory.WebApp, "DataTable in ValidateCredentials() procedure is loaded", LogLevel.Information, null);

                return Tbl;
            }
            catch (Exception ex) {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in ValidateCredentials() procedure", LogLevel.Error, null);
                throw ex;
            }

        }

        [HttpPost]
        [Route("api/LOGIN/ValidateADCredentials")]
        public DataSet ValidateADCredentials(UserLogin u)
        {
            DataSet Tbl = new DataSet();
            try
            {

                string username = u.emailid;
                string pwd = u.uname;
                //Logger.Trace(LogCategory.WebApp, "Validating AD credentials...", LogLevel.Information, null);

                //connect to database
                SqlConnection conn = new SqlConnection();

                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "dbo.ValidateADCredentials";

                cmd.Connection = conn;

                SqlParameter lUserName = new SqlParameter("@emailid", SqlDbType.VarChar, 250);
                lUserName.Value = username;
                lUserName.Direction = ParameterDirection.Input;
                cmd.Parameters.Add(lUserName);


                SqlParameter lPassword = new SqlParameter("@name", SqlDbType.VarChar, 150);
                lPassword.Value = pwd;
                lPassword.Direction = ParameterDirection.Input;
                cmd.Parameters.Add(lPassword);

                SqlParameter fname = new SqlParameter("@fname", SqlDbType.VarChar, 50);
                fname.Value = u.FirstName;
                fname.Direction = ParameterDirection.Input;
                cmd.Parameters.Add(fname);

                SqlParameter lname = new SqlParameter("@lname", SqlDbType.VarChar, 50);
                lname.Value = u.LastName;
                lname.Direction = ParameterDirection.Input;
                cmd.Parameters.Add(lname);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(Tbl);


                //Logger.Trace(LogCategory.WebApp, "DataTable in ValidateADCredentials() procedure is loaded", LogLevel.Information, null);

                return Tbl;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in ValidateADCredentials() procedure", LogLevel.Error, null);
                throw ex;
            }

        }

        [HttpGet]
        public DataTable RetrivePassword(string email) {
        
        DataTable Tbl = new DataTable();
        SqlConnection conn = new SqlConnection();      

            try
            {                
                
                //connect to database               
                
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "dbo.RetrivePassword";

                cmd.Connection = conn;

                SqlParameter lUserName = new SqlParameter("@email", SqlDbType.VarChar, 50);
                lUserName.Value = email;
                lUserName.Direction = ParameterDirection.Input;
                cmd.Parameters.Add(lUserName);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(Tbl);
                //Logger.Trace(LogCategory.WebApp, "DataTable in RetrivePassword() procedure is loaded. Retrive password completed.", LogLevel.Information, null);
                
                if (Tbl.Rows.Count == 1)
                { 
                    //send the email and return success
                }
                if (Tbl.Rows.Count > 1)
                {
                    //Logger.Error(LogCategory.WebApp, "Multiple users found", LogLevel.Warning, null);
                    throw new Exception("Multiple users found");
                }
                
                return Tbl;
            }
            catch (Exception ex)
            { 
                if(conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

                //Logger.Error(ex, LogCategory.WebApp, "An error occured in RetrivePassword() procedure", LogLevel.Error, null);
               // return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
                throw ex;
            }

          
        }

        [HttpGet]
        public DataSet GetDashboardDetails(int locationId) {
            DataSet Tbl = new DataSet();
            try
            {
                 //connect to database
                SqlConnection conn = new SqlConnection();

                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "dbo.GetDashboardDetails";

                cmd.Connection = conn;

                SqlParameter lid = new SqlParameter("@locationid", SqlDbType.Int);
                lid.Value = locationId;
                lid.Direction = ParameterDirection.Input;
                cmd.Parameters.Add(lid);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(Tbl);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetDashboardDetails() procedure is loaded.", LogLevel.Information, null);
                
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetDashboardDetails() procedure", LogLevel.Error, null);
            }
            return Tbl;
        }
        public void Options() { }


    }
}
