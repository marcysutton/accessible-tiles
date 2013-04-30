var AccessibleTileGroup = function(selector, options){
	var self = this;
	
	this.options = {};

	if(typeof options == 'object') {
        $.extend(this.options, options);
    }
	
	// cache jQuery object references
	this.elTiles = selector;
	this.elTileBack = this.elTiles.find('.tile-back');
	
	// if we're going to hide the back of each tile so it doesn't read aloud, 
	// change the tabIndex and hide it with CSS
	if(this.options.hideAll === true){
		this.elTileBack.attr('tabIndex', '-1').addClass('hidden');
	}
	
	// wire up each target element for interaction.
	this.elTiles.on('keypress click', function(e){
		
		e.preventDefault();
		
		// if user hits the enter key or clicks with a mouse, do stuff	
		if(e.type == 'keypress' && e.keyCode == 13 || e.type == 'click'){
			var target = $(e.currentTarget),
				tileBack = target.find('.tile-back'),
				tileFront = target.find('.tile-front');		
			
			// if a tile isn't flipped, flip it
			if(!target.hasClass('flipped')){
				target.addClass('flipped');
				
				// unhide tile back
				tileBack.removeClass('hidden');
						
				// if we're hiding tile fronts/backs, hide the front of a tile after a delay
				if(self.options.hideAll){
					window.setTimeout(function(){
					
						// send focus to the tile back heading after a delay
						tileBack.find('h3').focus();
						
						tileFront.addClass('hidden');
					},500);
				}
			}
			else {
				// unflip the tile
				target.removeClass('flipped');
				
				// unhide tile front
				tileFront.removeClass('hidden');
				
				// if we're hiding tile fronts/backs, hide the back of a tile after a delay
				if(self.options.hideAll){
				
					window.setTimeout(function(){				
						// send focus to the tile front heading after a delay
						tileFront.find('h3').focus();
						
						tileBack.addClass('hidden');
					},500);
				}
			}
		}
	});
}

$(document).ready(function(){
	
	if($('#version1').length){
		var accessibleTiles1 = new AccessibleTileGroup($('#version1').find('.tile a'));
	}
	
	if($('#version2').length){
		var accessibleTiles2 = new AccessibleTileGroup($('#version2').find('.tile'), {hideAll:true});
	}
});