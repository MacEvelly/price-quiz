var refresVar = "sadf";

//////////////////////////
// Plug-in
//////////////////////////
(function( $ ) {
  console.log("start")
  var mHeight, mWidth, mHolder
  var holder, options, mostly, quiz
  var myClick = ('ontouchstart' in window || navigator.maxTouchPoints)? "touchstart": "click";
  var app = {
    makeQuiz: function(){
      var quiz = app.options.quiz
      var mostly = []

      var returnUL = $("<ul/>", {'class':'quiz'})

      // Make questions
      for(let q in quiz.questions){
        var question = quiz.questions[q]
        var qHolder = $("<li>"+
                        "<div >"+
                        "<p>"+question.question+"</p>"+
                        "</div>"+
                        "</li>").appendTo(returnUL)
        
        $(qHolder).addClass("Q")

        $(qHolder).find(">div").css("background-image", "url('img/ME_Food_Question_"+(parseInt(q)+1)+".png')");

        var cHolder = $("<ul/>").appendTo(qHolder)
        for(let c in question.choices){
          var choice = $('<li data-c="'+c+'" class="C"><div>'+question.choices[c]+'</div></li>')
          .css("background-image", "url('img/Q"+(parseInt(q)+1)+"_C"+(parseInt(c)+1)+".png')")
          .appendTo(cHolder)
          }
        $(cHolder).myShuffle()

      }
      $(returnUL).myShuffle()

      var title = $("<li class='title'><div></div><div></div></li>").prependTo(returnUL)
      var results = $("<li class='results'><div></div><div></div></li>").prependTo(returnUL)

      function cycle(){
        console.log("cycle")
        if($(this).hasClass("takeAgain")){
          $(".choosen").removeClass("choosen")  
          //skip 
          var Next = $(returnUL).find(">li:first-child" )
          $(Next).parent().append(Next)
        } 
        if($(this).hasClass("C")){
          $(this).siblings().removeClass("choosen")  
          $(this).addClass("choosen")  
        }

        var Next = $(returnUL).find(">li:first-child" )
        $(Next).parent().append(Next)

        if($(returnUL).find(">li:nth-child(2)").hasClass("results")){
          var correct = $('.choosen[data-c="0"]').length
          var total   = $(".Q").length
         
          var newResults = $("<div><h1>Results:</h1>You got "+correct+" out of "+total+" correct!</div>")
          var againBTN = $("<div class='takeAgain'>Take Again?</div>").appendTo(newResults)
          $(".results>div:nth-child(1)").html(newResults)

          $(againBTN).on("click",cycle)
        }
      }
      $(returnUL).find(".C, .takeAgain, .title").on("click",cycle)

      return returnUL
    },
    mainBuild: function(holder, options){
      app.options = options
      app.quiz    = app.makeQuiz()
      $(holder).addClass("quizHolder")      
      $(holder).append(app.quiz)
      $(app.quiz).myFit()
    }
  }

  /////////////// Utility Functions
  $.fn.myFit = function(){
    var mHolder = $(this)
    function myResize(){
      var newScale = Math.min( 
        $(mHolder).parent().width()  / mWidth, 
        $(mHolder).parent().height() / mHeight 
      );
      var scale = (newScale > 1)? 1: newScale;
      $(mHolder).css({
        transform: "scale(" + scale + ") translate(-50%, -50%)"
      });
    }
    mHolder = $(this)
    mHeight = this.height()
    mWidth = this.width()
    $(window).on("resize", myResize);
    $(window).trigger("resize");
  }
  $.fn.myShuffle = function () {
    var parent = $(this);
    var divs = parent.children();
    while (divs.length) {
      parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
  }
  $.fn.makeQuiz = function(options) {
    app.mainBuild(this, options)
  } 

}( jQuery ));

//////////////////////////
// init IIFE
//////////////////////////
(function(){
  console.clear()
  console.clear()

  var options = {
    quiz:{
      "questions": [{
        "question":"TV Dinner",
        "choices":["98 cents","1.90","2.90","52 cents"]
      },
                    {
                      "question":"Milk",
                      "choices":["22 cents per quart","2 cents per quart","52 cents per quart","92 cents per quart"]
                    },
                    {
                      "question":"Cola Drinks",
                      "choices":["32 cents","12 cents","62 cents","92 cents"]
                    },
                    {
                      "question":"Mustard",
                      "choices":["10 cents per 6 oz","30 cents","2 cents","52 cents"]
                    },
                    {
                      "question":"Strawberry Jam",
                      "choices":["29 cents per 12 oz.","99 cents for 12 ounces","9 cents for 12 ounces","79 cents for 12 ounces"]
                    },
                    {
                      "question":"Grape Jelly",
                      "choices":["26 cents for 12 ounces","96 cents for 12 ounces","6 cents for 12 ounces","76 cents for 12 ounces"]
                    },
                    {
                      "question":"Gelatin",
                      "choices":["9 cents for a packet","99 cents","2 cents","62 cents"]
                    },
                    {
                      "question":"Butter",
                      "choices":["72 cents per pound","22 cents per pound","1 dollar 52 cents per pound","42 cents per pound"]
                    },
                    {
                      "question":"Ham",
                      "choices":["70 cents per pound","20 cents per pound","40 cents per pound","1 dollar per pound"]
                    }],
    }
  }

  $('.holder').makeQuiz(options)

})()