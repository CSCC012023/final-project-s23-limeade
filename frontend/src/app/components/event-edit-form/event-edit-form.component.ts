import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LimeEvent } from 'src/app/classes/limeEvent';
import { User } from 'src/app/classes/user';
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
  selector: 'app-event-edit-form',
  templateUrl: './event-edit-form.component.html',
  styleUrls: ['./event-edit-form.component.css'],
})
export class EventEditFormComponent {
  eventForm!: FormGroup;
  interests: string[] = [];
  error: string = '';
  sRegex: RegExp = /s$/i;
  @Input() event!: LimeEvent;
  @Output() eventChange = new EventEmitter<LimeEvent>();

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private library: FaIconLibrary
  ) {
    library.addIcons(faPlus);
  }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      eventName: [this.event.eventName, [Validators.required]],
      eventDescription: [this.event.eventDescription, [Validators.required]],
      eventDate: [
        new Date(this.event.eventDate).toISOString().slice(0, -8),
        [Validators.required],
      ],
      eventLocation: [this.event.eventLocation, [Validators.required]],
      eventCost: [this.event.eventCost, [Validators.required]],
      eventTypes: this.formBuilder.array([
        new FormControl('', [Validators.required]),
      ]),
      advertise: [this.event.advertise],
    });

    if (this.event.eventTypes.length > 0) {
      for (let i = 0; i < this.event.eventTypes.length; i++) {
        if (i == 0) {
          this.eventTypes.controls[i].setValue(this.event.eventTypes[i]);
        } else {
          this.addRelatedInterest(this.event.eventTypes[i]);
        }
      }
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
      'eventTypes'
    ) as FormArray<FormControl>;
    eventTypes.removeAt(index);
  }

  addRelatedInterest(interest = '') {
    const eventTypes = this.eventForm.get(
      'eventTypes'
    ) as FormArray<FormControl>;
    eventTypes.push(new FormControl(interest));
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
      .editEvent(
        this.event._id,
        values.eventName,
        values.eventDescription,
        values.eventDate,
        values.eventLocation,
        uniqueTypes,
        values.eventCost,
        values.advertise
      )
      .subscribe((next) => {
        this.event = next;
        this.eventChange.emit(this.event);
      });
  }
}
