import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';

import { Member } from './models/member.model';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly pageTitle = 'Client';
  private httpClient: HttpClient = inject(HttpClient);
  protected members = signal<Array<Member>>([]);

  ngOnInit(): void {
    this.httpClient.get<Array<Member>>('https://localhost:7162/api/Members').subscribe({
      next: (data: Array<Member>) => {
        this.members.set(data);
      },
      error: (error) => {
        console.error('Error fetching members:', error);
      },
      complete: () => {
        console.log('Fetch members request completed.');
      },
    });
  }
}
