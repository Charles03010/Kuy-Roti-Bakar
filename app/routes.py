from app import app, request, render_template, session, redirect, url_for, mysql
import sys,json


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/menu")
def menu():
    return render_template("menu.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if (
        request.method == "POST"
        and "inpNo" in request.form
        and "inpPass" in request.form
    ):
        no = request.form["inpNo"]
        passwd = request.form["inpPass"]
        cur = mysql.connection.cursor()
        cur.execute(
            "SELECT * FROM users WHERE no_telepon = %s AND password = %s", (no, passwd)
        )
        result = cur.fetchone()
        if result:
            session["is_logged_in"] = True
            session["data"] = {
                "no_telepon": result["no_telepon"],
                "nama": result["nama"],
                "status": result["status"],
            }
            if result["status"] == "Pengguna":
                return redirect("/")
            return redirect("/home/pesanan")
        else:
            return render_template("login.html")
    else:
        return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if (
        request.method == "POST"
        and "inpNo" in request.form
        and "inpPass" in request.form
        and "inpConPass" in request.form
        and request.form["inpPass"] == request.form["inpConPass"]
    ):
        no = request.form["inpNo"]
        nama = request.form["inpNama"]
        passwd = request.form["inpPass"]
        cur = mysql.connection.cursor()
        cur.execute(
            "INSERT INTO users (no_telepon,nama, password, status) VALUES (%s,%s,%s,'Pengguna')",
            (no, nama, passwd),
        )
        try:
            mysql.connection.commit()
            return redirect(url_for("login"))
        except:
            return render_template("register.html")
    else:
        return render_template("register.html")


@app.route("/home/<page>")
def home(page):
    if "is_logged_in" in session and session["data"]["status"] == "Admin":
        if page == "pesanan":
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM trx_home")
            data = list(cur.fetchall())
            cur.close()
            for j in data:
                j["pesanan"] = json.loads(j["pesanan"])
            return render_template("home.html", transaksi=data)
        elif page == "user":
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM users")
            data = list(cur.fetchall())
            cur.close()
            return render_template("user.html", users=data)
    else:
        return redirect("/")


@app.route('/updateStatus/<id>/<status>/<page>', methods=['POST'])
def updateStatus(id,status,page):
    if "is_logged_in" in session and session["data"]["status"] == "Admin":
        cur = mysql.connection.cursor()
        if page == "psn":
            if status == "Lunas":
                cur.execute("UPDATE transaksi SET status = 'Belum Lunas' WHERE id = %s",(id,))
            elif status == "Belum Lunas":
                cur.execute("UPDATE transaksi SET status = 'Lunas' WHERE id = %s",(id,))
        elif page == "usr":
            if status == "Admin":
                cur.execute("UPDATE users SET status = 'Pengguna' WHERE no_telepon = %s",(id,))
            elif status == "Pengguna":
                cur.execute("UPDATE users SET status = 'Admin' WHERE no_telepon = %s",(id,))
        try:
            mysql.connection.commit()
            data={"status":"success"}
            cur.close()
            return data
        except:
            data={"status":"Failed"}
            cur.close()
            return data
    else:
        return redirect(url_for("login"))

@app.route('/logout')
def logout():
    session.pop('is_logged_in',None)
    session.pop('data',None)
    return redirect(url_for("login"))
