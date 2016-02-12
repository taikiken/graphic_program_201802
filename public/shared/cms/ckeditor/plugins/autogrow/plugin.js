  1 ﻿/*
  2 Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
  3 For licensing, see LICENSE.html or http://ckeditor.com/license
  4 */
  5 
  6 /**
  7  * @file AutoGrow plugin
  8  */
  9 (function(){
 10 
 11 	// Actual content height, figured out by appending check the last element's document position.
 12 	function contentHeight( scrollable )
 13 	{
 14 		var overflowY = scrollable.getStyle( 'overflow-y' );
 15 
 16 		var doc = scrollable.getDocument();
 17 		// Create a temporary marker element.
 18 		var marker = CKEDITOR.dom.element.createFromHtml( '<span style="margin:0;padding:0;border:0;clear:both;width:1px;height:1px;display:block;">' + ( CKEDITOR.env.webkit ? ' ' : '' ) + '</span>', doc );
 19 		doc[ CKEDITOR.env.ie? 'getBody' : 'getDocumentElement']().append( marker );
 20 
 21 		var height = marker.getDocumentPosition( doc ).y + marker.$.offsetHeight;
 22 		marker.remove();
 23 		scrollable.setStyle( 'overflow-y', overflowY );
 24 		return height;
 25 	}
 26 
 27 	function getScrollable( editor )
 28 	{
 29 		var doc = editor.document,
 30 			body = doc.getBody(),
 31 			htmlElement = doc.getDocumentElement();
 32 
 33 		// Quirks mode overflows body, standards overflows document element
 34 		return doc.$.compatMode == 'BackCompat' ? body : htmlElement;
 35 	}
 36 
 37 	var resizeEditor = function( editor )
 38 	{
 39 		if ( !editor.window )
 40 			return;
 41 
 42 		var scrollable = getScrollable( editor ),
 43 			currentHeight = editor.window.getViewPaneSize().height,
 44 			newHeight = contentHeight( scrollable );
 45 
 46 		// Additional space specified by user.
 47 		newHeight += ( editor.config.autoGrow_bottomSpace || 0 );
 48 
 49 		var min = editor.config.autoGrow_minHeight != undefined ? editor.config.autoGrow_minHeight : 200,
 50 			max = editor.config.autoGrow_maxHeight || Infinity;
 51 
 52 		newHeight = Math.max( newHeight, min );
 53 		newHeight = Math.min( newHeight, max );
 54 
 55 		if ( newHeight != currentHeight )
 56 		{
 57 			newHeight = editor.fire( 'autoGrow', { currentHeight : currentHeight, newHeight : newHeight } ).newHeight;
 58 			editor.resize( editor.container.getStyle( 'width' ), newHeight, true );
 59 		}
 60 
 61 		if ( scrollable.$.scrollHeight > scrollable.$.clientHeight && newHeight < max )
 62 			scrollable.setStyle( 'overflow-y', 'hidden' );
 63 		else
 64 			scrollable.removeStyle( 'overflow-y' );
 65 
 66 
 67 	};
 68 
 69 	CKEDITOR.plugins.add( 'autogrow',
 70 	{
 71 		init : function( editor )
 72 		{
 73 			editor.addCommand( 'autogrow', { exec : resizeEditor, modes : { wysiwyg:1 }, readOnly: 1, canUndo: false, editorFocus: false } );
 74 
 75 			var eventsList = { contentDom:1, key:1, selectionChange:1, insertElement:1, mode:1 };
 76 			editor.config.autoGrow_onStartup && ( eventsList[ 'instanceReady' ] = 1 );
 77 			for ( var eventName in eventsList )
 78 			{
 79 				editor.on( eventName, function( evt )
 80 				{
 81 					var maximize = editor.getCommand( 'maximize' );
 82 					// Some time is required for insertHtml, and it gives other events better performance as well.
 83 					if ( evt.editor.mode == 'wysiwyg' &&
 84 						// Disable autogrow when the editor is maximized .(#6339)
 85 						( !maximize || maximize.state != CKEDITOR.TRISTATE_ON ) )
 86 					{
 87 						setTimeout( function()
 88 						{
 89 							resizeEditor( evt.editor );
 90 							// Second pass to make correction upon
 91 							// the first resize, e.g. scrollbar.
 92 							resizeEditor( evt.editor );
 93 						}, 100 );
 94 					}
 95 				});
 96 			}
 97 
 98 			// Coordinate with the "maximize" plugin. (#9311)
 99 			editor.on( 'beforeCommandExec', function( evt )
100 			{
101 				if ( evt.data.name == 'maximize' && evt.editor.mode == 'wysiwyg' )
102 				{
103 					if ( evt.data.command.state == CKEDITOR.TRISTATE_OFF )
104 					{
105 						var scrollable = getScrollable( editor );
106 						scrollable.removeStyle( 'overflow' );
107 					}
108 					else
109 						resizeEditor( editor );
110 				}
111 			});
112 		}
113 	});
114 })();
115 /**
116  * The minimum height that the editor can reach using the AutoGrow feature.
117  * @name CKEDITOR.config.autoGrow_minHeight
118  * @type Number
119  * @default <code>200</code>
120  * @since 3.4
121  * @example
122  * config.autoGrow_minHeight = 300;
123  */
124 
125 /**
126  * The maximum height that the editor can reach using the AutoGrow feature. Zero means unlimited.
127  * @name CKEDITOR.config.autoGrow_maxHeight
128  * @type Number
129  * @default <code>0</code>
130  * @since 3.4
131  * @example
132  * config.autoGrow_maxHeight = 400;
133  */
134 
135  /**
136  * Whether to have the auto grow happen on editor creation.
137  * @name CKEDITOR.config.autoGrow_onStartup
138  * @type Boolean
139  * @default false
140  * @since 3.6.2
141  * @example
142  * config.autoGrow_onStartup = true;
143  */
144 
145 /**
146  * Fired when the AutoGrow plugin is about to change the size of the editor.
147  * @name CKEDITOR.editor#autogrow
148  * @event
149  * @param {Number} data.currentHeight The current height of the editor (before resizing).
150  * @param {Number} data.newHeight The new height of the editor (after resizing). It can be changed
151  *				to determine a different height value to be used instead.
152  */
153 
154 
155 /**
156  *  Extra height in pixel to leave between the bottom boundary of content with document size when auto resizing.
157  * @name CKEDITOR.config.autoGrow_bottomSpace
158  * @type Number
159  * @default 0
160  * @since 3.6.2
161  */
162 