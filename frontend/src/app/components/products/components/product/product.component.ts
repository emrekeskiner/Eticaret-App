import { Component, OnInit } from '@angular/core';
import { PaginationResultModel } from '../../../../common/models/pagination-result.model';
import { ProductModel } from '../../models/product.model';
import { RequestModel } from '../../../../common/models/request.model';
import { ProductService } from '../../services/product.service';
import { SwalService } from '../../../../common/services/swal.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../../../common/shared/shared.module';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  result: PaginationResultModel<ProductModel[]> = new
    PaginationResultModel<ProductModel[]>();

  request: RequestModel = new RequestModel();
  pageNumber: number[] = [];
  product: ProductModel = new ProductModel();

  constructor(
    private _product: ProductService,
    private _swal: SwalService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(pageNumber = 1) {
    this.request.pageNumber = pageNumber;
    this._product.getAll(this.request, res => {
      this.result = res;
      this.setPageNumbers();
    })
  }

  setPageNumbers() {
    const startPage = Math.max(1, this.result.pageNumber - 1);
    const endPage = Math.min(this.result.totalPageCount, this.result.pageNumber + 2);
    this.pageNumber = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pageNumber.push(i);
    }
  }

  search() {
    if (this.request.search.length >= 3) {
      this.getAll(1);
    }
  }

  removeById(id: string){
    this._swal.callSwal("Ürünü silmek istiyormusunuz ?","Ürünü Sil", "Sil",()=>{
      let model = {_id: id };
      this._product.removeById(model, res=>{
        this._toastr.info(res.message);
        this.getAll(this.request.pageNumber);
      });
    });
  }

  changeProductStatus(id:string){
   
      let model = {_id: id };
      this._product.changeActiveStatus(model, res=>{
        this._toastr.info(res.message);
        this.getAll(this.request.pageNumber);
    
    });
  }
}
