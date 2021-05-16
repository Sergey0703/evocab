const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Word = require('../models/Word')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post('/add', auth, async (req, res) => {
  try {
  
    //const baseUrl = config.get('baseUrl')
    const {from} = req.body
    const code = shortid.generate()
    //console.log('enword=',from)
    const existing = await Word.findOne({ from })
    //console.log('exis=',existing)
    if (existing) {
      return res.json({ from: existing })
    }
    // console.log('exis2=',existing)
   // const to = baseUrl + '/t/' + code

    const word = new Word({
      code, word:from, owner: req.user.userId
    })

    await word.save()

    res.status(201).json({ word })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова1' })
  }
})

 
  

router.post('/importcsv', auth, async (req, res) => {
 
  try {
  
    //const baseUrl = config.get('baseUrl')
    const {from} = req.body

    console.log('w1=',from[0])
    for (var i=0, len=from.length; i<len; i++) {
      var d=from[i];
      console.log('d=',d[0])
      if (!d[3]) {
        d[3]="";
      }
      if (!d[5]) {
        d[5]="";
      }
      //console.log('enword=',from)
      /*
      const existing = await Word.findOne({ from })
      //console.log('exis=',existing)
      if (existing) {
        return res.json({ from: existing })
      }
      // console.log('exis2=',existing)
     // const to = baseUrl + '/t/' + code
     */
     const code = shortid.generate()
      const word = new Word({
        code, 
        word:d[0].trim(), 
        owner: req.user.userId, 
        translate: d[1].trim(),
        transcript: d[3].trim(),
        sound: d[5].trim(),
        train1: false
      })
  
      await word.save()




    }
    //const code = shortid.generate()
 
    //const existing = await Word.findOne({ from })
    //console.log('exis=',existing)
    //if (existing) {
    //  return res.json({ from: existing })
    //}
    // console.log('exis2=',existing)
   // const to = baseUrl + '/t/' + code

    //const word = new Word({
    //  code, word:from, owner: req.user.userId
    //})

    //await word.save()

    res.status(201).json({ from })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова2' })
  }
})


/*const getWord=async (userId,res)=>{
try {
  const word = await Word.findOne({ owner: userId }).sort( {"trainDate" : 1} )
  res.json(word)
} catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова3' })
}
}*/
router.get('/words', auth, async (req, res) => {
  const _start = new Date();
  _start.setHours(0,0,0,0);
  const _end = new Date();
  _end.setHours(23,59,59,999);
try {
  
   words = await Word.find({ owner: req.user.userId,trainDate: { $gte: _start, $lte: _end } }).sort( {train1:1,"trainDate" : 1} )
 // console.log('word=',word)
  
  const ans=words
  res.json(ans)
} catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова01' })
}

})

router.get('/', auth, async (req, res) => {
 
  const nav=req.headers.nav;
  const navWord=req.headers.navword;
  let word;
  let countPrev;
  let countNext;
  const _start = new Date();
    _start.setHours(0,0,0,0);
    const _end = new Date();
    _end.setHours(23,59,59,999);
  try {
    if((nav=='null')&&(navWord=='null')){
      console.log('first')
     word = await Word.findOne({ owner: req.user.userId }).sort( {"trainDate" : 1} )
   // console.log('word=',word)
    }else if((nav=='prev')&&(navWord!='null')){
     
       word = await Word.findOne({ owner: req.user.userId,trainDate: { $lt: navWord } }).sort( {"trainDate" : -1} )
       if(word===null){
        word = await Word.findOne({ owner: req.user.userId }).sort( {"trainDate" : -1} ) 
       } 
      // countPrev = await Word.find({ owner: req.user.userId,trainDate: { $gt: navWord } }).sort( {"trainDate" : -1} ).countDocuments()
      // console.log('countPrev=',countPrev)
      }

      else if((nav=='next')&&(navWord!='null')){
     
        word = await Word.findOne({ owner: req.user.userId,trainDate: { $gt: navWord } }).sort( {"trainDate" : 1} ) 
        if(word===null){
        word = await Word.findOne({ owner: req.user.userId,trainDate: { $gte: navWord } }).sort( {"trainDate" : 1} ) 
         } 
       // countNext = await Word.find({ owner: req.user.userId,trainDate: { $lt: navWord } }).sort( {"trainDate" : 1} ).countDocuments()
       // console.log('countNext=',countNext)
       }
    
    
    const wordAll = await Word.find({ owner: req.user.userId,trainDate: { $gte: _start, $lte: _end } }).countDocuments()
    const wordBad= await Word.find({ owner: req.user.userId,trainDate: { $gte: _start, $lte: _end },train1:false }).countDocuments()
    console.log('count1',wordAll)
    console.log('count2=',wordBad)
    //const ans=[word,0,0]
    const ans=[word,wordAll,wordBad]
    console.log('count02=',wordBad)
    res.json(ans)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова01' })
  } 
})


router.post('/code', async (req, res) => {
  try {
    //console.log('code=',req.body.code)
    const word = await Word.findOne({ code: req.body.code })

    if (word) {
      word.train1=req.body.status
      word.trainDate=new Date()
      await word.save()
      return res.json("Ok")
      //getWord(req.body.user.userId,res)
      //return res.status(201).json("Ok")
      //return res.redirect(link.from)
    }

    res.status(404).json('Ссылка не найдена')

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова4' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router