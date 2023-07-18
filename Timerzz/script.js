 // Retrieve chronometer values from localStorage on page load
 window.onload = function() {
    for (let i = 1; i <= 3; i++) {
      const chronometerValue = localStorage.getItem('chronometer' + i);
      if (chronometerValue) {
        document.getElementById('chronometer' + i).textContent = chronometerValue;
      }
    }
  };

  // Start or resume the chronometer
  function startChronometer(id) {
    const chronometer = document.getElementById(id);
    const startTime = Date.now() - parseInt(chronometer.textContent.replace(/:/g, ''), 10) * 1000;
    chronometer.dataset.startTime = startTime;
    chronometer.dataset.intervalId = setInterval(updateChronometer.bind(null, id), 10);
  }

  // Pause the chronometer
  function pauseChronometer(id) {
    const chronometer = document.getElementById(id);
    clearInterval(chronometer.dataset.intervalId);
    delete chronometer.dataset.startTime;
  }

  // Reset the chronometer
  function resetChronometer(id) {
    const chronometer = document.getElementById(id);
    clearInterval(chronometer.dataset.intervalId);
    chronometer.textContent = '00:00:00';
    delete chronometer.dataset.startTime;
    localStorage.removeItem(id);
  }

  // Update the chronometer display
  function updateChronometer(id) {
    const chronometer = document.getElementById(id);
    const startTime = parseInt(chronometer.dataset.startTime, 10);
    const elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((elapsedTime % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0');
    const formattedTime = hours + ':' + minutes + ':' + seconds;
    chronometer.textContent = formattedTime;
    localStorage.setItem(id, formattedTime);
  }