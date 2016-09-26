import {Injectable} from "@angular/core";
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero } from './hero';


@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes';  // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }
    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getHeroes());
    }

    getHero(id: number): Promise<Hero> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data.find(x => x.id === id) as Hero)
            .catch(this.handleError);

       // return Promise.resolve(HEROES.find(x => x.id === id));
    }

    handleError: (reason: any) => Hero[] | PromiseLike<Hero[]>;
}