import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { BasketService } from '../../baskets/services/basket.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    public _basket : BasketService
  ){
    this._basket.getCount();
  }
}
