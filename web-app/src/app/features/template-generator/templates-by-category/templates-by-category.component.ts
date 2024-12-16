import { Component, effect, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TemplatesByCategoryService } from "./templates-by-category.service";
import { Template } from "src/app/services/types/Template";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";
import { MatDialog } from "@angular/material/dialog";
import { AddEditTemplateComponent } from "./add-edit-template/add-edit-template.component";
import {
  ConfirmDeletion,
  SuccessNotification,
} from "src/app/utilities/AlertMessage/AlertMessage";

@Component({
  selector: "app-templates-by-category",
  standalone: true,
  imports: [
    CommonModule,
    CKEditorModule,
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatAutocompleteModule,
    MatIconModule,
    AMGModules,
    SharedModule,
  ],
  templateUrl: "./templates-by-category.component.html",
  styleUrl: "./templates-by-category.component.css",
})
export class TemplatesByCategoryComponent implements OnInit {
  templateCategoryId!: number;
  displayedColumns: string[] = ["Id", "Name", "Subject", "actions"];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private templatesByCategoryService: TemplatesByCategoryService,
    private dialog: MatDialog
  ) {
    effect(() => {
      this.dataSource.data = this.templates();
    });
  }

  public templateCategoryDetails = signal<TemplateCategory | null>(null);
  public templates = signal<Template[]>([]);
  public pageIndex = signal(0);
  public pageSize = signal(10);
  public totalCount = signal(0);
  public searchQuery = signal("");
  public dataSource = new MatTableDataSource<Template>([]);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log("params", params);
      this.templateCategoryId = +params["id"];
      console.log("Template Category Id:", this.templateCategoryId);
      this.getTemplateCategoryDetails();
      this.loadTemplates();
    });
  }

  loadTemplates() {
    this.templatesByCategoryService
      .getTemplates(
        this.templateCategoryId,
        this.pageIndex(),
        this.pageSize(),
        this.searchQuery()
      )
      .subscribe((templates) => {
        this.templates.set(templates.value);
        this.totalCount.set(templates["@odata.count"]);
      });
  }

  getTemplateCategoryDetails() {
    this.templatesByCategoryService
      .getTemplateCategoryDetails(this.templateCategoryId)
      .subscribe((details) => {
        this.templateCategoryDetails.set(details.value[0]);
      });
  }

  onPageChange(event: any) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadTemplates();
  }

  onSearch(event: any): void {
    const query = event.target.value;
    this.searchQuery.set(query);
    this.loadTemplates();
  }

  navigateBack(): void {
    this.router.navigate(["/template-generator"]);
  }

  openAddTemplateDialog(data?: Template) {
    const dialogRef = this.dialog.open(AddEditTemplateComponent, {
      width: "auto",
      height: "auto",
      data: data,
    });

    dialogRef.afterClosed().subscribe((result: Template) => {
      console.log("Dialog data", result);
      if (result.Id) {
        const updateTemplate = {
          Id: result.Id,
          CategoryId: this.templateCategoryId,
          Name: result.Name,
          Subject: result.Subject,
          Body: result.Body,
        };
        this.templatesByCategoryService
          .updateTemplate(result.Id, updateTemplate)
          .subscribe((details) => {
            SuccessNotification(
              `Template ${result.Name} updated successfully!`
            );
            this.loadTemplates();
          });
      } else {
        const newTemplate = {
          Id: 0,
          CategoryId: this.templateCategoryId,
          Name: result.Name,
          Subject: result.Subject,
          Body: result.Body,
        };
        this.templatesByCategoryService
          .createTemplate(newTemplate)
          .subscribe((details) => {
            SuccessNotification(`Template ${result.Name} added successfully!`);
            this.loadTemplates();
          });
      }
    });
  }

  deleteTemplate(data: Template) {
    ConfirmDeletion("Do you want to delete this template?", () => {
      this.templatesByCategoryService
        .deleteTemplateById(data.Id)
        .subscribe((details) => {
          this.loadTemplates();
          SuccessNotification(`Template ${data.Name} deleted successfully!`);
        });
    });
  }
}
