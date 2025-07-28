import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class EmptyStateComponent {

  @Input() message: string = 'Data polling not available.';
  @Input() icon: string = 'close-circle-outline'; // Ionicon

}
