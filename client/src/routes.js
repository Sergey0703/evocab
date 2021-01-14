import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
import {AboutPage} from "./pages/AboutPage";
import {VocabPage} from "./pages/VocabPage";
import AdminPage from "./pages/AdminPage";
import {TrainWordsPage} from "./pages/TrainWordsPage";
import {TrainSoundPage} from "./pages/TrainSoundPage";

export const useRoutes=isAunthenticated=>{
          if(isAunthenticated){
              return(
                  <Switch>
                      <Route path="/links" exact>
                      <LinksPage/>
                      </Route>
                      <Route path="/trainwords" exact>
                      <TrainWordsPage/>
                      </Route>
                      <Route path="/trainsound" exact>
                      <TrainSoundPage/>
                      </Route>
                      <Route path="/create" exact>
                      <CreatePage/>
                     </Route>
                     <Route path="/vocab" exact>
                      <VocabPage/>
                     </Route>
                     <Route path="/admin" exact>
                      <AdminPage/>
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