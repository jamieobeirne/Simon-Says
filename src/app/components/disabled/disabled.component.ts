import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class DisabledComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  openHomePage(){
    this.router.navigate(['home']);
  }

}
