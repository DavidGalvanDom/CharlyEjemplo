﻿using System.Web;
using System.Web.Optimization;

namespace CharlyEjemplo.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/lib/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/lib/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/lib/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/general").Include(
                      "~/Scripts/lib/bootstrap.js",
                      "~/Scripts/lib/underscore/underscore.js",
                      "~/Scripts/lib/backbone/backbone.js",
                      "~/Scripts/lib/bbGrid.js",
                      "~/Scripts/lib/respond.js",
                      "~/Scripts/_Principal.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bbGrid.css",
                      "~/Content/site.css"));
        }
    }
}
