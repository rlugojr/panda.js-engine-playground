window.onload = function() {
	var browser = document.getElementById('browser');
	var editor;
	var changeTimer;

	var initEditor = function(value) {
		editor = ace.edit('editor');

		editor.commands.addCommand({
		    name: 'saveChanges',
		    bindKey: { mac: 'Cmd-S', win: 'Ctrl-S' },
		    exec: function() {
		    	saveChanges();
		    }
		});

		editor.getSession().setValue(value);
		editor.focus();
		saveChanges();

		editor.getSession().on('change', function(event) {
			if (changeTimer) clearTimeout(changeTimer);
			changeTimer = setTimeout(function() {
				saveChanges();
			}, 1000);
		});
	};

	var saveChanges = function() {
		if (changeTimer) clearTimeout(changeTimer);
		changeTimer = null;
		browser.contentWindow.window.loaded = false;
		browser.contentWindow.window.location.reload();
		sendChanges();
	};

	var sendChanges = function() {
		if (!browser.contentWindow.window.loaded) {
			setTimeout(function() {
				sendChanges();
			}, 100);
			return;
		}

		var header = "game.module('game.main').body(function() {";
		var footer = '});'
		value = header + editor.getSession().getValue() + footer;
		browser.contentWindow.runScript(value);
	};

	var user = 'ekelokorpi';
	var id = 'WbqyVO';

	var href = document.location.href.split('?');
	if (href[1]) href = href[1].split('&');
	if (href[1]) {
		user = href[0];
		id = href[1];
	}
	
	var request = new XMLHttpRequest();
	request.onload = function() {
		if (request.responseText && request.status === 200) {
			initEditor(request.responseText);
		}
	};
	request.open('GET', 'http://codepen.io/' + user + '/pen/' + id + '.js', true);
	request.send();
};
