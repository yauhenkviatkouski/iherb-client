import { Injectable } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';

@Injectable()
export class UtilsService {
  downloadCsv(rows: any, filename: string) {
    const options = {
      filename,
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: '',
      useTextFile: false,
      useBom: true,
      // useKeysAsHeaders: true,
      headers: ['Брэнд', 'Продукт', 'Кол-во', 'Вес', 'Цена', 'Супер цена'],
    };

    new ExportToCsv(options).generateCsv(rows);
  }
}
