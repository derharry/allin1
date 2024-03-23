// ==========================================================================
// Project:   Notes.noteController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Notes */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Notes.noteController = SC.ObjectController.create(
/** @scope Notes.noteController.prototype */ {

	addNote: function () {
		var note;
		note = Notes.Note.createRecord(Notes.Note, {
			'text': 'New Note…'
		});
		this.selectObject(note);
		this.invokeLater(function() {
			var contentIndex = this.indexOf(note);
			var list = Nodos.mainPage.getPath('mainPane.middleView.contentView');
			var listItem = list.itemViewForContentIndex(contentIndex);
			listItem.beginEditing();
		})
		return YES;
	}

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('notes');