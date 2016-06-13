/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	config.language = 'ja';
	config.uiColor = '#ffffff';
	config.enterMode = 1;
	config.shiftEnterMode = 2;
	config.height = '350px';
	config.forcePasteAsPlainText = true;
	config.fontSize_sizes='14/14px;16/16px;18/18px;20/20px;';
	config.extraPlugins = 'specialchar';
	config.entities_additional = '#9312,#9313,#9314,#9315,#9316,#9317,#9318,#9319,#9320,#9321,#9322,#9323,#9324,#9325,#9326,#9327,#9328,#9329,#9330,#9331';
	config.toolbar = [
	['Source'],['Bold','Underline','Strike'],["Link","Unlink"],['Image'],['Superscript','Subscript','SpecialChar'],['NumberedList','BulletedList','Blockquote'],
	['RemoveFormat'],
	['Undo','Redo']
	];
};

