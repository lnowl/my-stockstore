import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../commons/interfaces/model.excample';
import { ApiResponse } from '../commons/interfaces/api-response.interface';
import { Product } from '../commons/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private endpoint: string = environment.auth.beEndpoint;
  private useMockup: boolean = environment.mockupApi;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  /** GET: ดึง Users ทั้งหมด */
  getProduct(): Observable<ApiResponse<Product[]>> {
    if (this.useMockup) {
      return this.http
        .get<ApiResponse<Product[]>>('/assets/mock-data/mock-product.json')
        .pipe(delay(200), catchError(this.handleError));
    } else {
      return this.http
        .get<ApiResponse<Product[]>>(`${this.endpoint}/customers`, this.httpOptions)
        .pipe(catchError(this.handleError));
    }
  }

  /** GET: ดึง User ตาม ID */
  getUserById(id: number): Observable<ApiResponse<User>> {
    if (this.useMockup) {
      return this.http
        .get<ApiResponse<User>>(`/assets/mock-data/mock-user-${id}.json`)
        .pipe(delay(200), catchError(this.handleError));
    } else {
      return this.http
        .get<ApiResponse<User>>(`${this.endpoint}/users/${id}`, this.httpOptions)
        .pipe(catchError(this.handleError));
    }
  }

  /** POST: เพิ่ม user */
  addUser(data: User): Observable<ApiResponse<User>> {
    if (this.useMockup) {
      const mockResponse: ApiResponse<User> = {
        code: 200,
        message: 'success',
        data: data,
      };
      return of(mockResponse).pipe(delay(200));
    } else {
      return this.http
        .post<ApiResponse<User>>(`${this.endpoint}/users`, data, this.httpOptions)
        .pipe(catchError(this.handleError));
    }
  }

  /** PUT: แก้ไข user */
  updateUser(id: number, data: Partial<User>): Observable<ApiResponse<User>> {
    if (this.useMockup) {
      const mockResponse: ApiResponse<User> = {
        code: 200,
        message: 'success',
        data: { ...data, id } as User,
      };
      return of(mockResponse).pipe(delay(200));
    } else {
      return this.http
        .put<ApiResponse<User>>(`${this.endpoint}/users/${id}`, data, this.httpOptions)
        .pipe(catchError(this.handleError));
    }
  }

  /** DELETE: ลบ user */
  deleteUser(id: number): Observable<ApiResponse<null>> {
    if (this.useMockup) {
      const mockResponse: ApiResponse<null> = {
        code: 200,
        message: 'success',
        data: null,
      };
      return of(mockResponse).pipe(delay(200));
    } else {
      return this.http
        .delete<ApiResponse<null>>(`${this.endpoint}/users/${id}`, this.httpOptions)
        .pipe(catchError(this.handleError));
    }
  }

  /** จับ error แบบ centralized */
  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => error);
  }
}
