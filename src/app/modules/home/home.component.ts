import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  show = true;
  state: any = { text: '' };
  constructor() { }

  ngOnInit() {
  }
  
  addEmoji = (e) => {
    this.show = !this.show;
    let emoji = e.emoji.native;1
    this.state = { text: this.state.text + emoji }
  }


}
