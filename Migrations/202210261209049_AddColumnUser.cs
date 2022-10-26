namespace Call_Controller_ReactJS_MVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddColumnUser : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Customer", "Name", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Customer", "Name", c => c.String());
        }
    }
}
