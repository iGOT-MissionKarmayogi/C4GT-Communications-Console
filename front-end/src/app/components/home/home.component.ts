import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit(): void {  
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/dashboard']);
    }
  }

  
async onSubmit() {
  if (this.loginForm.valid) {
    try {
      const response = await firstValueFrom(this.auth.login(this.loginForm.value));
      console.log(response);
      this.router.navigate(['/dashboard']);
    } catch (error:any) {
      console.log(error);
    }
  }
}

}

