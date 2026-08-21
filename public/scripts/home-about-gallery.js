(() => {
	const root = document.querySelector('[data-home-showcase]');
	if (!root) return;

	const featured = root.querySelector('#home-showcase-featured');
	const track = root.querySelector('[data-home-showcase-track]');
	const thumbs = [...root.querySelectorAll('.home__about-thumb')];
	if (!(featured instanceof HTMLImageElement) || !(track instanceof HTMLElement) || !thumbs.length) return;

	let autoTimer = 0;
	let paused = false;

	const setFeatured = (button) => {
		const src = button.getAttribute('data-showcase-src');
		const srcset = button.getAttribute('data-showcase-srcset');
		const alt = button.getAttribute('data-showcase-alt');
		if (!src || !alt) return;

		featured.src = src;
		if (srcset) featured.srcset = srcset;
		else featured.removeAttribute('srcset');
		featured.alt = alt;

		for (const thumb of thumbs) {
			const active = thumb === button;
			thumb.classList.toggle('is-active', active);
			thumb.setAttribute('aria-pressed', active ? 'true' : 'false');
		}

		button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
	};

	const activeIndex = () => thumbs.findIndex((t) => t.classList.contains('is-active'));

	const advance = () => {
		if (paused) return;
		const next = (activeIndex() + 1) % thumbs.length;
		setFeatured(thumbs[next]);
	};

	const startAuto = () => {
		window.clearInterval(autoTimer);
		autoTimer = window.setInterval(advance, 4200);
	};

	for (const thumb of thumbs) {
		thumb.addEventListener('click', () => {
			setFeatured(thumb);
			startAuto();
		});
	}

	track.addEventListener('mouseenter', () => {
		paused = true;
	});
	track.addEventListener('mouseleave', () => {
		paused = false;
	});
	track.addEventListener('focusin', () => {
		paused = true;
	});
	track.addEventListener('focusout', () => {
		paused = false;
	});

	startAuto();
})();
