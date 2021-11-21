import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnwser: number = 0;
  IncorrectAnwser: number = 0;
  interval$: any;
  progress: string = "0";
  istestcompleted: boolean = false;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startcounter();
  }
  getAllQuestions() {
    this.questionService.getquestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
      })

  }

  nextQuestion() {
    this.currentQuestion++;

  }

  previousQuestion() {
    this.currentQuestion--;

  }

  anwser(currentQno: number, option: any) {

    if (currentQno === this.questionList.length) {
      this.istestcompleted = true;
      this.stopcounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnwser++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetcounter();
        this.getprogresspercent();
      }, 1000);

    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.IncorrectAnwser++;
        this.resetcounter();
        this.getprogresspercent();
      }, 1000);
      this.points -= 10;

    }
  }



  startcounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopcounter() {
    this.interval$.unsubscribe();
    this.counter = 0;

  }
  resetcounter() {
    this.stopcounter();
    this.counter = 60;
    this.startcounter();
  }
  resettest() {
    this.stopcounter();
    this.counter = 60;
    this.startcounter();
    this.currentQuestion = 0;
    this.progress = "0";
  }
  getprogresspercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString()
    return this.progress;
  }
}



