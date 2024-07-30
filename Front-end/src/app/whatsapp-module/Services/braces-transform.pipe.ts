import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeBraces',
  standalone: true
})
export class RemoveBracesPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const dynamicFieldsCount = value.match(/{{\d+}}/g)?.length || 0;
    let transformedValue = value;

    for (let i = 1; i <= dynamicFieldsCount; i++) {
      const placeholder = `{{${i}}}`;
      const replacement = `<span class="example-text">Field-${i}</span>`;
      transformedValue = transformedValue.replace(placeholder, replacement);
    }

    return transformedValue;
  }

}
