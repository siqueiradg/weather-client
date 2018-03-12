import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {

  constructor() { }

  public showToast(text) {
    const x = document.getElementById('toast');
    x.innerHTML = text;
    x.className = 'show';

    setTimeout(
      () => {
        x.className = x.className.replace('show', '');
      }, 1000);
    }
}
