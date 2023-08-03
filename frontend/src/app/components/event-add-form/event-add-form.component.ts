import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-add-form',
  templateUrl: './event-add-form.component.html',
  styleUrls: ['./event-add-form.component.css'],
})
export class EventAddFormComponent {
  eventForm!: FormGroup;
  interests: string[] = [];
  error: string = '';
  sRegex: RegExp = /s$/i;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private library: FaIconLibrary,
  ) {
    library.addIcons(faPlus);
  }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      eventName: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      eventDate: [new Date().toISOString().slice(0, -8), [Validators.required]],
      eventLocation: ['', [Validators.required]],
      eventTypes: this.formBuilder.array([
        new FormControl('', [Validators.required]),
      ]),
    });

    if (this.api.type === 'Premium') {
      this.eventForm.addControl('advertise', new FormControl(false));
    }

    this.api.getInterests().subscribe((next) => {
      this.interests = next;
    });
  }

  get eventTypes() {
    return this.eventForm.controls['eventTypes'] as FormArray<FormControl>;
  }

  removeRelatedInterest(index: number) {
    const eventTypes = this.eventForm.get(
      'eventTypes',
    ) as FormArray<FormControl>;
    eventTypes.removeAt(index);
  }

  addRelatedInterest() {
    const eventTypes = this.eventForm.get(
      'eventTypes',
    ) as FormArray<FormControl>;
    eventTypes.push(new FormControl(''));
  }

  onSubmit() {
    this.error = '';
    if (this.eventForm.invalid) {
      return;
    }
    const values = this.eventForm.value;
    let uniqueTypes = [...new Set(values.eventTypes)] as string[];
    uniqueTypes = uniqueTypes.filter((interest) => interest !== '');
    this.api
      .addEvent(
        values.eventName,
        values.eventDescription,
        values.eventDate,
        values.eventLocation,
        uniqueTypes,
        this.api.userId,
        values.advertise,
      )
      .subscribe((next) => {
        this.router.navigate(['/event-home']);
      });
  }
}
