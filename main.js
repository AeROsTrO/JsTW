const TypeWriter = function(txtElement, words, wait=3000){
this.txtElement=txtElement;
this.words=words;
this.txt='';
//txt is current text
this.wordIndex=0;
this.wait=parseInt(wait, 10);//10 is to indicate convert to number with base 10
this.type();
this.isDeleting=false;//represents state of deleting

}
//type method
TypeWriter.prototype.type=function(){

    //current index of word
    const current=this.wordIndex%this.words.length;
    // console.log(current);
    //get full text of current word
    const fulltxt= this.words[current];
    //check if deleting
    if(this.isDeleting){
        //remove character
        this.txt=fulltxt.substring(0, this.txt.length-1);
    }
    else{
        //add character
        this.txt=fulltxt.substring(0, this.txt.length+1);
    }
    //insert txt into element
    this.txtElement.innerHTML=`<span class="txt">${this.txt}</span>`;

    //type speed
    let typeSpeed =400;
    if(this.isDeleting){
        typeSpeed/=2.5;
    }
    //check if word is complete
    if(!this.isDeleting && this.txt===fulltxt){
        typeSpeed=this.wait;
        //set delete to true
        this.isDeleting=true;
        typeSpeed=400;
    }
   
   

    else if(this.isDeleting && this.txt==''){
         this.isDeleting=false;
          //incrementing word index (to move to the next word)
        this.wordIndex++;
        //pause before typing
        
    }
    setTimeout(()=>this.type(), typeSpeed);//type method runs every half second
}
//intialise upon on dom load                    
document.addEventListener('DOMContentLoaded', init);
//init app
function init(){
const txtElement=document.querySelector('.txt-type');
const words=JSON.parse(txtElement.getAttribute('data-words'));
const wait=txtElement.getAttribute('data-wait');

//init typewriter
new TypeWriter(txtElement, words, wait);
}
