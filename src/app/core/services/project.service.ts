import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from '../../shared/models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly dataUrl = 'assets/data/projects.json';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.dataUrl);
  }

  getBySlug(slug: string): Observable<Project | undefined> {
    return this.getAll().pipe(map((list) => list.find((p) => p.slug === slug)));
  }
}
