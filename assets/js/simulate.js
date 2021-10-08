
function simulateIPD(cntRounds, strategy1="random", strategy2="random") {
    var value="";
    var pl1PrevPlay="";
    var pl1CurrPlay="";
    var pl2PrevPlay="";
    var pl2CurrPlay="";
    var pl1Reward=0;
    var pl2Reward=0;
    var pl1Money=0;
    var pl2Money=0;

    pl1CurrPlay = getNextPlay(strategy1,'','');
    pl2CurrPlay = getNextPlay(strategy2,'','');

    for(let i= 0; i<cntRounds; i++) {
        pl1Reward = getPlayerReward(pl1CurrPlay, pl2CurrPlay);
        pl2Reward = getPlayerReward(pl2CurrPlay, pl1CurrPlay);
        pl1Money += pl1Reward;
        pl2Money += pl2Reward;
        value += i+") "
        value+="P1 " + pl1CurrPlay + "; P2 " + pl2CurrPlay;
        value+="\t\tP1 wins " +pl1Reward + "; P2 wins " +pl2Reward;
        value+="\n";
        pl1PrevPlay = pl1CurrPlay;
        pl2PrevPlay = pl2CurrPlay;
        pl1CurrPlay = getNextPlay(strategy1, pl1PrevPlay, pl2PrevPlay);
        pl2CurrPlay = getNextPlay(strategy2, pl2PrevPlay, pl1PrevPlay);
    }
    value+="\nTotal amount P1 "+pl1Money + "; P2 " +pl2Money;
    document.getElementById('simulationResults').value = value;
  }

  function getNextPlay(strategy, lastPlay, oppPlay){
      var nextPlay;
      switch(strategy){
          case 'random':
              var rnd = Math.floor(Math.random()*11);
              if(rnd>5) nextPlay="Collaborate";
              else nextPlay="Defect";
              break;
            case 'tittat':
                if(oppPlay) nextPlay = oppPlay; //If we know the opponent last move, repeat that move
                else nextPlay='Collaborate';    //if not (i.e. first round), collaborate
                break;
            case 'hawk':
                nextPlay = 'Defect';            //hawks always defect
                break;
            case 'dove':
                nextPlay = 'Collaborate';       //doves always collaborate
                break;
            case 'alternate':
                if(lastPlay==='Collaborate') nextPlay='Defect';   //alternate the move every round
                else nextPlay='Collaborate';
                break;
            case 'trigger':
                    if(lastPlay==='Collaborate' && oppPlay==='Defect' ) nextPlay='Defect';  //once the opponent has defected, start defectins
                    else if(lastPlay==='Defect') nextPlay='Defect';   // ... and always defect
                    else nextPlay='Collaborate';
                    break;
    
      }
    return nextPlay;
  }

  /*
  payoff model: $10 is both defect, $30 if both collaborate, $50 for the defector,$0 for the sucker when moves are different 
  */
  function getPlayerReward(playersMove, opponentsMove){
      var reward=0;
      switch(playersMove){
          case 'Collaborate':
              if(opponentsMove==='Collaborate') reward=30;
              else reward=0;
            break;
            case 'Defect':
                if(opponentsMove==='Collaborate') reward=50;
                else reward = 10;
            break;
      }
      return reward;
  }

  function clearSimRes(){
    document.getElementById('simulationResults').value="";
  }