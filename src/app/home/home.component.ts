import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @ViewChild("name") namekey!:ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  
  starttest(){
    localStorage.setItem("name",this.namekey.nativeElement.value);
  }
}
