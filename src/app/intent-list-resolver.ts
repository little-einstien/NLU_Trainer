import { Injectable } from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu.component';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DataHandlerService } from './data-handler.service';
@Injectable()
export class IntentListResolve implements Resolve<any> {
  constructor(private dataHandlerService: DataHandlerService, private router: Router,private side : SideMenuComponent) { }
  resolve(route: ActivatedRouteSnapshot){
    console.log("Resolver configured");
      return this.dataHandlerService.getProjectList().then((list)=>{
        console.log(list);
        return this.dataHandlerService.getIntentList(list[0].id).then((intents) =>{
            console.log(intents);
            console.log(this.side.test());
            return intents;
        });
      });
  }
}
