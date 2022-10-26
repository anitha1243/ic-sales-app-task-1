namespace Call_Controller_ReactJS_MVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddColumnUser1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Customer", "Address", c => c.String(nullable: false));
            AlterColumn("dbo.Product", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.Store", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.Store", "Address", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Store", "Address", c => c.String());
            AlterColumn("dbo.Store", "Name", c => c.String());
            AlterColumn("dbo.Product", "Name", c => c.String());
            AlterColumn("dbo.Customer", "Address", c => c.String());
        }
    }
}
