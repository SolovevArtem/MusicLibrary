import { Subscription } from 'rxjs';
import { MusicDataService } from './../music-data.service';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any;
  searchQuery: any;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      this.musicDataService
        .searchArtists(this.searchQuery)
        .subscribe((data) => {
          // images with array property with length greater than 0 will be assigned to results
          this.results = data.artists.items.filter(
            (item) => item.images.length > 0
          );
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
