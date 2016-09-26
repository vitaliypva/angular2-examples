import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import {Hero} from "./hero";
import { HeroService } from './hero.service';

@Component(({
    selector: "my-heroes" ,
    templateUrl: "app/heroes.component.html",
    styleUrls: ['app/heroes.component.css']

}) as any)
export class HeroesComponent implements OnInit {
    constructor(private heroService: HeroService, private router: Router) {}

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
    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}
