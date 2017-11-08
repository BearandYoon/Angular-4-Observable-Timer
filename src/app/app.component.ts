import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  timer$: Subscription = new Subscription();
  timer: Observable<number> = Observable.timer(0, 10);
  miliSec = 0;
  isStarted = false;

  constructor() {
  }

  ngOnInit() {

  }

  startTimer() {
    this.isStarted = true;
    this.freshStart();
  }

  stopTimer() {
    this.isStarted = false;
    this.timer$.unsubscribe();
  }

  resetTimer() {
    this.isStarted = true;
    this.freshStart();
  }

  getTimeFormat(mSec) {
    return {
      mSec: mSec % 100,
      sec: Math.floor(mSec / 100 % 60),
      min: Math.floor(mSec / 6000 % 60),
      hr: Math.floor(mSec / 360000)
    };
  }

  private counterFunc(t) {
    this.miliSec = t;
  }

  private freshStart(): void {
    this.timer$.unsubscribe();
    this.timer$ = this.timer.subscribe(t => {
      this.counterFunc(t);
    });
  }
}
