import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './errors/404.component';

import {
	AssetsWrapperComponent,
	AssetDetailComponent,
	AssetDetailCreateComponent,
	AssetRouteActivator,
	EventListResolver,
	AssetDetailEditComponent,
} from './ui/index';

import { AuthGuard } from './auth-guard.service';

export const appRoutes:Routes = [
  // routing assets
	{path: 'assets', component: AssetsWrapperComponent, resolve: [EventListResolver] },
	{path: 'assets/new', component: AssetDetailCreateComponent, resolve: [EventListResolver],
    // canActivate: [AuthGuard] // TOFIX: allow asset creation only when user is logged in
    // canDeactivate: ['canDeactivateCreateAsset'] // TODO: read more about it
    },
	{path: 'assets/:id', component: AssetDetailComponent, resolve: [EventListResolver],
    canActivate: [AssetRouteActivator] },
	{path: '', redirectTo: '/assets', pathMatch: 'full' }, // defining a default route


  // this is saying when a route starts with /user, load the UserModule from this path
	{path: 'user', loadChildren: 'app/user/user.module#UserModule'}, 
  

  {path: '404', component: Error404Component },
  {path: '**', redirectTo: '/404' }, // wildcard that catch url all it doesn't know.
];

/* ROUTER IN A NUTSHELL:
    1)  add the <router-outlet> component to our app.component
    2)  we define our routes for our pages (including the default route) into routes.ts placed din the root of the app
    3)  we load our routes into our events module using the router module
    4)  add the <base href="/"> into our HTML page

    5) 'redirectTo' requires 'pathMatch' property whose options are two: prefix or full. 
	  prefix will redirect if the URL starts with the specified path string.
	  full means redirect if it fully matches the specified path string.
*/

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}