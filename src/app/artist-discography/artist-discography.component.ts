import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums: Array<any>;
  artist: any;
  paramSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.musicDataService.getArtistById(params.id).subscribe((data) => {
        this.artist = data;
      });
      this.musicDataService.getAlbumsByArtistId(params.id).subscribe((data) => {
        this.albums = data.items;
      });
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
