Alpine.directive('delayed-iframe', (el, { expression }, { evaluateLater }) => {
	const { value, dependencies } = evaluateLater(expression);

	window.addEventListener('load', () => {
		const iframe = document.createElement('iframe');
		iframe.src = value();
		iframe.width = '600';
		iframe.height = '600';
		iframe.frameBorder = '0';
		iframe.style.border = '0';
		iframe.allowFullscreen = true;

		el.appendChild(iframe);
	});

	return () => {
		dependencies.forEach((dependency) => dependency());
	};
});
