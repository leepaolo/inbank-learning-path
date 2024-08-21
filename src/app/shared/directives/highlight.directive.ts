import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[leeHighlight]',
  standalone: true,
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('blue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', color);
    this.renderer.setStyle(this.el.nativeElement, 'border-width', '2px');
    this.renderer.setStyle(this.el.nativeElement, 'border-style', 'solid');
  }
}
