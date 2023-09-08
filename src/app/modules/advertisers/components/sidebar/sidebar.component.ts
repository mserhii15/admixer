import {
  ChangeDetectionStrategy,
  SimpleChanges,
  EventEmitter,
  OnChanges,
  Component,
  Output,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import InputComponent from '../../../../shared/input/input.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { IAdvertisers } from '../../../../core/DTO';

import AdvertisersService from '../../../../core/services/advertisers.service';

const material = [
  MatFormFieldModule,
  MatDividerModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
];

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdvertisersService],
  imports: [...material, InputComponent, ReactiveFormsModule, NgIf],
})
export default class SidebarComponent implements OnChanges {
  @Input({ required: true }) item: IAdvertisers | undefined;
  @Output() status: EventEmitter<string> = new EventEmitter<string>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  loading: boolean = false;
  form!: FormGroup;

  constructor(
    protected readonly fb: FormBuilder,
    private readonly advertisersService: AdvertisersService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.initForm();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.advertisersService
        .updateAdvertiser(this.form.value.profit, this.form.value.advertiserId)
        .subscribe({
          next: (response) => {
            this.status.emit(response.status);
            this.form.enable();
            this.initForm();
          },
          error: (errorResponse) => {
            this.form.enable();
          },
        });
    }
  }

  private initForm() {
    if (this.item) {
      this.form = this.fb.group({
        advertiserId: this.item.advertiserId,
        name: [this.item.name],
        campaignCount: [this.item.campaignCount],
        country: [this.item.country],
        impressions: [this.item.impressions],
        profit: [this.item.profit],
      });
    }
  }
}
