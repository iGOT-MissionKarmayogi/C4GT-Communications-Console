import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserFilterComponent } from './user-filter/user-filter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserFilterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-filter-app';
}
