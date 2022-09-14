import { S as Stanza } from './stanza-d28b983d.js';

Stanza.prototype.embedScriptTag = function (...src) {
  const self = this;

  return src.reduce(
    (previousValue, currentValue) =>
      previousValue.then(() => new Promise((resolve, _reject) => {
        const script = document.createElement('script');
        script.src = currentValue;
        self.root.appendChild(script);
        script.onload = script.onreadystatechange = () => resolve();
      })),
    Promise.resolve()
  );
};
//# sourceMappingURL=stanza-e53c05a9.js.map
