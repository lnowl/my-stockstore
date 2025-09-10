import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paginate',
    standalone: true
})

export class PaginatePipe implements PipeTransform {
    transform<T>(items: T[], currentPage: number, pageSize: number): T[] {
        if (!items) return [];
        const start = (currentPage - 1) * pageSize;
        return items.slice(start, start + pageSize);
    }
}
