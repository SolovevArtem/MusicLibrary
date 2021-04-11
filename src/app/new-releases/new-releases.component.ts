import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { MusicDataService } from './../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: Array<any>;
  newReleaseSubscribe: Subscription;

  constructor(private musicDataService: MusicDataService) {}

  ngOnInit(): void {
    this.newReleaseSubscribe = this.musicDataService
      .getNewReleases()
      .subscribe((data) => {
        this.releases = data.albums.items;
      });
  }

  ngOnDestroy(): void {
    this.newReleaseSubscribe.unsubscribe();
  }
}
