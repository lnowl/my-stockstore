import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  // ตัวแปรที่เก็บสถานะของ loading (true/false)
  private readonly loading = new BehaviorSubject<boolean>(false);

  // ตัวแปร observable ที่เอาไว้ให้ component อื่น subscribe ได้
  get isLoading$() {
    return this.loading.asObservable();
  }

  // เรียกเพื่อแสดง loading
  showLoader() {
    this.loading.next(true);
  }

  // เรียกเพื่อซ่อน loading (delay ได้นิดหน่อยให้ดู smooth)
  hideLoader() {
    setTimeout(() => this.loading.next(false), 500);
  }
}
