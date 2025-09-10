import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilterPipe',
    standalone: true
})
export class SearchFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string = '', field?: string, status?: string): any[] {
        if (!items) return [];

        let filtered = items;

        // ถ้ามี searchText → กรองด้วยข้อความ
        if (searchText) {
            const text = searchText.toLowerCase();
            filtered = filtered.filter(item => {
                if (field) {
                    const value = item[field] ? item[field].toString().toLowerCase() : '';
                    return value.includes(text);
                } else {
                    // กรณีไม่กำหนด field → search ทุก property
                    return Object.values(item).some(val =>
                        val?.toString().toLowerCase().includes(text)
                    );
                }
            });
        }

        // ถ้ามี status → กรองด้วยสถานะ
        if (status && status !== 'all') {
            filtered = filtered.filter(item => item.category === status);
        }

        return filtered;
    }
}
