import { Component, Input } from '@angular/core'
import { IAsset, TruncatePipe } from './shared/index'
import { GlobalService } from './shared/global.service'


@Component({
  selector: 'asset-item',
  templateUrl: 'assetItem.component.html',
  styles: [`
    .info {
      font-size: 10px;
    }
  
    .list > span {
      margin-right: 75px;
      display: inline-flex;
      width: calc(100% / 6);
    }

    .grid > span {
      margin-right: 75px;
      display: block;
      width: calc(100% / 6);
    }

    .location {
      text-align: right;
    }

  `] // '!important' otherwise, this style will get overridden by another one.
})
export class AssetItemComponent {
  @Input() asset : IAsset   
  
  // switsch the class based on grid or list
  private itemClass:string;

  getStartTypeStyle():Object {
    if (this.asset && this.asset.group_id === 1)
      return {color: '#007777', 'font-weight': 'bold'}
    if (this.asset && this.asset.group_id === 2)
      return {color: '#770000', 'font-weight': 'bold'}
    return {}
  }

  getFirstString(): any {
    this.asset && this.asset.description.substring(0, 20)
    return {}
  }

  
 

  constructor(private globalService: GlobalService) { 
    this.globalService.currentMessage.subscribe(message => this.itemClass = message)
   }






}