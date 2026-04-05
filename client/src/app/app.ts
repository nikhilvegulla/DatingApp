import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Nav } from '../layout/nav/nav';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected router = inject(Router);

  private httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.httpClient.get('https://localhost:7162/api/Buggy/not-found').subscribe({
      next: (response) => console.log('Auth check successful:', response),
      error: (error) => console.error('Auth check failed:', error),
    });
  }
}
