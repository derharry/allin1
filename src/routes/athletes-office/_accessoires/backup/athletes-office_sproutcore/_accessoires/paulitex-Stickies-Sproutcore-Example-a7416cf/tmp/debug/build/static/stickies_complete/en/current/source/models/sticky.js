// ==========================================================================
// Project:   StickiesComplete.Sticky
// Copyright: ©2011 Paul Lambert
// ==========================================================================
/*globals StickiesComplete */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
StickiesComplete.Sticky = SC.Record.extend(
/** @scope StickiesComplete.Sticky.prototype */ {

    x: SC.Record.attr(Number),
    y: SC.Record.attr(Number),
	z: SC.Record.attr(Number),
    content: SC.Record.attr(String)

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('stickies_complete');