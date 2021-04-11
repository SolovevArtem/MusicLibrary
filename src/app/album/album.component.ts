import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;
  albumSubscription: Subscription;

  constructor(
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.albumSubscription = this.route.params.subscribe((params: Params) => {
      this.musicDataService
        .getAlbumById(params.id)
        .subscribe((data) => (this.album = data));
    });
  }

  ngOnDestroy(): void {
    if (this.albumSubscription) {
      this.albumSubscription.unsubscribe();
    }
  }

  addToFavourites(trackId): void {
    this.musicDataService.addToFavourites(trackId).subscribe(
      (data) => {
        this.matSnackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      (err) => {
        this.matSnackBar.open('Unable to add song to Favourites...', 'Done', {
          duration: 2500,
        });
      }
    );
  }
}
