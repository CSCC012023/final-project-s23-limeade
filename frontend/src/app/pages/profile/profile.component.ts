import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  interestsEnum: any[] = [
    { name: 'Music concerts', selected: false },
    { name: 'Art exhibitions', selected: false },
    { name: 'Film screenings', selected: false },
    { name: 'Theater performances', selected: false },
    { name: 'Dance shows', selected: false },
    { name: 'Stand-up comedy', selected: false },
    { name: 'Literary readings', selected: false },
    { name: 'Food festivals', selected: false },
    { name: 'Wine tasting events', selected: false },
    { name: 'Sporting events', selected: false },
    { name: 'Outdoor adventures', selected: false },
    { name: 'Fashion shows', selected: false },
    { name: 'Technology conferences', selected: false },
    { name: 'Gaming conventions', selected: false },
    { name: 'Yoga and wellness retreats', selected: false },
    { name: 'Photography workshops', selected: false },
    { name: 'Charity fundraisers', selected: false },
    { name: 'Historical reenactments', selected: false },
    { name: 'Science fairs', selected: false },
    { name: 'Cultural festivals', selected: false },
  ];

  selectedInterests: string[] = [];
  user: any;
  error: string = '';
  myself: boolean = false;
  firstName: string = '';
  lastName: string = '';
  editMode: boolean = false;

  constructor(
    public api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userId = params['userId'];
      console.log(userId);
      if (userId === this.api.userId) {
        this.myself = true;
        this.api.getMe().subscribe(
          (next) => {
            this.user = next;
            console.log(this.user);
            this.firstName = next.firstName;
            this.lastName = next.lastName;
          },
          (error) => {
            this.router.navigate(['/']);
          }
        );
      } else {
        this.api.getUserById(userId).subscribe(
          (next) => {
            this.user = next;
            this.firstName = next.firstName;
            this.lastName = next.lastName;
          },
          (error) => {
            this.router.navigate(['/']);
          }
        );
      }
    });
  }

  toggleEditMode(): void {
    this.error = '';
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    this.error = '';
    console.log('saved');
    const selectedInterests = this.interestsEnum
      .filter((interest) => interest.selected)
      .map((interest) => interest.name);
    console.log(selectedInterests);
    console.log(this.firstName);
    console.log(this.lastName);
    if (this.firstName === '' || this.lastName === '') {
      this.error = 'firstname and lastname are required';
      return;
    }
    this.api
      .patchProfile(
        this.user._id,
        this.firstName,
        this.lastName,
        selectedInterests
      )
      .subscribe(
        (next) => {
          this.api.updateUserInfo();
          this.reloadPage();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  reloadPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

  getSelectedInterests(): void {
    const selectedInterests = this.interestsEnum
      .filter((interest) => interest.selected)
      .map((interest) => interest.name);
    console.log(selectedInterests);
  }
}
