import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonGenericComponent } from '../button-generic/button-generic.component';
import { Product } from '../../commons/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonGenericComponent, CommonModule, FormsModule, NzSelectModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    private router: Router
  ) { }

  showCreatePopup = false;
  products: Product[] = [];

  categories = [
    { label: 'Steel', value: 'Steel' },
    { label: 'PVC', value: 'PVC' },
    { label: 'Wires', value: 'Wires' }
  ];
  export() {
    console.log('export');
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  addProduct() {
    this.showCreatePopup = true;
  }

  closeCreatePopup() {
    this.showCreatePopup = false;
  }

  createProduct(formValue: any) {
    // ตรวจสอบข้อมูลก่อน
    if (!formValue.name || !formValue.category || !formValue.sku) {
      console.error('กรุณากรอกข้อมูลที่จำเป็น');
      return;
    }

    // สร้าง object สินค้าใหม่
    const newProduct: Product = {
      id: this.products.length + 1, // ถ้าเป็น mock data
      name: formValue.name,
      category: formValue.category,
      sku: formValue.sku,
      price: formValue.price || 0,
      quantity: formValue.quantity || 0,
      unit: formValue.unit || '',
      supplier: formValue.supplier || ''
    };

    // ถ้าใช้ Mockup
    this.products.push(newProduct);

    // ปิด popup
    this.showCreatePopup = false;

    // ถ้าใช้ API จริง
    // this.apiService.addProduct(newProduct).subscribe({
    //   next: res => {
    //     this.loadProduct(); // โหลดข้อมูลใหม่
    //     this.showCreatePopup = false;
    //   },
    //   error: err => console.error('Error creating product', err)
    // });
  }

}
