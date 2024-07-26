import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-interface-update-news',
  templateUrl: './interface-update-news.component.html',
  styleUrl: './interface-update-news.component.css'
})
export class InterfaceUpdateNewsComponent {
  constructor(private location: Location) {}

goBack()
{
  this.location.back();
}

}
