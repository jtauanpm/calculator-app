import { Component, OnInit } from '@angular/core';
import { CalculateService } from './calculate.service';

import { CalcRecord } from 'src/models/calc-record.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  public field:string = '';
  public null:string = 'empty';
  public historicList:CalcRecord[] = [];
  public result:any;
  public confirm:boolean = false;

  constructor(private calculateService:CalculateService) { }

  clean(){
    this.field = '';
  }

  add(value:string){
    if(this.field == this.null || this.field == this.result){
      this.clean();
    }
    this.field = this.field + value;
  }

  back(){
    this.field = this.field.substring(0, this.field.length -1);
  }

  calculate(){
    if(this.field !== ''){
      this.result = this.calculateService.calculate(this.field);
      this.addHistoric(this.field, this.result);
      this.field = this.result;
    }else{
      if(this.field !== this.null){
        this.field = this.null
      }
    }
  }

  addHistoric(expression:string, result:string){
    //todo: make model of historic
    this.historicList.unshift(new CalcRecord(expression,result));
  }

  cleanHistory(){
    this.confirm = confirm("Deseja limpar o histórico ?");
    if(this.confirm == true){
      this.historicList = [];
    }
  }

  ngOnInit(): void {
  }

}
