

var Twitter = require('twitter');
// var config = require('./config.js');
// var T = new Twitter(config);

const config = require('dotenv').config();

var T = new Twitter({
    consumer_key: process.env.CKEY,
    consumer_secret: process.env.CSECRET,
    access_token_key: process.env.ATKEY,
    access_token_secret: process.env.ATSECRET
  });

//Set up search parameters
var params = {
    q: 'Halloween 2018 trailer',
    filter: 'safe',
    filter: 'links',
    // filter: 'twimg',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}

T.get('search/tweets',params,function(err,data,response){
    if(!err){
        //Loop through the returned tweets
        for(let i=0; i < data.statuses.length; i++){
            //Get the tweet ID from the returned data
            let id = { id: data.statuses[i].id_str}
            //Try to favorite selected tweet
            T.post('statuses/retweet', id, function(err,response){
                //If the favorite fails, log error msg
                if(err){
                    console.log(err[0].message);
                }else{
                 //If the favorite is successful, log the url of the tweet   
                    let username = response.user.screen_name;
                    let tweetID = response.id_str;
                    console.log('Retweeted: ', `https://twitter.com/${username}/status/${tweetID}`)
                }
            });
        }
    }else{
        console.log(err);
    }
})