import { Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { generateRandomNonce } from './utils';
import { AppComponentBase } from './inline-styles-csp/app-component-base';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends AppComponentBase implements OnInit {
  nonce: string = '';

  constructor(injector: Injector, private renderer: Renderer2, private sanitizer: DomSanitizer) {
    super(injector);
  }

  cspMetaTagHtml!: any;
  ngOnInit(): void {
    debugger;
    // this.nonce = generateRandomNonce();
    // const metaTag = document.createElement('meta');
    // metaTag.setAttribute('name', 'CSP-NONCE');
    // metaTag.setAttribute('content', this.nonce);
    // document.head.appendChild(metaTag);

    debugger;
    const metaTag = this.renderer.selectRootElement('meta[name="CSP-NONCE"]');
    const content = metaTag.getAttribute('content');
    console.log('content from app_comp : ' + content); // Log the current content value


    const metaTag1 = document.querySelector('meta[name="CSP-NONCE"]');
    const content1 = metaTag1!.getAttribute('content');
    console.log(content1); // Log the current content value

    console.log('content from app_comp 2nd way : ' + content1); // Log the current content value


    //   const cspMetaTag = `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'nonce-${content}';">`;
    // this.cspMetaTagHtml = this.sanitizer.bypassSecurityTrustHtml(cspMetaTag);


    // const cspMetaTag = document.getElementById('csp-meta-tag');
    // if (cspMetaTag) {
    //   this.renderer.setAttribute(cspMetaTag, 'content', `default-src 'self'; style-src 'self' 'nonce-${content}'; img-src 'self' data:`);
    // }

    debugger;
  }
  title = 'my-hero';
}

