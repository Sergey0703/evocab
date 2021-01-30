import React, {useEffect,useState,useContext,useCallback} from 'react';
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {WordCard} from '../components/WordCard'
//import firebase from '../firebase';
//import {WordStatus} from '../components/WordStatus';
//import {WordsAllToday} from '../components/WordsAllToday'
//import {WordSound} from '../components/WordSound'


//db.collection("cities").get().then(function(querySnapshot) {
//    console.log(querySnapshot.numChildren());
//});

export const TrainWordsPage=()=>{
   
    const [word, setWord] = useState(null)
    const [countAll,setCountAll]=useState(0)
    const [countBad,setCountBad]=useState(0)
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
  
    const fetchWord = useCallback(async (navWord, nav) => {
        
      try {
        const fetched = await request('/api/vocab/', 'GET', null, {
          Authorization: `Bearer ${token}`,nav:nav,navWord:navWord
        })
        setWord(fetched[0])
        setCountAll(fetched[1])
        setCountBad(fetched[2])
      } catch (e) {}
    }, [token, request])
  
    useEffect(() => {
      fetchWord(null,null)
    }, [fetchWord])
  

    const onStatus=useCallback(async (myword,wordStatus)=>{
      //  const onStatus=async (myword,wordStatus)=>{  
             try {
              const Ok = await request('/api/vocab/code', 'POST', {code:myword.code,status:wordStatus}, {
                Authorization: `Bearer ${token}`
              })
             // setWord(fetched)
             //console.log('after0')
            } catch (e) {}
           fetchWord(null,null)
         }, [token, request]
    )

    const onNav=(myword,Nav)=>{
        
             fetchWord(myword.trainDate,Nav)
          
    }

    if (loading) {
        //return <Loader/>
        }


    
    return (
        
      <div  >
       {word && <WordCard word={word} onToggle={onStatus} countAll={countAll} countBad={countBad} onToggleNav={onNav}/>} 
           
     
    
    </div>

        
    )

}