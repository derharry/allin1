// ==========================================================================
// Project:   Aodb.notesController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Aodb */

/** @class

  (Document Your Controller Here)

  @extends SC.RecordArray
*/
Aodb.notesController = SC.RecordArray.create({
/** @scope Aodb.notesController.prototype */ 

  toggleView: function(view) {  Aodb.toggleView(view, Aodb.NotesView);  }
  
  /*
  addNote: function() {
  		var note = Aodb.Notes.store.createRecord(Aodb.Note, { "text:": " " });
  		this.selectObject(note);
  }*/

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('aodb');