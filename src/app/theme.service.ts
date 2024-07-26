// theme.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme = 'dark-theme';
  private lightTheme = 'light-theme';

  constructor() { }

  enableDark() {
    this.setTheme(this.darkTheme);
  }

  enableLight() {
    this.setTheme(this.lightTheme);
  }

  private setTheme(theme: string) {
    document.body.classList.remove(this.darkTheme, this.lightTheme);
    document.body.classList.add(theme);
  }
}
