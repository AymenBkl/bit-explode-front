import { NgModule, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollbar]'
})
export class ScrollbarDirective {

  constructor(el: ElementRef) {
    const stylesheet = `
    ::-webkit-scrollbar {
      width: 5px !important;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
      background:#283136 !important;; 
    }
     
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888 !important;;  
      border-radius: 10px !important;;
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555 !important;; 
    }
    `;

    const styleElmt = el.nativeElement.shadowRoot.querySelector('style');
    console.log("heredirective");
    if (styleElmt) {

      styleElmt.append(stylesheet);
    } else {
      const barStyle = document.createElement('style');
      barStyle.append(stylesheet);
      el.nativeElement.shadowRoot.appendChild(barStyle);
    }

  }

}

@NgModule({
  declarations: [ScrollbarDirective ],
  exports: [ ScrollbarDirective ]
})
export class ScrollbarThemeModule {}
