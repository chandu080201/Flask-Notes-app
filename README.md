# Flask-Notes-app
# 📝 Flask Notes App

A simple **Flask-based Notes App** that allows users to **add, view, and delete notes** with a clean Bootstrap 5 UI.

## 🚀 Features
✅ User authentication (Sign Up, Login, Logout)  
✅ Add, view, and delete notes  
✅ AJAX-powered note deletion (No page reload)  
✅ Responsive design with Bootstrap 5  
✅ Flask-Login for secure user sessions  

---

## 🛠️ Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/flask-notes-app.git
cd flask-notes-app
2️⃣ Create & Activate Virtual Environment
**# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate


3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Set Up Database
python
>>> from web import db, create_app
>>> app = create_app()
>>> with app.app_context():
>>>     db.create_all()
>>> exit()
5️⃣ Run Flask App
python main.py

 ### Project Structure
flask-notes-app/
│── web/
│   │── static/
│   │── templates/
│   │── __init__.py
│   │── models.py
│   │── views.py
│   │── auth.py
│── main.py
│── requirements.txt
│── README.md





