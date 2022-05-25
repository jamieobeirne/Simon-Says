import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';




@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faTwitter = faTwitter;
  faFacebook =  faFacebook;
  faInstagram =  faInstagram;
  faYoutube =  faYoutube;

  constructor() { }

  ngOnInit(): void {
  }

}
