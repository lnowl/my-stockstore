import { Component } from '@angular/core';
import { InputSearchComponent } from '../../components/input-search/input-search.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Product } from '../../commons/interfaces/product.interface';
import { ButtonGenericComponent } from '../../components/button-generic/button-generic.component';
import { SearchFilterPipe } from "../../commons/shared/search.pipe";
import { PaginatePipe } from "../../commons/shared/pagination.pipe";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, InputSearchComponent, NzSelectModule, NzButtonModule, ButtonGenericComponent, NzCheckboxModule, SearchFilterPipe, PaginatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  searchText: string = '';
  selectedStatus: string = 'all';
  lowStockChecked = false;
  products: Product[] = [];
  filteredProducts: Product[] = [];

  pageSizes = [5, 10, 20, 50];
  pageSize = 5;
  currentPage = 1;

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.loadProduct();
  }

  loadProduct() {
    this.apiService.getProduct().subscribe({
      next: (res) => {
        this.products = res.data;
        this.applyFilters();
        this.loaderService.hideLoader();
      },
      error: (err) => {
        console.error('Error loading product data', err);
        this.loaderService.hideLoader();
      }
    });
  }

  filterProducts() {
    this.applyFilters();
  }

  private applyFilters() {
    let data = [...this.products];

    // low stock
    if (this.lowStockChecked) {
      data = data.filter(p => p.quantity < 25);
    }

    // category filter
    if (this.selectedStatus && this.selectedStatus !== 'all') {
      data = data.filter(p => p.category === this.selectedStatus);
    }

    // search filter
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      data = data.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.sku.toLowerCase().includes(search)
      );
    }

    this.filteredProducts = data;
  }

  editProduct(product: Product) {
    console.log('Edit:', product);
  }

  deleteProduct(product: Product) {
    console.log('Delete:', product);
  }

  // Pagination helpers
  get pagedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredProducts.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.pageSize) || 1;
  }

  goToPage(page: number) {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.currentPage = page;
  }

  onPageSizeChange() {
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }
}
