using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IC_MVP_Project_Task1.DAL;
using IC_MVP_Project_Task1.Models;

namespace Call_Controller_ReactJS_MVC.Controllers
{
    public class HomeController : Controller
    {
        private SalesContext db = new SalesContext();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }        
    }
}