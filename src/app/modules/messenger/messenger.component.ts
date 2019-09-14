import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import * as SockJS from 'sockjs-client';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserService } from 'src/app/core/authentication/user.service';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { User } from 'src/app/shared/models/user.class';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';
import { Message } from './model/message';
import { MessengerSocketService } from './service/messenger-socket.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
  providers: [DatePipe]
})
// tslint:disable: max-line-length
export class MessengerComponent implements OnInit {
  private serverUrl = environment.webSocket_url;
  isLoaded = false;
  isCustomSocketOpened = false;
  public stompClient;
  public form: FormGroup;
  public userForm: FormGroup;
  messages: Message[] = [];
  // oldMessages: Message[] = [];
  userMessages: Message[] = [];
  currentUser: User;
  users: User[] = [];
  selectedUserMessage: User;
  usersForm = new FormControl('');
  filtredUsers: Observable<User[]>;


  constructor(private socketService: MessengerSocketService,
    public snackBar: SnackBarService,
    public authenticationService: AuthenticationService,
    public userService: UserService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
    });
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });
    this.userForm = new FormGroup({
      userFrom: new FormControl(this.currentUser.id, [Validators.required]),
      userTo: new FormControl(null)
    });
    this.getAllUsers();
    this.getUsersMessages();
    this.initializeWebSocketConnection();
    this.usersForm.valueChanges.pipe(startWith(''), debounceTime(300)).subscribe(value => {
      this.filtredUsers = value ?
        this.users.filter(option => option.firstName.toLowerCase().indexOf(value.toLocaleLowerCase()) === 0)
        : this.users as any;
    });

  }

  sendMessageUsingSocket() {
    if (this.form.valid) {
      const messagedate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      const message: Message = { message: this.form.value.message, userFrom: this.userForm.value.userFrom, userTo: this.userForm.value.userTo, messagedate: messagedate };
      this.stompClient.send('/app/send/message', {}, JSON.stringify(message));
    }
  }

  sendMessageUsingRest() {
    if (this.form.valid) {
      const messagedate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      const message: Message = { message: this.form.value.message, userFrom: this.userForm.value.userFrom, userTo: this.userForm.value.userTo, messagedate: messagedate };
      this.socketService.post(message).subscribe(res => {
        console.log(res);
        this.form.reset();
        this.getUsersMessages();
      });
    }
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    const headers = HttpHeader.getHeaders();
    this.stompClient.connect({ headers: headers }, function (frame) {
      that.isLoaded = true;
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe('/chat', (message) => {
      this.handleResult(message);
    });
  }

  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe('/chat/' + this.currentUser.id, (message) => {
        this.handleResult(message);
      });
    }
  }
  openSocketAndGetAllMessage(userTo?: User) {
    if (userTo) {
      this.messages = [];
      this.selectedUserMessage = userTo;
      this.userForm.get('userFrom').setValue(this.currentUser.id);
      this.userForm.get('userTo').setValue(userTo.id);
      this.getAllMessageByUserFromAndUserTo(this.currentUser.id, userTo.id);
      this.openSocket();
    }
  }
  handleResult(message) {
    if (message.body) {
      const messageResult: Message = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
    }
  }

  getAllMessageByUserFromAndUserTo(userFrom, userTo) {
    this.socketService.getAllMessageByUserFromAndUserTo(userFrom, userTo).subscribe(messages => {
      if (messages.length > 0) {
        this.messages = messages;
        console.log(`Get the list of all message betwen user ${userFrom} and  ${userTo}`);
      }
    });
  }

  getUsersMessages() {
    this.socketService.getAllUsersMessageByUserFrom(this.currentUser.id).subscribe(messages => {
      if (messages.length > 0) {
        this.userMessages = messages;
        this.selectedUserMessage = this.userMessages[0].userTo;
        this.getAllMessageByUserFromAndUserTo(this.currentUser.id, this.userMessages[0].userTo.id);
        console.log(`Get the list of all message betwen user ${this.currentUser.id} `);
      }
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      if (users.length > 0) {
        this.users = users;
        this.users = this.users.filter(user => user.roles[0].name !== 'SUPER_ADMIN');
      }
    });
  }

  getImgUrl(message) {
    if (message && message.userFrom && message.userFrom.id === this.currentUser.id) {
      return message.userFrom.profilePicture;
    } else if (message && message.userTo && message.userTo.id === this.currentUser.id) {
      return message.userTo.profilePicture;
    } else {
      return 'assets/images/avatars/profile.jpg';
    }
  }
}
