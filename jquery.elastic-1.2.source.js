(function($){ 
     $.fn.extend({  
         elastic: function() { 
			var mimics = new Array('paddingTop','paddingRight','paddingBottom','paddingLeft','fontSize','lineHeight','fontFamily','width','fontWeight');	
			return this.each(function() { 
         			
				if(this.type == 'textarea') {
					
					var textarea = $(this);
					var marginbottom = parseInt(textarea.css('lineHeight'))*2 || parseInt(textarea.css('fontSize'))*2;
					var minheight = parseInt(textarea.css('height')) || marginbottom;
					var goalheight = 0;
					var twin = null;
					
					if (!twin)
					{
						twin = $('<div />').css({'display': 'none','position': 'absolute'}).appendTo('body');
						$.each(mimics, function(){
							twin.css(this,textarea.css(this));
						});
					};
					
					function update() {
						
						var content = textarea.val().replace(/<|>/g, ' ').replace(/\n/g, '<br />').replace(/&/g,"&amp;").replace(/  /g,' &nbsp;');
						if (twin.text() != content)
						{			
							twin.html(content);
							goalheight = (twin.height()+marginbottom > minheight)?twin.height()+marginbottom:minheight;
							if(Math.abs(goalheight - textarea.height()) > 10)
								textarea.animate({'height': goalheight},500);		
						}
					}
					textarea.css({overflow: 'auto'}).bind('focus',function() { self.periodicalUpdater = window.setInterval(function() {update();}, 400); }).bind('blur', function() { clearInterval(self.periodicalUpdater); });
					update();
					
				}
            }); 
        } 
    }); 
})(jQuery);