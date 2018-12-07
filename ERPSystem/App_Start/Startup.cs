using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.ActiveDirectory;
using System.Configuration;

[assembly: OwinStartup(typeof(ERPSystem.App_Start.Startup))]

namespace ERPSystem.App_Start
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888

            //app.UseWindowsAzureActiveDirectoryBearerAuthentication(
            //    new WindowsAzureActiveDirectoryBearerAuthenticationOptions
            //    {
            //        Audience = ConfigurationManager.AppSettings["ida:Audience"],
            //        Tenant = ConfigurationManager.AppSettings["ida:Tenant"]
            //    });
        }
    }
}
