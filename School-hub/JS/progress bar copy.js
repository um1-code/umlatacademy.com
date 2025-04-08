    // Check if the lesson is completed and update the progress bar
    window.onload = function() {
        updateProgress();
      };
  
      function markLessonComplete() {
        // Set the lesson as complete in localStorage
        localStorage.setItem('Agricultural Vocabulary', 'true');
        updateProgress();
      }
  
      function updateProgress() {
        const lessonComplete = localStorage.getItem('Agricultural Vocabulary');
        const progressBar = document.getElementById('progress-bar');
        const completeBtn = document.getElementById('complete-btn');
  
        if (lessonComplete === 'true') {
          progressBar.style.width = '100%';
          completeBtn.disabled = true; // Disable the button once completed
          completeBtn.innerText = 'Lesson Completed';
        } else {
          progressBar.style.width = '0%';
        }
      }