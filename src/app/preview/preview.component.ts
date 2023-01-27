import { Component, Input } from '@angular/core';


import { Ballot } from '../generator/generator.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  @Input() ballot!: Ballot;
 
}


