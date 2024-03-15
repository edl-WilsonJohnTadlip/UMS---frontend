import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  authService = inject(AuthService);

  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    
  }

}
