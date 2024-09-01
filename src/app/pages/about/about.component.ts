import { Component } from '@angular/core';
import {FeedbackFormComponent} from "../../components/feedback-form/feedback-form.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    FeedbackFormComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
