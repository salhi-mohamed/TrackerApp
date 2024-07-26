import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('iconZoom', [
      state('normal', style({
        transform: 'scale(1)'
      })),
      state('zoomed', style({
        transform: 'scale(1.2)'
      })),
      transition('normal => zoomed', animate('200ms ease-in')),
      transition('zoomed => normal', animate('200ms ease-out'))
    ])
  ]
})
export class FooterComponent {
  iconState = 'normal';

  toggleZoomState() {
    this.iconState = (this.iconState === 'normal') ? 'zoomed' : 'normal';
  }
}
