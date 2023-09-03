const squareChecker = (containerSize, childSize, numberOfChildren) => {
  const numSquares = Math.floor(containerSize / childSize);
  const totalSquares = numSquares * numSquares;
  if(numberOfChildren < totalSquares){
    return numberOfChildren
  }
  return totalSquares;
}

const colorGenerate = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}

const createSquareContainer = (containerSize, childSize) => {
  const wrapper = document.querySelector('#mainSquare');
  const value = `repeat(auto-fill, minmax(${childSize}px, 1fr))`;
  wrapper.style.display = 'grid';
  wrapper.style.gap = '0';
  wrapper.style.gridTemplateColumns = value;
  wrapper.style.gridTemplateRows = value;
  wrapper.style.width = `${containerSize}px`;
  wrapper.style.height = `${containerSize}px`;
  wrapper.style.backgroundColor = 'rgb(96, 96, 96)';
  return wrapper;
}

const createSquareChild = (childSize, id) => {
  const childSquare = document.createElement('div');
  childSquare.id = id+1;
  childSquare.style.width = `${childSize}px`;
  childSquare.style.height = `${childSize}px`;
  childSquare.style.backgroundColor = colorGenerate();
  let timer;
  childSquare.addEventListener('mouseenter', () => {
    childSquare.style.backgroundColor = colorGenerate();
    timer = setTimeout(() => {
      childSquare.style.display = 'none';
    }, 2000);
  });
  childSquare.addEventListener('mouseleave', () => {
    clearTimeout(timer); 
  });
  return childSquare;
}

const drawContainer = (containerSize, childSize, numberOfChildren) => {
  const body = document.body;
  const squareContainer = createSquareContainer(containerSize, childSize);
  const childSquaresLength = squareChecker(containerSize, childSize, numberOfChildren);
  const childSquares = [];
  for (let i = 0; i < childSquaresLength; i++) {
    const childSquare = createSquareChild(childSize, i);
    childSquares.push(childSquare);
  }

  childSquares.forEach(square => {
    squareContainer.appendChild(square);
  });

  if(numberOfChildren > childSquaresLength){
    const message = document.createElement('p');
    message.style.color = 'rgb(0,204,204)'
    message.style.fontSize = '20px'
    message.textContent = `Only  ${childSquaresLength} squares measuring ${childSize}px per side can fit in a container with ${containerSize}px per side.`
    body.appendChild(message)
  }
};

drawContainer(500, 50, 100);
//drawContainer(500, 50, 101);
//drawContainer(200, 50, 10);
//drawContainer(200, 50, 17);
//drawContainer(310, 200, 4);
//drawContainer(413, 42, 30);
//drawContainer(200, 300, 2);
