import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
@Input() heads: string[]=[];
}
