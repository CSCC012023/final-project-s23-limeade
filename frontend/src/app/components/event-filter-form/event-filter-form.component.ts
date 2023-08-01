import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-filter-form',
  templateUrl: './event-filter-form.component.html',
  styleUrls: ['./event-filter-form.component.css'],
})
export class EventFilterFormComponent {
  @Output() filter = new EventEmitter<{
    filterDateMin: string;
    filterDateMax: string;
    filterLocation: string;
    filterTypes: string[];
  }>();
  filterForm: FormGroup;
  interests: string[] = [];
  sRegex: RegExp = /s$/i;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private library: FaIconLibrary) {
    this.filterForm = this.formBuilder.group({
      filterDateMin: [new Date().toISOString().slice(0, -8)],
      filterDateMax: [new Date().toISOString().slice(0, -8)],
      filterLocation: [''],
      filterTypes: this.formBuilder.array([
        new FormControl(''),
      ]),
    });
    library.addIcons(faPlus);
  }

  ngOnInit() {
    this.api.getEvents('', ['eventDate', 'asc']).subscribe((next) => {
      let min: string = next.at(0)?.eventDate ?? new Date().toISOString();
      let max: string = next.at(-1)?.eventDate ?? new Date().toISOString();
      this.filterForm.patchValue({
        filterDateMin: min.slice(0, -8),
        filterDateMax: max.slice(0, -8),
      });
    });

    this.api.getInterests().subscribe((next) => {
      this.interests = next;
    });
  }

  get filterTypes() {
    return this.filterForm.controls['filterTypes'] as FormArray<FormControl>;
  }

  removeRelatedInterest(index: number) {
    const filterTypes = this.filterForm.get(
      'filterTypes'
    ) as FormArray<FormControl>;
    filterTypes.removeAt(index);
  }

  addRelatedInterest() {
    const filterTypes = this.filterForm.get(
      'filterTypes'
    ) as FormArray<FormControl>;
    filterTypes.push(new FormControl(''));
  }

  onFilter() {
    this.filter.emit(this.filterForm.value);
  }
}
