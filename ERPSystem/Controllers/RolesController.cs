
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

namespace BTPOSDashboardAPI.Controllers
{
    public class RolesController : ApiController
    {

        [HttpGet]
        public DataTable GetCompanyRoles(int companyId)
        {
            DataTable Tbl = new DataTable();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "getCompanyRoles";
                cmd.Connection = conn;

                SqlParameter rolesFlag = new SqlParameter();
                rolesFlag.ParameterName = "@cmpId";
                rolesFlag.SqlDbType = SqlDbType.Int;
                rolesFlag.Value = companyId;
                cmd.Parameters.Add(rolesFlag);


                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetCompanyRoles() procedure is loaded.", LogLevel.Information, null);
                
                // int found = 0;
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetCompanyRoles() procedure", LogLevel.Error, null);
            }
            return Tbl;
        }

        [HttpGet]
        [Route("api/Roles/GetRoles")]
        public DataTable GetRoles(int allroles)
        {
            DataTable Tbl = new DataTable();
            try
            {

                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetRoles";


                SqlParameter rolesFlag = new SqlParameter();
                rolesFlag.ParameterName = "@allroles";
                rolesFlag.SqlDbType = SqlDbType.Int;
                rolesFlag.Value = allroles;
                cmd.Parameters.Add(rolesFlag);

                cmd.Connection = conn;

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetRoles() procedure is loaded.", LogLevel.Information, null);

                
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetRoles() procedure", LogLevel.Error, null);
            }
            return Tbl;
        }


        [HttpPost]
        public HttpResponseMessage saveroles(roles b)
        {

                //connect to database
            SqlConnection conn = new SqlConnection();

            try
            {                
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelRoles";
                cmd.Connection = conn;
                conn.Open();
                SqlParameter cc = new SqlParameter();
                cc.ParameterName = "@Id";
                cc.SqlDbType = SqlDbType.Int;
                cc.Value = Convert.ToString(b.Id);
                cmd.Parameters.Add(cc);

                SqlParameter cname = new SqlParameter();
                cname.ParameterName = "@Name";
                cname.SqlDbType = SqlDbType.VarChar;
                cname.Value = b.Name;
                cmd.Parameters.Add(cname);

                SqlParameter dd = new SqlParameter();
                dd.ParameterName = "@Description";
                dd.SqlDbType = SqlDbType.VarChar;
                dd.Value = b.Description;
                cmd.Parameters.Add(dd);

                SqlParameter aa = new SqlParameter();
                aa.ParameterName = "@Active";
                aa.SqlDbType = SqlDbType.Int;
                aa.Value = b.Active;
                cmd.Parameters.Add(aa);

                SqlParameter aab = new SqlParameter();
                aab.ParameterName = "@IsGlobal";
                aab.SqlDbType = SqlDbType.Int;
                aab.Value = b.IsGlobal;
                cmd.Parameters.Add(aab);

                SqlParameter flag = new SqlParameter();
                flag.ParameterName = "@Flag";
                flag.SqlDbType = SqlDbType.VarChar;
                flag.Value = b.insupddelflag;
                cmd.Parameters.Add(flag);

                cmd.ExecuteScalar();
                conn.Close();
             
                //Logger.Trace(LogCategory.WebApp, "saveroles procedure is executed successfully.", LogLevel.Information, null);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;

                
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in saveroles() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }
        public void Options()
        {

        }
    }
}
