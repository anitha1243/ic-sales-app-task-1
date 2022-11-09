using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Call_Controller_ReactJS_MVC
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Customer",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Customer", action = "IndexUI", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Sale",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Sale", action = "IndexUI", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Product",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Product", action = "IndexUI", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Store",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Store", action = "IndexUI", id = UrlParameter.Optional }
            );
        }
    }
}
