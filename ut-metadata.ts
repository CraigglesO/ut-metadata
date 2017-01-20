import Hose from './hose';

let x = new Hose();

x.on('LOL', () => {
  console.log('The TypeScript environment is ready.');
});

x.lol();