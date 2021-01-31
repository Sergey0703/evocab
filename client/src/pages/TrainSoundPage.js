import React, {useEffect,useState,useContext,useCallback} from 'react';
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
//import {WordCard} from '../components/WordCard'
//import firebase from '../firebase';
//import {WordStatus} from '../components/WordStatus';
//import {WordsAllToday} from '../components/WordsAllToday'
//import {WordSound} from '../components/WordSound'


//db.collection("cities").get().then(function(querySnapshot) {
//    console.log(querySnapshot.numChildren());
//});

export const TrainSoundPage=()=>{
   
    const [words, setWord] = useState([])
   // const [countAll,setCountAll]=useState(0)
   // const [countBad,setCountBad]=useState(0)
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
  
    const fetchWord = useCallback(async (navWord, nav) => {
        
      try {
        const fetched = await request('/api/vocab/words', 'GET', null, {
          Authorization: `Bearer ${token}`,nav:nav,navWord:navWord
        })
        setWord(fetched)
      
      } catch (e) {}
    }, [token, request])
  
    useEffect(() => {
      fetchWord(null,null)
    }, [fetchWord])
  

   
    if (loading) {
      return <Loader/>
    }

console.log('www=',words.length)
/*
let wordsAfter=[];
words.forEach(function (word) {
 
  console.log(word.word);
  let name=word.word.replace('<br>','');
  push(task.name)
   
});
*/
const wordsStudy=words.filter(el=>el.train1===false);
const wordsOk=words.filter(el=>el.train1===true);
const mytrim=(word)=>{
  let newword=word.replace('<br>','').trim();
  //console.log('new=',newword)
return newword;
}
console.log('www2=',wordsStudy.length)
    return (
        
      <div >
        { wordsStudy.map((link, index) => (
       
       <span><a href="">{mytrim(link.word)}</a>, </span>
      )) }

      <hr/>

     
     { wordsOk.map((link, index) => (
      
      <span> <a href="">{mytrim(link.word)}</a> , </span>
    
     )) }
    
      
    </div>
    )
}