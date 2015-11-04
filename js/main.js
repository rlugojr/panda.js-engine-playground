window.onload = function() {
	var browser = document.getElementById('browser');
	var editor;
	var changeTimer;
	var menu = $('#menu');
	var header = $('#header');
	var storage = 'net.pandajs.engine-playground';

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

		hashChange();
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

		var header = "game.module('game.playground').body(function() {";
		var footer = '});'
		value = header + editor.getSession().getValue() + footer;
		browser.contentWindow.runScript(value);

		browser.contentWindow.game.Debug.showBodies = $('#showBodies').is(':checked');
		browser.contentWindow.game.Debug.showBounds = $('#showBounds').is(':checked');
		browser.contentWindow.game.Debug.showHitAreas = $('#showHitAreas').is(':checked');
		browser.contentWindow.game.Debug.fakeTouch = $('#fakeTouch').is(':checked');
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

	var hashChange = function() {
		var script = document.location.href.split('#')[1];
		if (script) loadScript(script);
	};

	var loadCodePen = function(user, id) {
		var request = new XMLHttpRequest();
		request.onload = function() {
			if (request.responseText && request.status === 200) {
				initEditor(request.responseText);
			}
		};
		request.open('GET', 'http://codepen.io/' + user + '/pen/' + id + '.js', true);
		request.send();
	};

	$('#menu a').click(function() {
		$('#menu a.current').removeClass('current');
		$(this).addClass('current');
	});

	$('#header img').click(function() {
		menu.toggle();
		onResize();
	});

	$('#header #options input').click(function() {
		var id = $(this).attr('id');
		var checked = $(this).is(':checked');
		localStorage[storage + '.' + id] = (checked ? 'true' : '');
		if (!browser.contentWindow.game.Debug) return;
		browser.contentWindow.game.Debug[id] = checked;
	});

	$(window).on('resize', function() {
		onResize();
	});

	$(window).on('hashchange', function() {
		hashChange();
	});

	var script = document.location.href.split('#')[1];
	if (script) {
		$('#menu a').each(function(i, item) {
			var href = $(item).attr('href');
			if (href.substr(1) === script) {
				$(item).addClass('current');
				return false;
			}
		});
	}

	if (localStorage[storage + '.showBodies']) $('#showBodies').prop('checked', true);
	if (localStorage[storage + '.showBounds']) $('#showBounds').prop('checked', true);
	if (localStorage[storage + '.showHitAreas']) $('#showHitAreas').prop('checked', true);
	if (localStorage[storage + '.fakeTouch']) $('#fakeTouch').prop('checked', true);

	initEditor();
	onResize();
};
