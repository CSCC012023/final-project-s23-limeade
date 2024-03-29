import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  interestsEnum: any[] = [];
  blockedUsers: User[] = [];
  user!: User;
  error: string = '';
  myself: boolean = false;
  firstName: string = '';
  lastName: string = '';
  editMode: boolean = false;

  constructor(
    public api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userId = params['userId'];
      if (userId === this.api.userId) {
        this.myself = true;
        this.api.getMe().subscribe(
          (next) => {
            this.user = next;
            this.firstName = next.firstName;
            this.lastName = next.lastName;
            this.updateInterests();
            this.updateBlockedUsers();
          },
          (error) => {
            this.router.navigate(['/']);
          },
        );
      } else {
        this.api.getUserById(userId).subscribe(
          (next) => {
            this.user = next;
            this.firstName = next.firstName;
            this.lastName = next.lastName;
            this.updateInterests();
          },
          (error) => {
            this.router.navigate(['/']);
          },
        );
      }
    });
  }

  updateInterests(): void {
    this.api.getInterests().subscribe((next) => {
      next.forEach((interest) => {
        let selected = false;
        if (this.user.interests.includes(interest)) {
          selected = true;
        }
        this.interestsEnum.push({
          name: interest,
          selected: selected,
        });
      });
    });
  }

  updateBlockedUsers(): void {
    this.user.blocked.forEach((userId: string) => {
      this.api.getUserById(userId).subscribe((next) => {
        this.blockedUsers.push(next);
      });
    });
  }

  toggleEditMode(): void {
    this.error = '';
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    this.error = '';
    const selectedInterests = this.interestsEnum
      .filter((interest) => interest.selected)
      .map((interest) => interest.name);
    if (this.firstName === '' || this.lastName === '') {
      this.error = 'firstname and lastname are required';
      return;
    }
    this.api
      .patchProfile(
        this.user._id,
        this.firstName,
        this.lastName,
        selectedInterests,
      )
      .subscribe(
        (next) => {
          this.api.updateUserInfo();
          this.reloadPage();
        },
        (error) => {
          console.log(error);
        },
      );
  }

  reloadPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

  blockUser() {
    this.api.blockUser(this.user._id).subscribe((next) => {
      this.router.navigate(['/']);
    });
  }

  unblockUser(userID: string) {
    this.api.unblockUser(userID).subscribe((next) => {
      this.router.navigate(['/']);
    });

  };

  setToBasic(){
    console.log("clicked set to basic");
    this.api.switchToBasic().subscribe(
      (next)=>{
        this.user = next;
        this.api.type = this.user.type;
      }
    )
  };

}
