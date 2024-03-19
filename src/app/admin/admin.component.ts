import { Component } from '@angular/core';
import { UserProfileService } from '../service/user-profile.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})

export class AdminComponent {

  userProfile: any;

  constructor(
    private userProfileService: UserProfileService
  ){}

  ngOnInit(): void {
    const role = 'admin';
    this.userProfileService.getUserProfile('role')
    .subscribe((data) => {
        this.userProfile = data;
      }
    )
  }

  logout(){

  }

}
