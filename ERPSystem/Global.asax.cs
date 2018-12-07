using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using Microsoft.ApplicationInsights.Extensibility;

namespace ERPSystem
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
         //  TelemetryConfiguration.Active.InstrumentationKey = System.Configuration.ConfigurationManager.AppSettings["AIInstrumentationKey"];
          //  TelemetryConfiguration.Active.TelemetryInitializers.Add(new ERPSystem.ApplicationInsights.ApplicationInsightsInitializer());

            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
