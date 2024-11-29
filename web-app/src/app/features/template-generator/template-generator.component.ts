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
  ],
  templateUrl: "./template-generator.component.html",
  styleUrl: "./template-generator.component.css",
  encapsulation: ViewEncapsulation.None,
})
export class TemplateGeneratorComponent {
  constructor(
    private changeDetector: ChangeDetectorRef,
    private templateGeneratorService: TemplateGeneratorService
  ) {
    effect(() => {
      this.dataSource.data = this.templateCategories();
    });

    this.loadTemplateCategories();
  }
  public templateCategories = signal<TemplateCategory[]>([]);
  public pageIndex = signal(0);
  public pageSize = signal(5);
  public totalCount = signal(0);
  public dataSource = new MatTableDataSource<TemplateCategory>([]);

  public isLayoutReady = false;
  public Editor = ClassicEditor;
  public config: EditorConfig = {};
  public filteredCategories = signal<TemplateCategory[]>([]);
  public selectedCategory: TemplateCategory | null = null;
  public subject = "";
  public content = "";

  loadTemplateCategories() {
    this.templateGeneratorService
      .getTemplateCategories(this.pageIndex(), this.pageSize())
      .subscribe((templates) => {
        console.log(templates);
        this.templateCategories.set(templates.value);
        this.totalCount.set(templates["@odata.count"]);
      });
  }

  onPageChange(event: any) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadTemplateCategories();
  }

  public ngAfterViewInit(): void {
    this.config = {
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "sourceEditing",
          "showBlocks",
          "textPartLanguage",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "link",
          "insertTable",
          "blockQuote",
          "htmlEmbed",
          "|",
          "outdent",
          "indent",
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
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
      ],
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h1",
            title: "Heading 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "Heading 3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "Heading 4",
            class: "ck-heading_heading4",
          },
          {
            model: "heading5",
            view: "h5",
            title: "Heading 5",
            class: "ck-heading_heading5",
          },
          {
            model: "heading6",
            view: "h6",
            title: "Heading 6",
            class: "ck-heading_heading6",
          },
        ],
      },
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true,
          },
        ],
      },
      initialData: "",
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
        decorators: {
          toggleDownloadable: {
            mode: "manual",
            label: "Downloadable",
            attributes: {
              download: "file",
            },
          },
        },
      },
      placeholder: "Type or paste your content here!",
      table: {
        contentToolbar: [
          "tableColumn",
          "tableRow",
          "mergeTableCells",
          "tableProperties",
          "tableCellProperties",
        ],
      },
    };

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }

  displayCategory(category: TemplateCategory): string {
    return category?.Name || "";
  }

  onSearch(event: any): void {
    const query = event.target.value;

    this.templateGeneratorService
      .getSearchedTemplateCategories(query)
      .subscribe((categories) => {
        this.filteredCategories.set(categories.value);
      });
  }

  saveTemplate() {
    if (!this.selectedCategory || !this.subject || !this.content) {
      alert("Please select a category, enter a subject, and add content!");
      return;
    }

    const templateData = {
      categoryId: this.selectedCategory.Id,
      subject: this.subject,
      content: this.content,
    };

    this.templateGeneratorService.createTemplate(templateData).subscribe(
      (response) => {
        alert("Template saved successfully!");
        this.subject = "";
        this.content = "";
        this.selectedCategory = null;
      },
      (error) => {
        console.error("Error saving template", error);
        alert("Failed to save the template. Please try again.");
      }
    );
  }
}
