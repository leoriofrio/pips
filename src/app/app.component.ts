import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { RoutesKeys, TitleNames } from './app.keys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = TitleNames.PROJECT_NAME;
  

  constructor(private router: Router){
    
  }

  ngOnInit() {
    
  }
}
