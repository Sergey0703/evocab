import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {CreatePage} from './pages/CreatePage'
import {AuthPage} from "./pages/AuthPage";
import {AboutPage} from "./pages/AboutPage";
import {VocabPage} from "./pages/VocabPage";
import AdminPage from "./pages/AdminPage";
import {TrainWordsPage} from "./pages/TrainWordsPage";
import {TrainWordsPage2} from "./pages/TrainWordsPage2";
import {TrainSoundPage} from "./pages/TrainSoundPage";

export const useRoutes=isAunthenticated=>{
          if(isAunthenticated){
              return(
                  <Switch>
                      <Route path="/trainwords" exact>
                      <TrainWordsPage/>
                      </Route>
                      <Route path="/trainwords2" exact>
                      <TrainWordsPage2/>
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
                     <Route path="/about">
                          <AboutPage/>
                      </Route>
                      <Redirect to="/trainwords" />
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