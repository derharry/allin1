// ==========================================================================
// Project:   Notes.Note Fixtures
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Notes */

sc_require('models/note_model');

Notes.Note.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

   { guid: 1,
     text: "Michael" },
  
   { guid: 2,
     text: "Michael" },
     
   { guid: 3,
     text: "Michael" },
     
   { guid: 4,
     text: "Michael" },
     
   { guid: 5,
     text: "Michael" }
     
];
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('notes');