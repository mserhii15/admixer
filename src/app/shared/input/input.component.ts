import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, SkipSelf } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

const material = [MatFormFieldModule, MatButtonModule, MatInputModule];

@Component({
  standalone: true,
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [...material, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export default class InputComponent {
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) type: string = '';
  @Input({ required: true }) controlName: string = '';
}
