// ==========================================================================
// Project:   Aodb.Notes
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Aodb */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Aodb.Notes = SC.Record.extend(
/** @scope Aodb.Notes.prototype */ {

  text: SC.Record.attr(String, { defaultValue: '' })

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('aodb');