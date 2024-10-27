import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { OrderModel } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
orders: OrderModel[]= [];

constructor(
  private _order: OrderService
){}

ngOnInit(): void {
  this._order.getAll(res=> this.orders = res);
}

}
