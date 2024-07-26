import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-news-define-obj',
  templateUrl: './news-define-obj.component.html',
  styleUrl: './news-define-obj.component.css'
})
export class NewsDefineObjComponent {
constructor(private location:Location){}
 goBack():void
 {
  this.location.back()
 }
}
