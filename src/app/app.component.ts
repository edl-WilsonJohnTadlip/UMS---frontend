import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'project-user-management-frontend';

  ngOnInit(): void {
    initFlowbite();
  }

}
