document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Form validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Initialize tooltips
  if (typeof bootstrap !== "undefined") {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      new bootstrap.Tooltip(el);
    });
  }

});

// Show toast notification
function showToast(message, type = 'success') {
  const toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    console.error("Error: Toast container missing in HTML.");
    return;
  }

  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-bg-${type} border-0`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  toastContainer.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
  bsToast.show();

  toast.addEventListener('hidden.bs.toast', () => toast.remove());
}

// Delete note with animation
function deleteNote(noteId) {
  if (!noteId) {
    console.error("Error: noteId is undefined.");
    return;
  }

  const noteElement = document.getElementById(`note-${noteId}`);
  if (!noteElement) {
    console.error("Error: Note element not found.");
    return;
  }

  const deleteButton = noteElement.querySelector('button');
  if (deleteButton) deleteButton.disabled = true;

  noteElement.classList.add('deleting');

  fetch("/delete-note", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ noteId: noteId }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) throw new Error(data.error);

    setTimeout(() => {
      noteElement.remove();
      showToast('Note deleted successfully');
    }, 300);
  })
  .catch(error => {
    noteElement.classList.remove('deleting');
    if (deleteButton) deleteButton.disabled = false;
    showToast(error.message, 'danger');
  });
}

// Add loading state to buttons
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('btn-close')) {
    const button = e.target;
    const originalContent = button.innerHTML;

    if (button.onclick && button.onclick.toString().includes('deleteNote')) {
      return;
    }

    button.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Loading...';
    button.disabled = true;

    setTimeout(() => {
      if (!button.classList.contains("loading")) { 
        button.innerHTML = originalContent;
        button.disabled = false;
      }
    }, 1000);
  }
});

