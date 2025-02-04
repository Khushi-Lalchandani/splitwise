import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  isOpen: boolean = false;
  onOpen() {
    this.isOpen = !this.isOpen;
  }
}
