# ClimatWatch
# 🌦️ ClimaWatch

ClimatWatch est une application web de suivi et d’analyse des données climatiques, basée sur une architecture Django (backend) + React.js (frontend).

## 🧩 Technologies utilisées

- **Backend** : Django, Django REST Framework
- **Frontend** : React.js (via Create React App)
- **CORS** : django-cors-headers
- **Base de données** : SQLite (par défaut)

---

## 📦 Installation (en local)

### 🔁 1. Cloner le dépôt

```bash
git https://github.com/Nafissatou172/ClimatWatch.git
cd climawatch

Configuration du backend 

python -m venv env
env\Scripts\activate // pour Windows
source env/bin/activate // pour Linux/MacOS

cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

onfiguration du frontend 
cd frontend
npm install
npm run dev

