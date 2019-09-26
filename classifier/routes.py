from classifier import app
from flask import render_template,send_from_directory,json,url_for
from classifier.breeds import dogs_breeds 

@app.route("/")
def index():
	breeds=[dog.upper().replace('_',' ') for dog in dogs_breeds]
	return render_template("index.html",title="Home",breeds=breeds)

@app.route("/about")
def about():
	breeds=[dog.upper().replace('_',' ') for dog in dogs_breeds]
	return render_template("about.html",title="About",breeds=breeds)

@app.route("/<string:folder>/image/<path:name>")
def get_image(folder,name):
	return send_from_directory("static/"+folder,name)
