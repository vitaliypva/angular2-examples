import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import {Hero} from "./hero";
import { HeroService } from './hero.service';

@Component(({
    selector: "my-heroes",
    templateUrl: "app/heroes.component.html",
    styleUrls: ['app/heroes.component.css']

}) as any)
export class HeroesComponent implements OnInit {
    constructor(private heroService: HeroService, private router: Router) { }

    ngOnInit(): void {
        this.heroService.getHeroes().then(x => this.heroes = x);
    }

    selectedHero: Hero;
    heroes: Hero[];
    //get heroes(): Hero[] {
    //    return this._heroes;
    //   // return this.heroService.getHeroes();
    //};
    //set heroes(value: Hero[]) {
    //    this._heroes = value;
    //}
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }
    gotoDetail(): void {
        //  let link = ['/detail', hero.id];
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.create(name)
            .then(() => {
                this.heroService.getHeroes()
                    .then(x => {
                        this.heroes = x;
                        this.selectedHero = x.find(y => y.name === name);
                    });
            });
    }

    delete(hero: Hero): void {
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }
}
