import { CommonModule } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentResultInformationApiService } from '../StudentResultInformationApiService';
import { Template } from 'src/app/services/types/Template';
import { TemplateCategory } from 'src/app/services/types/TemplateCategory';
import { JobpostStudentround } from 'src/app/services/types/JobpostStudentround';
import { SweetAlertService } from 'src/app/services/sweet-alert-service/sweet-alert-service';

@Component({
  selector: 'app-notify-popup',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './notify-popup.component.html',
  styleUrl: './notify-popup.component.css',
})
export class NotifyPopupComponent {
  Templates = signal<Template[]>([]);
  id: number = 0;
  templateCategories: TemplateCategory[] = [];
  templates: Template[] = [];
  selectedTemplate: { Subject: string; Body: string } | null = null;
  templateSubject: string = '';
  templateBody: string = '';
  selectedRound: JobpostStudentround[] = [];

  constructor(
    private studentResultInformationApiService: StudentResultInformationApiService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit() {
    this.getTemplates();
  }
  onReset(): void {
    console.log('Reset button clicked');
  }

  onSend(): void {
    console.log('Send button clicked');
  }

  getTemplates = () => {
    this.studentResultInformationApiService.GetnextRoundTemplate().subscribe({
      next: (response) => {
        this.templateCategories = response.value;
        this.templates = response.value.flatMap(
          (category) => category.Templates
        );
        console.log('Template Categories:', this.templateCategories);
        console.log('Templates:', this.templates);
      },
      error: (error) => {
        console.error('Error fetching templates', error);
      },
    });
  };

  onTemplateChange(templateId: number): void {
    this.selectedTemplate =
      this.templates.find((template) => template.Id === templateId) || null;
    if (this.selectedTemplate) {
      this.templateSubject = this.selectedTemplate.Subject;
      this.templateBody = this.selectedTemplate.Body;
    }
  }

  confirmAction() {
    console.log('Offer letter confirmed!');
    if (this.selectedRound.length > 0) {
      const currentDate = new Date();
      this.selectedRound.forEach((offer) => {
        const email = {
          To: 'mvpallavi2001@gmail.com',
          Cc: 'mvpallavi2001@gmail.com',
          Bcc: '',
          Subject: this.templateSubject,
          Body: this.templateBody,
          SentAt: currentDate,
        };
        this.studentResultInformationApiService
          .selectedForNextRoundEmail(email as any)
          .subscribe({
            next: () => {
              console.log('Offer letter sent successfully!');
              this.sweetAlertService;
            },
            error: (error) => {
              console.error('Error:', error);
            },
          });
      });
    } else {
      // this.closeSecondPopup();
    }
  }
}
