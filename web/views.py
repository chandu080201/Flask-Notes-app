from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Note
from . import db
import json

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST': 
        note = request.form.get('note')  # Get the note from the HTML form

        if not note or len(note.strip()) < 1:  # Trim spaces and check empty string
            flash('Note is too short!', category='error') 
        else:
            new_note = Note(data=note.strip(), user_id=current_user.id)  # Trim spaces
            db.session.add(new_note) 
            db.session.commit()
            flash('Note added!', category='success')

    return render_template("home.html", user=current_user)

@views.route('/delete-note', methods=['POST'])
@login_required  # Ensure only logged-in users can delete notes
def delete_note():  
    try:
        note_data = request.get_json()  # Use get_json() instead of json.loads
        if not note_data or 'noteId' not in note_data:
            return jsonify({'error': 'Invalid request data'}), 400

        note_id = note_data['noteId']
        note = Note.query.get(note_id)

        if note and note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()
            return jsonify({'message': 'Note deleted successfully'}), 200
        else:
            return jsonify({'error': 'Note not found or unauthorized'}), 403

    except Exception as e:
        return jsonify({'error': f'Error deleting note: {str(e)}'}), 500
