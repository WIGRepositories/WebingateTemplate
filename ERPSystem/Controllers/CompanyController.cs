using ERPSystem;
using ERPSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Tracing;


namespace ERPSystem.Controllers
{
    public class CompanyController : ApiController
    {

        [HttpGet]
        [Route("api/GetCompanys")]
        public DataTable GetCompanyGroups(int userid)
        {

            DataTable Tbl = new DataTable();
            try
            {

                //connect to database
                SqlConnection conn = new SqlConnection();

                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "getCompanies";
                //SqlParameter uid = new SqlParameter();
                //uid.ParameterName = "@userid";
                //uid.SqlDbType = SqlDbType.Int;
                //uid.Value = userid;
                //cmd.Parameters.Add(uid);

                cmd.Connection = conn;
                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                Tbl = ds.Tables[0];

                //Logger.Trace(LogCategory.WebApp, "DataTable in GetCompanyGroups() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetCompanyGroups() procedure", LogLevel.Error, null);
            }

            // int found = 0;
            return Tbl;
        }

        [HttpGet]
        [Route("api/GetCompanyDetails")]
        public DataTable GetComapanyDetails(int cmpId)
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
                cmd.CommandText = "GetCompanyDetails";

                SqlParameter uid = new SqlParameter();
                uid.ParameterName = "@cmpId";
                uid.SqlDbType = SqlDbType.Int;
                uid.Value = cmpId;
                cmd.Parameters.Add(uid);


                cmd.Connection = conn;
                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                Tbl = ds.Tables[0];

                //Logger.Trace(LogCategory.WebApp, "DataTable in GetComapanyDetails() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetComapanyDetails() procedure", LogLevel.Error, null);
            }
            // int found = 0;
            return Tbl;
        }

        [HttpPost]
        [Route("api/CompanyGroups/SaveCompany")]
        public HttpResponseMessage SaveCompanyGroups(Company n)
        {
            //DataTable Tbl = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connect to database                
                // connetionString = "Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password";
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelCompany";
                cmd.Connection = conn;

                conn.Open();

                SqlParameter gsa = new SqlParameter();
                gsa.ParameterName = "@active";
                gsa.SqlDbType = SqlDbType.Int;
                gsa.Value = n.active;
                cmd.Parameters.Add(gsa);            

                SqlParameter gsn = new SqlParameter();
                gsn.ParameterName = "@code";
                gsn.SqlDbType = SqlDbType.VarChar;
                gsn.Value = n.code;
                cmd.Parameters.Add(gsn);

                SqlParameter gsab = new SqlParameter();
                gsab.ParameterName = "@desc";
                gsab.SqlDbType = SqlDbType.VarChar;
                gsab.Value = n.desc;
                cmd.Parameters.Add(gsab);

                SqlParameter gsac = new SqlParameter("@Id", SqlDbType.Int);
                gsac.Value = n.Id;
                cmd.Parameters.Add(gsac);

                SqlParameter gid = new SqlParameter();
                gid.ParameterName = "@Name";
                gid.SqlDbType = SqlDbType.VarChar;
                gid.Value = n.Name;
                cmd.Parameters.Add(gid);


                SqlParameter gad = new SqlParameter();
                gad.ParameterName = "@Address";
                gad.SqlDbType = SqlDbType.VarChar;
                gad.Value = n.Address;
                cmd.Parameters.Add(gad);

                SqlParameter gcn = new SqlParameter();
                gcn.ParameterName = "@ContactNo1";
                gcn.SqlDbType = SqlDbType.VarChar;
                gcn.Value = n.ContactNo1;
                cmd.Parameters.Add(gcn);

                SqlParameter gcn1 = new SqlParameter();
                gcn1.ParameterName = "@ContactNo2";
                gcn1.SqlDbType = SqlDbType.VarChar;
                gcn1.Value = n.ContactNo2;
                cmd.Parameters.Add(gcn1);

                SqlParameter gfx = new SqlParameter();
                gfx.ParameterName = "@Fax";
                gfx.SqlDbType = SqlDbType.VarChar;
                gfx.Value = n.Fax;
                cmd.Parameters.Add(gfx);

                SqlParameter gem = new SqlParameter();
                gem.ParameterName = "@EmailId";
                gem.SqlDbType = SqlDbType.VarChar;
                gem.Value = n.EmailId;
                cmd.Parameters.Add(gem);

                SqlParameter gtl = new SqlParameter();
                gtl.ParameterName = "@Title";
                gtl.SqlDbType = SqlDbType.VarChar;
                gtl.Value = n.Title;
                cmd.Parameters.Add(gtl);

                SqlParameter gcp = new SqlParameter();
                gcp.ParameterName = "@Caption";
                gcp.SqlDbType = SqlDbType.VarChar;
                gcp.Value = n.Caption;
                cmd.Parameters.Add(gcp);

                SqlParameter gct = new SqlParameter();
                gct.ParameterName = "@Country";
                gct.SqlDbType = SqlDbType.VarChar;
                gct.Value = n.Country;
                cmd.Parameters.Add(gct);

                SqlParameter gzp = new SqlParameter();
                gzp.ParameterName = "@ZipCode";
                gzp.SqlDbType = SqlDbType.Int;
                gzp.Value = n.ZipCode;
                cmd.Parameters.Add(gzp);

                SqlParameter gst = new SqlParameter();
                gst.ParameterName = "@State";
                gst.SqlDbType = SqlDbType.VarChar;
                gst.Value = n.State;
                cmd.Parameters.Add(gst);

                SqlParameter PAdd = new SqlParameter();
                PAdd.ParameterName = "@AlternateAddress";
                PAdd.SqlDbType = SqlDbType.VarChar;
                PAdd.Value = n.AlternateAddress;
                cmd.Parameters.Add(PAdd);

                SqlParameter logo = new SqlParameter();
                logo.ParameterName = "@Logo";
                logo.SqlDbType = SqlDbType.VarChar;
               // ImageConverter imgCon = new ImageConverter();
               // logo.Value = (byte[])imgCon.ConvertTo(n.Logo, typeof(byte[]));
                logo.Value = n.Logo;
                cmd.Parameters.Add(logo);  

                SqlParameter insupdflag = new SqlParameter("@insupdflag", SqlDbType.VarChar, 1);
                insupdflag.Value = n.insupdflag;
                cmd.Parameters.Add(insupdflag);

                cmd.ExecuteScalar();
                conn.Close();
                //Logger.Trace(LogCategory.WebApp, "InsUpdDelCompany stored procedure is executed successfully", LogLevel.Information, null);

                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;                
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveCompanyGroups() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            // int found = 0;
          //  return Tbl;
        }

        [HttpGet]
        [Route("api/GetCustomers")]
        public DataTable GetCustomers()
        {
            DataTable Tbl = new DataTable();
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetCustomers";

                cmd.Connection = conn;
                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                Tbl = ds.Tables[0];

                //Logger.Trace(LogCategory.WebApp, "DataTable in GetCustomers() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetCustomers() procedure", LogLevel.Error, null);
            }
            // int found = 0;
            return Tbl;
        }
        [HttpPost]
        [Route("api/AssignDelRoles")]
        public HttpResponseMessage AssignDelRoles(CompanyRoles r)
        {
            SqlConnection conn = new SqlConnection();
            try
            {

                //connect to database
               
                // connetionString = "Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password";
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelCompanyRoles";
                cmd.Connection = conn;

                conn.Open();

                SqlParameter gsa = new SqlParameter();
                gsa.ParameterName = "@active";
                gsa.SqlDbType = SqlDbType.Int;
                gsa.Value = r.Active;
                cmd.Parameters.Add(gsa);

                SqlParameter gsn = new SqlParameter();
                gsn.ParameterName = "@roleid";
                gsn.SqlDbType = SqlDbType.Int;
                gsn.Value = r.RoleId;
                cmd.Parameters.Add(gsn);

                SqlParameter gsab = new SqlParameter();
                gsab.ParameterName = "@companyid";
                gsab.SqlDbType = SqlDbType.Int;
                gsab.Value = r.CompanyId;
                cmd.Parameters.Add(gsab);

                SqlParameter f = new SqlParameter();
                f.ParameterName = "@insupdflag";
                f.SqlDbType = SqlDbType.Int;
                f.Value = r.insdelflag;
                cmd.Parameters.Add(f);

                SqlParameter gsac = new SqlParameter("@Id", SqlDbType.Int);
                gsac.Value = r.Id;
                gsac.SqlDbType = SqlDbType.Int;
                cmd.Parameters.Add(gsac);
                
                cmd.ExecuteScalar();
                conn.Close();
                
                //Logger.Trace(LogCategory.WebApp, "InsUpdDelCompanyRoles stored procedure is successfully exeucted", LogLevel.Information, null);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
                
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in saveAssignDelRoles() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }

        [HttpPost]
        [Route("api/SaveCmpRoles")]
        public HttpResponseMessage SaveCmpRoles(IEnumerable<CompanyRoles> cRoles) 
        {
            
            SqlConnection conn = new SqlConnection();
            try
            {
                //connect to database                
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelCompanyRoles";
                cmd.Connection = conn;

                conn.Open();

                foreach (CompanyRoles r in cRoles)
                {
                    SqlParameter gsa = new SqlParameter();
                    gsa.ParameterName = "@active";
                    gsa.SqlDbType = SqlDbType.Int;
                    gsa.Value = r.Active;
                    cmd.Parameters.Add(gsa);

                    SqlParameter gsn = new SqlParameter();
                    gsn.ParameterName = "@roleid";
                    gsn.SqlDbType = SqlDbType.Int;
                    gsn.Value = r.RoleId;
                    cmd.Parameters.Add(gsn);

                    SqlParameter gsab = new SqlParameter();
                    gsab.ParameterName = "@companyid";
                    gsab.SqlDbType = SqlDbType.Int;
                    gsab.Value = r.CompanyId;
                    cmd.Parameters.Add(gsab);

                    SqlParameter f = new SqlParameter();
                    f.ParameterName = "@insupdflag";
                    f.SqlDbType = SqlDbType.Int;
                    f.Value = r.insdelflag;
                    cmd.Parameters.Add(f);

                    SqlParameter gsac = new SqlParameter("@Id", SqlDbType.Int);
                    gsac.Value = r.Id;
                    gsac.SqlDbType = SqlDbType.Int;
                    cmd.Parameters.Add(gsac);

                cmd.ExecuteScalar();
                cmd.Parameters.Clear();
                }
                conn.Close();
                
                //Logger.Trace(LogCategory.WebApp, "InsUpdDelCompanyRoles stored procedure is successfully exeucted", LogLevel.Information, null);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveCmpRoles() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }
        public void Options()
        {
        }
       
    }
}
