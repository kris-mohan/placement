import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  AccessibilityHelp,
  Autoformat,
  Autosave,
  BlockQuote,
  Bold,
  ClassicEditor,
  EditorConfig,
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
} from "ckeditor5";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";
import { SharedModule } from "src/app/shared/shared.module";
import { TemplateGeneratorService } from "../../template-generator.service";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { Template } from "src/app/services/types/Template";
import { ErrorNotification } from "src/app/utilities/AlertMessage/AlertMessage";

@Component({
  selector: "app-add-edit-template",
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
    MatDialogModule,
  ],
  templateUrl: "./add-edit-template.component.html",
  styleUrl: "./add-edit-template.component.css",
  encapsulation: ViewEncapsulation.None,
})
export class AddEditTemplateComponent implements OnInit, AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<AddEditTemplateComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Template,
    private changeDetector: ChangeDetectorRef,
    private templateGeneratorService: TemplateGeneratorService
  ) {
    console.log("Modal Popup initial data", data);
    this.subject = data?.Subject;
    this.templateName = data?.Name;
    this.content = data?.Body;
  }

  public editorInstance: any;
  public isLayoutReady = false;
  public Editor = ClassicEditor;
  public config: EditorConfig = {};
  public filteredCategories = signal<TemplateCategory[]>([]);
  public selectedCategory: TemplateCategory | null = null;
  public subject = "";
  public templateName = "";
  public content = "";

  ngOnInit(): void {
    if (this.data?.Category) {
      this.templateGeneratorService
        .getSearchedTemplateCategories(this.data?.Category?.Name)
        .subscribe((categories) => {
          this.filteredCategories.set(categories.value);
          this.selectedCategory = this.data.Category;
        });
    }
  }
  ngAfterViewInit(): void {
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
      initialData: this.content,
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

  onReady(editor: any) {
    this.editorInstance = editor;
  }

  onSearch(event: any): void {
    const query = event.target.value;

    this.templateGeneratorService
      .getSearchedTemplateCategories(query)
      .subscribe((categories) => {
        this.filteredCategories.set(categories.value);
      });
  }

  displayCategory(category: TemplateCategory): string {
    return category?.Name || "";
  }

  onSave() {
    const updatedContent = this.editorInstance?.getData();

    if (this.templateName.trim()) {
      const updatedData: Template = {
        Id: this.data?.Id ?? 0,
        Name: this.templateName,
        Subject: this.subject,
        CreatedAt: this.data?.CreatedAt,
        UpdatedAt: this.data?.UpdatedAt,
        CategoryId: 0,
        Body: updatedContent || this.content,
        Category: {
          Id: 0,
          Name: "",
          Description: "",
          CreatedAt: this.data?.CreatedAt,
          UpdatedAt: this.data?.UpdatedAt,
          Templates: [],
        },
        TemplatePlaceholders: [],
      };
      this.dialogRef.close(updatedData);
    } else {
      ErrorNotification("Please fill in the required fields.");
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
