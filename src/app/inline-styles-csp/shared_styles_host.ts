import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { ɵSharedStylesHost } from '@angular/platform-browser';

/// this is extracted and overrided from dynamic-browser.js version 15 as on the github source is using older version of angular
/// reference : https://dev.to/ferdiesletering/how-to-implement-an-inline-styles-content-security-policy-with-angular-and-nginx-2ke2
/// github older version : https://github.com/ferdiesletering/angular-csp-nonce


@Injectable()
export class CustomDomSharedStylesHost
  extends ɵSharedStylesHost
  implements OnDestroy {
  // Maps all registered host nodes to a list of style nodes that have been added to the host node.
  private hostNodes = new Set();
  private styleRef = new Map();
  private _nonce: string | null | undefined = null;

  constructor(
    @Inject(DOCUMENT) private doc: any,
    @Inject('cspMetaSelector')
    private _metaCSPTag: string
  ) {
    super();
    this.doc = doc;
    // Maps all registered host nodes to a list of style nodes that have been added to the host node.
    this.styleRef = new Map();
    //this._hostNodes.set(_doc.head, []);
    this.hostNodes = new Set();
    this.resetHostNodes();
    this._setCSPNonce();
  }


  resetHostNodes() {
    const hostNodes = this.hostNodes;
    hostNodes.clear();
    // Re-add the head element back since this is the default host.
    hostNodes.add(this.doc.head);
  }

  override onStyleAdded(style: string): void {
    for (const host of this.hostNodes) {
      this.addStyleToHost(host, style);
    }
  }

  private addStyleToHost(host: any, style: any) {
    const styleEl = this.doc.createElement('style');
    styleEl.textContent = style;
    //added over default
    //without-nonce for testing purpose only no need for it 
    if (!style.includes('without-nonce') && this._nonce) {
      styleEl.setAttribute('nonce', this._nonce);
    }

    host.appendChild(styleEl);
    const styleElRef = this.styleRef.get(style);
    if (styleElRef) {
      styleElRef.push(styleEl);
    }
    else {
      this.styleRef.set(style, [styleEl]);
    }

    //added over default
    if (this._nonce)
      this._removeCSPNonceHeader();
  }

  private _setCSPNonce(): void {
    this._nonce = document
      .querySelector(this._metaCSPTag)
      ?.getAttribute('content');

    this._nonce = 'Xm7Xn38dvvaLaKbF';//generateRandomNonce(); //static nonce

    const metaTag1 = document.querySelector('meta[name="CSP-NONCE"]');
    metaTag1!.setAttribute('content', this._nonce);

    // const meta2 = document.querySelector('meta[name="CSP"]');
    // meta2!.setAttribute('content', `default-src 'self'; style-src 'self' 'nonce-${this._nonce}'; img-src 'self' data:` );
  }

  private _removeCSPNonceHeader(): void {
    //document.querySelector(this._metaCSPTag)?.remove();
  }

  addHost(hostNode: any) {
    this.hostNodes.add(hostNode);
    for (const style of this.getAllStyles()) {
      this.addStyleToHost(hostNode, style);
    }
  }

  removeHost(hostNode: any) {
    this.hostNodes.delete(hostNode);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.styleRef.clear();
    this.resetHostNodes();
  }

  //old angular version  


  // private _addStylesToHost(
  //   styles: Set<string>,
  //   host: Node,
  //   styleNodes: Node[]): void {
  //   styles.forEach((style: string) => {
  //     const styleEl = this._doc.createElement('style');
  //     styleEl.textContent = style;
  //     if (!style.includes('without-nonce') && this._nonce) {
  //       styleEl.setAttribute('nonce', this._nonce);
  //     }
  //     styleNodes.push(host.appendChild(styleEl));
  //   });

  //   if (this._nonce) {
  //     this._removeCSPNonceHeader();
  //   }
  // }


  // addHost(hostNode: Node): void {
  //   const styleNodes: Node[] = [];
  //   this.hostNodes.set(hostNode, styleNodes);
  // }

  // removeHost(hostNode: Node): void {
  //   const styleNodes = this._hostNodes.get(hostNode);
  //   if (styleNodes) {
  //     styleNodes.forEach(removeStyle);
  //   }
  //   this._hostNodes.delete(hostNode);
  // }

  // override ngOnDestroy(): void {
  //   this._hostNodes.forEach((styleNodes) => styleNodes.forEach(removeStyle));
  // }
}

function removeStyle(styleNode: Node): void {
  getDOM().remove(styleNode);
}

export function generateRandomNonce(): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  for (let i = 0; i < 16; i++) {
    nonce += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return nonce;
}