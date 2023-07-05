import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilecard',
  templateUrl: './profilecard.component.html',
  styleUrls: ['./profilecard.component.css']
})
export class ProfilecardComponent {
  @Input() user: any;

  constructor(private router:Router){};
}
