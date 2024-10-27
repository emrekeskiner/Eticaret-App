import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [SharedModule,NavbarComponent],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent {

}
