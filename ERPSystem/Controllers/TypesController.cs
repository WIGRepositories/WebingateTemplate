using ERPSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using System.IO;
using ERPSystem;
using System.Web.Http.Tracing;

namespace ERPSystem.Controllers
{
    public class TypesController : ApiController
    {



        [HttpGet]
        [Route("api/Types/TypesByGroupId")]
        public DataTable TypesByGroupId(int groupid)
        {
            DataTable Tbl = new DataTable();           
            try
            {
                 //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetTypesByGroupId";
                cmd.Connection = conn;

                SqlParameter Gid = new SqlParameter();
                Gid.ParameterName = "@typegrpid";
                Gid.SqlDbType = SqlDbType.Int;
                Gid.Value = groupid;
                cmd.Parameters.Add(Gid);

                //SqlParameter isid = new SqlParameter();
                //isid.ParameterName = "@InspectionId";
                //isid.SqlDbType = SqlDbType.Int;
                //isid.Value = inspid;
                //cmd.Parameters.Add(isid);

                //SqlParameter mvv = new SqlParameter();
                //mvv.ParameterName = "@MaintenaceId";
                //mvv.SqlDbType = SqlDbType.Int;
                //mvv.Value = mvid;
                //cmd.Parameters.Add(mvv);



                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);
                //Tbl = ds.Tables[0];

                //prepare a file
                StringBuilder str = new StringBuilder();

                str.Append(string.Format("test\n{0}", groupid.ToString()));
                
                //Logger.Trace(LogCategory.WebApp, "GetTypesByGroupId Credentials completed.", LogLevel.Information, null);
            }

            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in TypesByGroupId() procedure", LogLevel.Error, null);
            }
            
            // int found = 0;
            return Tbl;
        }

        [HttpPost]
        [Route("api/Types/TypeGroupsData")]
        public DataSet TypeGroupsData(TypeGroupsData tg)
        {           
            SqlConnection conn = new SqlConnection();
            DataSet ds = new DataSet();

            try
            {                
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetTypeGroupsData";
                cmd.Connection = conn;

                SqlParameter access = new SqlParameter("@includeAccesses", SqlDbType.Int);
                access.Value = tg.includeAccesses;
                cmd.Parameters.Add(access);

                SqlParameter cs = new SqlParameter("@includeDataType", SqlDbType.Int);
                cs.Value = tg.includeDataType;
                cmd.Parameters.Add(cs);

                SqlParameter iptn = new SqlParameter("@includeDocTypes", SqlDbType.Int);
                iptn.Value = tg.includeDocTypes;
                cmd.Parameters.Add(iptn);

                SqlParameter ipn = new SqlParameter("@includeGender", SqlDbType.Int);
                ipn.Value = tg.includeGender;
                cmd.Parameters.Add(ipn);

                SqlParameter vdid4 = new SqlParameter("@includeInspectionVendors", SqlDbType.Int);
                vdid4.Value = tg.includeInspectionVendors;
                cmd.Parameters.Add(vdid4);

                SqlParameter jdocType = new SqlParameter("@includeJobDocTypes", SqlDbType.Int);
                jdocType.Value = tg.includeJobDocTypes;
                cmd.Parameters.Add(jdocType);

                SqlParameter maintVend = new SqlParameter("@includeMaintenanceVendors", SqlDbType.Int);
                maintVend.Value = tg.includeMaintenanceVendors;
                cmd.Parameters.Add(maintVend);

                SqlParameter status = new SqlParameter("@includeStatus", SqlDbType.Int);
                status.Value = tg.includeStatus;
                cmd.Parameters.Add(status);

                SqlParameter mat = new SqlParameter("@includeMaterial", SqlDbType.Int);
                mat.Value = tg.includeMaterial;
                cmd.Parameters.Add(mat);

                SqlParameter state = new SqlParameter("@includeState", SqlDbType.Int);
                state.Value = tg.includeState;
                cmd.Parameters.Add(state); 

                 SqlParameter jobtypes = new SqlParameter("@includeJobType", SqlDbType.Int);
                jobtypes.Value = tg.includeJobType;
                cmd.Parameters.Add(jobtypes);

                SqlParameter ytuty = new SqlParameter("@includeUser", SqlDbType.Int);
                ytuty.Value = tg.includeUser;
                cmd.Parameters.Add(ytuty);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                
                return ds;
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
              
                throw ex;
            }
           
        }

        [HttpPost]
        [Route("api/Types/SaveType")]
        public HttpResponseMessage SaveType(Types b)
        {
 
            //connect to database
            SqlConnection conn = new SqlConnection();
            try
            {
            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "InsUpdTypes";
            cmd.Connection = conn;
            conn.Open();
            SqlParameter Cid = new SqlParameter();
            Cid.ParameterName = "@Id";
            Cid.SqlDbType = SqlDbType.Int;
            Cid.Value = Convert.ToInt32(b.Id);
            cmd.Parameters.Add(Cid);

            SqlParameter Gid = new SqlParameter();
            Gid.ParameterName = "@Name";
            Gid.SqlDbType = SqlDbType.VarChar;
            Gid.Value = b.Name;
            cmd.Parameters.Add(Gid);

            SqlParameter lid = new SqlParameter();
            lid.ParameterName = "@TypeGroupId";
            lid.SqlDbType = SqlDbType.Int;
            lid.Value = Convert.ToInt32(b.TypeGroupId);
            cmd.Parameters.Add(lid);

            SqlParameter pDesc = new SqlParameter();
            pDesc.ParameterName = "@Description";
            pDesc.SqlDbType = SqlDbType.VarChar;
            pDesc.Value = b.Description;
            cmd.Parameters.Add(pDesc);


            SqlParameter llid = new SqlParameter();
            llid.ParameterName = "@Active";
            llid.SqlDbType = SqlDbType.Int;
            llid.Value = b.Active;
            cmd.Parameters.Add(llid);

            SqlParameter flag = new SqlParameter();
            flag.ParameterName = "@insupdflag";
            flag.SqlDbType = SqlDbType.VarChar;
            flag.Value = b.insupddelflag;
            //llid.Value = b.Active;
            cmd.Parameters.Add(flag);
           
            
            cmd.ExecuteScalar();
            conn.Close();
            
                //Logger.Trace(LogCategory.WebApp, "SaveType Credentials completed.", LogLevel.Information, null);
                return new HttpResponseMessage(HttpStatusCode.OK);
              }
              catch (Exception ex)
              {
                  if (conn != null && conn.State == ConnectionState.Open)
                  {
                      conn.Close();
                  }
                  string str = ex.Message;
                  
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveType() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
              }
          }
        public void Options() { }

        [HttpGet]
        [Route("api/Types/getstates")]
        public DataTable getstates()
        {
            DataTable Tbl = new DataTable();
            //connect to database
                SqlConnection conn = new SqlConnection();
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetStates";
                cmd.Connection = conn;
                            
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);
             
            return Tbl;
        }

        [HttpGet]
        [Route("api/Types/GetCounty")]
        public DataTable GetCounty(int Id)
        {
            DataTable Tbl = new DataTable();
            //connect to database
            SqlConnection conn = new SqlConnection();
            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "GetCounty";
            cmd.Connection = conn;


            cmd.Parameters.Add("@Id", SqlDbType.Int).Value = @Id;
            SqlDataAdapter db = new SqlDataAdapter(cmd);
            db.Fill(Tbl);

            return Tbl;
        }

    }
}

