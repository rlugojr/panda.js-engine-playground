window.onload = function() {
	var browser = document.getElementById('browser');
	var editor;
	var changeTimer;
	var menu = $('#menu');
	var header = $('#header');

	var onResize = function() {
		var menuVisible = menu.is(':visible');
		var headerHeight = header.height();

		var width = window.innerWidth;
		var height = window.innerHeight;

		menu.height(height - headerHeight);
		menu.css('top', headerHeight + 'px');

		var x = menuVisible ? menu.width() : 0;
		var frameCount = $('.frame').length;
		var frameWidth = (width - x) / frameCount;

		$('.frame').each(function(i, frame) {
			$(frame).width(frameWidth);
			$(frame).height(height - headerHeight);
			$(frame).css('top', headerHeight + 'px');
			$(frame).css('left', x + 'px');
			x += frameWidth;
		});
	};

	var initEditor = function(value) {
		editor = ace.edit('ace');

		editor.commands.addCommand({
		    name: 'saveChanges',
		    bindKey: { mac: 'Cmd-S', win: 'Ctrl-S' },
		    exec: function() {
		    	saveChanges();
		    }
		});

		if (value) {
			editor.getSession().setValue(value);
			saveChanges();
		}

		editor.focus();

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

	var loadScript = function(source) {
		var request = new XMLHttpRequest();
		request.onload = function() {
			if (request.responseText && request.status === 200) {
				editor.getSession().setValue(request.responseText);
				saveChanges();
			}
		};
		request.open('GET', 'scripts/' + source + '.js?' + Date.now(), true);
		request.send();
	};

	$('#menu div').click(function() {
		$('#menu div.current').removeClass('current');
		$(this).addClass('current');
		var source = $(this).attr('data-source');
		loadScript(source);
	});

	$('#header img').click(function() {
		menu.toggle();
		onResize();
	});

	$(window).on('resize', function() {
		onResize();
	});
	onResize();

	var href = document.location.href.split('?');
	if (href[1]) href = href[1].split('&');
	if (href[1]) {
		var user = href[0];
		var id = href[1];
	}

	if (!user || !id) return initEditor();
	
	var request = new XMLHttpRequest();
	request.onload = function() {
		if (request.responseText && request.status === 200) {
			initEditor(request.responseText);
		}
	};
	request.open('GET', 'http://codepen.io/' + user + '/pen/' + id + '.js', true);
	request.send();
};
