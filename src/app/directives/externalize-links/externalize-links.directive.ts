import { Directive, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { ExternalLinkService } from 'src/app/services/external-link/external-link.service';

@Directive({
  selector: '[appExternalizeLinks]'
})
export class ExternalizeLinksDirective implements AfterViewInit, OnDestroy{

  constructor(
    private element: ElementRef,
    private externalLink: ExternalLinkService
  ) { }

  async ngAfterViewInit() {
    // await Observable.timer(500).toPromise();
    await Observable.create().timer(500).toPromise();
    console.log('timer1')
    await timer(500).toPromise();
    console.log('timer2')
    this.getAllLinks().forEach(aTag =>
      aTag.addEventListener('click', this.handleClick.bind(this))
    );
  }

  ngOnDestroy() {
    this.getAllLinks().forEach(aTag => {
      aTag.removeEventListener('click', this.handleClick.bind(this));
    });
  }

  private getAllLinks() {
    return this.element.nativeElement.querySelectorAll('a');
  }

  private handleClick(event) {
    event.preventDefault();
    this.openExternalLink(event.srcElement.href);
  }

  private openExternalLink(url: string): void {
    this.externalLink.open(url);
  }
} 
