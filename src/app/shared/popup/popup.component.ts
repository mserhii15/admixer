import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  imports: [MatButtonModule],
})
export default class PopupComponent {
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  @Input() message: string = '';
}
