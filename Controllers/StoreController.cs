using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Mvc;
using IC_MVP_Project_Task1.DAL;
using IC_MVP_Project_Task1.Models;

namespace IC_MVP_Project_Task1.Controllers
{
    public class StoreController : Controller
    {
        private SalesContext db = new SalesContext();

        // GET: Store
        public ActionResult IndexUI()
        {
            return View();
        }

        // GET: Customer
        [HttpGet]
        public JsonResult Index()
        {
            var dataSourceList = new List<Store>();

            for (int i = 0; i < db.Stores.ToList().Count(); i++)
            {
                dataSourceList.Add(new Store
                {
                    ID = db.Stores.ToList()[i].ID,
                    Name = db.Stores.ToList()[i].Name,
                    Address = db.Stores.ToList()[i].Address
                });
            }

            // convert it to array
            var dataSource = dataSourceList.ToArray();
            return Json(dataSource, JsonRequestBehavior.AllowGet);
        }

        // POST: Store/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public JsonResult CreateStore(string name, string address)
        {
            Store store = new Store
            {
                Name = name,
                Address = address
            };
            db.Stores.Add(store);
            db.SaveChanges();
            return Json(store);
        }

        // POST: Store/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public int EditStore(int ID, string Name, string Address)
        {
            var name = new SqlParameter("@Name", System.Data.SqlDbType.VarChar, 20)
            {
                Value = Name
            };

            var address = new SqlParameter("@Address", System.Data.SqlDbType.VarChar, 20)
            {
                Value = Address
            };

            var id = new SqlParameter("@id", System.Data.SqlDbType.Int)
            {
                Value = ID
            };
            var sql = @"Update [Store] SET Name = @name, Address = @address WHERE ID = @id";
            db.Database.ExecuteSqlCommand(sql, name, address, id);
            return 200;
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult DeleteStore(int id)
        {
            Store store = db.Stores.Find(id);
            db.Stores.Remove(store);
            db.SaveChanges();
            return Json(store);
        }

    }
}
