from app import app , request, render_template, session, redirect, url_for,mysql
import sys


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/login',methods=['GET','POST'])
def login():
    if request.method == 'POST' and 'inpNo' in request.form and 'inpPass' in request.form:
        no = request.form['inpNo']
        passwd = request.form['inpPass']
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE no_telepon = %s AND password = %s",(no,passwd))
        result = cur.fetchone()
        if result:
            session['is_logged_in'] = True
            session['data'] = {
                'no_telepon' : result[0],
                "nama": result[1],
                "status": result[3],
            }
            if result[3] == 'Pengguna':
                return redirect(url_for('/'))
            return redirect(url_for('home'))
        else:
            return render_template('login.html')
    else:
        return render_template('login.html')
@app.route('/register',methods=['GET','POST'])
def register():
    if request.method == 'POST' and 'inpNo' in request.form and 'inpPass' in request.form and 'inpConPass' in request.form and request.form['inpPass'] == request.form['inpConPass']:
        no = request.form['inpNo']
        nama = request.form['inpNama']
        passwd = request.form['inpPass']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (no_telepon,nama, password, status) VALUES (%s,%s,%s,'Pengguna')",(no,nama,passwd))
        try:
            mysql.connection.commit()
            return redirect(url_for('login'))
        except:
            return render_template('register.html',data=test)
    else:
        return render_template('register.html')

@app.route('/home')
def home():
    if 'is_logged_in' in session:
        # cur = mysql.connection.cursor()
        # cur.execute("SELECT * FROM db_inventory.tb_product")
        # data = cur.fetchall()
        # cur.close()
        return render_template('home.html')
    else:
        return redirect(url_for("login"))

# @app.route('/logout')
# def logout():
#     session.pop('is_logged_in',None)
#     session.pop('username',None)
#     return redirect(url_for("login"))

