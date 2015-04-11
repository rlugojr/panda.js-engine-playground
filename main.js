window.onload = function() {
	var saveChanges = function() {
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

		var value = editor.getSession().getValue();
		value = value.replace(/(\r\n|\n|\r)/gm, '');
		browser.contentWindow.runScript(value);
	};

	var browser = document.getElementById('browser');
	editor = ace.edit('editor');

	editor.commands.addCommand({
	    name: 'saveChanges',
	    bindKey: { mac: 'Cmd-S', win: 'Ctrl-S' },
	    exec: function() {
	    	saveChanges();
	    }
	});

	var file = document.location.href.split('?');
	file = file[1] || 'default';
	
	var request = new XMLHttpRequest();
	request.onload = function() {
		if (request.responseText) {
			editor.getSession().setValue(request.responseText);
			saveChanges();
		}
	};
	request.open('GET', 'snippets/' + file + '.js', true);
	request.send();

	editor.focus();
};
