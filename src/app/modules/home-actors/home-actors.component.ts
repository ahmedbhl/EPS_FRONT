import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-actors',
  templateUrl: './home-actors.component.html',
  styleUrls: ['./home-actors.component.css']
})
export class HomeActorsComponent implements OnInit {

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
