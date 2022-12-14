using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Mvc;
using IC_MVP_Project_Task1.DAL;
using IC_MVP_Project_Task1.Models;

namespace IC_MVP_Project_Task1.Controllers
{
    public class SaleController : Controller
    {
        private SalesContext db = new SalesContext();

        // GET: Sale
        public ActionResult IndexUI()
        {
            return View();
        }

        // GET: Sale
        [HttpGet]
        public JsonResult Index()
        {
            var dataSourceList = new List<Sale>();

            for (int i = 0; i < db.Sales.ToList().Count(); i++)
            {
                Customer sc = db.Customers.Find(db.Sales.ToList()[i].CustomerID);

                Customer cust = new Customer
                {
                    ID =  sc.ID,
                    Name = sc.Name
                };

                Store ss = db.Stores.Find(db.Sales.ToList()[i].StoreID);

                Store store = new Store
                {
                    ID = ss.ID,
                    Name = ss.Name
                };

                Product pc = db.Products.Find(db.Sales.ToList()[i].ProductID);

                Product prod = new Product
                {
                    ID = pc.ID,
                    Name = pc.Name
                };

                dataSourceList.Add(new Sale
                {
                    ID = db.Sales.ToList()[i].ID,
                    Customer = cust,
                    Store = store,
                    Product = prod,
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
        public int EditSale(int ID, int customerID, int storeID, int productID, DateTime DateSold)
        {
            var CustomerID = new SqlParameter("@customerID", System.Data.SqlDbType.Int)
            {
                Value = customerID
            };

            var StoreID = new SqlParameter("@storeID", System.Data.SqlDbType.Int)
            {
                Value = storeID
            };

            var ProductID = new SqlParameter("@productID", System.Data.SqlDbType.Int)
            {
                Value = productID
            };

            var dateSold = new SqlParameter("@DateSold", System.Data.SqlDbType.DateTime)
            {
                Value = DateSold
            };

            var id = new SqlParameter("@id", System.Data.SqlDbType.Int)
            {
                Value = ID
            };
            var sql = @"Update [Sale] SET CustomerID = @CustomerID, StoreID = @StoreID, ProductID = @ProductID, DateSold = @dateSold WHERE ID = @id";
            db.Database.ExecuteSqlCommand(sql, CustomerID, StoreID, ProductID, dateSold, id);
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
