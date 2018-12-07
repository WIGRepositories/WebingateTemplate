using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Data;



using System.Web.Http.Tracing;
using ERPSystem.Models;
using System.Collections;

namespace ERPSystem.Controllers
{
    public class DataLoadController : ApiController
    {

        [HttpPost]
        [Route("api/DataLoad/SaveLocationsimport")]
        public List<locatinlist> Saveloc(List<locatinlist> list)
        {
            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssets Details....");
            DataTable tbl = new DataTable();

            SqlConnection conn = new SqlConnection();

            try
            {
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelLocationImport";
                cmd.Connection = conn;
                conn.Open();

                foreach (locatinlist m in list)
                {


                    SqlParameter aid = new SqlParameter();
                    aid.ParameterName = "@Name";
                    aid.SqlDbType = SqlDbType.VarChar;
                    aid.Value = m.Name;
                    cmd.Parameters.Add(aid);

                    SqlParameter man = new SqlParameter();
                    man.ParameterName = "@Description";
                    man.SqlDbType = SqlDbType.VarChar;
                    man.Value = m.Description;
                    cmd.Parameters.Add(man);

                    //SqlParameter tn = new SqlParameter();
                    //tn.ParameterName = "@Active";
                    //tn.SqlDbType = SqlDbType.VarChar;
                    //tn.Value = m.Active;
                    //cmd.Parameters.Add(tn);

                    SqlParameter i = new SqlParameter("@flag", SqlDbType.VarChar, 1);
                    i.Value = m.flag;
                    cmd.Parameters.Add(i);

                    SqlParameter mssg = new SqlParameter("@mssg", SqlDbType.VarChar, 100);
                    // mssg.Value = o.flag;
                    mssg.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(mssg);


                    cmd.ExecuteScalar();
                    cmd.Parameters.Clear();
                    m.importStatus = mssg.Value.ToString();
                }
                conn.Close();
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssests Credentials completed.");
                return list;
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

                string str = ex.Message;
                traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveAssests:" + ex.Message);
                //return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                throw ex;
            }
        }


        [HttpPost]
        [Route("api/DataLoad/SaveCustomerimport")]
        public List<customerlist> Saveocustotmerimport(List<customerlist> list)
        {
            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssets Details....");
            DataTable tbl = new DataTable();

            SqlConnection conn = new SqlConnection();

            try
            {
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpDelCustomerimport";
                cmd.Connection = conn;
                conn.Open();

                foreach (customerlist m in list)
                {

                    try
                    {

                        SqlParameter con = new SqlParameter();
                        con.ParameterName = "@Client";
                        con.SqlDbType = SqlDbType.VarChar;
                        con.Value = m.Client;
                        cmd.Parameters.Add(con);

                        SqlParameter cont = new SqlParameter();
                        cont.ParameterName = "@Contact";
                        cont.SqlDbType = SqlDbType.VarChar;
                        cont.Value = m.Contact;
                        cmd.Parameters.Add(cont);


                        SqlParameter mail = new SqlParameter();
                        mail.ParameterName = "@Email";
                        mail.SqlDbType = SqlDbType.VarChar;
                        mail.Value = m.Email;
                        cmd.Parameters.Add(mail);

                        SqlParameter ph = new SqlParameter();
                        ph.ParameterName = "@PhoneNo";
                        ph.SqlDbType = SqlDbType.VarChar;
                        ph.Value = m.PhoneNo;
                        cmd.Parameters.Add(ph);


                        SqlParameter man = new SqlParameter();
                        man.ParameterName = "@ContactRole";
                        man.SqlDbType = SqlDbType.VarChar;
                        man.Value = m.ContactRole;
                        cmd.Parameters.Add(man);

                        SqlParameter sd = new SqlParameter();
                        sd.ParameterName = "@ServiceDescription";
                        sd.SqlDbType = SqlDbType.VarChar;
                        sd.Value = m.ServiceDescription;
                        cmd.Parameters.Add(sd);

                        SqlParameter i = new SqlParameter("@flag", SqlDbType.VarChar, 1);
                        i.Value = m.flag;
                        cmd.Parameters.Add(i);

                        SqlParameter mssg = new SqlParameter("@mssg", SqlDbType.VarChar, 100);
                        // mssg.Value = o.flag;
                        mssg.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(mssg);


                        cmd.ExecuteScalar();
                        m.importStatus = mssg.Value.ToString();
                    }
                    catch (Exception ex)
                    {
                        m.importStatus = "failed due to error:" + ex.Message;
                    }
                    cmd.Parameters.Clear();
                }
                conn.Close();
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssests Credentials completed.");
                var finallist = from l in list
                                where l.importStatus != "success"
                                select l;

                return finallist.ToList();
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

                string str = ex.Message;
                traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveAssests:" + ex.Message);
                //return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                throw ex;
            }
        }

        [HttpPost]
        [Route("api/DataLoad/Savemanufacuturer")]
        public List<manufacturerlist> Savemanufacuturer(List<manufacturerlist> list)
        {
            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssets Details....");
            DataTable tbl = new DataTable();

            SqlConnection conn = new SqlConnection();

            try
            {
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelManufacturerImport";
                cmd.Connection = conn;
                conn.Open();

                foreach (manufacturerlist m in list)
                {
                    try
                    {

                        SqlParameter aid = new SqlParameter();
                        aid.ParameterName = "@Manufacture";
                        aid.SqlDbType = SqlDbType.VarChar;
                        aid.Value = m.Manufacture;
                        cmd.Parameters.Add(aid);

                        SqlParameter man = new SqlParameter();
                        man.ParameterName = "@Description";
                        man.SqlDbType = SqlDbType.VarChar;
                        man.Value = m.Description;
                        cmd.Parameters.Add(man);

                        SqlParameter i = new SqlParameter("@flag", SqlDbType.VarChar, 1);
                        i.Value = m.flag;
                        cmd.Parameters.Add(i);

                        SqlParameter mssg = new SqlParameter("@mssg", SqlDbType.VarChar, 100);
                        // mssg.Value = o.flag;
                        mssg.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(mssg);


                        cmd.ExecuteScalar();
                        m.importStatus = mssg.Value.ToString();
                    }
                    catch (Exception ex)
                    {
                        m.importStatus = "failed due to error:" + ex.Message;
                    }
                    cmd.Parameters.Clear();
                }
                conn.Close();
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssests Credentials completed.");
                var finallist = from l in list
                                where l.importStatus != "success"
                                select l;

                return finallist.ToList();
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

                string str = ex.Message;
                traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveAssests:" + ex.Message);
                //return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                throw ex;
            }
        }




        [HttpPost]
        [Route("api/DataLoad/SaveobjetcTypesimport")]
        public List<objetcTypesassets> SaveobjetcTypesassets(List<objetcTypesassets> list)
        {
            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssets Details....");
            DataTable tbl = new DataTable();

            SqlConnection conn = new SqlConnection();

            try
            {
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelobjTypeImport";
                cmd.Connection = conn;
                conn.Open();

                foreach (objetcTypesassets m in list)
                {


                    SqlParameter aid = new SqlParameter();
                    aid.ParameterName = "@Name";
                    aid.SqlDbType = SqlDbType.VarChar;
                    aid.Value = m.Name;
                    cmd.Parameters.Add(aid);

                    SqlParameter man = new SqlParameter();
                    man.ParameterName = "@Description";
                    man.SqlDbType = SqlDbType.VarChar;
                    man.Value = m.Description;
                    cmd.Parameters.Add(man);

                    SqlParameter tn = new SqlParameter();
                    tn.ParameterName = "@typename";
                    tn.SqlDbType = SqlDbType.VarChar;
                    tn.Value = m.typename;
                    cmd.Parameters.Add(tn);

                    SqlParameter i = new SqlParameter("@flag", SqlDbType.VarChar, 1);
                    i.Value = m.flag;
                    cmd.Parameters.Add(i);

                    SqlParameter mssg = new SqlParameter("@mssg", SqlDbType.VarChar, 100);
                    // mssg.Value = o.flag;
                    mssg.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(mssg);


                    cmd.ExecuteScalar();
                    cmd.Parameters.Clear();
                    m.importStatus = mssg.Value.ToString();
                }
                conn.Close();
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssests Credentials completed.");
                return list;
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

                string str = ex.Message;
                traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveAssests:" + ex.Message);
                //return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                throw ex;
            }
        }

        //[HttpPost]
        //[Route("api/DataLoad/SaveAssetModel")]
        //public List<Assetsstypes> SaveAssetModel(List<Assetmodeltypes> list)
        //{
        //    LogTraceWriter traceWriter = new LogTraceWriter();
        //    traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssets Details....");
        //    DataTable tbl = new DataTable();

        //    SqlConnection conn = new SqlConnection();

        //    try
        //    {
        //        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

        //        SqlCommand cmd = new SqlCommand();
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.CommandText = "InsUpdDelAssetMeodelImport";
        //        cmd.Connection = conn;
        //        conn.Open();

        //        foreach (Assetmodeltypes m in list)
        //        {

        //            SqlParameter aid = new SqlParameter();
        //            aid.ParameterName = "@Name";
        //            aid.SqlDbType = SqlDbType.VarChar;
        //            aid.Value = m.Name;
        //            cmd.Parameters.Add(aid);

        //            SqlParameter man = new SqlParameter();
        //            man.ParameterName = "@Description ";
        //            man.SqlDbType = SqlDbType.VarChar;
        //            man.Value = m.Description;
        //            cmd.Parameters.Add(man);


        //            SqlParameter i = new SqlParameter("@flag", SqlDbType.VarChar, 1);
        //            i.Value = m.flag;
        //            cmd.Parameters.Add(i);


        //            SqlParameter mssg = new SqlParameter("@mssg", SqlDbType.VarChar, 250);
        //            // mssg.Value = o.flag;
        //            mssg.Direction = ParameterDirection.Output;
        //            cmd.Parameters.Add(mssg);

        //            cmd.ExecuteScalar();
        //            m.importStatus = mssg.Value.ToString();
        //            cmd.Parameters.Clear();

        //        }
        //        conn.Close();
        //        traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssests Credentials completed.");
        //        return list;
        //    }
        //    catch (Exception ex)
        //    {
        //        if (conn != null && conn.State == ConnectionState.Open)
        //        {
        //            conn.Close();
        //        }

        //        string str = ex.Message;
        //        traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveAssests:" + ex.Message);
        //        throw ex;
        //        //return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
        //    }
        //}

        [HttpPost]
        [Route("api/DataLoad/SaveAssetModel")]
        public List<Assetsstypes> SaveAssetModels(List<Assetsstypes> list)
        {
            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssets Details....");
            DataTable tbl = new DataTable();

            SqlConnection conn = new SqlConnection();

            try
            {
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelEquipementTypesImport";
                cmd.Connection = conn;
                conn.Open();

                foreach (Assetsstypes m in list)
                {

                    SqlParameter aid = new SqlParameter();
                    aid.ParameterName = "@Name";
                    aid.SqlDbType = SqlDbType.VarChar;
                    aid.Value = m.Name;
                    cmd.Parameters.Add(aid);

                    SqlParameter man = new SqlParameter();
                    man.ParameterName = "@Description ";
                    man.SqlDbType = SqlDbType.VarChar;
                    man.Value = m.Description;
                    cmd.Parameters.Add(man);


                    SqlParameter obj = new SqlParameter();
                    obj.ParameterName = "@object_name ";
                    obj.SqlDbType = SqlDbType.VarChar;
                    obj.Value = m.object_name;
                    cmd.Parameters.Add(obj);

                    SqlParameter i = new SqlParameter("@flag", SqlDbType.VarChar, 1);
                    i.Value = m.flag;
                    cmd.Parameters.Add(i);

                    SqlParameter mssg = new SqlParameter("@mssg", SqlDbType.VarChar, 100);
                    // mssg.Value = o.flag;
                    mssg.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(mssg);


                    cmd.ExecuteScalar();
                    cmd.Parameters.Clear();
                    m.importStatus = mssg.Value.ToString();

                }
                conn.Close();
                //traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssests Credentials completed.");
                return list;
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

                string str = ex.Message;
                traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveAssests:" + ex.Message);
                throw ex;
                //return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }

        [HttpPost]
        [Route("api/DataLoad/SaveAssets")]
        public List<Assetss> SaveAssets(List<Assetss> list)
        {
            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssets Details....");
            DataTable tbl = new DataTable();

            SqlConnection conn = new SqlConnection();

            try
            {
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelAssetImports";
                cmd.Connection = conn;
                conn.Open();

                foreach (Assetss m in list)
                {
                    try
                    {
                        SqlParameter ai = new SqlParameter();
                        ai.ParameterName = "@equipmenttype_name";
                        ai.SqlDbType = SqlDbType.VarChar;
                        ai.Value = m.equipmenttype_name.Trim();
                        cmd.Parameters.Add(ai);

                        SqlParameter objn = new SqlParameter();
                        objn.ParameterName = "@objecttype_name";
                        objn.SqlDbType = SqlDbType.VarChar;
                        objn.Value = m.objecttype_name.Trim();
                        cmd.Parameters.Add(objn);


                        SqlParameter aid = new SqlParameter();
                        aid.ParameterName = "@SerialNumber";
                        aid.SqlDbType = SqlDbType.VarChar;
                        aid.Value = m.SerialNumber.Trim();
                        cmd.Parameters.Add(aid);

                        SqlParameter dp = new SqlParameter();
                        dp.ParameterName = "@Manufacturer";
                        dp.SqlDbType = SqlDbType.VarChar;
                        dp.Value = m.Manufacturer.Trim();
                        cmd.Parameters.Add(dp);

                        SqlParameter des = new SqlParameter();
                        des.ParameterName = "@desc";
                        des.SqlDbType = SqlDbType.VarChar;
                        des.Value = m.desc.Trim();
                        cmd.Parameters.Add(des);

                        SqlParameter add = new SqlParameter();
                        add.ParameterName = "@DateofPurchase";
                        add.SqlDbType = SqlDbType.Date;
                        add.Value = m.DateofPurchased;
                        cmd.Parameters.Add(add);

                        SqlParameter sta = new SqlParameter();
                        sta.ParameterName = "@Unitprice";
                        sta.SqlDbType = SqlDbType.Decimal;
                        sta.Value = m.Unitprice;
                        cmd.Parameters.Add(sta);

                        SqlParameter jb = new SqlParameter();
                        jb.ParameterName = "@JobRate";
                        jb.SqlDbType = SqlDbType.Decimal;
                        jb.Value = m.JobRate;
                        cmd.Parameters.Add(jb);

                        SqlParameter N = new SqlParameter();
                        N.ParameterName = "@Rental";
                        N.SqlDbType = SqlDbType.Decimal;
                        N.Value = m.Rental;
                        cmd.Parameters.Add(N);

                        SqlParameter adr = new SqlParameter();
                        adr.ParameterName = "@AdditionalDayRate";
                        adr.SqlDbType = SqlDbType.Decimal;
                        adr.Value = m.AdditionalDayRate;
                        cmd.Parameters.Add(adr);


                        SqlParameter dayr = new SqlParameter();
                        dayr.ParameterName = "@DayRate";
                        dayr.SqlDbType = SqlDbType.Decimal;
                        dayr.Value = m.DayRate;
                        cmd.Parameters.Add(dayr);

                        SqlParameter per = new SqlParameter();
                        per.ParameterName = "@PerWeekStandbyCharge";
                        per.SqlDbType = SqlDbType.Decimal;
                        per.Value = m.PerWeekStandbyCharge;
                        cmd.Parameters.Add(per);

                        SqlParameter red = new SqlParameter();
                        red.ParameterName = "@RedressCost";
                        red.SqlDbType = SqlDbType.Decimal;
                        red.Value = m.RedressCost;
                        cmd.Parameters.Add(red);

                        SqlParameter dsa = new SqlParameter();
                        dsa.ParameterName = "@DateofSold";
                        dsa.SqlDbType = SqlDbType.DateTime;
                        dsa.Value = m.DateofSold;
                        cmd.Parameters.Add(dsa);

                        SqlParameter jobi = new SqlParameter();
                        jobi.ParameterName = "@Job ";
                        jobi.SqlDbType = SqlDbType.VarChar;
                        jobi.Value = m.Job.Trim();
                        cmd.Parameters.Add(jobi);

                        SqlParameter lost1 = new SqlParameter();
                        lost1.ParameterName = "@Lost";
                        lost1.SqlDbType = SqlDbType.DateTime;
                        lost1.Value = m.Lost;
                        cmd.Parameters.Add(lost1);

                        SqlParameter lnc2 = new SqlParameter();
                        lnc2.ParameterName = "@location_name";
                        lnc2.SqlDbType = SqlDbType.VarChar;
                        lnc2.Value = m.location_name.Trim();
                        cmd.Parameters.Add(lnc2);

                        SqlParameter pri = new SqlParameter();
                        pri.ParameterName = "@Price";
                        pri.SqlDbType = SqlDbType.Decimal;
                        pri.Value = m.Price;
                        cmd.Parameters.Add(pri);

                        SqlParameter cycle = new SqlParameter();
                        cycle.ParameterName = "@CycleCountofdate";
                        cycle.SqlDbType = SqlDbType.DateTime;
                        cycle.Value = m.CycleCountofdate;
                        cmd.Parameters.Add(cycle);

                        SqlParameter insp = new SqlParameter();
                        insp.ParameterName = "@InspectionVendor";
                        insp.SqlDbType = SqlDbType.VarChar;
                        insp.Value = m.InspectionVendor;
                        cmd.Parameters.Add(insp);

                        SqlParameter mmid = new SqlParameter();
                        mmid.ParameterName = "@MaintenanceVendor";
                        mmid.SqlDbType = SqlDbType.VarChar;
                        mmid.Value = m.MaintenanceVendor;
                        cmd.Parameters.Add(mmid);

                        SqlParameter stat = new SqlParameter("@StatusId", SqlDbType.VarChar, 50);
                        stat.Value = m.StatusId;
                        cmd.Parameters.Add(stat);

                        SqlParameter cond = new SqlParameter();
                        cond.ParameterName = "@Condition";
                        cond.SqlDbType = SqlDbType.VarChar;
                        cond.Value = m.Condition.Trim();
                        cmd.Parameters.Add(cond);

                        SqlParameter mat = new SqlParameter();
                        mat.ParameterName = "@Material";
                        mat.SqlDbType = SqlDbType.VarChar;
                        mat.Value = m.Material.Trim();
                        cmd.Parameters.Add(mat);

                        SqlParameter purcost = new SqlParameter();
                        purcost.ParameterName = "@PurchaseCost";
                        purcost.SqlDbType = SqlDbType.Decimal;
                        purcost.Value = m.PurchaseCost;
                        cmd.Parameters.Add(purcost);

                        SqlParameter cust = new SqlParameter();
                        cust.ParameterName = "@Customer";
                        cust.SqlDbType = SqlDbType.VarChar;
                        cust.Value = m.Customer.Trim();
                        cmd.Parameters.Add(cust);

                        SqlParameter lostlih = new SqlParameter();
                        lostlih.ParameterName = "@LostLIHDamaged";
                        lostlih.SqlDbType = SqlDbType.VarChar;
                        lostlih.Value = m.LostLIHDamaged.Trim();
                        cmd.Parameters.Add(lostlih);

                        SqlParameter ldt = new SqlParameter();
                        ldt.ParameterName = "@LocationDate";
                        ldt.SqlDbType = SqlDbType.DateTime;
                        ldt.Value = m.LocationDate;
                        cmd.Parameters.Add(ldt);

                        SqlParameter note = new SqlParameter();
                        note.ParameterName = "@Notes";
                        note.SqlDbType = SqlDbType.VarChar;
                        note.Value = m.Notes.Trim();
                        cmd.Parameters.Add(note);

                        SqlParameter i = new SqlParameter("@Flag", SqlDbType.VarChar, 1);
                        i.Value = m.Flag;
                        cmd.Parameters.Add(i);

                        SqlParameter mssg = new SqlParameter("@mssg", SqlDbType.VarChar, 100);
                        // mssg.Value = o.flag;
                        mssg.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(mssg);


                        //if (mssg.Value.ToString() != "success")
                        //{
                        //    m.importStatus = mssg.Value.ToString();
                        //}

                        cmd.ExecuteScalar();
                        m.importStatus = mssg.Value.ToString();


                    }
                    catch (Exception ex)
                    {
                        m.importStatus = "failed due to error:" + ex.Message;
                    }
                    cmd.Parameters.Clear();

                }
                conn.Close();
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssests Credentials completed.");

                var finallist = from l in list
                                where l.importStatus != "success"
                                select l;

                return finallist.ToList();
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

                string str = ex.Message;
                traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveAssests:" + ex.Message);
                throw ex;
                //   return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

        }

        [HttpGet]
        [Route("api/DataLoad/GetDataLoad")]
        public DataTable GetDataLoad()
        {
            DataTable Tbl = new DataTable();

            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "GetDataLoad credentials....");
            SqlConnection conn = new SqlConnection();
            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "GetDataLoad";
            cmd.Connection = conn;
            DataSet ds = new DataSet();
            SqlDataAdapter db = new SqlDataAdapter(cmd);
            db.Fill(ds);
            Tbl = ds.Tables[0];
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "GetDataLoad Credentials completed.");
            // int found = 0;
            return Tbl;

        }

        //[HttpPost]
        //[Route("api/DataLoad/SaveCompanyGroups")]
        //public HttpResponseMessage SaveCompanyGroups(List<CompanyGroups> list)
        //{

        //    LogTraceWriter traceWriter = new LogTraceWriter();
        //    traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveCompanyGroups credentials....");
        //    //DataTable Tbl = new DataTable();
        //    SqlConnection conn = new SqlConnection();

        //    try
        //    {
        //        //connect to database

        //        // connetionString = "Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password";
        //        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

        //        SqlCommand cmd = new SqlCommand();
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.CommandText = "InsUpdDelCompany";
        //        cmd.Connection = conn;

        //        conn.Open();

        //        foreach (CompanyGroups n in list)
        //        {
        //            SqlParameter gsa = new SqlParameter();
        //            gsa.ParameterName = "@active";
        //            gsa.SqlDbType = SqlDbType.Int;
        //            gsa.Value = n.active;
        //            cmd.Parameters.Add(gsa);

        //            SqlParameter gsn = new SqlParameter();
        //            gsn.ParameterName = "@code";
        //            gsn.SqlDbType = SqlDbType.VarChar;
        //            gsn.Value = n.code;
        //            cmd.Parameters.Add(gsn);

        //            SqlParameter gsab = new SqlParameter();
        //            gsab.ParameterName = "@desc";
        //            gsab.SqlDbType = SqlDbType.VarChar;
        //            gsab.Value = n.desc;
        //            cmd.Parameters.Add(gsab);

        //            SqlParameter gsac = new SqlParameter("@Id", SqlDbType.Int);
        //            gsac.Value = n.Id;
        //            cmd.Parameters.Add(gsac);

        //            SqlParameter gid = new SqlParameter();
        //            gid.ParameterName = "@Name";
        //            gid.SqlDbType = SqlDbType.VarChar;
        //            gid.Value = n.Name;
        //            cmd.Parameters.Add(gid);


        //            SqlParameter gad = new SqlParameter();
        //            gad.ParameterName = "@Address";
        //            gad.SqlDbType = SqlDbType.VarChar;
        //            gad.Value = n.Address;
        //            cmd.Parameters.Add(gad);

        //            SqlParameter gcn = new SqlParameter();
        //            gcn.ParameterName = "@ContactNo1";
        //            gcn.SqlDbType = SqlDbType.VarChar;
        //            gcn.Value = n.ContactNo1;
        //            cmd.Parameters.Add(gcn);

        //            SqlParameter gcn1 = new SqlParameter();
        //            gcn1.ParameterName = "@ContactNo2";
        //            gcn1.SqlDbType = SqlDbType.VarChar;
        //            gcn1.Value = n.ContactNo2;
        //            cmd.Parameters.Add(gcn1);



        //            SqlParameter gem = new SqlParameter();
        //            gem.ParameterName = "@EmailId";
        //            gem.SqlDbType = SqlDbType.VarChar;
        //            gem.Value = n.EmailId;
        //            cmd.Parameters.Add(gem);






        //            //SqlParameter TAdd = new SqlParameter();
        //            //TAdd.ParameterName = "@TemporaryAddress";
        //            //TAdd.SqlDbType = SqlDbType.VarChar;
        //            //TAdd.Value = n.TemporaryAddress;
        //            //cmd.Parameters.Add(TAdd);


        //            // ImageConverter imgCon = new ImageConverter();
        //            // logo.Value = (byte[])imgCon.ConvertTo(n.Logo, typeof(byte[]));


        //            SqlParameter insupdflag = new SqlParameter("@insupdflag", SqlDbType.VarChar, 1);
        //            insupdflag.Value = n.insupdflag;
        //            cmd.Parameters.Add(insupdflag);

        //            cmd.ExecuteScalar();
        //            cmd.Parameters.Clear();
        //        }
        //        conn.Close();
        //        traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveCompanyGroups Credentials completed.");
        //        return new HttpResponseMessage(HttpStatusCode.OK);
        //    }
        //    catch (Exception ex)
        //    {
        //        if (conn != null && conn.State == ConnectionState.Open)
        //        {
        //            conn.Close();
        //        }

        //        string str = ex.Message;
        //        traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveCompanyGroups:" + ex.Message);
        //        return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
        //    }
        //    // int found = 0;
        //    //  return Tbl;
        //}

        //[HttpPost]
        //[Route("api/DataLoad/SaveUsers")]

        //public HttpResponseMessage SaveUsers(List<Users> list1)
        //{

        //    LogTraceWriter traceWriter = new LogTraceWriter();
        //    traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveUsers credentials....");
        //    //DataTable Tbl = new DataTable();
        //    SqlConnection conn = new SqlConnection();

        //    try
        //    {
        //        //connect to database

        //        // connetionString = "Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password";
        //        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

        //        SqlCommand cmd = new SqlCommand();
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.CommandText = "InsUpdUsers";
        //        cmd.Connection = conn;

        //        conn.Open();


        //        foreach (Users U in list1)
        //        {
        //            SqlParameter UId = new SqlParameter("@userid", SqlDbType.Int);
        //            UId.Value = U.Id;
        //            cmd.Parameters.Add(UId);

        //            SqlParameter UFirstName = new SqlParameter("@FirstName", SqlDbType.VarChar, 50);
        //            UFirstName.Value = U.FirstName;
        //            cmd.Parameters.Add(UFirstName);

        //            SqlParameter LastName = new SqlParameter("@LastName", SqlDbType.VarChar, 50);
        //            LastName.Value = U.LastName;
        //            cmd.Parameters.Add(LastName);

        //            SqlParameter MiddleName = new SqlParameter("@MiddleName", SqlDbType.VarChar, 50);
        //            MiddleName.Value = U.MiddleName;
        //            cmd.Parameters.Add(MiddleName);




        //            SqlParameter UEmail = new SqlParameter("@Email", SqlDbType.VarChar, 15);
        //            UEmail.Value = U.Email;
        //            cmd.Parameters.Add(UEmail);



        //            SqlParameter UMobileNo = new SqlParameter("@ContactNo1", SqlDbType.VarChar, 15);
        //            UMobileNo.Value = U.ContactNo1;
        //            cmd.Parameters.Add(UMobileNo);

        //            SqlParameter ContactNo2 = new SqlParameter("@ContactNo2", SqlDbType.VarChar, 15);
        //            ContactNo2.Value = U.ContactNo2;
        //            cmd.Parameters.Add(ContactNo2);



        //            SqlParameter UActive = new SqlParameter("@Active", SqlDbType.Int);
        //            UActive.Value = U.Active;
        //            cmd.Parameters.Add(UActive);



        //            //  SqlParameter WUserName = new SqlParameter("@WUserName",SqlDbType.VarChar,15);
        //            //WUserName.Value = U.WUserName;
        //            //cmd.Parameters.Add(WUserName);

        //            //SqlParameter WPassword = new SqlParameter("@WPassword",SqlDbType.VarChar,15);
        //            //WPassword.Value = U.WPassword;
        //            //cmd.Parameters.Add(WPassword);


        //            SqlParameter insupdflag = new SqlParameter("@insupdflag", SqlDbType.VarChar, 10);
        //            insupdflag.Value = U.insupdflag;
        //            cmd.Parameters.Add(insupdflag);




        //            cmd.ExecuteScalar();
        //            cmd.Parameters.Clear();
        //        }
        //        conn.Close();
        //        traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveUsers Credentials completed.");
        //        return new HttpResponseMessage(HttpStatusCode.OK);
        //    }
        //    catch (Exception ex)
        //    {
        //        if (conn != null && conn.State == ConnectionState.Open)
        //        {
        //            conn.Close();
        //        }

        //        string str = ex.Message;
        //        traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveUsers:" + ex.Message);
        //        return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
        //    }
        //    // int found = 0;
        //    //  return Tbl;
        //}

        [HttpPost]
        [Route("api/DataLoad/SaveCompanyGroups1")]
        public DataTable SaveCompanyGroups1(List<CompanyGroups> list)
        {
            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveCompanyGroups credentials....");
            DataTable tbl = new DataTable();

            SqlConnection conn = new SqlConnection();

            try
            {
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelCompanyGroups";
                cmd.Connection = conn;

                conn.Open();

                foreach (CompanyGroups m in list)
                {
                    SqlParameter gid = new SqlParameter();
                    gid.ParameterName = "@Name";
                    gid.SqlDbType = SqlDbType.VarChar;
                    gid.Value = m.Name;
                    cmd.Parameters.Add(gid);

                    SqlParameter gsa = new SqlParameter("@active", SqlDbType.Int);
                    gsa.Value = m.active;
                    cmd.Parameters.Add(gsa);

                    SqlParameter gsn = new SqlParameter();
                    gsn.ParameterName = "@code";
                    gsn.SqlDbType = SqlDbType.VarChar;
                    gsn.Value = m.code;
                    cmd.Parameters.Add(gsn);

                    SqlParameter gsab = new SqlParameter();
                    gsab.ParameterName = "@Description";
                    gsab.SqlDbType = SqlDbType.VarChar;
                    gsab.Value = m.desc;
                    cmd.Parameters.Add(gsab);

                    SqlParameter gad = new SqlParameter();
                    gad.ParameterName = "@Address";
                    gad.SqlDbType = SqlDbType.VarChar;
                    gad.Value = m.Address;
                    cmd.Parameters.Add(gad);

                    SqlParameter gem = new SqlParameter();
                    gem.ParameterName = "@EmailId";
                    gem.SqlDbType = SqlDbType.VarChar;
                    gem.Value = m.EmailId;
                    cmd.Parameters.Add(gem);

                    SqlParameter gcn = new SqlParameter();
                    gcn.ParameterName = "@ContactNo1";
                    gcn.SqlDbType = SqlDbType.VarChar;
                    gcn.Value = m.ContactNo1;
                    cmd.Parameters.Add(gcn);

                    SqlParameter gcn1 = new SqlParameter();
                    gcn1.ParameterName = "@ContactNo2";
                    gcn1.SqlDbType = SqlDbType.VarChar;
                    gcn1.Value = m.ContactNo2;
                    cmd.Parameters.Add(gcn1);

                    SqlParameter gcn2 = new SqlParameter();
                    gcn2.ParameterName = "@Fax";
                    gcn2.SqlDbType = SqlDbType.VarChar;
                    gcn2.Value = m.Fax;
                    cmd.Parameters.Add(gcn2);

                    SqlParameter gem1 = new SqlParameter();
                    gem1.ParameterName = "@Title";
                    gem1.SqlDbType = SqlDbType.VarChar;
                    gem1.Value = m.Title;
                    cmd.Parameters.Add(gem1);

                    SqlParameter gem2 = new SqlParameter();
                    gem2.ParameterName = "@Caption";
                    gem2.SqlDbType = SqlDbType.VarChar;
                    gem2.Value = m.Caption;
                    cmd.Parameters.Add(gem2);

                    SqlParameter gem3 = new SqlParameter();
                    gem3.ParameterName = "@Country";
                    gem3.SqlDbType = SqlDbType.VarChar;
                    gem3.Value = m.Country;
                    cmd.Parameters.Add(gem3);

                    SqlParameter gem4 = new SqlParameter();
                    gem4.ParameterName = "@ZipCode";
                    gem4.SqlDbType = SqlDbType.VarChar;
                    gem4.Value = m.ZipCode;
                    cmd.Parameters.Add(gem4);

                    SqlParameter gem5 = new SqlParameter();
                    gem5.ParameterName = "@State";
                    gem5.SqlDbType = SqlDbType.VarChar;
                    gem5.Value = m.State;
                    cmd.Parameters.Add(gem5);

                    SqlParameter gem8 = new SqlParameter();
                    gem8.ParameterName = "@FleetSize";
                    gem8.SqlDbType = SqlDbType.Int;
                    gem8.Value = m.FleetSize;
                    cmd.Parameters.Add(gem8);

                    SqlParameter gem7 = new SqlParameter();
                    gem7.ParameterName = "@StaffSize";
                    gem7.SqlDbType = SqlDbType.Int;
                    gem7.Value = m.StaffSize;
                    cmd.Parameters.Add(gem7);

                    SqlParameter gem9 = new SqlParameter();
                    gem9.ParameterName = "@AlternateAddress";
                    gem9.SqlDbType = SqlDbType.VarChar;
                    gem9.Value = m.AlternateAddress;
                    cmd.Parameters.Add(gem9);

                    SqlParameter insupdflag = new SqlParameter("@insupdflag", SqlDbType.VarChar, 1);
                    insupdflag.Value = m.insupdflag;
                    cmd.Parameters.Add(insupdflag);

                    DataSet ds = new DataSet();
                    SqlDataAdapter db = new SqlDataAdapter(cmd);
                    db.Fill(tbl);

                    cmd.ExecuteScalar();
                    cmd.Parameters.Clear();
                }
                conn.Close();
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveCompanyGroups Credentials completed.");
                return tbl;
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

                string str = ex.Message;


                traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveCompanyGroups:" + ex.Message);

                return tbl;


                // int found = 0;

            }

        }


        //[HttpPost]
        //[Route("api/DataLoad/SaveDriverGroups")]
        //public SqlParameter[] SaveDriverGroups(DriversGroups m)
        //{

        //    //List<DriversGroups> list1 = new List<DriversGroups>();
        //    LogTraceWriter traceWriter = new LogTraceWriter();
        //    traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveDriverGroups credentials....");
        //    //DataTable Tbl = new DataTable();
        //    SqlConnection conn = new SqlConnection();

        //    try
        //    {
        //        //connect to database

        //        // connetionString = "Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password";
        //        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

        //        SqlCommand cmd = new SqlCommand();
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.CommandText = "HVInsUpddrivers2";
        //        cmd.Connection = conn;

        //        conn.Open();
        //        //list = new List<DriversGroups>();
        //        for(int i=0; i<m.DriversGroup.Length;i++)
        //        {
        //            SqlParameter dgid = new SqlParameter();
        //            dgid.ParameterName = "@CompanyId";
        //            dgid.SqlDbType = SqlDbType.Int;
        //            dgid.Value = m.CompanyId;
        //            cmd.Parameters.Add(dgid);

        //            SqlParameter dgname = new SqlParameter("@NAme", SqlDbType.VarChar, 50);
        //            dgname.Value = m.NAme;
        //            cmd.Parameters.Add(dgname);

        //            SqlParameter dgAddr = new SqlParameter();
        //            dgAddr.ParameterName = "@Address";
        //            dgAddr.SqlDbType = SqlDbType.VarChar;
        //            dgAddr.Value = m.Address;
        //            cmd.Parameters.Add(dgAddr);

        //            SqlParameter dgcity = new SqlParameter();
        //            dgcity.ParameterName = "@City";
        //            dgcity.SqlDbType = SqlDbType.VarChar;
        //            dgcity.Value = m.City;
        //            cmd.Parameters.Add(dgcity);

        //            SqlParameter dgppin = new SqlParameter();
        //            dgppin.ParameterName = "@Pin";
        //            dgppin.SqlDbType = SqlDbType.VarChar;
        //            dgppin.Value = m.Pin;
        //            cmd.Parameters.Add(dgppin);

        //            //SqlParameter gsac = new SqlParameter("@Id", SqlDbType.Int);
        //            //gsac.Value = n.Id;
        //            //cmd.Parameters.Add(gsac);                    

        //            SqlParameter dgpadr = new SqlParameter();
        //            dgpadr.ParameterName = "@PAddress";
        //            dgpadr.SqlDbType = SqlDbType.VarChar;
        //            dgpadr.Value = m.PAddress;
        //            cmd.Parameters.Add(dgpadr);

        //            SqlParameter dgPPin = new SqlParameter();
        //            dgPPin.ParameterName = "@PPin";
        //            dgPPin.SqlDbType = SqlDbType.VarChar;
        //            dgPPin.Value = m.PPin;
        //            cmd.Parameters.Add(dgPPin);

        //            SqlParameter dgMob1 = new SqlParameter();
        //            dgMob1.ParameterName = "@OffMobileNo";
        //            dgMob1.SqlDbType = SqlDbType.VarChar;
        //            dgMob1.Value = m.OffMobileNo;
        //            cmd.Parameters.Add(dgMob1);

        //            SqlParameter dgPM = new SqlParameter();
        //            dgPM.ParameterName = "@PMobNo";
        //            dgPM.SqlDbType = SqlDbType.VarChar;
        //            dgPM.Value = m.PMobNo;
        //            cmd.Parameters.Add(dgPM);

        //            SqlParameter dgDOB = new SqlParameter();
        //            dgDOB.ParameterName = "@DOB";
        //            dgDOB.SqlDbType = SqlDbType.DateTime;
        //            dgDOB.Value = m.DOB;
        //            cmd.Parameters.Add(dgDOB);

        //            SqlParameter dgDOJ = new SqlParameter();
        //            dgDOJ.ParameterName = "@DOJ";
        //            dgDOJ.SqlDbType = SqlDbType.DateTime;
        //            dgDOJ.Value = m.DOJ;
        //            cmd.Parameters.Add(dgDOJ);

        //            SqlParameter dgbg = new SqlParameter();
        //            dgbg.ParameterName = "@BloodGroup";
        //            dgbg.SqlDbType = SqlDbType.VarChar;
        //            dgbg.Value = m.BloodGroup;
        //            cmd.Parameters.Add(dgbg);

        //            SqlParameter dgLNo = new SqlParameter();
        //            dgLNo.ParameterName = "@LicenceNo";
        //            dgLNo.SqlDbType = SqlDbType.VarChar;
        //            dgLNo.Value = m.LicenceNo;
        //            cmd.Parameters.Add(dgLNo);

        //            SqlParameter dgLEDt = new SqlParameter();
        //            dgLEDt.ParameterName = "@LiCExpDate";
        //            dgLEDt.SqlDbType = SqlDbType.VarChar;
        //            dgLEDt.Value = m.LiCExpDate;
        //            cmd.Parameters.Add(dgLEDt);

        //            SqlParameter dgBNo = new SqlParameter();
        //            dgBNo.ParameterName = "@BadgeNo";
        //            dgBNo.SqlDbType = SqlDbType.VarChar;
        //            dgBNo.Value = m.BadgeNo;
        //            cmd.Parameters.Add(dgBNo);

        //            SqlParameter dgBED = new SqlParameter();
        //            dgBED.ParameterName = "@BadgeExpDate";
        //            dgBED.SqlDbType = SqlDbType.DateTime;
        //            dgBED.Value = m.BadgeExpDate;
        //            cmd.Parameters.Add(dgBED);

        //            SqlParameter dgRemarks = new SqlParameter();
        //            dgRemarks.ParameterName = "@Remarks";
        //            dgRemarks.SqlDbType = SqlDbType.VarChar;
        //            dgRemarks.Value = m.Remarks;
        //            cmd.Parameters.Add(dgRemarks);


        //            SqlParameter insupdflag = new SqlParameter("@flag", SqlDbType.VarChar);
        //            insupdflag.Value = m.flag;
        //            cmd.Parameters.Add(insupdflag);

        //            cmd.ExecuteScalar();
        //            cmd.Parameters.Clear();
        //        }


        //        return null;
        //        //traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveDriversGroups Credentials completed.");
        //        //return new HttpResponseMessage(HttpStatusCode.OK);
        //    }
        //    catch (Exception ex)
        //    {
        //        if (conn != null && conn.State == ConnectionState.Open)
        //        {
        //            conn.Close();
        //        }

        //        string str = ex.Message;
        //        traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveDriversGroups:" + ex.Message);
        //        ///return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
        //        return null;
        //    }
        //    // int found = 0;
        //    //  return Tbl;
        //}


        [HttpPost]
        [Route("api/DataLoad/SaveUsersGroup1")]

        public HttpResponseMessage SaveUsersGroup1(List<UsersGroup> list5)
        {

            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveUsers credentials....");
            //DataTable Tbl = new DataTable();
            SqlConnection conn = new SqlConnection();

            try
            {
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdUsersGroups";
                cmd.Connection = conn;

                conn.Open();


                foreach (UsersGroup U in list5)
                {
                    //SqlParameter UId = new SqlParameter("@userid", SqlDbType.Int);
                    //UId.Value = U.Id;
                    //cmd.Parameters.Add(UId);

                    SqlParameter UFirstName = new SqlParameter();
                    UFirstName.ParameterName = "@FirstName";
                    UFirstName.SqlDbType = SqlDbType.VarChar;
                    UFirstName.Value = U.FirstName;
                    cmd.Parameters.Add(UFirstName);

                    SqlParameter LastName = new SqlParameter("@LastName", SqlDbType.VarChar, 50);
                    LastName.Value = U.LastName;
                    cmd.Parameters.Add(LastName);

                    SqlParameter MiddleName = new SqlParameter("@MiddleName", SqlDbType.VarChar, 50);
                    MiddleName.Value = U.MiddleName;
                    cmd.Parameters.Add(MiddleName);

                    SqlParameter empNo = new SqlParameter("@EmpNo", SqlDbType.VarChar, 15);
                    empNo.Value = U.EmpNo;
                    cmd.Parameters.Add(empNo);

                    SqlParameter UEmail = new SqlParameter("@Email", SqlDbType.VarChar, 15);
                    UEmail.Value = U.Email;
                    cmd.Parameters.Add(UEmail);

                    SqlParameter UAddress = new SqlParameter("@Address", SqlDbType.VarChar, 15);
                    UAddress.Value = U.Address;
                    cmd.Parameters.Add(UAddress);

                    SqlParameter roleId = new SqlParameter("@RoleId", SqlDbType.Int);
                    roleId.Value = U.RoleId;
                    cmd.Parameters.Add(roleId);

                    SqlParameter UActive = new SqlParameter("@Active", SqlDbType.Int);
                    UActive.Value = U.Active;
                    cmd.Parameters.Add(UActive);

                    SqlParameter UcmpId = new SqlParameter("@cmpId", SqlDbType.Int);
                    UcmpId.Value = U.cmpId;
                    cmd.Parameters.Add(UcmpId);


                    SqlParameter UMobileNo = new SqlParameter("@ContactNo1", SqlDbType.VarChar, 15);
                    UMobileNo.Value = U.ContactNo1;
                    cmd.Parameters.Add(UMobileNo);

                    SqlParameter ContactNo2 = new SqlParameter("@ContactNo2", SqlDbType.VarChar, 15);
                    ContactNo2.Value = U.ContactNo2;
                    cmd.Parameters.Add(ContactNo2);

                    SqlParameter insupdflag = new SqlParameter("@insupdflag", SqlDbType.VarChar, 10);
                    insupdflag.Value = U.insupdflag;
                    cmd.Parameters.Add(insupdflag);

                    cmd.ExecuteScalar();
                    cmd.Parameters.Clear();
                }
                conn.Close();
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveUsers Credentials completed.");
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

                string str = ex.Message;
                traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveUsers:" + ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            // int found = 0;
            //  return Tbl;
        }


        [HttpPost]
        [Route("api/DataLoad/SaveMaintenanceVendor")]
        public List<SaveMaintenanceVendorlist> SaveMaintenanceVendor(List<SaveMaintenanceVendorlist> list)
        {
            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssets Details....");
            DataTable tbl = new DataTable();

            SqlConnection conn = new SqlConnection();

            try
            {
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["EES_DB_ConnectionString"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelMaintenanceVendorsImports";
                cmd.Connection = conn;
                conn.Open();

                foreach (SaveMaintenanceVendorlist m in list)
                {
                    try
                    {

                        SqlParameter aid = new SqlParameter();
                        aid.ParameterName = "@Name";
                        aid.SqlDbType = SqlDbType.VarChar;
                        aid.Value = m.Name;
                        cmd.Parameters.Add(aid);

                        SqlParameter man = new SqlParameter();
                        man.ParameterName = "@Description";
                        man.SqlDbType = SqlDbType.VarChar;
                        man.Value = m.Description;
                        cmd.Parameters.Add(man);

                        SqlParameter i = new SqlParameter("@flag", SqlDbType.VarChar, 1);
                        i.Value = m.flag;
                        cmd.Parameters.Add(i);

                        SqlParameter mssg = new SqlParameter("@mssg", SqlDbType.VarChar, 100);
                        // mssg.Value = o.flag;
                        mssg.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(mssg);


                        cmd.ExecuteScalar();
                        m.importStatus = mssg.Value.ToString();
                    }
                    catch (Exception ex)
                    {
                        m.importStatus = "failed due to error:" + ex.Message;
                    }
                    cmd.Parameters.Clear();
                }
                conn.Close();
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveAssests Credentials completed.");
                var finallist = from l in list
                                where l.importStatus != "success"
                                select l;

                return finallist.ToList();
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

                string str = ex.Message;
                traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in SaveAssests:" + ex.Message);
                //return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                throw ex;
            }
        }
    }
}