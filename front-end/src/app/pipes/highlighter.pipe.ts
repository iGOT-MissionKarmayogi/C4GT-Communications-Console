import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    const highlightedContent = value.replace(/\{\{(.*?)\}\}/g, '<span class="highlight">{{$1}}</span>');
    return this.sanitizer.bypassSecurityTrustHtml(highlightedContent);
  }
}