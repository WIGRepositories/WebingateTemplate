
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ERPSystem.Models;

namespace ERPSystem.Controllers
{
    public class MaintenanceVendorController : ApiController
    {
        [Route("api/MaintenanceVendor/getvendors")]
        [HttpGet]
        public DataTable getvendors()
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
                cmd.CommandText = "getMaintenancevendors";
                cmd.Connection = conn;
                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                Tbl = ds.Tables[0];


                //Logger.Trace(LogCategory.WebApp, "DataTable in getvendors() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in getvendors() procedure", LogLevel.Error, null);
            }
            // int found = 0;
            return Tbl;
        }
        [HttpPost]
        [Route("api/MaintenanceVendor/SaveVendors")]
        public HttpResponseMessage SaveVendors(MaintenanceVendors cus)
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
                cmd.CommandText = "InsUpdDelMaintenanceVendors";
                cmd.Connection = conn;
                conn.Open();


                SqlParameter Gid = new SqlParameter("@Id", SqlDbType.Int);
                Gid.Value = cus.Id;
                cmd.Parameters.Add(Gid);

                SqlParameter Gid1 = new SqlParameter("@Name", SqlDbType.VarChar, 100);
                Gid1.Value = cus.Name;
                cmd.Parameters.Add(Gid1);

                SqlParameter Gid2 = new SqlParameter("@Description", SqlDbType.VarChar, 250);
                Gid2.Value = cus.Description;
                cmd.Parameters.Add(Gid2);

                SqlParameter llid = new SqlParameter("@Active", SqlDbType.Int);
                llid.Value = cus.Active;
                cmd.Parameters.Add(llid);

                SqlParameter flag = new SqlParameter("@flag", SqlDbType.VarChar);
                flag.Value = cus.flag;
                cmd.Parameters.Add(flag);


                cmd.ExecuteScalar();
                conn.Close();

                //Logger.Trace(LogCategory.WebApp, "InsUpdDelMaintenanceVendors stored procedure is executed successfully", LogLevel.Information, null);

                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveVendors() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }
        public void Options() { }
    }
}
