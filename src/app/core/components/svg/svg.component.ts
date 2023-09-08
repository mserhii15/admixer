import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SvgComponent {}
