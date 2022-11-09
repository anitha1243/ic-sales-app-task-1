using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Mvc;
using IC_MVP_Project_Task1.DAL;
using IC_MVP_Project_Task1.Models;

namespace IC_MVP_Project_Task1.Controllers
{
    public class ProductController : Controller
    {
        private SalesContext db = new SalesContext();

        // GET: Product
        public ActionResult IndexUI()
        {
            return View();
        }

        // GET: Product
        [HttpGet]
        public JsonResult Index()
        {
            var dataSourceList = new List<Product>();

            for (int i = 0; i < db.Products.ToList().Count(); i++)
            {
                dataSourceList.Add(new Product
                {
                    ID = db.Products.ToList()[i].ID,
                    Name = db.Products.ToList()[i].Name,
                    Price = db.Products.ToList()[i].Price
                });
            }

            // convert it to array
            var dataSource = dataSourceList.ToArray();
            return Json(dataSource, JsonRequestBehavior.AllowGet);
        }

        // POST: Product/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public JsonResult CreateProduct(string name, int price)
        {
            Product product = new Product
            {
                Name = name,
                Price = price
            };
            db.Products.Add(product);
            db.SaveChanges();
            return Json(product);
        }

        // POST: Product/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public int EditProduct(int ID, string Name, int Price)
        {
            var name = new SqlParameter("@Name", System.Data.SqlDbType.VarChar, 20)
            {
                Value = Name
            };

            var price = new SqlParameter("@Price", System.Data.SqlDbType.VarChar, 20)
            {
                Value = Price
            };

            var id = new SqlParameter("@id", System.Data.SqlDbType.Int)
            {
                Value = ID
            };
            var sql = @"Update [Product] SET Name = @name, Price = @price WHERE ID = @id";
            db.Database.ExecuteSqlCommand(sql, name, price, id);
            return 200;
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult DeleteProduct(int id)
        {
            Product product = db.Products.Find(id);
            db.Products.Remove(product);
            db.SaveChanges();
            return Json(product);
        }
    }
}
