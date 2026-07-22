import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-career-cta',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './career-cta.component.html',
    styleUrl: './career-cta.component.scss'
})
export class CareerCtaComponent { }
