using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using System.Xml.Linq;
using IC_MVP_Project_Task1.DAL;
using IC_MVP_Project_Task1.Models;

namespace IC_MVP_Project_Task1.Controllers
{
    public class SaleController : Controller
    {
        private SalesContext db = new SalesContext();

        // GET: Sale
        [HttpGet]
        public JsonResult Index()
        {
            var dataSourceList = new List<Sale>();

            for (int i = 0; i < db.Sales.ToList().Count(); i++)
            {
                dataSourceList.Add(new Sale
                {
                    ID = db.Customers.ToList()[i].ID,
                    CustomerID = db.Sales.ToList()[i].CustomerID,
                    StoreID = db.Sales.ToList()[i].StoreID,
                    ProductID = db.Sales.ToList()[i].ProductID,
                    DateSold = db.Sales.ToList()[i].DateSold
                });
            }

            // convert it to array
            var dataSource = dataSourceList.ToArray();
            return Json(dataSource, JsonRequestBehavior.AllowGet);
        }

        // POST: Sale/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public JsonResult CreateSale(int customerID, int storeID, int productID, DateTime dateSold)
        {
            Sale sale = new Sale
            {
                CustomerID = customerID,
                StoreID = storeID,
                ProductID = productID,
                DateSold = dateSold
            };
            db.Sales.Add(sale);
            db.SaveChanges();
            return Json(sale);
        }

        // POST: Sale/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public int EditSale(int ID, int customerID, int storeID, int productID, DateTime dateSold)
        {
            var customerIDParam = new SqlParameter("@CustomerID", System.Data.SqlDbType.Int)
            {
                Value = customerID
            };

            var storeIDParam = new SqlParameter("@StoreID", System.Data.SqlDbType.Int)
            {
                Value = storeID
            };

            var productIDParam = new SqlParameter("@ProductID", System.Data.SqlDbType.Int)
            {
                Value = productID
            };

            var dateSoldParam = new SqlParameter("@DateSold", System.Data.SqlDbType.DateTime)
            {
                Value = dateSold
            };

            var id = new SqlParameter("@id", System.Data.SqlDbType.Int)
            {
                Value = ID
            };
            var sql = @"Update [Customer] SET CustomerID = @customerIDParam, StoreID = @storeIDParam, ProductID = @productIDParam, DateSold = @dateSoldParam WHERE ID = @id";
            db.Database.ExecuteSqlCommand(sql, customerIDParam, storeIDParam, productIDParam, dateSoldParam, id);
            return 200;
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult DeleteSale(int id)
        {
            Sale sale = db.Sales.Find(id);
            db.Sales.Remove(sale);
            db.SaveChanges();
            return Json(sale);
        }
    }
}
