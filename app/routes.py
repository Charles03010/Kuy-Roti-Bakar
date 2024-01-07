from app import app, request, render_template, session, redirect, url_for, mysql, abort
import sys, json, random


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


@app.route("/updateStatus/<id>/<status>/<page>", methods=["POST"])
def updateStatus(id, status, page):
    if "is_logged_in" in session and session["data"]["status"] == "Admin":
        cur = mysql.connection.cursor()
        if page == "psn":
            if status == "Lunas":
                cur.execute(
                    "UPDATE transaksi SET status = 'Belum Lunas' WHERE id = %s", (id,)
                )
            elif status == "Belum Lunas":
                cur.execute(
                    "UPDATE transaksi SET status = 'Lunas' WHERE id = %s", (id,)
                )
        elif page == "usr":
            if status == "Admin":
                cur.execute(
                    "UPDATE users SET status = 'Pengguna' WHERE no_telepon = %s", (id,)
                )
            elif status == "Pengguna":
                cur.execute(
                    "UPDATE users SET status = 'Admin' WHERE no_telepon = %s", (id,)
                )
        try:
            mysql.connection.commit()
            data = {"status": "success"}
            cur.close()
            return data
        except:
            data = {"status": "Failed"}
            cur.close()
            return data
    else:
        return redirect(url_for("login"))


@app.route("/logout")
def logout():
    session.pop("is_logged_in", None)
    session.pop("data", None)
    return redirect("/")


@app.route("/keranjang/<no>", methods=["GET", "POST"])
def keranjang(no=""):
    if "is_logged_in" in session and session["data"]["status"] == "Pengguna":
        if request.method == "GET" and no != "":
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM keranjang WHERE nomor_telepon = %s", (no,))
            data = cur.fetchall()
            cur.close()
            if data:
                data = list(data)
                return data
            return abort(404)
        elif request.method == "POST" and no != "":
            data = request.json
            cur = mysql.connection.cursor()
            if data["roti"] == "Pastry":
                if data["ukuran"] == "Small":
                    if data["rasa"] == "Strawberry" or data["rasa"] == "Blueberry":
                        data["total"] = 11000
                    elif data["rasa"] == "Coklat":
                        data["total"] = 12000
                    elif data["rasa"] == "Keju" or data["rasa"] == "Tiramisu" or data["rasa"] == "Matcha":
                        data["total"] = 13000
                elif data["ukuran"] == "Large":
                    if data["rasa"] == "Strawberry" or data["rasa"] == "Blueberry":
                        data["total"] = 17000
                    elif data["rasa"] == "Coklat":
                        data["total"] = 18000
                    elif data["rasa"] == "Keju" or data["rasa"] == "Tiramisu" or data["rasa"] == "Matcha":
                        data["total"] = 19000
            elif data["roti"] == "Polos":
                if data["ukuran"] == "Small":
                    if data["rasa"] == "Strawberry" or data["rasa"] == "Blueberry" or data["rasa"] == "Coklat":
                        data["total"] = 10000
                    elif data["rasa"] == "Keju" or data["rasa"] == "Tiramisu" or data["rasa"] == "Matcha":
                        data["total"] = 12000
                elif data["ukuran"] == "Large":
                    if data["rasa"] == "Strawberry" or data["rasa"] == "Blueberry" or data["rasa"] == "Coklat":
                        data["total"] = 14000
                    elif data["rasa"] == "Keju" or data["rasa"] == "Tiramisu" or data["rasa"] == "Matcha":
                        data["total"] = 15000
            if data["topping"] == "Kacang" or data["topping"] == "Oreo":
                data["total"] += 2000
            elif data["topping"] == "Keju":
                data["total"] += 3000
            data["total"] *= int(data["jumlah"])
            cur.execute(
                "INSERT INTO keranjang (id_keranjang,nomor_telepon,roti,ukuran,rasa,topping,jumlah,total) VALUES ('',%s,%s,%s,%s,%s,%s,%s)",
                (
                    no,
                    data["roti"],
                    data["ukuran"],
                    data["rasa"],
                    data["topping"] if data["topping"] != "" else None,
                    data["jumlah"],
                    data["total"],
                ),
            )
            try:
                mysql.connection.commit()
                return {"status": "success"}
            except:
                return {"status": "failed"}
    else:
        return abort(404)


@app.route("/del/keranjang", methods=["POST"])
def delkeranjang():
    if "is_logged_in" in session and session["data"]["status"] == "Pengguna":
        if request.method == "POST":
            data = request.json
            cur = mysql.connection.cursor()
            if data["id"] != "ALL":
                cur.execute(
                    "DELETE FROM keranjang WHERE nomor_telepon = %s AND id_keranjang = %s",
                    (data["no"], data["id"]),
                )
            else:
                cur.execute(
                    "DELETE FROM keranjang WHERE nomor_telepon = %s", (data["no"])
                )
            try:
                mysql.connection.commit()
                return {"status": "success"}
            except:
                return {"status": "failed"}
    else:
        return abort(404)


@app.route("/payment", methods=["POST"])
def payment():
    if "is_logged_in" in session and session["data"]["status"] == "Pengguna":
        if request.method == "POST":
            data = request.json
            cur = mysql.connection.cursor()
            cur.execute(
                "SELECT * FROM keranjang WHERE nomor_telepon = %s", (data["no"],)
            )
            res = cur.fetchall()
            cur.close()
            if res:
                res = list(res)
                total = 0
                for i in res:
                    del i["id_keranjang"]
                    del i["nomor_telepon"]
                    total += i["total"]
                rnd = random.randint(0, 999)
                save = {"pesanan": res, "total": total}
                try:
                    cur = mysql.connection.cursor()
                    cur.execute("START TRANSACTION")
                    cur.execute(
                        "INSERT INTO transaksi (id,nomor_telepon,kode_unik,pesanan,status) VALUES ('',%s,%s,%s,'Belum Lunas')",
                        (data["no"], rnd, json.dumps(save)),
                    )
                    cur.execute(
                        "DELETE FROM keranjang WHERE nomor_telepon = %s", (data["no"],)
                    )
                    mysql.connection.commit()
                    return {
                            "status": "success",
                            "data": {"kode_unik": rnd, "total": total},
                    }
                except:
                    mysql.connection.rollback()
                    return {
                        "status": "failed",
                        "data": {"kode_unik": rnd, "total": total},
                    }
                finally:
                    cur.close()
            return abort(404)
    else:
        return abort(404)
