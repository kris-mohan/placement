import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { companyTableList } from 'src/app/features/company-configuration/company-config/companies/companies-model';
import { SharedModule } from 'src/app/shared/shared.module';
import { HIRING_ROUNDS_DATA } from '../../test-rounds/test-rounds.component';
import { InterviewRoundsAPIService } from './api-add-rounds-modal';

@Component({
  selector: 'app-add-rounds-modal',
  standalone: true,
  imports: [MatDialogModule, AMGModules, SharedModule, CommonModule],
  templateUrl: './add-rounds-modal.component.html',
  styleUrl: './add-rounds-modal.component.css',
})
export class AddRoundsModalComponent {
  userType: number;
  roundId: number | null = null;
  constructor(
    private apiInterviewRounds: InterviewRoundsAPIService,
    public dialogRef: MatDialogRef<AddRoundsModalComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: companyTableList
  ) {
    const storedUserType = sessionStorage.getItem('userType');
    this.userType = storedUserType ? parseInt(storedUserType) : 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('roundsId');
      this.roundId = id !== null ? +id : null;
      if (this.roundId) {
        const technology = HIRING_ROUNDS_DATA.find(
          (t) => t.roundId === this.roundId
        );
        // if (technology) {
        //   this.addEditTrainerForm.patchValue(technology);
        // }
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  async getInterviewRounds() {
    this.apiInterviewRounds.getInterviewRounds().subscribe({
      next: () => {},
      error: () => {
        console.error('error 404');
      },
    });
  }
}
