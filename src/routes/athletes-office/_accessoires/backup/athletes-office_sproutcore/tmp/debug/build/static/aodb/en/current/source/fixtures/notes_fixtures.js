// ==========================================================================
// Project:   Aodb.Notes Fixtures
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Aodb */

sc_require('models/notes_model');

Aodb.Notes.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

   { guid: 1,
     text: "Michael" },
  
   { guid: 2,
     text: "Dwight"},
  
  // { guid: 3,
  //   firstName: "Jim",
  //   lastName: "Halpert" },
  //
  // { guid: 4,
  //   firstName: "Pam",
  //   lastName: "Beesly" },
  //
  // { guid: 5,
  //   firstName: "Ryan",
  //   lastName: "Howard" }

];
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('aodb');