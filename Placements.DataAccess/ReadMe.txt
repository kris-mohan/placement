Paatashala Training Db Scaffold Command

Scaffold-DbContext "server=localhost;port=3306;user=root;password=root;database=paatashalatraining" MySql.EntityFrameworkCore -OutputDir PaatashalaTraining/Models -f

Paatashala Company Db Scaffold Command

Scaffold-DbContext "server=localhost;port=3306;user=root;password=root;database=paatashalacompanydb" MySql.EntityFrameworkCore -OutputDir PaatashalaCompany/Models -f

Paatashala Campus Db Scaffold Command

Scaffold-DbContext "server=localhost;port=3306;user=root;password=root;database=paatashalacampus" MySql.EntityFrameworkCore -OutputDir PaatashalaCampus/Models -f

Placement Db Scaffold Command

Scaffold-DbContext "server=localhost;port=3306;user=root;password=root;database=placement" MySql.EntityFrameworkCore -OutputDir Placement/Models -f
