import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
import {AboutPage} from "./pages/AboutPage";

export const useRoutes=isAunthenticated=>{
          if(isAunthenticated){
              return(
                  <Switch>
                      <Route path="/links" exact>
                      <LinksPage/>
                      </Route>
                      <Route path="/create" exact>
                      <CreatePage/>
                     </Route>
                     <Route path="/detail/:id">
                      <DetailPage/>
                      </Route>
                      <Route path="/about">
                          <AboutPage/>
                      </Route>
                      <Redirect to="/create" />
                  </Switch>
              )
          }
          return(
              <Switch>
                  <Route path="/" exact>
                   <AuthPage/>
                  </Route>
                  <Redirect to="/" />
              </Switch>

          )

}