import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AssetService } from './../ui/asset.service';
import { map, tap, filter, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


import { IAsset } from './../ui/assets.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private assetService: AssetService){}

  storeAssets() {
    const assets = this.assetService.getAssetsObs();

    // put overwride all data that are in a node
    this.http.put('https://asset-grouping-app-exercise.firebaseio.com/testingPut.json', 
    assets)
    .subscribe(res => {
      console.log(res);
    });
  }
  
  fetchAssets() {
    return this.http.get<IAsset>(
      'https://asset-grouping-app-exercise.firebaseio.com/Assets.json', 
      {
       headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
       params: new HttpParams,
       responseType: 'json' 
      })
      // .pipe(
      //   filter(asset => asset.group_id == "2"),
      //   tap(asset => {return console.log(asset)})
      // map(asset => asset.)
      .subscribe(res => console.log(res))
  }



  fetchAssetsFromDb(): Observable<IAsset>{
    const assetsDataUrl = this.http
      .get<{[key: string]: IAsset}>( // key is the string generated by firebase 
      'https://asset-grouping-app-exercise.firebaseio.com/Assets'+ ".json");

    return assetsDataUrl
    .pipe(
      map((res: {id: string, IAsset}) => {
        const assetsArr: IAsset = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)){
            assetsArr.push({id: key, ...res[key]});
          }
        }
        return assetsArr
      }),
      tap(assets => {
        this.assetService.setAssets(assets);
      }),
      catchError(errorRes => {
        // Send to analytics server
        return throwError(errorRes);
      })
    )
  }

}

// TODO: deleting a group, delete also all assets linked to it. 