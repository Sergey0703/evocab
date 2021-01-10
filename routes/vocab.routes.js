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
        code, word:d[0], 
        owner: req.user.userId, 
        translate: d[1],
        transcript: d[3],
        sound: d[5],
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

router.get('/', auth, async (req, res) => {
  //getWord(req.user.userId,res)
  try {
    const word = await Word.findOne({ owner: req.user.userId }).sort( {"trainDate" : 1} )
    const _start = new Date();
    _start.setHours(0,0,0,0);
    const _end = new Date();
    _end.setHours(23,59,59,999);
    const wordAll = await Word.find({ owner: req.user.userId,trainDate: { $gte: _start, $lte: _end } }).countDocuments()
    const wordBad= await Word.find({ owner: req.user.userId,trainDate: { $gte: _start, $lte: _end },train1:false }).countDocuments()
  //  console.log('count',wordAll)
    const ans=[word,wordAll,wordBad]

    res.json(ans)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова0' })
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