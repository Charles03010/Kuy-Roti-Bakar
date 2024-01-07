from flask import Flask, render_template,session,request,redirect,url_for,abort
from flask_mysqldb import MySQL
import os

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__,template_folder="../templates",static_folder="../static")


app.secret_key = str(os.environ.get('SECRET_KEY'))
app.config['MYSQL_HOST'] = str(os.environ.get('DB_HOST'))
app.config['MYSQL_USER'] = str(os.environ.get('DB_USERNAME'))
app.config['MYSQL_PASSWORD'] = str(os.environ.get('DB_PASSWORD'))
app.config['MYSQL_DB'] = str(os.environ.get('DB_DATABASE'))
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

from app import routes
