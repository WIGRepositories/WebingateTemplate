using ERPSystem.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERPSystem.Models
{
    public class DeliveryTicket
    {

        public int Id { get; set; }
        public string DeliveryTicketId { get; set; }
        public int SequenceNo { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public DateTime? ReturnDate { get; set; }    
        public int JobID { get; set; }
        public string CoMan { get; set; }
        public string PhoneNo { get; set; }
        public string Orderedby { get; set; }
        public string ShipVia { get; set; }
        public string ShipTo { get; set; }
        public int changedById { get; set; }
        public string insupddelflag { get; set; }
        public int DTtype { get; set; }
        public int IsVoid { get; set; }

        public List<DeliveryTickeItems> DTItems { get; set; }
        public List<DeliveryTickeItemss> DTpersonnel { get; set; }  
    }
    public class DeliveryTickeItemss {
        public string Personnelid { get; set; }
        public int SequenceNo { get; set; }
        public string DTId { get; set; }
        public int JobID { get; set; }
        public string insupddelflag { get; set; }
    }
    public class DeliveryTickeItems
    {
         public string DTId { get; set; }
         public int seqNo { get; set; }
         public DateTime? usageDate { get; set; }
        public DateTime? usagDate { get; set; }
        public int AssetId { get; set; }
        public int changedById { get; set; }
         public string insupddelflag { get; set; }
    }

    public class locatinlist
    {

        public locatinlist[] m = null;

        public string importStatus { get; set; }
        public string Name { get; set; }
        //public string Active {get;set;}
        public string Description { get; set; }
        public string flag { get; set; }
    }


    public class manufacturerlist
    {
        public manufacturerlist[] m = null;

        public string importStatus { get; set; }
        public int ID { get; set; }
        public string Manufacture { get; set; }

        public string Description { get; set; }
        public string flag { get; set; }


    }

    public class customerlist
    {
        public customerlist[] m = null;
        public string Client { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }

        public string ContactRole { get; set; }
        public string ServiceDescription { get; set; }
        public string flag { get; set; }
        public string importStatus { get; set; }
    }


    public class objetcTypesassets
    {
        public objetcTypesassets[] m = null;

        public string importStatus { get; set; }
        public string Name { get; set; }
        public string typename { get; set; }
        public string Description { get; set; }
        public string flag { get; set; }


    }



    public class Assetsstypes
    {

        public Assetsstypes[] m = null;
        public string importStatus { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string object_name { get; set; }
        public string flag { get; set; }

    }
    public class EditHistory
    {

        public string Field { get; set; }

        public string SubItem { get; set; }

        public string Comment { get; set; }

        public DateTime Date { get; set; }

        public string ChangedBy { get; set; }

        public string ChangedType { get; set; }
    }

    public class EditHistoryDetails
    {

        public int EditHistoryId { get; set; }

        public string FromValue { get; set; }

        public string ToValue { get; set; }

        public string ChangeType { get; set; }

        public string Field1 { get; set; }

        public string Field2 { get; set; }
    }

    public class TypeGroups
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Active { get; set; }
        public string insupddelflag { get; set; }
    }

    public class Types
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Active { get; set; }

        public string TypeGroupId { get; set; }

        public string ListKey { get; set; }

        public string Listvalue { get; set; }
        public string insupddelflag { get; set; }
    }

    public class TypeGroupsData
    {

        public int includeAccesses { get; set; }
        public int includeDataType { get; set; }
        public int includeStatus { get; set; }
        public int includeDocTypes { get; set; }
        public int includeGender { get; set; }
        public int includeJobDocTypes { get; set; }
        public int includeInspectionVendors { get; set; }
        public int includeMaintenanceVendors { get; set; }
        public int includeMaterial { get; set; }
        public int includeState { get; set; }
        public int includeJobType { get; set; }
        public int includeUser { get; set; }


    }

    public class Company
    {
        public int active { get; set; }

        public string admin { get; set; }

        public int adminId { get; set; }

        public string code { get; set; }

        public string desc { get; set; }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }
        public string ContactNo1 { get; set; }
        public string ContactNo2 { get; set; }
        public string Fax { get; set; }
        public string EmailId { get; set; }
        public string Title { get; set; }
        public string Caption { get; set; }
        public string Country { get; set; }
        public int ZipCode { get; set; }
        public string State { get; set; }

        public int FleetSize { get; set; }
        public int StaffSize { get; set; }
        public string AlternateAddress { get; set; }
        //public string TemporaryAddress{get;set;} 
        public string Logo { get; set; }

        public string insupdflag { get; set; }

    }

    public class CompanyRoles
    {
        public int Id { get; set; }
        public string Role { get; set; }
        public string RoleId { get; set; }
        public string Active { get; set; }
        public string IsPublic { get; set; }
        public string Company { get; set; }
        public int CompanyId { get; set; }
        public int insdelflag { get; set; }

    }

    public class Users
    {
        public int Id { set; get; }
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string MiddleName { set; get; }
        public string UserName { set; get; }
        public string EmpNo { set; get; }
        public string Email { set; get; }
        public string ContactNo1 { set; get; }
        public string ContactNo2 { set; get; }
        public int? mgrId { set; get; }
        public int ManagerName { set; get; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string State { get; set; }
        public int StateId { set; get; }
        public int CountryId { set; get; }
        public int Active { get; set; }
        public int GenderId { get; set; }
        public string UserType { set; get; }
        public int UserTypeId { set; get; }
        public string Address { set; get; }
        public string AltAdress { set; get; }
        public string Photo { get; set; }
        public string Role { set; get; }
        public int RoleId { set; get; }
        public DateTime? RFromDate { get; set; }
        public DateTime? RToDate { get; set; }
        public string DUserName { get; set; }
        public string DPassword { get; set; }
        public string WUserName { get; set; }
        public string WPassword { get; set; }
        public string insupdflag { get; set; }
        public int companyId { set; get; }
        public string Company { set; get; }

    }
    public class UserLogin
    {
        public int Id { set; get; }
        public int UserId { set; get; }
        public string LoginInfo { set; get; }
        public string Passkey { set; get; }
        public string Salt { set; get; }
        public string Active { set; get; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string uname { get; set; }
        public string emailid { get; set; }

    }

    public class ObjectTypes
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Active { get; set; }
        public string insupddelflag { get; set; }
        public int DataTypeId { get; set; }

    }

    public class Location
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Active { get; set; }
        public string insupddelflag { get; set; }

    }

    public class userroles
    {
        public int Id { set; get; }
        public int UserId { set; get; }
        public int? LocationId { set; get; }
        public int RoleId { set; get; }
        public string insupdflag { set; get; }

    }

    public class roles
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Active { get; set; }
        public string IsGlobal { get; set; }
        public string Company { get; set; }
        public int CompanyId { get; set; }
        public string insupddelflag { get; set; }
    }

    public class AssetModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AssetType { get; set; }
        public int AssetTypeId { get; set; }
        public string insupddelflag { get; set; }
    }

    public class AssetModelDetail
    {
        //Asst_MDL_Hierar_ID,assetmodelid, objtypeid, parentid,level,objtypename,parentobjtypename,path 
        public int Id { get; set; }
        public int Asst_MDL_Hierar_ID { get; set; }
        public int AssetModelId { get; set; }
        public int ObjTypeId { get; set; }
        public int ParentId { get; set; }
        public int Level { get; set; }
        public string ObjTypeName { get; set; }
        public string DataType { get; set; }
        public int DataTypeId { get; set; }
        public string PObjTypeName { get; set; }
        public int ParentObjTypeId { get; set; }
        public string path { get; set; }
        public string insupddelflag { get; set; }

        public List<AssetModelDetail> __children__;

        public AssetModelDetail()
        {
            __children__ = new List<AssetModelDetail>();
        }
    }

    public class Assetss
    {

        public string importStatus { get; set; }
        public string SerialNumber { get; set; }
        public string objecttype_name { get; set; }

        public string desc { get; set; }
        public string Manufacturer { get; set; }

        public DateTime? DateofPurchased { get; set; }
        public Decimal Unitprice { get; set; }
        public Decimal DayRate { get; set; }
        public Decimal PerWeekStandbyCharge { get; set; }
        public Decimal RedressCost { get; set; }
        public DateTime? DateofSold { get; set; }
        public string Job { get; set; }

        public DateTime? Lost { get; set; }

        public string location_name { get; set; }

        public Decimal Price { get; set; }
        public DateTime? CycleCountofdate { get; set; }

        public string Flag { get; set; }
        public string equipmenttype_name { get; set; }
        public decimal JobRate { get; set; }
        public decimal Rental { get; set; }
        public decimal AdditionalDayRate { get; set; }
        public string Condition { get; set; }
        public string Material { get; set; }
        public decimal PurchaseCost { get; set; }
        public string Customer { get; set; }
        public string LostLIHDamaged { get; set; }
        public DateTime? LocationDate { get; set; }
        public string Notes { get; set; }
        public string  InspectionVendor { get; set; }
        public string MaintenanceVendor { get; set; }
        public string StatusId { get; set; }
       


    }
    public class Asset
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AssetType { get; set; }
        public int AssetTypeId { get; set; }
        public string insupddelflag { get; set; }
        public int CurrLocation { get; set; }
        public string path { get; set; }
        public int ParentID { get; set; }
        public int RootAssetID { get; set; }
        public string DataType { get; set; }
        public int DataTypeId { get; set; }
        public int DocTypeId { get; set; }
        public int AssetModelId { get; set; }
        public int Active { get; set; }
        public int AsstMDLHierarID { get; set; }
        public int LocationId { get; set; }
        public string FieldValue { get; set; }
        public int changedById { get; set; }
        public int IncPosition { get; set; }
        public int ManufactureId { get; set; }
        public int JobId { get; set; }
        public DateTime? DatePurchased { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal JobRate { get; set; }
        public int Rental { get; set; }
        public decimal RentalDayRate { get; set; }
        public decimal AdditionalDayRate { get; set; }
        public decimal DayRate { get; set; }
        public decimal PerWeekStbyCharge { get; set; }
        public decimal RedressCost { get; set; }
        public DateTime? DateSold { get; set; }
        public DateTime? LostDamaged { get; set; }
        public decimal Price { get; set; }
        public DateTime? CycleCountDate { get; set; }
        public int InspectionVendorId { get; set; }
        public int StatusId { get; set; }
        public int MaintenanceVendorId { get; set; }
        public int Condition { get; set; }
        public int Material { get; set; }
        public decimal PurchaseCost { get; set; }
        public int Customer { get; set; }
        public string LostLIHDamaged { get; set; }
        public DateTime? LocationDate { get; set; }
        public string Notes { get; set; }
        public int Locked { get; set; }

        public List<AssetDocuments> AssetDocuments { get; set; }

        public List<Asset> __children__;
        public Asset()
        {
            __children__ = new List<Asset>();
        }

    }

    public class AssetHierarchy
    {

        public List<AssetDocuments> AssetDocuments { get; set; }

        public Asset Asset { get; set; }

        public List<Asset> FieldAssetsList { get; set; }

        public List<Asset> DocAssetsList { get; set; }

        public List<AssetValues> AssetValues { get; set; }

        public List<AssetModelDetail> AllowedChildAssetTypes { get; set; }

        public List<AssetHistory> AssetHistory { get; set; }

        public int ChangedById { get; set; }
    }

    public class AssetValues
    {
        public int Id { set; get; }
        public int AssetId { set; get; }
        public int AssetModelHId { set; get; }
        public string FieldValue { set; get; }
        public string FieldName { set; get; }
    }

    public class Job
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public string JobID { set; get; }
        public string WellNo { set; get; }
        public string AFE { set; get; }
        public string Trucking { set; get; }
        public string Dock { set; get; }
        public string CustPOC { set; get; }
        public int LocationID { set; get; }
        public int CustomerID { set; get; }
        public string Bid { get; set; }
        public int StatusId { set; get; }
        public string Supervisor { get; set; }
        public string CoMan { get; set; }
        public string PhoneNo { get; set; }
        public string RigName { get; set; }
        public string OrderBy { get; set; }
        public string ShipVia { get; set; }
        public string ShipTo { get; set; }
        public string Field { get; set; }
        public string Lease { get; set; }
        public int County { get; set; }
        public string JobType { get; set; }
        public string POCPh { get; set; }
        public string RIG { set; get; }
        public string OCSG { set; get; }
        public string ProjDesc { set; get; }
        public DateTime? EstStartDt { get; set; }
        public DateTime? EstEndDt { get; set; }
        public DateTime? ActualStartDt { get; set; }
        public DateTime? ActualEndDt { get; set; }
        public string insupddelflag { get; set; }
        public int States { get; set; }
        public int JobTypeId { get; set; }
        public int changedById { get; set; }
        public List<JobUsers> JobUsers { get; set; }
        public List<JobResouces> JobResouces { get; set; }
        public List<JobUsers> jobUsers { get; set; }
        public List<JobTPResources> JobTPResources { get; set; }
        public List<JobDocuments> JobDocuments { get; set; }

        public List<JobResourceHistory> JobResHistory { get; set; }

        public List<JobResourceHistoryDetails> JobResHistoryDetails { get; set; }

    }

    public class JobResourceHistory
    {

        public string Field { get; set; }

        public string SubItem { get; set; }

        public string Comment { get; set; }

        public int JobId { get; set; }

        public string ChangedBy { get; set; }

        public string ChangedType { get; set; }

        public List<JobResourceHistoryDetails> JobDocuments { get; set; }
    }

    public class JobResourceHistoryDetails
    {

        public int JobRHistoryId { get; set; }

        public string FromValue { get; set; }

        public string ToValue { get; set; }

        public string ChangeType { get; set; }

        public string Field1 { get; set; }

        public string Field2 { get; set; }
    }

    public class JobUsers
    {
        public int Id { get; set; }
        public int JobId { get; set; }

        public int UserId { get; set; }

        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        public int CreatedById { get; set; }
        public int UpdatedById { get; set; }
        public string insupddelflag { get; set; }
        public int Sequence { get; set; }
    }
    public class JobResouces
    {
        public int Id { get; set; }
        public int JobId { get; set; }

        public int Sequence { get; set; }
        public int AssetId { get; set; }

        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        
        public int createdById { get; set; }
        public int UpdatedById { get; set; }
        public string insupddelflag { get; set; }
    }
    public class JobTPResources
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public string Name { get; set; }
        public string VName { get; set; }
        public int TPResourceId { get; set; }

        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        public int createdById { get; set; }
        public int UpdatedById { get; set; }
        public string insupddelflag { get; set; }
    }
    public class JobDocuments
    {

        public int Id { get; set; }
        public int JobId { get; set; }
        public int createdById { get; set; }
        public int UpdatedById { get; set; }

        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        public int docTypeId { get; set; }

        public string docName { get; set; }

        public string docContent { get; set; }

        public DateTime? expiryDate { get; set; }
        public DateTime? dueDate { get; set; }
        public string insupddelflag { get; set; }
    }

    public class AssetDocuments
    {

        public int Id { get; set; }
        public int AssetId { get; set; }
        public int createdById { get; set; }
        public int UpdatedById { get; set; }

        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int docCatId { get; set; }
        public int docTypeId { get; set; }
        public string docType { get; set; }
        public string docName { get; set; }
        public int IsExpired { get; set; }
        public string docContent { get; set; }

        public DateTime? expiryDate { get; set; }
        public DateTime? dueDate { get; set; }
        public string insupddelflag { get; set; }
        public int IncPosition { get; set; }
        public int OrderNo { get; set; }
    }

    public class AssetHistory
    {
        public string FieldValue { get; set; }
        public string category { get; set; }
        public string subcategory { get; set; }
        public string Comment { get; set; }
        public string Date { get; set; }
        public string ChangedBy { get; set; }
        public string ChangedType { get; set; }
        public string AssetId { get; set; }
        public int Id { get; set; }

    }

    public class AssetHistoryDetails
    {
        public string FromValue { get; set; }
        public string ToValue { get; set; }
        public string ChangeType { get; set; }
        public string Field1 { get; set; }
        public string Field2 { get; set; }
        public string AssetId { get; set; }
        public int AssetHistoryId { get; set; }
        public int Id { get; set; }
    }

    public class Customers
    {
        public int ID { get; set; }
        public string Client { get; set; }
        public string Contact { get; set; }

        public string Email { get; set; }

        public string ContactRole { get; set; }

        public string PhoneNo { get; set; }


        public string ServiceDesc { get; set; }
        public string PTSPOC { get; set; }

        public int PTSPOCId { get; set; }

        public int Active { get; set; }

        public string insupddelflag { get; set; }
    }

    public class PPDocument
    {
        public int ID { get; set; }
        public int createdById { get; set; }
        public int UpdatedById { get; set; }
        public DateTime? createdDT { get; set; }
        public DateTime? UpdatedDT { get; set; }
        public int docCatId { get; set; }
        public int docTypeId { get; set; }
        public string docType { get; set; }
        public string FileName { get; set; }
        public int IsExpired { get; set; }
        public string FileContent { get; set; }
        public int LocationId { get; set; }
        public DateTime? exipryDate { get; set; }
        public DateTime? effectiveDate { get; set; }
        public string insupddelflag { get; set; }
        public string Description { get; set; }
        public int OrderNo { get; set; }
        public int IncPosition { get; set; }
    }

    public class TPResource
    {
        public int Id { get; set; }
        public string ResourceName { get; set; }
        public string VendorName { get; set; }
        public string ResourceType { get; set; }
        public string Description { get; set; }
        public string insupddelflag { get; set; }
    }

    public class CompanyGroups
    {
        public CompanyGroups[] m = null;
        //public List<CompanyGroups> list { get; set; }
        public int active { get; set; }

        public string admin { get; set; }

        public int adminId { get; set; }

        public string code { get; set; }

        public string desc { get; set; }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }
        public string ContactNo1 { get; set; }
        public string ContactNo2 { get; set; }
        public string Fax { get; set; }
        public string EmailId { get; set; }
        public string Title { get; set; }
        public string Caption { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string State { get; set; }

        public int FleetSize { get; set; }
        public int StaffSize { get; set; }
        public string AlternateAddress { get; set; }
        //public string TemporaryAddress{get;set;} 
        public string Logo { get; set; }

        public string insupdflag { get; set; }


        public object Flag { get; set; }
    }

    public class UsersGroup
    {

        //public UsersGroup[] U = null;
        public List<UsersGroup> U { get; set; }
        public int Id { set; get; }
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string MiddleName { set; get; }
        public string EmpNo { set; get; }
        public string Email { set; get; }
        public string ContactNo1 { set; get; }
        public string ContactNo2 { set; get; }
        public int? mgrId { set; get; }
        public int ManagerName { set; get; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string State { get; set; }
        public int StateId { set; get; }
        public int CountryId { set; get; }
        public int Active { get; set; }
        public int GenderId { get; set; }
        public string UserType { set; get; }
        public int UserTypeId { set; get; }
        public string Address { set; get; }
        public string AltAdress { set; get; }
        public string Photo { get; set; }
        public string Role { set; get; }
        public int RoleId { set; get; }
        public DateTime? RFromDate { get; set; }
        public DateTime? RToDate { get; set; }
        public string DUserName { get; set; }
        public string DPassword { get; set; }
        public string WUserName { get; set; }
        public string WPassword { get; set; }
        public string insupdflag { get; set; }
        public int cmpId { set; get; }
        public string Company { set; get; }

    }


    public class FleetDetails
    {
        public int VehicleLayoutId;
        public string VehicleLayout;
        public int Id { get; set; }

        public string VehicleRegNo { get; set; }
        public int VehicleTypeId { get; set; }

        public String FleetOwnerId { get; set; }
        public String CompanyId { get; set; }
        public String ServiceTypeId { get; set; }

        public int Active { get; set; }

        public String EngineNo { get; set; }

        public String FuelUsed { get; set; }

        public DateTime? MonthAndYrOfMfr { get; set; }

        public string ChasisNo { get; set; }

        public int SeatingCapacity { get; set; }

        public DateTime? DateOfRegistration { get; set; }
        public string insupddelflag { get; set; }

    }

    public class stops
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public int Active { get; set; }
        public float latitude { get; set; }
        public float longitude { get; set; }
        public string insupdflag { get; set; }
        public string srcLat { get; set; }
        public string srcLon { get; set; }
    }

    public class Routes
    {
        public int Id { set; get; }
        public string RouteName { set; get; }
        public string Code { set; get; }
        public string Description { set; get; }
        public int Active { set; get; }
        public decimal Distance { set; get; }
        public string Source { set; get; }
        public string Destination { set; get; }
        public int SourceId { set; get; }
        public int DestinationId { set; get; }
    }

    public class BTPOSDetails
    {
        public int Id { get; set; }
        public string GroupName { get; set; }
        public string CompanyId { get; set; }
        public string IMEI { get; set; }
        public string POSID { get; set; }
        public int StatusId { get; set; }
        public string ipconfig { get; set; }
        public string fleetowner { get; set; }
        public int? fleetownerid { get; set; }
        public int active { get; set; }
        public int POSTypeId { get; set; }
        public DateTime? ActivatedOn { get; set; }
        public decimal PerUnitPrice { get; set; }
        public string PONum { get; set; }
        public string insupdflag { get; set; }

    }

    public class DriversGroups
    {

        public DriversGroups[] p = null;
        //public List<DriversGroups> list { get; set; }
        public string flag { get; set; }
        public int DId { get; set; }
        public string CompanyId { get; set; }
        public string NAme { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Pin { get; set; }
        public string PAddress { get; set; }
        public string PCity { get; set; }
        public string PPin { get; set; }
        public string OffMobileNo { get; set; }
        public string PMobNo { get; set; }
        public DateTime? DOB { get; set; }
        public DateTime? DOJ { get; set; }
        public string BloodGroup { get; set; }
        public string LicenceNo { get; set; }
        public DateTime? LiCExpDate { get; set; }
        public string BadgeNo { get; set; }
        public DateTime? BadgeExpDate { get; set; }
        public string Remarks { get; set; }
        public string VehicleModelId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNumber { get; set; }
        public string PermanentAddress { get; set; }
        public string PermanentPin { get; set; }
        public string EmailId { get; set; }
        public string DriverCode { get; set; }
        public string FleetOwner { get; set; }
        public int CurrentStateId { get; set; }
        public string Country { get; set; }

    }

    public class VehiclesGroups
    {

        public VehiclesGroups[] o = null;
        //public List<VehiclesGroups> list3 { get; set; }
        public string flag { get; set; }
        public int Id { get; set; }
        public string CompanyId { get; set; }
        public int VID { get; set; }
        public string RegistrationNo { get; set; }
        public string vehicleType { get; set; }
        public int FleetOwner { get; set; }
        public string ChasisNo { get; set; }
        public string Engineno { get; set; }
        public DateTime? RoadTaxDate { get; set; }
        public int HasAC { get; set; }
        public DateTime? InsDate { get; set; }
        public string PolutionNo { get; set; }
        public DateTime? PolExpDate { get; set; }
        public string RCBookNo { get; set; }
        public DateTime? RCExpDate { get; set; }
        public int StatusId { get; set; }
        public int IsVerified { get; set; }
        public string VehicleCode { get; set; }
        public string ModelYear { get; set; }
        public int IsDriverowned { get; set; }
        public int DriverId { get; set; }
        public DateTime? EntryDate { get; set; }
        public string Country { get; set; }
        public string VehicleModel { get; set; }
        public string VehicleMake { get; set; }
        public string VehicleGroup { get; set; }
    }


    public class CardsGroup
    {

        public CardsGroup[] cg = null;
        //public List<VehiclesGroups> list3 { get; set; }
        public int Id { get; set; }
        public string CardNumber { get; set; }
        public string CardModel { get; set; }
        public string CardType { get; set; }
        public string CardCategory { get; set; }
        public int Status { get; set; }
        public int UserId { get; set; }
        public string Customer { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public string insupdflag { get; set; }
    }

    public class DriverVehicleAssignGroup
    {
        public DriverVehicleAssignGroup[] dva = null;
        public string inspudflag { get; set; }
        public string RegistrationNo { get; set; }
        public string vehicleType { get; set; }
        public int FleetOwner { get; set; }
        public string ChasisNo { get; set; }
        public string Engineno { get; set; }
        public int HasAC { get; set; }
        public int StatusId { get; set; }
        public int IsVerified { get; set; }
        public string VehicleCode { get; set; }
        public string ModelYear { get; set; }
        public int IsDriverowned { get; set; }
        public int DriverId { get; set; }
        public DateTime? EntryDate { get; set; }
        public string Country { get; set; }
        public string VehicleModel { get; set; }
        public string VehicleMake { get; set; }
        public string VehicleGroup { get; set; }
        public DateTime? EffectiveDate { get; set; }
        public DateTime? EffectiveTill { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNumber { get; set; }
        public string PermanentAddress { get; set; }
        public string PermanentPin { get; set; }
        public string EmailId { get; set; }
        public string DriverCode { get; set; }
        public string Address { get; set; }
        public string Pin { get; set; }
        public int CurrentStateId { get; set; }

    }

    public class WorkOrder
    {
        public int ID { get; set; }
        public int JobID { get; set; }
        public string WorkOrderID { get; set; }
        public int Asset { get; set; }
        public int Status { get; set; }
        public string Vendor { get; set; }
        public int EquipmentType { get; set; }
        public int ObjectType { get; set; }
        public DateTime Date { get; set; }
        public string PO { get; set; }
        public string DT { get; set; }
        public int Company { get; set; }
        public string DateNeeded { get; set; }
        public string OrderedBy { get; set; }
        public int WorkOrderType { get; set; }
        public string SN { get; set; }
        public string ToolDescription { get; set; }
        public string WorkInstructions { get; set; }
        public string Cost { get; set; }
        public string Comments { get; set; }
        public string insupddelflag { get; set; }
        public int changedById { get; set; }

    }
    public class MaintenanceVendors
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Active { get; set; }
        public string flag { get; set; }
    }
    public class UpdateStatuss
    {

        public string Name { get; set; }
        public int StatusId { get; set; }

        public string change { get; set; }
    }
    public class SaveMaintenanceVendorlist
    {
        public SaveMaintenanceVendorlist[] m = null;

        public string importStatus { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        public string flag { get; set; }


    }
}