import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-interest-filter-form',
  templateUrl: './interest-filter-form.component.html',
  styleUrls: ['./interest-filter-form.component.css']
})
export class InterestFilterFormComponent implements OnInit {
  //fields
  interestEnum:any[] = [];
  @Output() selected:EventEmitter<any> = new EventEmitter<any>();
  //
  constructor(private api:ApiService){

  }
  ngOnInit(): void {
    this.api.getInterests().subscribe(
      (next)=>{
        next.forEach((interest)=>{
          this.interestEnum.push({
            interest:interest,
            selected:false,
            label:interest
          })
        })
      }
    );


  }

  getSelectedInterests(){
    const selectedInterests = this.interestEnum.filter((item)=>(item.selected)).map((item)=>item.interest);
    this.selected.emit(selectedInterests);
  }

}
