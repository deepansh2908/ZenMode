const waterContainer = document.querySelector('.water-text');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');

incrementBtn.addEventListener('click', () => {
  let currentValue = parseInt(waterContainer.textContent);
  console.log(currentValue);
  waterContainer.textContent = currentValue + 1;
  decrementBtn.disabled = false;
});

decrementBtn.addEventListener('click', () => {
  let currentValue = parseInt(waterContainer.textContent);
  if (currentValue > 0) {
    waterContainer.textContent = currentValue - 1;
    if (currentValue - 1 === 0) {
      decrementBtn.disabled = true;
    }
  }
});
