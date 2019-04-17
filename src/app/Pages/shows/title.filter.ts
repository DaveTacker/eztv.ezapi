import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], text: any): any {
    if (!items) {
      return [];
    }

    if (!text) {
      return items;
    }

    text = text.toLowerCase();

    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(it => {
      return it.title.toLowerCase().includes(text);
    });
  }
}
