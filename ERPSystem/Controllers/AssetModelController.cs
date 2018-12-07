using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using ERPSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Tracing;


namespace ERPSystem.Controllers
{
    public class AssetModelController : ApiController
    {

        [HttpGet]
        public DataSet GetAssetModelspaging(int locId, int curpage, int maxrows)
        {

            //connect to database
            SqlConnection conn = new SqlConnection();
            //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "GetAssetmodelByPaging";
            cmd.Connection = conn;

            SqlParameter Gid = new SqlParameter();
            Gid.ParameterName = "@locationid";
            Gid.SqlDbType = SqlDbType.Int;
            Gid.Value = (locId == 0) ? -1 : locId;
            cmd.Parameters.Add(Gid);


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


            DataSet ds = new DataSet();
            SqlDataAdapter db = new SqlDataAdapter(cmd);
            db.Fill(ds);
            //Tbl = ds.Tables[0];

            ////Logger.Trace(LogCategory.WebApp, "DataTable in GetAssetModels() procedure is loaded", LogLevel.Information, null);

            return ds;
        }

        [HttpGet]
        public DataTable GetAssetModels(int locId)
        {
            DataTable Tbl = new DataTable();
            SqlConnection conn = new SqlConnection();
            try
            {
                //connect to database
                //SqlConnection conn = new SqlConnection();
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetModels";
                cmd.Connection = conn;

                SqlParameter Gid = new SqlParameter();
                Gid.ParameterName = "@locationid";
                Gid.SqlDbType = SqlDbType.Int;
                Gid.Value = (locId == 0) ? -1 : locId;
                cmd.Parameters.Add(Gid);

               
                

              //  DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);
                //Logger.Trace(LogCategory.WebApp, "SaveAssetModel() procedure executed successfully.", LogLevel.Information, null);
               
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;

                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveAssetModel() procedure", LogLevel.Error, null);
                throw ex;
            }
            return Tbl;
        }

        public HttpResponseMessage SaveAssetModel(AssetModel a)
        {

            //connect to database
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelAssetModels";
                cmd.Connection = conn;
                conn.Open();


                SqlParameter Gid = new SqlParameter();
                Gid.ParameterName = "@name";
                Gid.SqlDbType = SqlDbType.VarChar;
                Gid.Value = a.Name;
                cmd.Parameters.Add(Gid);

                SqlParameter Gim = new SqlParameter();
                Gim.ParameterName = "@Id";
                Gim.SqlDbType = SqlDbType.Int;
                Gim.Value = Convert.ToString(a.Id);
                cmd.Parameters.Add(Gim);

                SqlParameter pid = new SqlParameter();
                pid.ParameterName = "@desc";
                pid.SqlDbType = SqlDbType.VarChar;
                pid.Value = a.Description;
                cmd.Parameters.Add(pid);

                SqlParameter llid = new SqlParameter();
                llid.ParameterName = "@assetModelTypeId";
                llid.SqlDbType = SqlDbType.Int;
                llid.Value = a.AssetTypeId;                
                cmd.Parameters.Add(llid);

                SqlParameter flag = new SqlParameter();
                flag.ParameterName = "@change";
                flag.SqlDbType = SqlDbType.VarChar;
                flag.Value = a.insupddelflag;
                cmd.Parameters.Add(flag);
                                
                cmd.ExecuteScalar();
                conn.Close();
                //Logger.Trace(LogCategory.WebApp, "SaveAssetModel() procedure executed successfully.", LogLevel.Information, null);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;

                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveAssetModel() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }

        [HttpGet]
        public AssetModelDetail GetAssetModelHierarchy(int assetmodelId)
        {
            DataTable Tbl = new DataTable();
            AssetModelDetail root = new AssetModelDetail();
            try
            {

                //connect to database
                SqlConnection conn = new SqlConnection();
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAssetModelDetail";
                cmd.Connection = conn;

                SqlParameter Gid = new SqlParameter("@assetmodelID", SqlDbType.Int);
                Gid.Value = assetmodelId;
                cmd.Parameters.Add(Gid);

                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                Tbl = ds.Tables[0];
                //Logger.Trace(LogCategory.WebApp, "DataTable in GetAssetModels() procedure is loaded", LogLevel.Information, null);
                IEnumerable<AssetModelDetail> list = Tbl.DataTableToList<AssetModelDetail>();

                Dictionary<int, AssetModelDetail> dict = list.ToDictionary(loc => loc.Id);

                foreach (AssetModelDetail loc in dict.Values)
                {
                    if (loc.ParentId == 0)
                        continue;
                    AssetModelDetail parent = dict.Values.First(l => l.Id == loc.ParentId);
                    parent.__children__.Add(loc);
                    //if (loc.ParentId != loc.ObjTypeId)
                    //{
                    //    AssetModelDetail parent = dict[loc.ParentId];//(loc.ParentId == 0) ? dict.Values.First(l => l.ParentId == 0) : dict[loc.ParentId];
                    //    parent.__children__.Add(loc);
                    //}
                }

                if (dict.Count > 0)
                    root = dict.Values.First(loc => loc.ParentId == 0);

                JsonSerializerSettings settings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),
                    Formatting = Formatting.Indented
                };

                //Logger.Trace(LogCategory.WebApp, "AssetModelDetail is set", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetAssetModels() procedure", LogLevel.Error, null);
            }
            return root;
        }

        [HttpPost]
        [Route("api/AssetModel/SaveAssetModelHierarchy")]
        public HttpResponseMessage SaveAssetModelHierarchy(AssetModelDetail a)
        {

            //connect to database
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsDelAssetModelHieararchy";
                cmd.Connection = conn;
                conn.Open();

                //@AssetModelID int,@ParentID int=null,@ObjTypeID int,@Change char(1),@ID int=null, @ParentObjTypeId int

                SqlParameter aGid = new SqlParameter("@id", SqlDbType.Int);
                aGid.Value = a.Id;
                cmd.Parameters.Add(aGid);

                SqlParameter Gid = new SqlParameter("@AssetModelID", SqlDbType.Int);
                Gid.Value = a.AssetModelId;
                cmd.Parameters.Add(Gid);

                SqlParameter pid = new SqlParameter("@ParentID", SqlDbType.Int);
                pid.Value = a.ParentId;
                cmd.Parameters.Add(pid);

                SqlParameter oid = new SqlParameter("@ObjTypeID", SqlDbType.Int);
                oid.Value = a.ObjTypeId;
                cmd.Parameters.Add(oid);

                SqlParameter poid = new SqlParameter("@ParentObjTypeId", SqlDbType.Int);
                poid.Value = a.ParentObjTypeId;
                cmd.Parameters.Add(poid);

                SqlParameter flag = new SqlParameter("@Change", SqlDbType.VarChar);
                flag.Value = a.insupddelflag;
                cmd.Parameters.Add(flag);

                cmd.ExecuteScalar();             

                conn.Close();
                //Logger.Trace(LogCategory.WebApp, "InsDelAssetModelHieararchy stored procedure is executed successfully", LogLevel.Information, null);
                return new HttpResponseMessage(HttpStatusCode.OK);
               
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;                
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in SaveAssetModel() procedure", LogLevel.Error, null);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                
            }
        }


        [HttpGet]
        [Route("api/Asset/GetEquipmentComponents")]
        public DataTable GetEquipmentComponents(int assetmodelId)
        {
            DataTable Tbl = new DataTable();
            try
            {

                //connect to database
                SqlConnection conn = new SqlConnection();

                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetEquipmentComponents";
                cmd.Connection = conn;

                SqlParameter mid = new SqlParameter("@assetmodelId", SqlDbType.Int);
                mid.Value = assetmodelId;
                cmd.Parameters.Add(mid);

             
                SqlDataAdapter db = new SqlDataAdapter(cmd);

                db.Fill(Tbl);

                //Logger.Trace(LogCategory.WebApp, "DataTable in GetEquipmentComponents() procedure is loaded", LogLevel.Information, null);
            }
            catch (Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in GetEquipmentComponents() procedure", LogLevel.Error, null);
            }
            // int found = 0;
            return Tbl;
        }
        public void Options() { }
    }

    public static class Helper
    {
        private static readonly IDictionary<Type, ICollection<PropertyInfo>> _Properties =
            new Dictionary<Type, ICollection<PropertyInfo>>();

        /// <summary>
        /// Converts a DataTable to a list with generic objects
        /// </summary>
        /// <typeparam name="T">Generic object</typeparam>
        /// <param name="table">DataTable</param>
        /// <returns>List with generic objects</returns>
        public static IEnumerable<T> DataTableToList<T>(this DataTable table) where T : class, new()
        {
            try
            {
                var objType = typeof(T);
                ICollection<PropertyInfo> properties;

                lock (_Properties)
                {
                    if (!_Properties.TryGetValue(objType, out properties))
                    {
                        properties = objType.GetProperties().Where(property => property.CanWrite).ToList();
                        _Properties.Add(objType, properties);
                    }
                }

                var list = new List<T>(table.Rows.Count);

                //foreach (var row in table.AsEnumerable().Skip(1))
                foreach (var row in table.AsEnumerable())
                {
                    var obj = new T();

                    foreach (var prop in properties)
                    {
                        try
                        {
                            var propType = Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType;
                            var safeValue = row[prop.Name] == null ? null : Convert.ChangeType(row[prop.Name], propType);

                            prop.SetValue(obj, safeValue, null);
                        }
                        catch
                        {
                            // ignored
                        }
                    }

                    list.Add(obj);
                }

                return list;
            }
            catch(Exception ex)
            {
                //Logger.Error(ex, LogCategory.WebApp, "An error occured in DataTableToList() procedure", LogLevel.Error, null);
                return Enumerable.Empty<T>();
            }
        }
    }
}
