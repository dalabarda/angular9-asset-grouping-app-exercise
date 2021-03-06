import { Component, Input } from '@angular/core'
import { AssetService } from './asset.service'
import { GlobalService } from './../shared/global.service'
import { DataStorageService } from './../shared/data-storage.service'
import { IAsset, IGroups } from './shared/index'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Component({
  selector: 'asset-list',
  templateUrl: 'asset-lists.component.html',
  styleUrls:  ['asset-lists.component.css']
})

export class AssetListsComponent {
  private assetsObs:      IAsset;
  private assetsInGroups: Array<T>;
  private groupArr:       any[];
  private groups:         IGroups[];
  private loadedAssets:   IAsset[];

  
  // switsch the class based on grid or list
  private itemClass: string;

  @Input('view') 
  viewClass: boolean;


  constructor(private assetService: AssetService,
              private dataStorageService: DataStorageService,
              private globalService: GlobalService,
              private http: HttpClient,
              ){  
    this.groupArr = [];
    this.assetsObs = [];
    this.assetsInGroups = [];

  }

  ngOnInit() {
    this.groups = this.assetService.getGroups(); //
    this.loadedAssets = []; // TODO:
    this.assetsObs = this.assetService.getAssetsObs(); // from dB -> firebase

    // array of arrays ordered by group.group_id
    this.groups.forEach(group => 
      this.assetsInGroups.push(
        this.assetsObs.filter( (assetObs:IAsset) => {
          var local = [];
          if(assetObs.group_id == group.id)
            return local.push(assetObs);
        })))

    this.groups.forEach(group => this.groupArr.push(group.id))

    //TODO: check what does it do and write a comment
    this.globalService.currentMessage.subscribe((message: any) => this.itemClass = message)
  
    // TESTING
    // getting DUMMY data
    console.log(this.assetsInGroups)
    
    // testing the observable stream
    console.log(this.assetsObs);
  }

}