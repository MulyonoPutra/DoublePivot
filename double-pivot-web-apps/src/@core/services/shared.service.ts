import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavbarProfile } from '../utility/interface/navbar-profile';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  private trivia$ = new BehaviorSubject<string>('');
  private articles$ = new BehaviorSubject<string>('');
  private profile$ = new BehaviorSubject<NavbarProfile>({} as NavbarProfile);

  getProfile(): Observable<NavbarProfile> {
    return this.profile$.asObservable();
  }

  setProfile(profile: NavbarProfile) {
    this.profile$.next(profile);
  }

  getTrivia(): Observable<string> {
    return this.trivia$.asObservable();
  }

  setTrivia(categoryId: string) {
    this.trivia$.next(categoryId);
  }

  getArticles(): Observable<string> {
    return this.articles$.asObservable();
  }

  setArticles(categoryId: string) {
    this.articles$.next(categoryId);
  }
}


