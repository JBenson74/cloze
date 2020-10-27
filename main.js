function snapSelectionToWord() {
  var sel, ans, anch;
  // Check for existence of window.getSelection() and that it has a  
  // modify() method. IE 9 has both selection APIs but no modify() method. 
  if (window.getSelection && (sel = window.getSelection()).modify) {
    sel = window.getSelection();
    ans = sel.toString();
    anch = sel.anchorNode;
    if (!sel.isCollapsed) { // Detect if selection is backwards
      var range = document.createRange();
      range.setStart(sel.anchorNode, sel.anchorOffset);
      range.setEnd(sel.focusNode, sel.focusOffset);
      var backwards = range.collapsed;
      //range.detach(); // modify() works on the focus of the selection 
      var endNode = sel.focusNode,
        endOffset = sel.focusOffset;
      sel.collapse(sel.anchorNode, sel.anchorOffset);
      var direction = [];
      if (backwards) {
        direction = ['backward', 'forward'];
      } else {
        direction = ['forward', 'backward'];
      }
      sel.modify("move", direction[0], "character");
      sel.modify("move", direction[1], "word");
      sel.extend(endNode, endOffset);
      sel.modify("extend", direction[1], "character");
      sel.modify("extend", direction[0], "word");
      
      
      //sel.extend(endNode, endOffset);
    	ans = sel.toString();	
      var i = 0;
      var sentReg = /[a-zA-Z ]*\./;
      var sentence = sentReg.test(sel);
      
      //     DONE TO END OF SENTENCE, NEED TO GET THE START
           
/*       while (sentence === false){
        //sel.modify("extend", direction[1], "character");
        sel.modify("extend", "forward", "word");  
        sentence = sentReg.test(sel.toString());  
      } */
      
      //     DONE TO END OF SENTENCE, NEED TO GET THE START
      
      let frontrange = new Range();
      range.setStart(sel.anchorNode, sel.anchorOffset);
      range.setEnd(sel.anchorNode, sel.anchorOffset);
      endNode = sel.focusNode;
      endNode = sel.anchorNode;
      endOffset = sel.focusOffset;      
      
/*       sel.extend(endNode, endOffset);
            
      sel.modify("extend", "backward", "character");  
      sel.modify("extend", "backward", "word");   */
      
      //sel.extend(endNode, endOffset);      
      var sentRegy = /[A-Z]+[A-Za-z ]*\./;
      var sentencey = sentRegy.test(sel);
      	sentencey = sentRegy.test(sel);
      //}
      
      //document.getElementById("myText").innerText = ans + " IS_SENTENCE: " + sentence; 
      
      //document.write(ans + " ");
      //i++;
      //}
    }
  }
  //const word = (selection.toString() || '').trim();
  //const word = (selection.toString() || '').trim();

  //var mySentence = getSentence(sel);  
  //document.getElementById("myText").innerText = mySentence + " IS_SENTENCE: " + "done";   
  //alert(mySentence);
  alert("hello");
  
  
}

function getSentence(word) {
    let wordContent = '';
    const upNum = 4;
    const selection = window.getSelection();

    if (selection.rangeCount < 1)
        return;

    var node = selection.getRangeAt(0).commonAncestorContainer;

    if (['INPUT', 'TEXTAREA'].indexOf(node.tagName) !== -1) {
        return;
    }

    node = getBlock(node, upNum);

    if (node !== document) {
        wordContent = node.innerText;
    }
    
    return cutSentence(word, wordContent);
}

function getBlock(node, deep) {
    const blockTags = ['LI', 'P', 'DIV', 'BODY'];
    if (blockTags.indexOf(node.nodeName.toUpperCase()) !== -1 || deep === 0) {
        return node;
    } else {
        return getBlock(node.parentElement, deep - 1);
    }
}

//document.getElementById("myText").innerText = mySentence + " IS_SENTENCE: " + sentence; 

function cutSentence(word, sentence) {
    var autocut = true;
    var sentenceNum = 1;

    if (autocut && sentenceNum > 0) {
        let puncts = sentence.match(/[\.\?!;]/g) || [];
        let arr = sentence.split(/[\.\?!;]/).filter(s => s.trim() !== '').map((s, index) => s.trim() + `${puncts[index] || ''} `);
        let index = arr.findIndex(s => s.indexOf(word) !== -1);
        let left = Math.ceil((sentenceNum - 1) / 2);
        let start = index - left;
        let end = index + ((sentenceNum - 1) - left);

        if (start < 0) {
            start = 0;
            end = sentenceNum - 1;
        } else if (end > (arr.length - 1)) {
            end = arr.length - 1;

            if ((end - (sentenceNum - 1)) < 0) {
                start = 0;
            } else {
                start = end - (sentenceNum - 1);
            }
        }

        return arr.slice(start, end + 1).join('').replace(word, '<b>' + word + '</b>');
    } else {
        return sentence.replace(word, '<b>' + word + '</b>');
    }
}
