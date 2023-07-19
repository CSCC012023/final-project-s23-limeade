import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-event-filter-form',
  templateUrl: './event-filter-form.component.html',
  styleUrls: ['./event-filter-form.component.css'],
})
export class EventFilterFormComponent {
  filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      filterDate: [new Date().toISOString().slice(0, -8)],
      filterLocation: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {}
}
