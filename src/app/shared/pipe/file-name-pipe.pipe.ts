import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileNamePipe'
})
export class FileNamePipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === 'size') {
      const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
      if (isNaN(parseFloat(value)) || !isFinite(value)) { return '-'; }
      let unit = 0;
      while (value >= 1024) {
        value /= 1024;
        unit++;
      }
      return value.toFixed(+ 2) + ' ' + units[unit];
    } else {
      const extension = value.substr(value.lastIndexOf('.') + 1);
      return args === 'file' ? extension.length > 4 ? `${value.slice(0, 20)}` : `${value.slice(0, 20)}.${extension}` : value;
    }
  }

}
