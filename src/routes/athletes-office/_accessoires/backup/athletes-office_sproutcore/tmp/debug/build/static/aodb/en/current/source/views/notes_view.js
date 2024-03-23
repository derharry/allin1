// ==========================================================================
// Project:   Aodb.NotesView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Aodb */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
/*
Aodb.NotesView = SC.View.extend(
/** @scope Aodb.NotesView.prototype / {

  // TODO: Add your own code here.

});
*/

/*
Aodb.NotesView = SC.View.design({

  	layout: { centerX: 0, centerY: 0, width: 200, height: 100 },
	childViews: 'labelView'.w(),
	
	labelView: SC.LabelView.design({
		layout: { centerX: 0, centerY: 0, width: 200, height: 18 },
		textAlign: SC.ALIGN_CENTER,
		tagName: "h1", 
		value: "Welcome to Athletes Office!  buuuu =)"
	})

});
*/

/*
Aodb.NotesView = SC.TemplateView.design({
    layerId: 'notes',
	templateName: 'notes'

});
*/

Aodb.NotesView = SC.GridView.design({
	
});

; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('aodb');