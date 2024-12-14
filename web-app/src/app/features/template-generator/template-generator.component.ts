import {
  ChangeDetectorRef,
  Component,
  effect,
  OnInit,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatTabsModule } from "@angular/material/tabs";

import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  Autosave,
  BlockQuote,
  Bold,
  Essentials,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  HtmlComment,
  HtmlEmbed,
  Indent,
  IndentBlock,
  Italic,
  Link,
  Paragraph,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  Underline,
  Undo,
  type EditorConfig,
} from "ckeditor5";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { TemplateGeneratorService } from "./template-generator.service";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { AddEditTemplateCategoryDialogComponent } from "./add-edit-template-category-dialog/add-edit-template-category-dialog.component";
import {
  ConfirmDeletion,
  SuccessNotification,
} from "src/app/utilities/AlertMessage/AlertMessage";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { Router } from "@angular/router";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { Template } from "src/app/services/types/Template";
import { ShowTemplateComponent } from "./templates-by-category/show-template/show-template.component";

@Component({
  selector: "app-template-generator",
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
    MatSlideToggleModule,
  ],
  templateUrl: "./template-generator.component.html",
  styleUrl: "./template-generator.component.css",
  encapsulation: ViewEncapsulation.None,
})
export class TemplateGeneratorComponent {
  displayedColumns: string[] = ["Id", "Name", "Description", "actions"];
  displayedTemplateColumns: string[] = [
    "Id",
    "Name",
    "Subject",
    "CategoryName",
    "actions",
  ];
  isChecked = false;

  constructor(
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private templateGeneratorService: TemplateGeneratorService,
    private dialog: MatDialog
  ) {
    effect(() => {
      this.dataSource.data = this.templateCategories();
      this.dataSourceTemplates.data = this.templates();
    });

    this.loadTemplateCategories();
    this.loadTemplates();
  }
  public templateCategories = signal<TemplateCategory[]>([]);
  public templates = signal<Template[]>([]);
  public pageIndex = signal(0);
  public pageSize = signal(10);
  public totalCount = signal(0);
  public pageIndexTemplate = signal(0);
  public pageSizeTemplate = signal(10);
  public totalCountTemplate = signal(0);
  public dataSource = new MatTableDataSource<TemplateCategory>([]);
  public dataSourceTemplates = new MatTableDataSource<Template>([]);

  loadTemplateCategories() {
    this.templateGeneratorService
      .getTemplateCategories(this.pageIndex(), this.pageSize())
      .subscribe((templates) => {
        this.templateCategories.set(templates.value);
        this.totalCount.set(templates["@odata.count"]);
      });
  }

  loadTemplates() {
    this.templateGeneratorService
      .getTemplates(this.pageIndex(), this.pageSize())
      .subscribe((templates) => {
        this.templates.set(templates.value);
        this.totalCountTemplate.set(templates["@odata.count"]);
      });
  }

  onPageChange(event: any) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadTemplateCategories();
  }

  onPageChangeTemplate(event: any) {
    this.pageIndexTemplate.set(event.pageIndex);
    this.pageSizeTemplate.set(event.pageSize);
    this.loadTemplates();
  }

  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(AddEditTemplateCategoryDialogComponent, {
      width: "600px",
      height: "auto",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.templateGeneratorService
          .createTemplateCategory(result.Name, result.Description)
          .subscribe((response) => {
            if (response) {
              this.loadTemplateCategories();
            }
            SuccessNotification(
              `Category "${result.Name}" with Description "${result.Description}" added successfully!`
            );
          });
        this.loadTemplateCategories();
      }
    });
  }

  editTemplateCategory(template: TemplateCategory) {
    const dialogRef = this.dialog.open(AddEditTemplateCategoryDialogComponent, {
      width: "600px",
      height: "auto",
      data: template,
    });

    dialogRef.afterClosed().subscribe((result: TemplateCategory) => {
      if (result) {
        this.templateGeneratorService
          .updateTemplateCategory(result.Id, result.Name, result.Description)
          .subscribe((response) => {
            if (response) {
              this.loadTemplateCategories();
            }
            SuccessNotification(
              `Category "${result.Name}" with Description "${result.Description}" updated successfully!`
            );
          });
      }
    });
  }

  deleteTemplateCategory(template: TemplateCategory) {
    ConfirmDeletion("Do you want to delete this template category?", () => {
      this.templateGeneratorService
        .deleteTemplateCategory(template.Id)
        .subscribe((response) => {
          if (response) {
            this.loadTemplateCategories();
          }
          SuccessNotification(
            `Category "${template.Name}" with Description "${template.Description}" deleted successfully!`
          );
        });
    });
  }

  onSearch(event: any): void {
    const query = event.target.value;

    this.templateGeneratorService
      .getSearchedTemplateCategories(query)
      .subscribe((categories) => {
        this.templateCategories.set(categories.value);
      });
  }

  templatesByCategory(templateCategory: TemplateCategory) {
    console.log(templateCategory);
    this.router.navigate([`/templates-by-category`, templateCategory.Id]);
  }

  viewTemplate(template: Template) {
    this.dialog.open(ShowTemplateComponent, {
      width: "600px",
      data: template,
    });
  }
}
